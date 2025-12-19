// src/pages/ContactPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ContactPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const getInitialSubject = () => {
    const searchParams = new URLSearchParams(location.search);
    const subject = searchParams.get('subject');
    return subject === 'job' ? 'job' : 'office';
  };

  const [subject, setSubject] = useState(getInitialSubject());

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
        {/* 機能追加: お問い合わせ内容フォーム (移動・変更) */}
        <div className="form-group">
          <label htmlFor="inquiry-content">お問い合わせ内容</label>
          <select
            id="inquiry-content"
            name="inquiry-content"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="office">事業所へのお問い合わせ</option>
            <option value="job">お仕事依頼</option>
            <option value="bug">不具合報告</option>
            <option value="other">その他のお問い合わせ</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">お名前</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">電話番号</label>
          <input type="tel" id="phone" name="phone" />
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