import styled from 'styled-components';

export const Wrapper = styled.div<{ $disabled?: boolean }>`
  ${({ theme }) => theme.fonts.Bold16};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.Bg};
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.Black02 : theme.colors.Orange01};
  border-radius: 10px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  margin-top: 1rem;
  max-width: 380px;
`;
