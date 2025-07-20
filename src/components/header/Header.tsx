import * as S from "./Header.styled";

import { useState } from "react";

import { IMAGE_CONSTANTS } from "@constants/imageConstants";
import useBoothRevenue from "./hooks/useBoothRevenue";

const Header = () => {
  const [isReloading, setIsReloading] = useState(false);
  const { boothName, totalRevenues, error } = useBoothRevenue();

  const handleReload = () => {
    if (isReloading) return;
    setIsReloading(true);

    // 전체 페이지 새로고침
    window.location.reload();
  };

  // 금액을 포맷팅하는 함수
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("ko-KR");
  };

  return (
    <S.HeaderWrapper>
      <S.BoothName>{error ? "부스 이름" : boothName}</S.BoothName>

      <S.SalesInfoWrapper>
        <S.SalesInfoText>💰 총 매출</S.SalesInfoText>
        <S.TotalSales>
          {error ? "0원" : `${formatCurrency(totalRevenues)}원`}
        </S.TotalSales>
        <S.ReloadButton onClick={handleReload} disabled={isReloading}>
          <S.ReloadIcon
            src={IMAGE_CONSTANTS.RELOAD}
            alt="새로고침아이콘"
            className={isReloading ? "rotating" : ""}
          />
        </S.ReloadButton>
      </S.SalesInfoWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
