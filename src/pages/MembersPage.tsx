import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const MembersPage: React.FC = () => {
    const { users, getWorksByAuthorId } = useData();
    const [keyword, setKeyword] = useState('');
    const [skill, setSkill] = useState('');
    const [sortOrder, setSortOrder] = useState('name-asc'); // 'name-asc', 'name-desc'
    const [statusFilter, setStatusFilter] = useState('active'); // 'active', 'graduated', 'all'

    // 全ユーザーからユニークなスキルリストを作成
    const allSkills = useMemo(() => {
        const skills = new Set<string>();
        users.forEach(user => {
            user.skills?.forEach(s => skills.add(s));
        });
        return Array.from(skills).sort();
    }, [users]);

    // フィルタリングとソート
    const filteredUsers = useMemo(() => {
        let result = users.filter(user => {
            // キーワード検索 (名前 or Bio)
            const lowerKeyword = keyword.toLowerCase();
            const matchKeyword = !keyword ||
                user.name.toLowerCase().includes(lowerKeyword) ||
                user.bio.toLowerCase().includes(lowerKeyword);

            // スキルフィルタ
            const matchSkill = !skill || user.skills?.includes(skill);

            // ステータスフィルタ
            // 卒業日(graduationDate)がある場合は卒業生、ない場合は現役
            const isGraduated = !!user.graduationDate;
            const matchStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && !isGraduated) ||
                (statusFilter === 'graduated' && isGraduated);

            return matchKeyword && matchSkill && matchStatus;
        });

        // ソート
        result.sort((a, b) => {
            if (sortOrder === 'name-asc') {
                return a.name.localeCompare(b.name, 'ja');
            } else {
                return b.name.localeCompare(a.name, 'ja');
            }
        });

        return result;
    }, [users, keyword, skill, sortOrder, statusFilter]);

    return (
        <section id="members" className="page-section active-page members-section">
            <h2>メンバー一覧</h2>

            {/* 検索・フィルタフォーム */}
            <div className="search-and-filter members-search">
                <div className="search-form-group">
                    <label htmlFor="member-search">キーワード</label>
                    <input
                        type="text"
                        id="member-search"
                        placeholder="名前、自己紹介..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>

                <div className="search-form-group">
                    <label htmlFor="skill-select">スキル</label>
                    <select
                        id="skill-select"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                    >
                        <option value="">すべて</option>
                        {allSkills.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="search-form-group">
                    <label htmlFor="sort-select">並び順</label>
                    <select
                        id="sort-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="name-asc">氏名 (昇順)</option>
                        <option value="name-desc">氏名 (降順)</option>
                    </select>
                </div>

                <div className="search-form-group">
                    <label htmlFor="status-select">ステータス</label>
                    <select
                        id="status-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="active">現役メンバー</option>
                        <option value="graduated">卒業メンバー</option>
                        <option value="all">すべて表示</option>
                    </select>
                </div>
            </div>

            <div className="members-grid">
                {filteredUsers.length === 0 ? (
                    <p>該当するメンバーは見つかりませんでした。</p>
                ) : (
                    filteredUsers.map(user => {
                        // ユーザーの作品を取得（最大3件）
                        const userWorks = getWorksByAuthorId(user.id).slice(0, 3);

                        return (
                            <Link to={`/profile/${user.id}`} key={user.id} className="member-card">
                                <div className="member-header">
                                    <div className="member-avatar">
                                        <img src={user.profileIconUrl} alt={user.name} />
                                    </div>
                                    <div className="member-info">
                                        <h3>{user.name}</h3>
                                        <p className="member-bio">{user.bio}</p>
                                        {user.skills && (
                                            <div className="member-skills">
                                                {user.skills.slice(0, 3).map(s => <span key={s} className="skill-tag">{s}</span>)}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 最近の作品サムネイル */}
                                {userWorks.length > 0 && (
                                    <div className="member-recent-works">
                                        <h4>最近の作品</h4>
                                        <div className="recent-works-grid">
                                            {userWorks.map(work => (
                                                <div key={work.id} className="recent-work-item">
                                                    <img src={work.imageUrls[0]} alt={work.title} />
                                                    <span className="recent-work-title">{work.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Link>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default MembersPage;
