// src/pages/ContactPage.tsx
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 送信処理（ダミー）
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="contact" className="page-section active-page contact-section">
      <h2>お問い合わせ</h2>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">お名前</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="recipient">お問い合わせ先</label>
          <select id="recipient" name="recipient">
            <option value="office">事業所</option>
            <option value="individual">個人</option>
          </select>
        </div>

        {/* 機能追加: お問い合わせ件名フォーム */}
        <div className="form-group">
          <label htmlFor="subject">お問い合わせ件名</label>
          <input type="text" id="subject" name="subject" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">メッセージ</label>
          <textarea id="message" name="message" rows={5} required></textarea>
        </div>
        <button type="submit">送信する</button>
      </form>

      {/* 機能追加: 送信完了モーダル */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>
              お問い合わせ頂き誠にありがとうございます。<br />
              他にもご不明な点がございましたらお気軽にお問い合わせください。
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactPage;