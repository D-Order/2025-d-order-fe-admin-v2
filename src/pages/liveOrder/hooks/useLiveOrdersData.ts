// src/pages/liveOrder/hooks/useLiveOrdersData.ts
import { useState, useEffect, useCallback, useMemo } from "react";
// 실제 백엔드 서비스 사용 시:
//import LiveOrderService, { Order, OrderItem } from "../api/LiveOrderService";
// 더미 서비스 사용 시 (개발 환경에서):
import DummyLiveOrderService, {
  Order,
  OrderItem,
} from "../dummy/DummyLiveOrderService";

// 실제 사용할 서비스 선택 (환경 변수 등으로 제어 가능)
const CurrentLiveOrderService = DummyLiveOrderService; // 또는 DummyLiveOrderService

// API 응답 데이터를 UI 형식으로 변환하는 함수
// LiveOrderService에서 OrderItem 인터페이스를 가져오므로, 이 함수는 이곳에 두거나 LiveOrderService에 포함 가능
const convertApiDataToUiFormat = (apiData: Order[]): OrderItem[] => {
  return apiData.map((item) => ({
    id: item.id,
    time: new Date(item.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    table: `테이블 ${item.table_num}`,
    menu: item.menu_name,
    quantity: item.menu_num,
    isServed: item.order_status === "served_complete",
    imageUrl: item.menu_image,
  }));
};

export const useLiveOrdersData = () => {
  const [allOrders, setAllOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // 개별 메뉴 항목의 페이드 아웃 상태를 추적
  const [fadingMenuItems, setFadingMenuItems] = useState<
    Record<string, boolean>
  >({});
  // 전체 테이블의 페이드 아웃 상태를 추적
  const [fadingTableBills, setFadingTableBills] = useState<
    Record<string, boolean>
  >({});

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await CurrentLiveOrderService.getOrders();
      setAllOrders(convertApiDataToUiFormat(response.data.orders));
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleServeOrder = useCallback(async (orderId: number) => {
    try {
      // API 호출
      await CurrentLiveOrderService.updateOrderStatus(orderId);

      // 옵티미스틱 UI 업데이트 및 애니메이션 트리거
      setAllOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) =>
          order.id === orderId ? { ...order, isServed: true } : order
        );

        const servedOrder = updatedOrders.find((o) => o.id === orderId);

        if (servedOrder) {
          // 개별 항목 페이드 아웃 시작
          setFadingMenuItems((prev) => ({ ...prev, [String(orderId)]: true }));
          setTimeout(() => {
            setFadingMenuItems((prev) => {
              const newFadingItems = { ...prev };
              delete newFadingItems[String(orderId)];
              return newFadingItems;
            });
          }, 2000); // styled-components의 transition 시간과 일치

          // 해당 테이블의 모든 주문이 서빙 완료되었는지 확인
          const tableOrders = updatedOrders.filter(
            (o) => o.table === servedOrder.table
          );
          const isTableNowFullyServed = tableOrders.every((o) => o.isServed);

          if (isTableNowFullyServed) {
            // 테이블 전체 페이드 아웃 시작
            setFadingTableBills((prev) => ({
              ...prev,
              [servedOrder.table]: true,
            }));
            setTimeout(() => {
              setFadingTableBills((prev) => {
                const newFadingTables = { ...prev };
                delete newFadingTables[servedOrder.table];
                return newFadingTables;
              });
            }, 2000); // styled-components의 transition 시간과 일치
          }
        }

        return updatedOrders;
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      // API 호출 실패 시 UI 상태 롤백 로직 추가
    }
  }, []);

  // 메뉴 목록에 표시될 주문 필터링 (서빙 완료되었지만 아직 페이드 아웃 중인 항목 포함)
  const ordersForMenuList = useMemo(() => {
    return allOrders.filter(
      (order) => !order.isServed || fadingMenuItems[String(order.id)]
    );
  }, [allOrders, fadingMenuItems]);

  // 테이블 목록에 표시될 주문 그룹화 및 필터링
  const tableOrdersForTableList = useMemo(() => {
    const tables: Record<string, OrderItem[]> = {};
    allOrders.forEach((order) => {
      // 서빙 완료되지 않았거나, 테이블이 페이드 아웃 중인 경우에만 포함
      if (!order.isServed || fadingTableBills[order.table]) {
        //if (!order.isServed) {
        if (!tables[order.table]) {
          tables[order.table] = [];
        }
        tables[order.table].push(order);
      }
    });
    // 각 테이블 내 주문을 시간순으로 정렬 (가장 오래된 주문이 맨 위로)
    Object.keys(tables).forEach((tableName) => {
      tables[tableName].sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
      );
    });
    return tables;
  }, [allOrders, fadingTableBills]);

  // 각 테이블의 가장 빠른 주문 시간을 찾는 함수
  const getEarliestOrderTime = useCallback((orders: OrderItem[]): string => {
    if (orders.length === 0) return "";
    // orders가 이미 시간순으로 정렬되어 있다고 가정
    return orders[0].time;
  }, []);

  return {
    orders: ordersForMenuList,
    tableOrders: tableOrdersForTableList,
    isLoading,
    lastUpdated: lastUpdated.toLocaleTimeString(),
    fetchOrders,
    handleServeOrder,
    getFadingMenuItemStatus: (orderId: number) =>
      fadingMenuItems[String(orderId)] || false,
    getFadingTableBillStatus: (tableName: string) =>
      fadingTableBills[tableName] || false,
    getEarliestOrderTime,
  };
};
