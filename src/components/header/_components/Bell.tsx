import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@constants/imageConstants";

interface BellProps {
  active: boolean; // 종 활성화 여부
  onClick?: () => void;
}

const Bell = ({ active, onClick }: BellProps) => {
  return (
    <BellWrapper onClick={onClick}>
      <img src={IMAGE_CONSTANTS.BELL} />
      <Dot $active={active} />
    </BellWrapper>
  );
};

export default Bell;

const BellWrapper = styled.button`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Dot = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 6px;
  height: 6px;
  background: #ffd232;
  border-radius: 50%;
  z-index: 1;

  transform: scale(${(props) => (props.$active ? 1 : 0)});
  opacity: ${(props) => (props.$active ? 1 : 0)};
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
`;
