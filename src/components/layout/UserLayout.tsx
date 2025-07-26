import { Outlet } from "react-router-dom";
import styled from "styled-components";
import useAuthRedirect from "@hooks/useAuthRedirect";

const UserLayout = () => {
  useAuthRedirect();
  return (
    <Wrapper>
      <Background>
        <Ellipse1 />
        <Ellipse2 />
        <Ellipse3 />
        <Ellipse4 />
      </Background>
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default UserLayout;

const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: calc(var(--vh, 1vh) * 100);
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Ellipse1 = styled.div`
  position: absolute;
  top: 0;
  left: -20vw;
  width: 66.87vw;
  height: calc(var(--vh, 1vh) * 95.24);
  min-height: calc(var(--vh, 1vh) * 80);
  border-radius: 50%;
  opacity: 0.4;
  background: radial-gradient(
    44.88% 44.88% at 50.29% 57.43%,
    rgba(255, 222, 208, 0.1) 0%,
    rgba(255, 125, 69, 0.1) 57.74%
  );
  filter: blur(10vw);
`;

const Ellipse2 = styled.div`
  position: absolute;
  top: -20vh;
  left: -20vw;
  width: 89.2vw;
  height: calc(var(--vh, 1vh) * 91.82);
  min-height: calc(var(--vh, 1vh) * 77.12);
  border-radius: 50%;
  opacity: 0.4;
  background: radial-gradient(
    44.88% 44.88% at 50.29% 57.43%,
    #fdff85 0%,
    rgba(253, 255, 133, 0.43) 98.44%
  );
  filter: blur(10vw);
`;

const Ellipse3 = styled.div`
  position: absolute;
  top: -10vh;
  left: -20vw;
  width: 81.7vw;
  height: calc(var(--vh, 1vh) * 95.24);
  min-height: calc(var(--vh, 1vh) * 80);
  border-radius: 50%;
  opacity: 0.5;
  background: #ff7d45;
  filter: blur(10vw);
`;

const Ellipse4 = styled.div`
  position: absolute;
  top: 20vh;
  left: 0vw;
  width: 50.85vw;
  height: calc(var(--vh, 1vh) * 64.1);
  min-height: calc(var(--vh, 1vh) * 53.84);
  border-radius: 50%;
  opacity: 0.5;
  background: linear-gradient(
    197deg,
    #ff007a 11.75%,
    rgba(254, 63, 155, 0) 78.17%
  );
  filter: blur(15vw);
`;
