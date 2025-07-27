import styled from "styled-components";
import { dummyNotifications } from "../dummy/dummyNotifications"; // 추가
import { IMAGE_CONSTANTS } from "@constants/imageConstants";

const LiveNotice = () => {
  return (
    <Wrapper>
      {dummyNotifications[0].message}
      <img
        src={IMAGE_CONSTANTS.BELL}
        alt="종모양 아이콘"
        style={{ width: "14px", height: "14px", display: "flex" }}
      />
    </Wrapper>
  );
};

export default LiveNotice;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 300px;
  height: 35px;

  padding: 0 11px;
  box-sizing: border-box;

  border-radius: 20px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.Orange01};
  ${({ theme }) => theme.fonts.SemiBold16}
  color: ${({ theme }) => theme.colors.Black01};

  gap: 4px;
`;
