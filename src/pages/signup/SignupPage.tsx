import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./SignupPage.styled";

import UserService from "@services/UserService";

import UserInfoForm from "./_components/userinfoform/UserInfoForm";
import PubInfoForm from "./_components/pubinfoform/PubInfoForm";
import PaymentInfoForm from "./_components/paymentinfoform/PaymentInfoForm";

import { SIGNUP_CONSTANTS } from "./_constants/signupConstants";
import { ROUTE_PATHS } from "@constants/routeConstants";

const enum Step {
  USER = 1,
  PUB = 2,
  PAYMENT = 3,
  COMPLETE = 4,
}

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(Step.USER);
  const [userStage, setUserStage] = useState(1);
  const [pubStage, setPubStage] = useState(1);
  const [paymentStage, setPaymentStage] = useState(1);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    pubName: "",
    tableCount: "",
    tableFee: "",
    tableFeePolicy: "PP",
    accountHolder: "",
    bank: "",
    accountNumber: "",
    confirmPaymentPassword: "",
    confirmPaymentPasswordCheck: "",
  });

  const handleChange = useCallback((key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    try {
      await UserService.postSignup({
        username: formData.userId,
        password: formData.password,
        booth_name: formData.pubName,
        table_num: Number(formData.tableCount),
        order_check_password: formData.confirmPaymentPassword,
        account: Number(formData.accountNumber),
        depositor: formData.accountHolder,
        bank: formData.bank,
        seat_type: formData.tableFeePolicy as "PT" | "PP" | "NO",
        seat_tax_person:
          formData.tableFeePolicy === "PP" ? Number(formData.tableFee) : 0,
        seat_tax_table:
          formData.tableFeePolicy === "PT" ? Number(formData.tableFee) : 0,
      });
      return true;
    } catch (err) {
      return false;
    }
  }, [formData]);

  const goNext = useCallback(() => {
    setStep((prev) => (prev < Step.COMPLETE ? ((prev + 1) as Step) : prev));
  }, []);

  const goBack = useCallback(() => {
    if (step === Step.PAYMENT && paymentStage > 1) {
      if (paymentStage === 3) {
        setFormData((prev) => ({
          ...prev,
          confirmPaymentPasswordCheck: "",
        }));
      }
      setPaymentStage((prev) => prev - 1);
    } else if (step === Step.PUB && pubStage > 1) {
      setPubStage((prev) => prev - 1);
    } else if (step === Step.USER && userStage > 1) {
      if (userStage === 3) {
        setFormData((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
      setUserStage((prev) => prev - 1);
    } else if (step > Step.USER) {
      setStep((prev) => (prev - 1) as Step);
    } else {
      navigate(ROUTE_PATHS.INIT);
    }
  }, [step, userStage, pubStage, paymentStage, navigate]);

  const stepProps = useMemo(
    () => ({
      formData,
      onChange: handleChange,
      onNext: goNext,
      onSubmit: handleSubmit,
      pubStage,
      setPubStage,
      paymentStage,
      setPaymentStage,
      userStage,
      setUserStage,
    }),
    [
      formData,
      handleChange,
      goNext,
      handleSubmit,
      pubStage,
      setPubStage,
      paymentStage,
      setPaymentStage,
      userStage,
      setUserStage,
    ]
  );

  const renderStepComponent = useCallback(() => {
    switch (step) {
      case Step.USER:
        return <UserInfoForm {...stepProps} />;
      case Step.PUB:
        return <PubInfoForm {...stepProps} />;
      case Step.PAYMENT:
        return <PaymentInfoForm {...stepProps} />;
      default:
        return null;
    }
  }, [step, stepProps]);

  const getTitleText = (step: Step) => {
    switch (step) {
      case Step.USER:
        return {
          title: "회원 정보 입력",
          semiTitle: "(1/3)",
        };
      case Step.PUB:
        return {
          title: "주점 정보 입력",
          semiTitle: "(2/3)",
        };
      case Step.PAYMENT:
        return {
          title: "결제 정보 입력",
          semiTitle: "(3/3)",
        };
      default:
        return {
          title: "",
          semiTitle: "",
        };
    }
  };

  const { title, semiTitle } = getTitleText(step);

  return (
    <S.Wrapper>
      <S.BackIMG src={SIGNUP_CONSTANTS.IMAGES.BACKWARD} onClick={goBack} />
      <S.Container>
        <S.ImageBox>
          <S.Image src={SIGNUP_CONSTANTS.IMAGES.LOGO} />
          <S.Image2 src={SIGNUP_CONSTANTS.IMAGES.CHARACTER} />
        </S.ImageBox>
      </S.Container>
      <S.Container2>
        <S.TitleBox>
          <S.Title>{title}</S.Title>
          <S.SemiTitle>{semiTitle}</S.SemiTitle>
        </S.TitleBox>
        {renderStepComponent()}
      </S.Container2>
    </S.Wrapper>
  );
};

export default SignupPage;
