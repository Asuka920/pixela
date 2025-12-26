// src/components/Footer.tsx
import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const Footer: React.FC = () => {
  const { isLoggedIn, userType } = useAuth();
  const isStaff = userType === 'staff';

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Column 1: Help & Contact */}
          <div className="footer-col">
            <h3>サポート</h3>
            <ul>
              <li><Link to="/help">ヘルプ</Link></li>
              <li><Link to="/contact">お問い合わせ</Link></li>
            </ul>
          </div>

          {/* Column 2: Menu */}
          <div className="footer-col">
            <h3>メニュー</h3>
            <ul>
              <li><Link to="/">ホーム</Link></li>
              <li><Link to="/about">事業所紹介</Link></li>
              <li><Link to="/find-works">作品一覧</Link></li>
              <li><Link to="/members">メンバー一覧</Link></li>
              {isLoggedIn && <li><Link to="/tenants">テナント</Link></li>}
            </ul>
          </div>

          {/* Column 3: Management (Visible only when logged in) */}
          {isLoggedIn && (
            <div className="footer-col">
              <h3>{isStaff ? '管理（スタッフ）' : '管理（メンバー）'}</h3>
              <ul>
                {!isStaff && (
                  <>
                    <li><Link to="/upload">作品投稿</Link></li>
                    <li><Link to="/edit-works">作品編集</Link></li>
                  </>
                )}
                <li><Link to="/mypage">{isStaff ? '管理ページ' : 'マイページ'}</Link></li>
              </ul>
            </div>
          )}
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