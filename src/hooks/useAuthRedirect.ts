import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@constants/routeConstants';

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate(ROUTE_PATHS.LOGIN);
    }
  }, [navigate]);
};

export default useAuthRedirect;
