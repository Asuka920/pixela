// src/components/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, toggleLoginState } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // script.jsのtoggleLoginStateとハッシュ変更
  const handleLoginToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleLoginState();
    navigate('/'); // ホームに戻る
  };

  const closeMenu = () => setIsMenuOpen(false);

  // script.jsのHamburgerMenuManagerロジック
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className="header"> {/* */}
      <div className="header-inner">
        <div
          className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 className="site-logo">
          <Link to="/" onClick={closeMenu}>Pixela</Link>
        </h1>
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}> {/* */}
          <ul>
            <li><Link to="/" onClick={closeMenu}>ホーム</Link></li>
            <li><Link to="/about" onClick={closeMenu}>事業所紹介</Link></li>
            <li><Link to="/find-works" onClick={closeMenu}>作品一覧</Link></li>
            <li><Link to="/members" onClick={closeMenu}>メンバー一覧</Link></li>
            {isLoggedIn && (
              <>
                <li><Link to="/upload" onClick={closeMenu}>作品アップロードページ</Link></li>
                <li><Link to="/mypage" onClick={closeMenu}>マイページ</Link></li>
              </>
            )}
          </ul>
        </nav>
        <div className="user-auth-links"> {/* */}
          <a href="#" id="login-button" onClick={handleLoginToggle}>
            {isLoggedIn ? 'ログアウト' : 'ログイン'}
          </a>
          {!isLoggedIn && (
            <Link to="/signup" id="signup-link">新規登録</Link>
          )}
          {isLoggedIn && (
            <Link to="/mypage" id="profile-link">
              <i className="fas fa-user-circle"></i> プロフィール
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;