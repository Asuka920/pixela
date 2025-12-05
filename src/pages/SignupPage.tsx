// src/pages/SignupPage.tsx
import React from 'react';

const SignupPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('アカウントが作成されました。（ダミー処理）');
  };

  return (
    <section id="signup" className="page-section active-page signup-section"> {/* */}
      <h2>新規登録</h2>
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="signup-username">ユーザー名</label>
          <input type="text" id="signup-username" required />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">メールアドレス</label>
          <input type="email" id="signup-email" required />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">パスワード</label>
          <input type="password" id="signup-password" required />
        </div>
        <button type="submit">アカウント作成</button>
      </form>
    </section>
  );
};

export default SignupPage;