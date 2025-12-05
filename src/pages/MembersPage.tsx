import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const MembersPage: React.FC = () => {
    const { users } = useData();

    return (
        <section id="members" className="page-section active-page members-section">
            <h2>メンバー一覧</h2>
            <div className="members-grid">
                {users.map(user => (
                    <Link to={`/profile/${user.id}`} key={user.id} className="member-card">
                        <div className="member-avatar">
                            <img src={user.profileIconUrl} alt={user.name} />
                        </div>
                        <div className="member-info">
                            <h3>{user.name}</h3>
                            <p className="member-bio">{user.bio}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MembersPage;
