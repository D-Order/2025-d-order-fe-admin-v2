import * as S from './PaymentInfoForm.styled';
import { useState, useEffect, useCallback } from 'react';
import CommonInput from '../inputs/CommonInput';
import NextButton from '../buttons/NextButton';
import SignupComplete from '../modals/signupcomplete/SignupComplete';
import CommonDropdown from '../inputs/dropdown/CommonDropdown';

type Props = {
  formData: {
    accountHolder: string;
    bank: string;
    accountNumber: string;
    confirmPaymentPassword: string;
    confirmPaymentPasswordCheck: string;
  };
  onChange: (key: keyof Props['formData'], value: string) => void;
  onNext: () => void;
  onSubmit: () => Promise<boolean>;
  paymentStage: number;
  setPaymentStage: React.Dispatch<React.SetStateAction<number>>;
};

const isValidAccountNumber = (value: string) => /^\d{8,14}$/.test(value);
const isValidPassword = (value: string) => /^\d{4}$/.test(value);

const PaymentInfoForm = ({
  formData,
  onChange,
  onSubmit,
  paymentStage,
  setPaymentStage,
}: Props) => {
  const [showComplete, setShowComplete] = useState(false);
  const BANK_OPTIONS = [
    'KB국민은행',
    '신한은행',
    '우리은행',
    '하나은행',
    'NH농협은행',
    'IBK기업은행',
    'SC제일은행',
    '한국씨티은행',
    '카카오뱅크',
    '케이뱅크',
    '토스뱅크',
    '부산은행',
    '경남은행',
    '대구은행',
    '광주은행',
    '전북은행',
    '제주은행',
    '수협은행',
    '산업은행',
  ];

  const {
    accountHolder,
    bank,
    accountNumber,
    confirmPaymentPassword,
    confirmPaymentPasswordCheck,
  } = formData;

  const [accountNumberError, setAccountNumberError] = useState<string | null>(
    null
  );
  const [accountNumberSuccess, setAccountNumberSuccess] = useState<
    string | null
  >(null);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwCheckError, setPwCheckError] = useState<string | null>(null);
  const [pwCheckSuccess, setPwCheckSuccess] = useState<string | null>(null);

  const isFirstValid =
    accountHolder && bank && accountNumber && accountNumberSuccess;
  const isSecondValid =
    paymentStage === 2 ? pwSuccess : pwSuccess && pwCheckSuccess;

  const handleNextStep = useCallback(() => {
    if (paymentStage === 2) {
      setPaymentStage(3);
      setAccountNumberSuccess(null);
    }
  }, [paymentStage, setPaymentStage]);

  const handleComplete = useCallback(async () => {
    const success = await onSubmit();
    if (success) {
      setShowComplete(true);
    }
  }, [onSubmit]);

  const handleAccountNumberCheck = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!accountNumber) {
          setAccountNumberError(null);
          setAccountNumberSuccess(null);
          return;
        }
        if (isValidAccountNumber(accountNumber)) {
          setAccountNumberError(null);
          setAccountNumberSuccess('사용 가능한 계좌번호예요!');
        } else {
          setAccountNumberError('-를 제외한 숫자만 입력해 주세요.');
          setAccountNumberSuccess(null);
        }
      }
    },
    [accountNumber]
  );

  const handlePasswordCheck = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!confirmPaymentPassword) {
          setPwError(null);
          setPwSuccess(null);
          return;
        }
        if (isValidPassword(confirmPaymentPassword)) {
          setPwError(null);
          setPwSuccess('사용 가능한 비밀번호예요!');
        } else {
          setPwError('4자리의 숫자를 입력해 주세요.');
          setPwSuccess(null);
        }
      }
    },
    [confirmPaymentPassword]
  );

  const handlePasswordConfirmCheck = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!confirmPaymentPasswordCheck) {
          setPwCheckError(null);
          setPwCheckSuccess(null);
          return;
        }
        if (confirmPaymentPasswordCheck === confirmPaymentPassword) {
          setPwCheckSuccess('비밀번호가 일치해요.');
          setPwCheckError(null);
        } else {
          setPwCheckError('비밀번호가 일치하지 않아요.');
          setPwCheckSuccess(null);
        }
      }
    },
    [confirmPaymentPassword, confirmPaymentPasswordCheck]
  );

  useEffect(() => {
    setPwCheckError(null);
    setPwCheckSuccess(null);
  }, [paymentStage]);

  return (
    <S.Wrapper>
      {paymentStage === 1 && (
        <>
          <CommonInput
            label="예금주"
            placeholder="예) 이멋사"
            value={accountHolder}
            onChange={(e) => onChange('accountHolder', e.target.value)}
            success={accountHolder ? '사용 가능해요!' : undefined}
            onClear={() => onChange('accountHolder', '')}
          />
          <CommonDropdown
            label="은행"
            placeholder="은행 선택"
            value={bank}
            onChange={(e) => onChange('bank', e.target.value)}
            options={BANK_OPTIONS}
          />
          <CommonInput
            label="계좌번호"
            placeholder="예) 12341234"
            value={accountNumber}
            onChange={(e) => {
              onChange('accountNumber', e.target.value);
              setAccountNumberError(null);
              setAccountNumberSuccess(null);
            }}
            onKeyDown={handleAccountNumberCheck}
            error={accountNumberError ?? undefined}
            success={accountNumberSuccess ?? undefined}
            helperText="-를 제외한 숫자만 입력해 주세요."
            onClear={() => {
              onChange('accountNumber', '');
              setAccountNumberError(null);
              setAccountNumberSuccess(null);
            }}
            onResetValidation={() => {
              setAccountNumberError(null);
              setAccountNumberSuccess(null);
            }}
          />
          <NextButton
            onClick={() => setPaymentStage(2)}
            disabled={!isFirstValid}
          >
            다음
          </NextButton>
        </>
      )}

      {paymentStage >= 2 && (
        <>
          <CommonInput
            label="결제 비밀번호"
            placeholder="예) 1234"
            type="password"
            value={confirmPaymentPassword}
            onChange={(e) => {
              onChange('confirmPaymentPassword', e.target.value);
              setPwError(null);
              setPwSuccess(null);
            }}
            onKeyDown={handlePasswordCheck}
            error={pwError ?? undefined}
            success={pwSuccess ?? undefined}
            helperText="4자리의 숫자를 입력해 주세요."
            onClear={() => {
              onChange('confirmPaymentPassword', '');
              setPwError(null);
              setPwSuccess(null);
            }}
            onResetValidation={() => {
              setPwError(null);
              setPwSuccess(null);
            }}
            isVisible={paymentStage >= 2}
            disabled={paymentStage !== 2}
          />

          <CommonInput
            label="비밀번호 확인"
            placeholder="예) 1234"
            type="password"
            value={confirmPaymentPasswordCheck}
            onChange={(e) => {
              onChange('confirmPaymentPasswordCheck', e.target.value);
              setPwCheckError(null);
            }}
            onKeyDown={handlePasswordConfirmCheck}
            error={pwCheckError ?? undefined}
            success={pwCheckSuccess ?? undefined}
            helperText="동일한 비밀번호를 입력해 주세요."
            onClear={() => {
              onChange('confirmPaymentPasswordCheck', '');
              setPwCheckError(null);
            }}
            onResetValidation={() => {
              setPwCheckError(null);
            }}
            forceShowPasswordWhenSuccess
            isVisible={paymentStage >= 3}
            disabled={paymentStage !== 3}
          />

          <NextButton
            onClick={paymentStage === 3 ? handleComplete : handleNextStep}
            disabled={!isSecondValid}
          >
            {paymentStage === 2 ? '다음' : '회원가입'}
          </NextButton>
        </>
      )}
      {showComplete && <SignupComplete />}
    </S.Wrapper>
  );
};

export default PaymentInfoForm;
