import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader'; // Adjust import based on your UI folder

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthChecked, user } = useSelector((state) => state.user);

  // 1. Wait for auth check
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // 2. Logic for guests-only routes (Login, Register)
  // If user is logged in, send them back to where they came from (or Home)
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  // 3. Logic for private routes (Profile)
  // If user is NOT logged in, send them to Login
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
