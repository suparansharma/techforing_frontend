
import { Navigate } from 'react-router-dom';
import AuthUser from './AuthUser';

const ProtectedRoute = ({ children }) => {

  const { token } = AuthUser();
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
