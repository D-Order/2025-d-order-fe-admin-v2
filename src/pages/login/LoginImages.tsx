import * as S from './LoginPage.styled';
import { LOGIN_CONSTANTS } from './_constants/LoginConstants';
import React from 'react';

const LoginImages = () => {
  return (
    <S.Container>
      <S.ImageBox>
        <S.Image src={LOGIN_CONSTANTS.IMAGES.LOGO} alt="로고" />
        <S.Image2 src={LOGIN_CONSTANTS.IMAGES.CHARACTER} alt="캐릭터" />
      </S.ImageBox>
    </S.Container>
  );
};

export default React.memo(LoginImages);
