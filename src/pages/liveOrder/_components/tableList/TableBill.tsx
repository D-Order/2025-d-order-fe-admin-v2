import styled, { keyframes, css } from "styled-components";
import { IMAGE_CONSTANTS } from "@constants/imageConstants";
import { useState, useEffect } from "react";

import TableBillItem from "./TableBillItem";
import { OrderItem } from "../../api/LiveOrderService";

interface TableBillProps {
  tableNumber: string;
  orderTime: string;
  orderItems: OrderItem[];
  onOrderStatusChange?: (tableIndex: string, menuIndex: number) => void;
}

// 페이드 애니메이션 정의
const fadeEffect = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const TableBill = ({
  tableNumber,
  orderTime,
  orderItems,
  onOrderStatusChange,
}: TableBillProps) => {
  // 모든 메뉴가 서빙완료인지 확인
  const isAllServed = orderItems.every((item) => item.isServed);

  // 애니메이션 효과를 위한 상태
  const [isAnimating, setIsAnimating] = useState(false);

  // 모든 메뉴가 서빙완료되면 애니메이션 시작
  useEffect(() => {
    if (isAllServed && orderItems.length > 0) {
      setIsAnimating(true);
    }
  }, [isAllServed, orderItems.length]);

  // 주문 상태 변경 핸들러
  const handleOrderStatusChange = (tableId: string, menuIndex: number) => {
    if (onOrderStatusChange) {
      try {
        onOrderStatusChange(tableId, menuIndex);
      } catch (error) {}
    }
  };

  return (
    <TableBillWrapper $isAnimating={isAnimating}>
      <TableBillContents $isAnimating={isAnimating}>
        {/* 테이블번호,테이블첫주문시간 */}
        <TableBillHeader>
          <TableHeaderText>{tableNumber}</TableHeaderText>
          <TableHeaderText className="orderTime">{orderTime}</TableHeaderText>
        </TableBillHeader>

        {/* 주문내역 컴포넌트*/}
        <TableBillItemWrapper>
          <TableBillItem
            orderItems={orderItems}
            onOrderStatusChange={handleOrderStatusChange}
          />
        </TableBillItemWrapper>
      </TableBillContents>
      <TableBillBottom src={IMAGE_CONSTANTS.BILL} $isAnimating={isAnimating} />
    </TableBillWrapper>
  );
};

export default TableBill;

const TableBillWrapper = styled.div<{ $isAnimating: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ${({ $isAnimating }) =>
    $isAnimating
      ? css`
          ${fadeEffect} 2s ease forwards
        `
      : "none"};
`;

const TableBillContents = styled.div<{ $isAnimating: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 190px;
  padding: 17px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.Bg};

  /* 상단 모서리만 둥글게 */
  border-radius: 13px 13px 0 0;

  /* 이미지와 겹치는 부분 처리 */
  position: relative;
  z-index: 1;

  transition: transform 1.8s ease, opacity 1.8s ease;
  transform: ${({ $isAnimating }) =>
    $isAnimating ? "translateY(10px)" : "translateY(0)"};
  opacity: ${({ $isAnimating }) => ($isAnimating ? 0.5 : 1)};
`;

const TableBillBottom = styled.img<{ $isAnimating: boolean }>`
  display: block;
  width: 100%;
  margin-top: -5px; /* 겹치는 부분 조정 */
  position: relative;
  z-index: 0;

  transition: transform 1.8s ease, opacity 1.8s ease;
  transform: ${({ $isAnimating }) =>
    $isAnimating ? "translateY(10px)" : "translateY(0)"};
  opacity: ${({ $isAnimating }) => ($isAnimating ? 0.5 : 1)};
`;

const TableBillHeader = styled.div`
  display: flex;
  width: 100%;
  height: 27px;
  justify-content: space-between;

  border-bottom: 1px solid;
  border-color: rgba(192, 192, 192, 0.5);
`;

const TableHeaderText = styled.div`
  color: ${({ theme }) => theme.colors.Black};
  ${({ theme }) => theme.fonts.Bold14};

  &.orderTime {
    color: ${({ theme }) => theme.colors.Focused};
    ${({ theme }) => theme.fonts.SemiBold14};
  }
`;

const TableBillItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  gap: 17px;
  padding-top: 17px;
`;
