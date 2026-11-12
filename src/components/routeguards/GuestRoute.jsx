
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
