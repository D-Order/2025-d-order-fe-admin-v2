import * as S from "../SideBar.styled";

interface NavItemProps {
  icon: string;
  activeIcon: string;
  isActive: boolean;
  onClick: () => void;
  alt: string;
}

const NavItem = ({
  icon,
  activeIcon,
  isActive,
  onClick,
  alt,
}: NavItemProps) => {
  return (
    <S.NavItem onClick={onClick}>
      <img src={isActive ? activeIcon : icon} alt={alt} />
    </S.NavItem>
  );
};

export default NavItem;
