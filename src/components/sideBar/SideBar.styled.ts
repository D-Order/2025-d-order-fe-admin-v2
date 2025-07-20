import styled from "styled-components";

export const SideBarWrapper = styled.div`
  position: fixed;
  top: 73px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92px;
  height: 295px;

  border-radius: 0 16px 16px 0;
  box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.04);
  background-color: ${({ theme }) => theme.colors.Gray01};
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px 0;
  box-sizing: border-box;

  border-bottom: 2px solid rgba(192, 192, 192, 0.5);

  & img {
    width: 60px;
    height: auto;
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-top: 26px;
`;

export const NavItem = styled.button`
  display: flex;
  padding: 10px 12px;
  box-sizing: border-box;
  & img {
    width: 20px;
    height: 20px;
  }
`;
