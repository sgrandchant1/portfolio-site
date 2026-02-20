import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Resume from './pages/Resume';
import ProjectPage from './pages/ProjectPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './admin/AdminRoute';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages with shared layout/nav */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Route>

        {/* Admin pages (no public nav) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
