import styled, { css } from "styled-components";

export const CardWrapper = styled.div<{ $isOverdue: boolean }>`
  background-color: ${({ theme, $isOverdue }) =>
    $isOverdue ? theme.colors.Point : theme.colors.Gray01};  
  color: ${({ theme }) => theme.colors.Black01};
  width: 8.5rem;
  height: 11.5rem;
  
  @media (min-width: 1180px) {
    width: 10rem;
    height: 12.2rem;
  }

  @media (min-width: 1366px) {
    width: 12.4rem;
    height: 16.2rem;
  }

  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.Gray01};
  padding: 0.8rem 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  img {
    width: 100%;
  }
`;


export const TableInfo = styled.div<{ $isOverdue: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
  .tableNumber {
    font-size: 0.8rem;
    font-weight: 700;
    ${({ theme }) => css(theme.fonts.Bold14)};
    @media (min-width: 1180px) {
      font-size: 1rem;
    }
    @media (min-width: 1366px) {
      font-size: 1.2rem;
    }
    
  }
  .orderTime {
    font-size: 0.6rem;
    font-weight: 600;
    color: ${({ theme, $isOverdue }) =>
    $isOverdue ? theme.colors.Orange01 : theme.colors.Black01};  ;
    ${({ theme }) => css(theme.fonts.SemiBold12)};
    @media (min-width: 1180px) {
      font-size: 0.8rem;
    }
    @media (min-width: 1366px) {
      font-size: 0.9rem;
    }
    
  }
`;

export const DivideLine = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: rgba(192, 192, 192, 0.50);
  border-bottom: 1px solid #c0c0c0;
`;

export const MenuList = styled.div`
  width: 100%;
  min-height: 7.9rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  img {
    width: 100%;
  }
  
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
  .menuName {
    font-size: 0.75rem;
    ${({ theme }) => css(theme.fonts.Bold12)};
    @media (min-width: 1180px) {
      font-size: 0.8rem;
    }
    @media (min-width: 1366px) {
      font-size: 0.9rem;
    }
  }
  .menuAmount {
    font-size: 0.75rem;
    ${({ theme }) => css(theme.fonts.Medium12)};
    font-weight: 500;
    @media (min-width: 1180px) {
      font-size: 0.8rem;
    }
    @media (min-width: 1366px) {
      font-size: 0.9rem;
    }
  }
`;

export const ToDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.Orange01};
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.4rem 0 0 0;
  ${({ theme }) => css(theme.fonts.SemiBold10)};
  @media (min-width: 1180px) {
      font-size: 0.7rem;
    }
    @media (min-width: 1366px) {
      font-size: 0.8rem;
    }
`;

export const TotalPrice = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: absolute;
  bottom: 0.8rem;
  .totalPrice {
    margin-left: 0.7rem;
    font-size: 0.75rem;
    font-weight: 700;
    ${({ theme }) => css(theme.fonts.Bold12)};
    @media (min-width: 1180px) {
      font-size: 0.8rem;
    }
    @media (min-width: 1366px) {
      font-size: 0.9rem;
    }
  }
`;

// grid style

export const GridWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  gap: 0.55rem;
  box-sizing: border-box;
`;

export const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);  // ✅ 가로 5개 고정
  grid-template-rows: repeat(3, 1fr);     // ✅ 세로 3줄 고정
  gap: 1rem;

  // ✅ 모든 반응형 조건에서 동일한 레이아웃 유지
  @media (max-width: 1367px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1.6rem;
  }

  @media (max-width: 1180px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1.4rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
  }
`;


export const PageIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

export const Dot = styled.div<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "1.6rem" : "0.6rem")};
  height: 0.6rem;
  border-radius: 0.3rem;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.Orange01 : theme.colors.Gray01};
  transition: all 0.3s ease;
`;
