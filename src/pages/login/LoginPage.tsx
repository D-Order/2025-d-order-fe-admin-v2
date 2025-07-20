import * as S from "./LoginPage.styled";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_CONSTANTS } from "./_constants/LoginConstants";
import { ROUTE_PATHS } from "@constants/routeConstants";

import CommonInput from "./_components/inputs/CommonInput";
import NextButton from "./_components/buttons/NextButton";
import LoginImages from "./LoginImages";

import UserService from "@services/UserService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await UserService.login(formData);

      const accessToken = response.data.access_token;
      const managerId = response.data.manager_id;

      if (!accessToken || !managerId) {
        throw new Error("로그인 응답이 올바르지 않습니다.");
      }

      localStorage.setItem("accessToken", accessToken);

      navigate(ROUTE_PATHS.HOME);
    } catch (err) {
      alert("로그인 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <S.Wrapper>
      <S.BackIMG
        src={LOGIN_CONSTANTS.IMAGES.BACKWARD}
        onClick={() => navigate(ROUTE_PATHS.INIT)}
      />
      <LoginImages />
      <S.Container2>
        <S.TitleBox>
          <S.Title>로그인하기</S.Title>
        </S.TitleBox>
        <CommonInput
          label="아이디"
          placeholder="아이디를 입력하세요"
          onValueSubmit={(val) =>
            setFormData((prev) => ({ ...prev, username: val }))
          }
        />
        <CommonInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onValueSubmit={(val) =>
            setFormData((prev) => ({ ...prev, password: val }))
          }
        />
        <S.Cover>
          <NextButton
            onClick={handleLogin}
            disabled={!formData.username || !formData.password}
          >
            로그인
          </NextButton>
        </S.Cover>
      </S.Container2>
    </S.Wrapper>
  );
};

export default LoginPage;
