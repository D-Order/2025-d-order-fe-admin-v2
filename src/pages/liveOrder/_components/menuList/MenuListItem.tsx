import styled from "styled-components";
import OrderStateBtn from "../OrderStateBtn";
import { IMAGE_CONSTANTS } from "@constants/imageConstants";
interface MenuItemProps {
  time: string;
  table: string;
  menu: string;
  quantity: number;
  isServed: boolean;
  onServe: () => void;
  imageUrl?: string;
}

const MenuListItem = ({
  time,
  table,
  menu,
  quantity,
  isServed,
  onServe,
  imageUrl,
}: MenuItemProps) => {
  return (
    <Wrapper>
      <MenuImg>
        {" "}
        {imageUrl ? (
          <MenuImage src={imageUrl} alt={menu} />
        ) : (
          <DefaultOrderImage>
            <img src={IMAGE_CONSTANTS.CHARACTER} alt="기본아코이미지" />
          </DefaultOrderImage>
        )}
      </MenuImg>
      <MenuItemText>{time}</MenuItemText>
      <MenuItemText>{table}</MenuItemText>
      <MenuItemText style={{ flex: 2 }}>{menu}</MenuItemText>
      <MenuItemText>{quantity}</MenuItemText>
      <MenuItemText>
        <OrderStateBtn isChecked={isServed} onClick={onServe} />
      </MenuItemText>
    </Wrapper>
  );
};

export default MenuListItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  flex-shrink: 0;
  border-bottom: 1.5px dashed rgba(16, 16, 16, 0.3); /* CSS로 점선 만들기 */
`;

const MenuImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Bg};
  border-radius: 5px;
  width: 50px;
  height: 50px;
  margin: 0 10px;
  overflow: hidden;
`;
const DefaultOrderImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & img {
    width: 80%;
    height: auto;
  }
`;
const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MenuItemText = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  color: ${({ theme }) => theme.colors.Black01};
  ${({ theme }) => theme.fonts.Bold14}
`;
