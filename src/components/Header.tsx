// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, userType, logout } = useAuth();
  const navigate = useNavigate();

  // ログインページへ遷移するかログアウトするか
  const handleAuthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      logout();
      navigate('/'); // ログアウト後はホームへ
    } else {
      navigate('/login'); // ログインページへ
    }
  };

  // スタッフかどうか
  const isStaff = userType === 'staff';

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="site-logo">
          <Link to="/">Pixela</Link>
        </h1>
        <div className="user-auth-links">
          <a href="#" id="login-button" onClick={handleAuthClick}>
            {isLoggedIn ? 'ログアウト' : 'ログイン'}
          </a>
          {!isLoggedIn && (
            <Link to="/signup" id="signup-link">新規登録</Link>
          )}
          {isLoggedIn && (
            <Link to="/mypage" id="profile-link">
              <i className="fas fa-user-circle"></i> {isStaff ? '管理ページ' : 'マイページ'}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;