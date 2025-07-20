import * as S from './InitPage.styled';

import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@constants/routeConstants';

import { INIT_CONSTANTS } from './_constants/InitConstants';

const InitPage = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <S.Container>
        <S.ImageBox>
          <S.Image2 src={INIT_CONSTANTS.IMAGES.CHARACTER} />
        </S.ImageBox>
      </S.Container>
      <S.Container2>
        <S.Contain>
          <S.Image src={INIT_CONSTANTS.IMAGES.LOGO2} />
          <S.TitleBox>
            <S.Paragraph>주점 운영 걱정 뚝!</S.Paragraph>
            <S.Paragraph>주문 확인부터 서빙까지,</S.Paragraph>
            <S.Paragraph>D-Order 하나로 스마트하게</S.Paragraph>
          </S.TitleBox>
        </S.Contain>
        <S.Contain2>
          <S.Btn_1 onClick={() => navigate(ROUTE_PATHS.SIGNUP)}>
            처음이에요
          </S.Btn_1>
          <S.Btn_2 onClick={() => navigate(ROUTE_PATHS.LOGIN)}>
            로그인하기
          </S.Btn_2>
        </S.Contain2>
      </S.Container2>
    </S.Wrapper>
  );
};

export default InitPage;
