import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@constants/imageConstants";
import { Menu } from "../api/MenuService";

interface TableFeeCardProps {
  menu: Menu;
}

const TableFeeCard = ({ menu }: TableFeeCardProps) => {
  return (
    <TableFeeCardWrapper>
      {menu.is_soldout && (
        <SoldOutOverlay>
          <SoldOutText>SOLD OUT</SoldOutText>
        </SoldOutOverlay>
      )}
      <CardContents>
        <CardImg>
          <img src={IMAGE_CONSTANTS.CHARACTER} alt="테이블 이용료" />
        </CardImg>
        <CardInfo>
          <CardTextInner>
            <CardText className="bold">{menu.menu_category}</CardText>
            <CardText>{menu.menu_price.toLocaleString()}원</CardText>
          </CardTextInner>
          <CardTextInner>
            <CardText>기준</CardText>
            <CardText>{menu.menu_description}</CardText>
          </CardTextInner>
        </CardInfo>
      </CardContents>
    </TableFeeCardWrapper>
  );
};

export default TableFeeCard;

const TableFeeCardWrapper = styled.button`
  display: flex;
  justify-content: center;
  position: relative;

  width: 190px;
  height: 273px;

  border: none;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.Gray01};
  cursor: pointer;

  padding: 19px 0;
`;

// 품절 상태를 표시할 오버레이 컴포넌트
const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  box-sizing: border-box;

  z-index: 10;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1.5px solid rgba(192, 192, 192, 0.3);
  background: rgba(255, 255, 255, 0.5);

  color: ${({ theme }) => theme.colors.Orange01};
`;

const SoldOutText = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.Orange01};
  ${({ theme }) => theme.fonts.ExtraBold18};
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 154px;
  gap: 24.5px;
`;

const CardImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 154px;
  height: 154px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.Bg};

  & img {
    width: 140px;
    height: auto;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CardTextInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CardText = styled.div`
  ${({ theme }) => theme.fonts.SemiBold12};
  color: ${({ theme }) => theme.colors.Black02};
  &.bold {
    ${({ theme }) => theme.fonts.Bold14};
    color: ${({ theme }) => theme.colors.Black01};
  }
`;
