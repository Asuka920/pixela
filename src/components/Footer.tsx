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
              <li><Link to="/">HOME</Link></li>

              <li><Link to="/find-works">WORKS</Link></li>
              <li><Link to="/members">MEMBERS</Link></li>
              {isLoggedIn && <li><Link to="/tenants">GROUP</Link></li>}
            </ul>
          </div>

          {/* Column 3: Management (Visible only when logged in) */}
          {isLoggedIn && (
            <div className="footer-col">
              <h3>{isStaff ? '管理（スタッフ）' : '管理（メンバー）'}</h3>
              <ul>
                {!isStaff && (
                  <>
                    <li><Link to="/upload">POST</Link></li>
                    <li><Link to="/edit-works">EDIT</Link></li>
                  </>
                )}
                <li><Link to="/mypage">{isStaff ? '管理ページ' : 'MY PAGE'}</Link></li>
              </ul>
            </div>
          )}
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Pixela. All rights reserved.</p>
          <div className="social-links">
            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;