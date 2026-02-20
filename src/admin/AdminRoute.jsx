// ADMIN ROUTE GUARD — will be built by admin-dashboard agent
import { Navigate } from 'react-router-dom';
import { loadData } from '../data/store';

export default function AdminRoute({ children }) {
  const data = loadData();
  if (!data.admin.isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
