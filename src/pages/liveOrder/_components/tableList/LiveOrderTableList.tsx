import * as S from "./LiveOrderTableList.styled";
import TableBill from "./TableBill";

import { OrderItem } from "../../api/LiveOrderService";
import {
  useMemo,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import LiveOrderService from "../../api/LiveOrderService";

interface LiveOrderTableListProps {
  orders: OrderItem[];
  setOrders: Dispatch<SetStateAction<OrderItem[]>>;
  isLoading?: boolean;
}

// 페이드아웃 애니메이션을 위한 스타일드 컴포넌트
const FadeoutTable = styled.div<{ $isFading: boolean }>`
  opacity: ${({ $isFading }) => ($isFading ? 0 : 1)};
  transform: ${({ $isFading }) =>
    $isFading ? "translateY(20px)" : "translateY(0)"};
  transition: opacity 1.8s ease, transform 1.8s ease;
  width: 100%;
  margin-bottom: 20px;
`;

const LiveOrderTableList = ({
  orders,
  setOrders,
  isLoading = false,
}: LiveOrderTableListProps) => {
  // 테이블별로 주문 항목을 그룹화합니다
  const tableOrders = useMemo(() => {
    const tables: Record<string, OrderItem[]> = {};

    orders.forEach((order) => {
      if (!tables[order.table]) {
        tables[order.table] = [];
      }
      tables[order.table].push(order);
    });

    return tables;
  }, [orders]);

  // 사라지는 테이블을 추적하는 상태
  const [fadingTables, setFadingTables] = useState<Record<string, boolean>>({});
  // 이전 테이블 상태를 저장
  const prevTableOrdersRef = useRef<Record<string, OrderItem[]>>({});

  // orders가 변경될 때마다 테이블 완료 상태 확인
  useEffect(() => {
    const prevTableOrders = prevTableOrdersRef.current;

    // 각 테이블의 완료 상태 확인 및 페이드아웃 처리
    Object.entries(tableOrders).forEach(([tableName, currentOrders]) => {
      const isCurrentlyCompleted = currentOrders.every(
        (order) => order.isServed
      );

      // 이전에 없었거나, 완료되지 않았던 테이블이 현재 완료 상태인 경우
      const prevOrders = prevTableOrders[tableName] || [];
      const wasCompletedBefore =
        prevOrders.length > 0 && prevOrders.every((order) => order.isServed);

      if (
        isCurrentlyCompleted &&
        !wasCompletedBefore &&
        !fadingTables[tableName]
      ) {
        // 페이드아웃 시작
        setFadingTables((prev) => ({ ...prev, [tableName]: true }));

        // 2초 후 페이드아웃 완료
        setTimeout(() => {
          setFadingTables((prev) => {
            const updated = { ...prev };
            delete updated[tableName];
            return updated;
          });
        }, 2000);
      }
    });

    // 현재 테이블 상태 저장
    prevTableOrdersRef.current = { ...tableOrders };
  }, [tableOrders]);

  // 각 테이블의 가장 빠른 주문 시간을 찾습니다
  const getEarliestOrderTime = (orders: OrderItem[]): string => {
    if (orders.length === 0) return "";
    return orders[0].time; // 이미 시간순으로 정렬되어 있다고 가정합니다
  };

  // 주문 상태 변경 핸들러
  const handleOrderStatusChange = async (
    tableIndex: string,
    menuIndex: number
  ) => {
    try {
      // 해당 테이블의 주문 목록 가져오기
      const tableOrdersList = tableOrders[tableIndex] || [];

      // 유효한 메뉴 인덱스인지 확인
      if (menuIndex < 0 || menuIndex >= tableOrdersList.length) {
        return;
      }

      const orderToUpdate = tableOrdersList[menuIndex];

      // 주문 ID 확인
      if (!orderToUpdate || !orderToUpdate.id) {
        return;
      }

      // 이미 서빙 완료된 메뉴인지 확인
      if (orderToUpdate.isServed) {
        return;
      }

      // API 호출로 주문 상태 업데이트
      await LiveOrderService.updateOrderStatus(orderToUpdate.id);

      // UI 업데이트
      setOrders((prevOrders) => {
        const updatedOrders = [...prevOrders];
        const orderIndex = updatedOrders.findIndex(
          (order) => order.id === orderToUpdate.id
        );

        if (orderIndex !== -1) {
          updatedOrders[orderIndex].isServed = true;
        }

        return updatedOrders;
      });

      // 테이블의 모든 주문이 서빙완료되었는지 확인
      const updatedTableOrders = [...tableOrdersList];
      updatedTableOrders[menuIndex].isServed = true;

      const isTableCompleted = updatedTableOrders.every(
        (order) => order.isServed
      );

      // 테이블의 모든 주문이 서빙완료되었고, 아직 페이드아웃 중이 아니라면 페이드아웃 시작
      if (isTableCompleted && !fadingTables[tableIndex]) {
        setFadingTables((prev) => ({ ...prev, [tableIndex]: true }));

        // 2초 후 페이드아웃 완료
        setTimeout(() => {
          setFadingTables((prev) => {
            const updated = { ...prev };
            delete updated[tableIndex];
            return updated;
          });
        }, 2000);
      }
    } catch (error) {}
  };

  // 테이블의 모든 메뉴가 서빙완료되었는지 확인하는 함수
  const isTableCompleted = (orders: OrderItem[]): boolean => {
    return orders.every((order) => order.isServed);
  };

  return (
    <S.TableListWrapper>
      <S.TableListContents>
        {isLoading && Object.keys(tableOrders).length === 0 ? (
          <S.NonOrderText>테이블 데이터를 불러오는 중...</S.NonOrderText>
        ) : Object.keys(tableOrders).length === 0 ? (
          <S.NonOrderText>현재 주문 중인 테이블이 없습니다.</S.NonOrderText>
        ) : (
          Object.entries(tableOrders).map(([tableName, tableItems]) => {
            const isCompleted = isTableCompleted(tableItems);

            // 완료된 테이블 중 페이드아웃 중인 항목 또는 완료되지 않은 테이블만 표시
            return (
              (!isCompleted || fadingTables[tableName]) && (
                <FadeoutTable
                  key={tableName}
                  $isFading={fadingTables[tableName] || false}
                >
                  <TableBill
                    tableNumber={tableName}
                    orderTime={getEarliestOrderTime(tableItems)}
                    orderItems={tableItems}
                    onOrderStatusChange={handleOrderStatusChange}
                  />
                </FadeoutTable>
              )
            );
          })
        )}
      </S.TableListContents>
    </S.TableListWrapper>
  );
};

export default LiveOrderTableList;
