// _modal/CancelConfirmModal.tsx
import styled, { css } from 'styled-components';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const CancelConfirmModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <Overlay>
      <Modal>
        <TextWrapper>
          <p>정말 취소하시겠어요?</p>
          <p className="grayText">주문 취소 후, 
            <br></br>
            손님에게 직접 계좌로 환불해주셔야 해요.
          </p>
        </TextWrapper>
        <ButtonRow>
                    <ButtonContainer1>
                        <button onClick={onCancel}>취소</button>
                    </ButtonContainer1>
                    <ButtonContainer2>
                        <button onClick={onConfirm}>주문 취소</button>
                    </ButtonContainer2>
                </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default CancelConfirmModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 요소 위에 오도록 */
`;

const Modal = styled.div`
  position: fixed;
  top: 30%;
  /* left: 50%; */
  min-width: 24rem;
  min-height: 13rem;
  background: white;
  border-radius: 1rem;
  text-align: center;
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 2.5rem 0 2.2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors.Black02};
  ${({ theme }) => css(theme.fonts.Bold20)};
  .grayText{
    line-height: 23px;
    color: ${({theme}) => theme.colors.Black02};
    ${({ theme }) => css(theme.fonts.SemiBold14)};
  }
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 3.5rem;
`;
    

const ButtonContainer1 = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({theme}) => theme.colors.Orange01};
    border-right: 1px solid ${({theme}) => theme.colors.Black02};
    button {
        color: ${({theme}) => theme.colors.Orange01};
        ${({ theme }) => css(theme.fonts.Medium16)};
    }
`;

const ButtonContainer2 = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({theme}) => theme.colors.Orange01};
    button {
        color: ${({theme}) => theme.colors.Orange01};
        ${({ theme }) => css(theme.fonts.Bold16)};
    }
`;
