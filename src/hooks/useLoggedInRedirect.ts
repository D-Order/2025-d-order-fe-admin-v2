import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@constants/routeConstants";

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate(ROUTE_PATHS.HOME);
    }
  }, [navigate]);
};

export default useRedirectIfLoggedIn;
