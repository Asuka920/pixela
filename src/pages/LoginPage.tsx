// src/pages/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleUserLogin = () => {
        login('user');
        navigate('/mypage'); // ユーザーはマイページへ
    };

    const handleStaffLogin = () => {
        login('staff');
        navigate('/mypage'); // スタッフも管理ページ（マイページ）へ
    };

    return (
        <div className="login-page-container" style={{
            maxWidth: '600px',
            margin: '6rem auto 2rem',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginBottom: '2rem', color: '#444' }}>ログイン</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <button
                    onClick={handleUserLogin}
                    style={{
                        padding: '1rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        backgroundColor: '#9dbdba',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8faeb9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9dbdba'}
                >
                    通常ログイン
                </button>

                <div style={{ display: 'flex', alignItems: 'center', margin: '0 1rem' }}>
                    <hr style={{ flex: 1, borderTop: '1px solid #ddd' }} />
                    <span style={{ padding: '0 10px', color: '#777', fontSize: '0.9rem' }}>スタッフの方はこちら</span>
                    <hr style={{ flex: 1, borderTop: '1px solid #ddd' }} />
                </div>

                <button
                    onClick={handleStaffLogin}
                    style={{
                        padding: '1rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        backgroundColor: '#34495e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
                >
                    スタッフログイン
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
