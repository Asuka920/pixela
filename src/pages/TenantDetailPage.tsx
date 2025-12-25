import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const TenantDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getTenantById, getCreatorById, getWorkById } = useData();
    const { isLoggedIn } = useAuth();
    const [activeTab, setActiveTab] = useState<'intro' | 'members' | 'pickup'>('intro');

    const tenant = getTenantById(id || '');

    if (!isLoggedIn) {
        return (
            <section className="page-section active-page">
                <p>テナント情報を表示するにはログインが必要です。</p>
            </section>
        );
    }

    if (!tenant) {
        return (
            <section className="page-section active-page">
                <p>指定されたテナントは見つかりませんでした。</p>
            </section>
        );
    }

    // データ取得
    const members = tenant.memberIds.map(mId => getCreatorById(mId)).filter(u => u !== undefined) as import('../types').Creator[];
    const pickupWorks = tenant.pickupWorkIds.map(wId => getWorkById(wId)).filter(w => w !== undefined) as import('../types').Work[];

    return (
        <section className="page-section active-page">
            <div className="tenant-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <img
                    src={tenant.iconUrl}
                    alt={tenant.name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', marginBottom: '1rem', border: '3px solid #eee' }}
                />
                <h2 style={{ fontSize: '1.8rem', color: '#333' }}>{tenant.name}</h2>
            </div>

            <div className="tenant-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
                <button
                    className={`tab-toggle-button ${activeTab === 'intro' ? 'active' : ''}`}
                    onClick={() => setActiveTab('intro')}
                >
                    紹介
                </button>
                <button
                    className={`tab-toggle-button ${activeTab === 'members' ? 'active' : ''}`}
                    onClick={() => setActiveTab('members')}
                >
                    メンバー
                </button>
                <button
                    className={`tab-toggle-button ${activeTab === 'pickup' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pickup')}
                >
                    ピックアップ
                </button>
            </div>

            <div className="tenant-content">
                {activeTab === 'intro' && (
                    <div className="tenant-intro" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ borderLeft: '4px solid #007bff', paddingLeft: '0.8rem', marginBottom: '1rem' }}>テナント紹介</h3>
                            <p>{tenant.detailDescription}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'members' && (
                    <div className="tenant-members">
                        <div className="members-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                            {members.map(member => (
                                <Link to={`/profile/${member.id}`} key={member.id} className="member-card" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                                    <img src={member.profileIconUrl} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.5rem' }} />
                                    <h4 style={{ margin: '0.5rem 0' }}>{member.name}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#666' }}>{member.bio.substring(0, 30)}...</p>
                                </Link>
                            ))}
                        </div>
                        {members.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>所属メンバーはいません。</p>}
                    </div>
                )}

                {activeTab === 'pickup' && (
                    <div className="tenant-pickup">
                        <div className="works-grid">
                            {pickupWorks.map(work => (
                                <div key={work.id} className="work-item">
                                    <Link to={`/work/${work.id}`}>
                                        <img src={work.imageUrls[0]} alt={work.title} loading="lazy" />
                                        <div className="work-info">
                                            <h3>{work.title}</h3>
                                            <p className="author-name">by {work.author}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {pickupWorks.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>ピックアップ作品はありません。</p>}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TenantDetailPage;
