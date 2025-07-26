import * as S from "./SideBar.styled";
import { IMAGE_CONSTANTS } from "@constants/imageConstants";
import { ROUTE_PATHS } from "@constants/routeConstants";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//경로설정하고 useNavigate 추가하기

import NavItem from "./_components/NavItem";

const SideBar = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const navigate = useNavigate(); // navigate 훅 사용
  const [activeNav, setActiveNav] = useState(location.pathname); // 활성화된 네비게이션 상태

  const handleNavClick = (path: string) => {
    setActiveNav(path); // 클릭한 경로로 활성화 상태 변경
    navigate(path); // 해당 경로로 이동
  };

  return (
    <S.SideBarWrapper>
      <S.LogoWrapper>
        <img src={IMAGE_CONSTANTS.CHARACTER} alt="logo" />
      </S.LogoWrapper>
      <S.NavWrapper>
        <NavItem
          icon={IMAGE_CONSTANTS.NAV_HOME}
          activeIcon={IMAGE_CONSTANTS.NAV_HOME_ACTIVE}
          isActive={activeNav === ROUTE_PATHS.HOME} //추후에 라우터경로로변경
          onClick={() => handleNavClick(ROUTE_PATHS.HOME)}
          alt="home"
        />
        <NavItem
          icon={IMAGE_CONSTANTS.NAV_TABLE}
          activeIcon={IMAGE_CONSTANTS.NAV_TABLE_ACTIVE}
          isActive={activeNav === ROUTE_PATHS.TABLE_VIEW}
          onClick={() => handleNavClick(ROUTE_PATHS.TABLE_VIEW)}
          alt="table"
        />
        <NavItem
          icon={IMAGE_CONSTANTS.NAV_MENU}
          activeIcon={IMAGE_CONSTANTS.NAV_MENU_ACTIVE}
          isActive={activeNav === ROUTE_PATHS.MENU}
          onClick={() => handleNavClick(ROUTE_PATHS.MENU)}
          alt="menu"
        />
        <NavItem
          icon={IMAGE_CONSTANTS.NAV_COUPON}
          activeIcon={IMAGE_CONSTANTS.NAV_COUPON_ACTIVE}
          isActive={activeNav === ROUTE_PATHS.COUPON}
          onClick={() => handleNavClick(ROUTE_PATHS.COUPON)}
          alt="coupon"
        />
        <NavItem
          icon={IMAGE_CONSTANTS.NAV_MY}
          activeIcon={IMAGE_CONSTANTS.NAV_MY_ACTIVE}
          isActive={activeNav === ROUTE_PATHS.MYPAGE}
          onClick={() => handleNavClick(ROUTE_PATHS.MYPAGE)}
          alt="my"
        />
        <NavItem
          icon={IMAGE_CONSTANTS.NAV_DASHBOARD}
          activeIcon={IMAGE_CONSTANTS.NAV_DASHBOARD_ACTIVE}
          isActive={activeNav === ROUTE_PATHS.DASHBOARD}
          onClick={() => handleNavClick(ROUTE_PATHS.DASHBOARD)}
          alt="dashboard"
        />
      </S.NavWrapper>
    </S.SideBarWrapper>
  );
};

export default SideBar;
