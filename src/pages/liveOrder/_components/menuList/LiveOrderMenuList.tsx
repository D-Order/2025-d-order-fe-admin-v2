import * as S from "./LiveOrderMenuList.styled";
import { IMAGE_CONSTANTS } from "@constants/imageConstants";
import { OrderItem } from "../../api/LiveOrderService";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import MenuListItem from "./MenuListItem";

interface LiveOrderMenuListProps {
  orders: OrderItem[];
  onOrderStatusChange: (index: number) => void;
  isLoading?: boolean;
  onRefresh?: () => void;
  lastUpdateTime?: string;
}

// 페이드아웃 애니메이션을 위한 스타일드 컴포넌트
const FadeoutItem = styled.div<{ $isFading: boolean }>`
  opacity: ${({ $isFading }) => ($isFading ? 0 : 1)};
  transform: ${({ $isFading }) =>
    $isFading ? "translateY(10px)" : "translateY(0)"};
  transition: opacity 1.8s ease, transform 1.8s ease;
  width: 100%;
`;

// 버튼 클릭 애니메이션을 위한 스타일드 컴포넌트
const AnimatedButton = styled(S.HeaderReloadButton)<{ $isAnimating: boolean }>`
  transform: ${({ $isAnimating }) =>
    $isAnimating ? "scale(1.1)" : "scale(1)"};
  transition: transform 0.3s ease;

  /* 기존의 active 애니메이션 비활성화 */
  &:active {
    animation: none;
  }
`;

const LiveOrderMenuList = ({
  orders,
  onOrderStatusChange,
  isLoading = false,
  onRefresh,
  lastUpdateTime,
}: LiveOrderMenuListProps) => {
  // 사라지는 항목을 추적하는 상태
  const [hidingItems, setHidingItems] = useState<Record<string, boolean>>({});
  // 페이드아웃 효과를 위한 상태
  const [fadingItems, setFadingItems] = useState<Record<string, boolean>>({});
  // 이전 orders 참조를 저장
  const prevOrdersRef = useRef<OrderItem[]>([]);
  // 버튼 애니메이션 상태
  const [isAnimating, setIsAnimating] = useState(false);

  // 주문 상태 변경 처리 함수
  const handleOrderStatusChange = (index: number) => {
    const order = orders[index];
    if (!order || !order.id) {
      return;
    }

    // 기존 onOrderStatusChange 호출하여 전역 상태 업데이트
    onOrderStatusChange(index);

    // 현재 주문을 위한 페이드아웃 및 숨김 처리 (ID 기반으로 변경)
    const orderId = String(order.id);
    setHidingItems((prev) => ({ ...prev, [orderId]: true }));

    // 페이드아웃 효과 시작 (즉시)
    setFadingItems((prev) => ({ ...prev, [orderId]: true }));

    // 애니메이션 완료 후 항목 제거 (2초 후)
    setTimeout(() => {
      setHidingItems((prev) => {
        const updated = { ...prev };
        delete updated[orderId]; // 타이머 완료 후 추적 상태에서 제거
        return updated;
      });
      setFadingItems((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
    }, 2000);
  };

  // orders가 변경될 때마다 새로 서빙완료된 항목과 이전 상태 비교
  useEffect(() => {
    const prevOrders = prevOrdersRef.current;

    // 새로 서빙완료된 항목 찾기 (이전에는 서빙완료가 아니었지만 지금은 서빙완료인 항목)
    orders.forEach((order) => {
      if (!order.id) return; // ID가 없는 주문은 처리하지 않음

      const orderId = String(order.id);
      // 이전 주문 찾기
      const prevOrder = prevOrders.find((prev) => prev.id === order.id);

      if (order.isServed && prevOrder && !prevOrder.isServed) {
        // 새로 서빙완료된 항목을 hidingItems에 추가
        setHidingItems((prev) => ({ ...prev, [orderId]: true }));

        // 페이드아웃 효과 시작
        setFadingItems((prev) => ({ ...prev, [orderId]: true }));

        // 2초 후에 제거
        setTimeout(() => {
          setHidingItems((prev) => {
            const updated = { ...prev };
            delete updated[orderId];
            return updated;
          });
          setFadingItems((prev) => {
            const updated = { ...prev };
            delete updated[orderId];
            return updated;
          });
        }, 2000);
      }
    });

    // 현재 orders를 ref에 저장하여 다음 업데이트 시 비교 가능하도록 함
    prevOrdersRef.current = [...orders];
  }, [orders]);

  // 수동 새로고침 처리 함수 - 애니메이션 추가
  const handleRefresh = () => {
    if (isAnimating) return; // 이미 애니메이션 중이면 실행 방지

    setIsAnimating(true);

    // 애니메이션 종료 후 실제 새로고침 실행 (300ms 애니메이션 후)
    setTimeout(() => {
      if (onRefresh) {
        onRefresh();
      } else {
        window.location.reload();
      }
      // 애니메이션 상태 초기화
      setIsAnimating(false);
    }, 300);
  };

  const categories = [
    { label: "주문시각", flex: 1 },
    { label: "테이블", flex: 1 },
    { label: "메뉴", flex: 2 },
    { label: "수량", flex: 1 },
    { label: "상태", flex: 1 },
  ];

  return (
    <S.LiveOrderMenuList>
      <S.LiveOrderMenuListHeader>
        <div>
          <S.HeaderTitle>실시간 주문</S.HeaderTitle>
          {lastUpdateTime && (
            <S.LastUpdateTime>마지막 갱신: {lastUpdateTime}</S.LastUpdateTime>
          )}
        </div>
        <AnimatedButton onClick={handleRefresh} $isAnimating={isAnimating}>
          <img src={IMAGE_CONSTANTS.RELOADWHITE} alt="reloadWhite" />
          최신 주문 확인
        </AnimatedButton>
      </S.LiveOrderMenuListHeader>
      {/* 실시간주문카테고리 */}
      <S.MenuListCategory>
        {categories.map((category, index) => (
          <S.MenuListCategoryText key={index} style={{ flex: category.flex }}>
            {category.label}
          </S.MenuListCategoryText>
        ))}
      </S.MenuListCategory>
      {/* 실시간주문 실제 메뉴 리스트 - 스크롤 가능한 컨테이너로 감싸기 */}
      <S.ScrollableMenuContainer>
        {isLoading && orders.length === 0 ? (
          <S.NonOrderText>주문 데이터를 불러오는 중...</S.NonOrderText>
        ) : orders.length === 0 ? (
          <S.NonOrderText>주문 내역이 없습니다.</S.NonOrderText>
        ) : (
          orders.map((order, index) => {
            const orderId = order.id ? String(order.id) : "";

            return (
              (!order.isServed || hidingItems[orderId]) && (
                <FadeoutItem
                  key={orderId || index}
                  $isFading={fadingItems[orderId] || false}
                >
                  <MenuListItem
                    time={order.time}
                    table={order.table}
                    menu={order.menu}
                    quantity={order.quantity}
                    isServed={order.isServed}
                    imageUrl={order.imageUrl}
                    onServe={() => handleOrderStatusChange(index)}
                  />
                </FadeoutItem>
              )
            );
          })
        )}
      </S.ScrollableMenuContainer>
    </S.LiveOrderMenuList>
  );
};

export default LiveOrderMenuList;
