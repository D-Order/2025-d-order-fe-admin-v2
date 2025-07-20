import styled from "styled-components";

// 테이블별 주문 목록 컴포넌트 스타일
export const TableListWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 31%;
  height: calc(var(--vh, 1vh) * 90);
  border-radius: 10px 0 0 10px;
  background-color: ${({ theme }) => theme.colors.Gray01};

  padding-top: 26px;
  padding-bottom: 10px;
  box-sizing: border-box;
`;

// 테이블 목록 헤더 스타일
export const TableListHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 78%;
  margin-bottom: 20px;

  h2 {
    color: ${({ theme }) => theme.colors.Black01};
    ${({ theme }) => theme.fonts.ExtraBold20};
    margin-bottom: 10px;
    margin-top: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.Black01};
    ${({ theme }) => theme.fonts.Bold16};
    margin: 0;
  }
`;

export const TableListContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 78%;

  /* 스크롤 가능하도록 설정 */
  overflow-y: auto;
  max-height: 100%; /* 적절한 높이로 조정 */

  /* 얇은 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Firefox용 얇은 스크롤바 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
`;

export const NonOrderText = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.Black02};
  ${({ theme }) => theme.fonts.Bold18}
`;
