import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadData, saveData } from '../data/store';
import '../styles/admin.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = loadData();
    if (password === data.admin.password) {
      data.admin.isLoggedIn = true;
      saveData(data);
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <p className="login-subtitle">Sign in to manage your portfolio</p>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setError(''); setPassword(e.target.value); }}
            placeholder="Enter admin password"
            autoFocus
          />
          {error && <p className="login-error">{error}</p>}
        </div>
        <button type="submit" className="btn btn-primary login-btn">
          Sign In
        </button>
        <Link to="/" className="login-back">Back to public site</Link>
      </form>
    </div>
  );
}
