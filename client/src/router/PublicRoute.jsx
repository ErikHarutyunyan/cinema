// import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
  const user = false;
  //   const { userInfo } = useSelector((state) => state.user);
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
}
