// src/pages/UploadPage.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UploadPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('作品が投稿されました！（ダミー処理）'); //
  };

  return (
    <section id="upload" className="page-section active-page upload-section"> {/* */}
      <h2>作品投稿</h2>
      
      {/* script.jsのhandleHashChange内の認証分岐 */}
      {isLoggedIn ? (
        <div id="upload-form-container">
          <form id="work-upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="work-title">作品タイトル</label>
              <input type="text" id="work-title" required />
            </div>
            <div className="form-group">
              <label htmlFor="work-image">作品ファイル (複数選択可)</label>
              <input type="file" id="work-image" accept="image/*" required multiple />
            </div>
            <div className="form-group">
              <label htmlFor="work-description">作品説明</label>
              <textarea id="work-description" rows={5} required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="work-tags">タグ (カンマ区切り)</label>
              <input type="text" id="work-tags" placeholder="例: デジタルアート, 青, 幻想" />
            </div>
            <button type="submit">投稿する</button>
          </form>
        </div>
      ) : (
        <div id="upload-login-message">
          <p>作品を投稿するにはログインが必要です。</p>
        </div>
      )}
    </section>
  );
};

export default UploadPage;