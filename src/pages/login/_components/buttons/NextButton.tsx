import * as S from './NextButton.styled';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const NextButton = ({ children, onClick, disabled = false }: Props) => {
  return (
    <S.Wrapper onClick={onClick} $disabled={disabled}>
      {children}
    </S.Wrapper>
  );
};

export default NextButton;
