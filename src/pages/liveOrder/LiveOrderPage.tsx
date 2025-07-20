import * as S from "./LiveOrderPage.styled";
import { useState, useEffect, useCallback } from "react";
import LiveOrderMenuList from "./_components/menuList/LiveOrderMenuList";
import LiveOrderTableList from "./_components/tableList/LiveOrderTableList";

import LiveOrderService, { Order, OrderItem } from "./api/LiveOrderService";

// API 응답 데이터를 UI 형식으로 변환하는 함수
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

const LiveOrderPage = () => {
  // API 데이터로 주문 상태 관리
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // 마지막 갱신 시간 포맷팅
  const lastUpdatedString = lastUpdated.toLocaleTimeString();

  // 주문 목록 데이터 가져오기 (useCallback으로 메모이제이션)
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await LiveOrderService.getOrders();
      const convertedOrders = convertApiDataToUiFormat(response.data.orders);
      setOrders(convertedOrders);
      setLastUpdated(new Date());
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 컴포넌트 마운트 시 최초 1회만 API 호출
  useEffect(() => {
    fetchOrders();
    // 자동 새로고침을 위한 인터벌 설정 제거 - 사용자의 요청에 따라 수동 새로고침만 허용
  }, [fetchOrders]);

  // 주문 상태 업데이트 핸들러
  const handleOrderStatusChange = async (index: number) => {
    try {
      const orderToUpdate = orders[index];

      if (!orderToUpdate || !orderToUpdate.id) {
        return;
      }

      // API 호출로 주문 상태 업데이트
      await LiveOrderService.updateOrderStatus(orderToUpdate.id);

      // UI 업데이트
      const updatedOrders = [...orders];
      updatedOrders[index].isServed = true;
      setOrders(updatedOrders);
    } catch (error) {}
  };

  // 수동 새로고침 핸들러 - 사용자가 '최신 주문 확인' 버튼 클릭 시 호출
  const handleRefresh = () => {
    fetchOrders();
  };

  return (
    <S.LiveOrderPageWrapper>
      {isLoading && orders.length === 0 ? (
        <div>주문 데이터를 불러오는 중...</div>
      ) : (
        <>
          <LiveOrderMenuList
            orders={orders}
            onOrderStatusChange={handleOrderStatusChange}
            isLoading={isLoading}
            onRefresh={handleRefresh}
            lastUpdateTime={lastUpdatedString}
          />

          <LiveOrderTableList
            orders={orders}
            setOrders={setOrders}
            isLoading={isLoading}
          />
        </>
      )}
    </S.LiveOrderPageWrapper>
  );
};

export default LiveOrderPage;
