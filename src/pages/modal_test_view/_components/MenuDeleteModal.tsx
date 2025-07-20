import styled from "styled-components";

const MenuDeleteModal = ({
  onCancel,
  onDelete,
}: {
  onCancel: () => void;
  onDelete: () => void;
}) => {
  return (
    <Overlay onClick={onCancel}>
      <Container onClick={(e) => e.stopPropagation()}>
        <TextWrapper>
          <Title>정말 메뉴를 삭제하시겠어요?</Title>
          <SubTitle>메뉴를 삭제하면, </SubTitle>
          <SubTitle>손님에게 노출 중이던 메뉴 리스트에서도 삭제돼요.</SubTitle>
        </TextWrapper>

        <Bottom>
          <Cancel onClick={onCancel}>취소</Cancel>
          <Logout onClick={onDelete}>메뉴삭제</Logout>
        </Bottom>
      </Container>
    </Overlay>
  );
};

export default MenuDeleteModal;

const Overlay = styled.section`
  position: fixed;
  top: 0;
  left: 0%;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 23.75rem;
  /* height: 9.75rem; */
  background-color: ${({ theme }) => theme.colors.Gray01};
  border-radius: 0.875rem;
  z-index: 1000;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;

  margin-top: 42px;
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 6.375rem; */
  ${({ theme }) => theme.fonts.Bold20}

  margin-bottom: 15px;
`;
const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.Focused};
  ${({ theme }) => theme.fonts.SemiBold14};
`;
const Bottom = styled.div`
  display: flex;
  height: 3.375rem;
  border-top: 0.5px solid ${({ theme }) => theme.colors.Black02};
`;

const Cancel = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.Orange01};
  ${({ theme }) => theme.fonts.Medium16};
  border-right: 0.5px solid ${({ theme }) => theme.colors.Black02};
`;

const Logout = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.Orange01};
  ${({ theme }) => theme.fonts.Medium16};
`;
