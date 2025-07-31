import * as S from './PubInfoForm.styled';
import { useState, useCallback } from 'react';
import CommonInput from '../inputs/CommonInput';
import NextButton from '../buttons/NextButton';
import CommonDropdown from '../inputs/dropdown/CommonDropdown';
import SelectBoxInput from '../inputs/selectbutton/SelectButton';

type Props = {
  formData: {
    pubName: string;
    tableCount: string;
    tableFee: string;
    tableFeePolicy: string;
    maxTime: string;
  };
  onChange: (key: keyof Props['formData'], value: string) => void;
  onNext: () => void;
  pubStage: number;
  setPubStage: React.Dispatch<React.SetStateAction<number>>;
};

const isValidPubName = (name: string) => /^[가-힣a-zA-Z0-9]{1,20}$/.test(name);
const isValidTableCount = (value: string) => {
  const number = Number(value);
  return Number.isInteger(number) && number >= 1 && number <= 100;
};
const isValidTableFee = (value: string) => {
  const number = Number(value);
  return !isNaN(number) && number >= 1000 && number <= 50000;
};

const feePolicyOptions = [
  { label: '인원 수', value: 'PP' },
  { label: '테이블', value: 'PT' },
  { label: '받지 않음', value: 'NO' },
];

const PubInfoForm = ({
  formData,
  onChange,
  onNext,
  pubStage,
  setPubStage,
}: Props) => {
  const { pubName, tableCount, tableFee, tableFeePolicy } = formData;

  const [pubNameError, setPubNameError] = useState<string | null>(null);
  const [pubNameSuccess, setPubNameSuccess] = useState<string | null>(null);
  const [tableCountError, setTableCountError] = useState<string | null>(null);
  const [tableCountSuccess, setTableCountSuccess] = useState<string | null>(
    null
  );
  const [tableFeeError, setTableFeeError] = useState<string | null>(null);
  const [tableFeeSuccess, setTableFeeSuccess] = useState<string | null>(null);

  const isFirstValid =
    pubName && tableCount && pubNameSuccess && tableCountSuccess;
  const isSecondValid = tableFee && tableFeePolicy && tableFeeSuccess;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (pubStage === 1 && isFirstValid) {
          e.preventDefault();
          setPubStage(2);
        } else if (pubStage === 2 && isSecondValid) {
          e.preventDefault();
          onNext();
        }
      }
    },
    [pubStage, isFirstValid, isSecondValid, onNext, setPubStage]
  );

  return (
    <S.Wrapper onKeyDown={handleKeyDown}>
      {pubStage === 1 && (
        <>
          <CommonInput
            label="주점명"
            placeholder="예) 동국주점"
            value={pubName}
            onChange={(e) => {
              const value = e.target.value;
              onChange('pubName', value);

              if (!value) {
                setPubNameError(null);
                setPubNameSuccess(null);
              } else if (isValidPubName(value)) {
                setPubNameError(null);
                setPubNameSuccess('사용 가능한 주점명이에요!');
              } else {
                setPubNameError(
                  '1~20자 이내의 한글, 영문, 숫자를 입력해 주세요.'
                );
                setPubNameSuccess(null);
              }
            }}
            error={pubNameError ?? undefined}
            success={pubNameSuccess ?? undefined}
            helperText="1~20자 이내의 한글, 영문, 숫자를 입력해 주세요."
            onClear={() => {
              onChange('pubName', '');
              setPubNameError(null);
              setPubNameSuccess(null);
            }}
          />

          <CommonInput
            label="테이블 개수"
            placeholder="예) 12"
            value={tableCount}
            onChange={(e) => {
              const value = e.target.value;
              onChange('tableCount', value);

              if (!value) {
                setTableCountError(null);
                setTableCountSuccess(null);
              } else if (isValidTableCount(value)) {
                setTableCountError(null);
                setTableCountSuccess('사용 가능한 테이블 개수에요!');
              } else {
                setTableCountError('1~100 사이의 숫자를 입력해 주세요.');
                setTableCountSuccess(null);
              }
            }}
            error={tableCountError ?? undefined}
            success={tableCountSuccess ?? undefined}
            helperText="1~100 사이의 숫자만 입력할 수 있어요."
            onClear={() => {
              onChange('tableCount', '');
              setTableCountError(null);
              setTableCountSuccess(null);
            }}
          />

          <NextButton disabled={!isFirstValid} onClick={() => setPubStage(2)}>
            다음
          </NextButton>
        </>
      )}

      {pubStage === 2 && (
        <>
          <CommonInput
            label="테이블 이용료"
            placeholder="예) 8000"
            value={tableFee}
            onChange={(e) => {
              const value = e.target.value;
              onChange('tableFee', value);

              if (!value) {
                setTableFeeError(null);
                setTableFeeSuccess(null);
              } else if (isValidTableFee(value)) {
                setTableFeeError(null);
                setTableFeeSuccess('사용 가능한 이용료예요!');
              } else {
                setTableFeeError('1000~50000 사이의 숫자를 입력해 주세요.');
                setTableFeeSuccess(null);
              }
            }}
            error={tableFeeError ?? undefined}
            success={tableFeeSuccess ?? undefined}
            helperText="테이블 1개당 요금 (1000~50000원)을 입력해 주세요."
            onClear={() => {
              onChange('tableFee', '');
              setTableFeeError(null);
              setTableFeeSuccess(null);
            }}
          />

          <SelectBoxInput
            label="테이블 이용료 적용 기준"
            value={tableFeePolicy}
            onChange={(val) => onChange('tableFeePolicy', val)}
            options={feePolicyOptions}
          />

          <NextButton disabled={!isSecondValid} onClick={() => setPubStage(3)}>
            다음
          </NextButton>
        </>
      )}

      {pubStage === 3 && (
        <>
          <CommonDropdown
            label="최대 이용 가능 시간"
            placeholder="시간 선택"
            value={formData.maxTime}
            onChange={(e) => onChange('maxTime', e.target.value)}
            options={['60', '90', '120', '150', '180']}
            optionLabelMap={{
              '60': '1시간',
              '90': '1시간 30분',
              '120': '2시간',
              '150': '2시간 30분',
              '180': '3시간',
              '210': '3시간 30분',
            }}
          />

          <NextButton disabled={!formData.maxTime} onClick={onNext}>
            다음
          </NextButton>
        </>
      )}
    </S.Wrapper>
  );
};

export default PubInfoForm;
