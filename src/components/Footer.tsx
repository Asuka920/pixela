// src/components/Footer.tsx
import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthLinks: React.FC = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  return (
    <>
      <li><Link to="/upload">作品投稿</Link></li>
      <li><Link to="/mypage">マイページ</Link></li>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Column 1: Help & Contact */}
          <div className="footer-col">
            <h3>サポート</h3>
            <ul>
              <li><a href="/help">ヘルプ</a></li>
              <li><a href="/contact">お問い合わせ</a></li>
            </ul>
          </div>

          {/* Column 2: Header Menu Items 1 */}
          <div className="footer-col">
            <h3>メニュー</h3>
            <ul>
              <li><a href="/">ホーム</a></li>
              <li><a href="/about">事業所紹介</a></li>
              <li><a href="/find-works">作品一覧</a></li>
            </ul>
          </div>

          {/* Column 3: Header Menu Items 2 */}
          <div className="footer-col">
            <h3>メンバー・その他</h3>
            <ul>
              <li><a href="/members">メンバー一覧</a></li>
              {/* Logged in items will be handled by CSS or conditional rendering if we used Link/state here. 
                  For simplicity and consistency with footer static nature, we'll list them but they might redirect to login if not auth.
                  However, to match header logic exactly, we should use Link and AuthContext. 
                  Let's upgrade Footer to use Link and AuthContext. */}
              <AuthLinks />
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Pixela. All rights reserved.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;