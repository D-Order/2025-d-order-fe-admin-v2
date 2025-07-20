import * as S from './CommonInput.styled';
import React, { useState, useRef } from 'react';

import { SIGNUP_CONSTANTS } from '@pages/signup/_constants/signupConstants';

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  onValueSubmit: (value: string) => void;
  disabled?: boolean;
};

const CommonInput = ({
  label,
  placeholder,
  type = 'text',
  onValueSubmit,
  disabled = false,
}: InputProps) => {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const effectiveType = isPasswordType && showPassword ? 'text' : type;

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onValueSubmit(newValue);
    }, 300);
  };

  return (
    <S.Wrapper>
      {label && <S.Label>{label}</S.Label>}
      <S.InputWrapper>
        <S.StyledInput
          type={effectiveType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
        {isPasswordType && value && (
          <S.Icon
            src={
              showPassword
                ? SIGNUP_CONSTANTS.INPUT_IMAGE.EYESON
                : SIGNUP_CONSTANTS.INPUT_IMAGE.EYESOFF
            }
            onClick={() => setShowPassword((prev) => !prev)}
          />
        )}
      </S.InputWrapper>
    </S.Wrapper>
  );
};

export default CommonInput;
