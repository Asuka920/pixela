import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const TenantsPage: React.FC = () => {
    const { tenants } = useData();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return (
            <section className="page-section active-page">
                <p>テナント一覧を表示するにはログインが必要です。</p>
            </section>
        );
    }

    return (
        <section id="tenants" className="page-section active-page">
            <h2 style={{ marginBottom: '2rem' }}>テナント一覧</h2>

            {tenants.length === 0 ? (
                <p>現在登録されているテナントはありません。</p>
            ) : (
                <div className="members-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {tenants.map(tenant => (
                        <Link to={`/tenant/${tenant.id}`} key={tenant.id} className="member-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="member-header" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <div className="member-avatar" style={{ width: '100px', height: '100px', marginBottom: '1rem' }}>
                                    <img src={tenant.iconUrl} alt={tenant.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                </div>
                                <div className="member-info">
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{tenant.name}</h3>
                                    <p className="member-bio" style={{ fontSize: '0.9rem', color: '#666' }}>{tenant.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default TenantsPage;
