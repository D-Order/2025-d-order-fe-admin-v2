import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 380px;
`;

export const Label = styled.div`
  ${({ theme }) => theme.fonts.SemiBold16};
  color: ${({ theme }) => theme.colors.Focused};
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const OptionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const Circle = styled.div<{ $selected: boolean }>`
  width: 26px;
  height: 26px;
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.Orange01 : theme.colors.Black02};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 26px;
`;

export const Dot = styled.div`
  width: 13px;
  height: 13px;
  background-color: ${({ theme }) => theme.colors.Orange01};
  border-radius: 50%;
`;

export const OptionText = styled.div<{ $selected: boolean }>`
  ${({ theme }) => theme.fonts.SemiBold16};
  color: ${({ theme }) => theme.colors.Black01};
`;
