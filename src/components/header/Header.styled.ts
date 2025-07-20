import styled, { keyframes } from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;

  position: fixed;
  z-index: 15;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 63px;

  padding: 0 24px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.Bg};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.02);
`;

export const BoothName = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.ExtraBold20}
  color: ${({ theme }) => theme.colors.Black01};
`;

export const SalesInfoWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  text-align: center;
  gap: 15px;
`;

export const SalesInfoText = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  ${({ theme }) => theme.fonts.Bold18}
  color: ${({ theme }) => theme.colors.Black01};

  text-align: center;
  align-items: center;
`;

export const TotalSales = styled.div`
  ${({ theme }) => theme.fonts.ExtraBold18}
  color: ${({ theme }) => theme.colors.Orange01};
`;

// 회전 애니메이션 정의
const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

// ReloadButton 스타일 수정
export const ReloadButton = styled.button`
  display: flex;
  align-items: center;
  background: none; // 배경 제거
  border: none; // 테두리 제거
  cursor: pointer; // 커서 변경

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

// 아이콘 이미지 스타일
export const ReloadIcon = styled.img`
  width: 20px;
  height: 20px;

  // 회전 애니메이션 적용
  &.rotating {
    animation: ${rotate} 1s linear; // 애니메이션 적용
  }
`;
