import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const toggleRoutesPermission = localStorage.getItem('auth');
  const location = useLocation();

  return toggleRoutesPermission ? (
    children
  ) : (
    <Navigate to={'/auth/local' || '/auth/register' || '/auth/forgot-pass'} state={{ from: location }} replace={true} />
  );
};
export const PrivateRouteAuth = ({ children }) => {
  const toggleRoutesPermission = localStorage.getItem('auth');
  const location = useLocation();

  return toggleRoutesPermission ? <Navigate to='/books/all' state={{ from: location }} replace={true} /> : children;
};
