import * as S from "./UserInfoForm.styled";
import { instance } from "@services/instance";
import { useState, useEffect, useCallback } from "react";
import CommonInput from "../inputs/CommonInput";
import NextButton from "../buttons/NextButton";

const isValidIdFormat = (id: string) => /^[a-z0-9]{6,12}$/.test(id);
const isValidPasswordFormat = (pw: string) =>
  /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{4,20}$/.test(pw);

const checkDuplicateId = async (id: string): Promise<boolean> => {
  try {
    const response = await instance.get("/api/manager/check/", {
      params: { username: id },
    });
    return response.data.data.is_available;
  } catch (error) {
    throw error;
  }
};

type Props = {
  formData: {
    userId: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (key: keyof Props["formData"], value: string) => void;
  onNext: () => void;
  userStage: number;
  setUserStage: React.Dispatch<React.SetStateAction<number>>;
};

const UserInfoForm = ({
  formData,
  onChange,
  onNext,
  userStage,
  setUserStage,
}: Props) => {
  const { userId, password, confirmPassword } = formData;

  const [idError, setIdError] = useState<string | null>(null);
  const [idSuccess, setIdSuccess] = useState<string | null>(null);

  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);

  const [confirmPwError, setConfirmPwError] = useState<string | null>(null);
  const [confirmPwSuccess, setConfirmPwSuccess] = useState<string | null>(null);

  const isValid =
    (userStage === 1 && !!idSuccess) ||
    (userStage === 2 && !!pwSuccess) ||
    (userStage === 3 && !!confirmPwSuccess);

  const handleNextStep = useCallback(() => {
    if (userStage === 1) {
      setUserStage(2);
      setIdSuccess(null);
    } else if (userStage === 2) {
      setUserStage(3);
      setPwSuccess(null);
    } else if (userStage === 3) {
      onNext();
    }
  }, [userStage, onNext, setUserStage]);

  const handleIdCheck = useCallback(
    async (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setIdError(null);
        setIdSuccess(null);

        if (!userId) {
          setIdError("아이디를 입력해 주세요.");
          return;
        }

        if (!isValidIdFormat(userId)) {
          setIdError("6~12자 이내의 영문 소문자, 숫자를 입력해 주세요.");
          return;
        }

        try {
          const available = await checkDuplicateId(userId);
          if (available) {
            setIdSuccess("사용 가능한 아이디예요.");
          } else {
            setIdError("이미 존재하는 아이디예요.");
          }
        } catch {
          setIdError("중복 확인 중 오류가 발생했습니다.");
        }
      }
    },
    [userId]
  );

  const handlePasswordCheck = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setPwError(null);
        setPwSuccess(null);

        if (!password) {
          setPwError("비밀번호를 입력해 주세요.");
          return;
        }

        if (!isValidPasswordFormat(password)) {
          setPwError("4~20자 이내의 영문, 숫자, 특수문자를 입력해 주세요.");
          return;
        }

        setPwSuccess("사용 가능한 비밀번호예요.");
      }
    },
    [password]
  );

  const handleConfirmPasswordCheck = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setConfirmPwError(null);
        setConfirmPwSuccess(null);

        if (!confirmPassword) {
          setConfirmPwError("비밀번호 확인을 입력해 주세요.");
          return;
        }

        if (password !== confirmPassword) {
          setConfirmPwError("비밀번호가 일치하지 않아요.");
          return;
        }

        setConfirmPwSuccess("비밀번호가 일치해요.");
      }
    },
    [password, confirmPassword]
  );

  useEffect(() => {
    setConfirmPwError(null);
    setConfirmPwSuccess(null);
  }, [userStage]);

  return (
    <S.Wrapper>
      <CommonInput
        label="아이디"
        placeholder="예) dorder2025"
        value={userId}
        onChange={(e) => {
          onChange("userId", e.target.value);
          setIdError(null);
          setIdSuccess(null);
        }}
        onKeyDown={handleIdCheck}
        error={idError ?? undefined}
        success={idSuccess ?? undefined}
        helperText="6~12자 이내의 영문 소문자, 숫자를 입력해 주세요."
        onClear={() => {
          onChange("userId", "");
          setIdError(null);
          setIdSuccess(null);
        }}
        isVisible={userStage >= 1}
        disabled={userStage !== 1}
      />

      <CommonInput
        label="비밀번호"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => {
          onChange("password", e.target.value);
          setPwError(null);
          setPwSuccess(null);
        }}
        onKeyDown={handlePasswordCheck}
        error={pwError ?? undefined}
        success={pwSuccess ?? undefined}
        helperText="4~20자 이내의 영문, 숫자, 특수문자를 입력해 주세요."
        onClear={() => {
          onChange("password", "");
          setPwError(null);
          setPwSuccess(null);
        }}
        isVisible={userStage >= 2}
        disabled={userStage !== 2}
      />

      <CommonInput
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          onChange("confirmPassword", e.target.value);
          setConfirmPwError(null);
          setConfirmPwSuccess(null);
        }}
        onKeyDown={handleConfirmPasswordCheck}
        error={confirmPwError ?? undefined}
        success={confirmPwSuccess ?? undefined}
        helperText="비밀번호를 동일하게 입력해 주세요."
        onClear={() => {
          onChange("confirmPassword", "");
          setConfirmPwError(null);
          setConfirmPwSuccess(null);
        }}
        isVisible={userStage >= 3}
        forceShowPasswordWhenSuccess
        disabled={userStage !== 3}
      />

      <NextButton onClick={handleNextStep} disabled={!isValid}>
        다음
      </NextButton>
    </S.Wrapper>
  );
};

export default UserInfoForm;
