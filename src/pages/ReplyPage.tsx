import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const ReplyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getInquiryById, sendReply } = useData();
    const inquiry = getInquiryById(id || '');

    const [to, setTo] = useState(inquiry?.email || '');
    const [subject, setSubject] = useState(`お問い合わせ「${inquiry?.category}」について`);
    const [message, setMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    if (!inquiry) {
        return <div className="page-section active-page">お問い合わせが見つかりません。</div>;
    }

    const handleSend = () => {
        setShowConfirmModal(true);
    };

    const confirmSend = () => {
        sendReply(inquiry.id, { to, subject, message });
        setShowConfirmModal(false);
        alert('返信を送信しました。');
        navigate('/mypage'); // Return to management page
    };

    return (
        <div className="page-section active-page inquiry-reply-page">
            <div className="reply-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    お問い合わせ返信
                </h2>

                {/* Inquiry Details */}
                <div className="inquiry-details" style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#555' }}>お問い合わせ内容</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: 'bold' }}>日付:</div>
                        <div>{inquiry.date}</div>
                        <div style={{ fontWeight: 'bold' }}>お名前:</div>
                        <div>{inquiry.name}</div>
                        <div style={{ fontWeight: 'bold' }}>メールアドレス:</div>
                        <div>{inquiry.email}</div>
                        {inquiry.phone && (
                            <>
                                <div style={{ fontWeight: 'bold' }}>電話番号:</div>
                                <div>{inquiry.phone}</div>
                            </>
                        )}
                        <div style={{ fontWeight: 'bold' }}>カテゴリ:</div>
                        <div>{inquiry.category}</div>
                    </div>
                    <div style={{ marginTop: '1rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>メッセージ:</div>
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{inquiry.message}</div>
                    </div>
                </div>

                {/* Reply Form */}
                <div className="reply-form">
                    <h3 style={{ marginBottom: '1rem' }}>返信フォーム</h3>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>宛先</label>
                        <input
                            type="email"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>差出人名（固定）</label>
                            <input
                                type="text"
                                value="pixelaスタッフ"
                                readOnly
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #eee', backgroundColor: '#f5f5f5', color: '#666' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>差出人メール（固定）</label>
                            <input
                                type="text"
                                value="staff@pixela.com"
                                readOnly
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #eee', backgroundColor: '#f5f5f5', color: '#666' }}
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>件名</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>メッセージ</label>
                        <textarea
                            rows={8}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleSend}
                            style={{
                                backgroundColor: '#333', color: 'white', padding: '0.8rem 2rem', border: 'none', borderRadius: '4px',
                                cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem'
                            }}
                        >
                            送信
                        </button>
                        <Link
                            to="/mypage"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: '0.8rem 1.5rem', border: '1px solid #ccc', borderRadius: '4px',
                                color: '#333', textDecoration: 'none'
                            }}
                        >
                            キャンセル
                        </Link>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 style={{ marginBottom: '1rem' }}>メールを送信しますか？</h3>
                        <p style={{ marginBottom: '0.5rem' }}>宛先: {to}</p>
                        <p style={{ marginBottom: '1.5rem' }}>件名: {subject}</p>
                        <div className="modal-actions">
                            <button className="modal-button confirm" onClick={confirmSend}>はい</button>
                            <button className="modal-button cancel" onClick={() => setShowConfirmModal(false)}>いいえ</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReplyPage;
