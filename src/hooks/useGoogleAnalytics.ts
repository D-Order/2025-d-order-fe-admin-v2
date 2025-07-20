import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// 타입 선언을 훅 파일에 직접 추가
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
let isGAInitialized = false; // GA 초기화 상태 추적

export const useGoogleAnalytics = () => {
  const location = useLocation();

  // GA4 초기화 (컴포넌트 마운트 시 한 번만 실행)
  useEffect(() => {
    if (MEASUREMENT_ID) {
      // 로컬 환경에서는 GA 비활성화
      if (window.location.hostname === "localhost") {
        //console.log("🚫 로컬 환경 - GA4 초기화 건너뜀");
        isGAInitialized = false; // 로컬에서는 초기화 상태를 false로 설정
        return;
      }

      ReactGA.initialize(MEASUREMENT_ID);
      isGAInitialized = true; // 초기화 완료 표시
      //console.log("✅ GA4 초기화 완료:", MEASUREMENT_ID);
    }
  }, []);

  // 페이지 변경 시마다 페이지뷰 전송
  useEffect(() => {
    // GA가 초기화되었을 때만 페이지뷰 전송
    if (MEASUREMENT_ID && isGAInitialized) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
      //console.log("📊 페이지뷰 전송:", location.pathname);
    } else if (window.location.hostname === "localhost") {
      //console.log("🚫 로컬 환경 - 페이지뷰 전송 건너뜀:", location.pathname);
    }
  }, [location]);
};

// 커스텀 이벤트 추적 함수
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  // GA가 초기화되었을 때만 이벤트 전송
  if (MEASUREMENT_ID && isGAInitialized) {
    ReactGA.event(eventName, parameters);
    //console.log("🎯 이벤트 전송:", eventName, parameters);
  }
};

// 나중에 필요할 때 주석 해제해서 사용
/*
export const trackOrderEvent = (menuItem: string, tableNumber?: number) => {
  if (isGAInitialized) {
    trackEvent("order_placed", {
      menu_item: menuItem,
      table_number: tableNumber,
      page: window.location.pathname,
    });
  }
};

export const trackTableSelect = (tableNumber: number) => {
  if (isGAInitialized) {
    trackEvent("table_selected", {
      table_number: tableNumber,
      page: window.location.pathname,
    });
  }
};

export const trackLoginEvent = () => {
  if (isGAInitialized) {
    trackEvent("login");
  }
};

export const trackSignupEvent = () => {
  if (isGAInitialized) {
    trackEvent("sign_up");
  }
};
*/
