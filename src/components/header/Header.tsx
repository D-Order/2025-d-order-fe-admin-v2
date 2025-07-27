import * as S from "./Header.styled";
import { useState } from "react";

import { IMAGE_CONSTANTS } from "@constants/imageConstants";
import useBoothRevenue from "./hooks/useBoothRevenue";
import Bell from "./_components/Bell";
import LiveNotice from "./_components/LiveNotice";
import { dummyNotifications } from "./dummy/dummyNotifications"; // 추가

const Header = () => {
  const [isReloading, setIsReloading] = useState(false);
  const { boothName, totalRevenues, error } = useBoothRevenue();

  // 알림 안읽음 표시 여부
  const [hasUnread, setHasUnread] = useState(dummyNotifications.length > 0);
  // 모달 열림 여부
  const [modalOpen, setModalOpen] = useState(false);

  const handleBellClick = () => {
    setModalOpen((prev) => !prev);
    // 벨 아이콘을 클릭하여 모달을 열 때만 알림을 '읽음' 처리
    if (!modalOpen) {
      setHasUnread(false);
    }
  };
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

      <LiveNotice />
      <S.SalesInfoWrapper>
        <S.SalesInfoText>💰 총 매출</S.SalesInfoText>
        <S.TotalSales>
          {error ? "0원" : `${formatCurrency(totalRevenues)}원`}
        </S.TotalSales>

        <Bell
          active={hasUnread}
          onClick={handleBellClick}
          modalOpen={modalOpen}
          onCloseModal={() => setModalOpen(false)}
          notifications={dummyNotifications}
        />

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
