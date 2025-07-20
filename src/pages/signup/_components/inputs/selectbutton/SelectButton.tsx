import * as S from './SelectButton.styled';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const SelectBoxInput = ({ label, options, value, onChange }: Props) => {
  return (
    <S.Wrapper>
      <S.Label>{label}</S.Label>
      <S.OptionList>
        {options.map((option) => (
          <S.OptionItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            <S.Circle $selected={value === option.value}>
              {value === option.value && <S.Dot />}
            </S.Circle>
            <S.OptionText $selected={value === option.value}>
              {option.label}
            </S.OptionText>
          </S.OptionItem>
        ))}
      </S.OptionList>
    </S.Wrapper>
  );
};

export default SelectBoxInput;
