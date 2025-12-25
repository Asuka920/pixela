// src/pages/MyPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import WorkGrid from '../components/WorkGrid';
import { SnsLinks, Creator } from '../types';//'type'
import { Link } from 'react-router-dom';


type MyPageTab = 'uploaded' | 'liked' | 'following' | 'followers' | 'profile-edit' | 'account-management';
type StaffTab = 'account-management' | 'comment-management' | 'inquiry-handling' | 'tenants';
type TabType = MyPageTab | StaffTab;

const AVAILABLE_SKILLS = [
  'Procreate',
  'デジタルイラスト',
  '色彩設計',
  'Adobe Animate',
  'Photoshop',
  'アニメーション',
  'Scratch',
  'ゲームデザイン',
  'プログラミング',
  'HTML',
  'CSS',
  'JavaScript',
  'Webデザイン',
  '写真撮影',
  'InDesign',
  'ZINE制作',
  'CLIP STUDIO PAINT',
  'キャラクターデザイン',
  'Blender',
  '3Dモデリング',
  '動画編集',
  'Premiere Pro',
  'After Effects',
  'Unity'
];

const MyPage: React.FC = () => {
  const { profile, updateProfile, isLoggedIn, userType } = useAuth();
  const { works, users } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('uploaded');

  // スタッフかどうか
  const isStaff = userType === 'staff';

  useEffect(() => {
    // ログインタイプによって初期タブを設定
    if (isStaff) {
      setActiveTab('account-management');
    } else {
      setActiveTab('uploaded');
    }
  }, [isStaff]);

  // プロフィール編集フォーム用のローカルステート
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [sns, setSns] = useState<SnsLinks>(profile.sns);
  const [skills, setSkills] = useState<string[]>(profile.skills || []);
  const [jobStatus, setJobStatus] = useState<'accepting' | 'discussion' | 'closed'>(profile.jobStatus || 'closed');

  // アカウント管理用のローカルステート
  const [email, setEmail] = useState('user@example.com'); // ダミー初期値
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  // アカウント削除モーダル用のローカルステート
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // コメント管理ステート
  const [commentTab, setCommentTab] = useState<'unread' | 'read' | 'resolved'>('unread');
  const [selectedReportIds, setSelectedReportIds] = useState<string[]>([]);

  // お問い合わせ管理ステート
  const [inquiryTab, setInquiryTab] = useState<'unread' | 'read' | 'resolved'>('unread');
  const [selectedInquiryIds, setSelectedInquiryIds] = useState<string[]>([]);

  // テナント管理ステート
  const [tenantName, setTenantName] = useState('');
  const [tenantDescription, setTenantDescription] = useState('');
  const [tenantIcon, setTenantIcon] = useState<string | null>(null); // アイコン画像URL (プレビュー用)
  const [showCreateTenantModal, setShowCreateTenantModal] = useState(false);

  // 削除確認モーダルステート
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [showDeleteInquiryModal, setShowDeleteInquiryModal] = useState(false);

  // メンバー招待ステート
  const [inviteKeyword, setInviteKeyword] = useState('');
  const [inviteSkill, setInviteSkill] = useState('');
  const [inviteSortOrder, setInviteSortOrder] = useState('name-asc');
  const [inviteStatusFilter, setInviteStatusFilter] = useState('all'); // デフォルトは全員
  const [selectedInviteUserIds, setSelectedInviteUserIds] = useState<string[]>([]);

  // DataContextからreportsなどを取得
  const { reports, markReportAsRead, deleteSelectedComments, inquiries, markInquiryAsRead, deleteSelectedInquiries } = useData();

  // タブ切り替え時に選択をリセット
  useEffect(() => {
    setSelectedReportIds([]);
  }, [commentTab]);

  useEffect(() => {
    setSelectedInquiryIds([]);
  }, [inquiryTab]);

  const filteredReports = reports.filter(r => r.status === commentTab);

  const toggleReportSelection = (id: string) => {
    setSelectedReportIds(prev =>
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    setShowDeleteCommentModal(true);
  };

  const confirmDeleteComments = () => {
    deleteSelectedComments(selectedReportIds);
    setShowDeleteCommentModal(false);
  };

  // お問い合わせ関連ロジック
  const filteredInquiries = inquiries.filter(i => i.status === inquiryTab);

  const toggleInquirySelection = (id: string) => {
    setSelectedInquiryIds(prev =>
      prev.includes(id) ? prev.filter(iId => iId !== id) : [...prev, id]
    );
  };

  const handleBulkDeleteInquiries = () => {
    setShowDeleteInquiryModal(true);
  };

  const confirmDeleteInquiries = () => {
    deleteSelectedInquiries(selectedInquiryIds);
    setShowDeleteInquiryModal(false);
  };

  // テナント関連ロジック
  const handleCreateTenantClick = () => {
    if (!tenantName) {
      alert('テナント名を入力してください。');
      return;
    }
    setShowCreateTenantModal(true);
  };

  const confirmCreateTenant = () => {
    alert(`テナント「${tenantName}」を作成しました。（ダミー処理）`);
    setShowCreateTenantModal(false);
    setTenantName('');
    setTenantDescription('');
    setTenantIcon(null);
  };

  const handleTenantIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setTenantIcon(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // メンバー検索・フィルタリングロジック (MembersPageから流用・適合)
  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    users.forEach(user => user.skills?.forEach(s => skills.add(s)));
    return Array.from(skills).sort();
  }, [users]);

  const filteredInviteUsers = useMemo(() => {
    let result = users.filter(user => {
      // 除外: 自分自身 (必須ではないが一般的に)
      // キーワード検索
      const lowerKeyword = inviteKeyword.toLowerCase();
      const matchKeyword = !inviteKeyword ||
        user.name.toLowerCase().includes(lowerKeyword) ||
        user.bio.toLowerCase().includes(lowerKeyword);

      // スキルフィルタ
      const matchSkill = !inviteSkill || user.skills?.includes(inviteSkill);

      // ステータスフィルタ
      const isGraduated = !!user.graduationDate;
      const matchStatus =
        inviteStatusFilter === 'all' ||
        (inviteStatusFilter === 'active' && !isGraduated) ||
        (inviteStatusFilter === 'graduated' && isGraduated);

      return matchKeyword && matchSkill && matchStatus;
    });

    // ソート
    result.sort((a, b) => {
      if (inviteSortOrder === 'name-asc') {
        return a.name.localeCompare(b.name, 'ja');
      } else {
        return b.name.localeCompare(a.name, 'ja');
      }
    });

    return result;
  }, [users, inviteKeyword, inviteSkill, inviteSortOrder, inviteStatusFilter]);

  const toggleInviteSelection = (userId: string) => {
    setSelectedInviteUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleInviteMembers = () => {
    if (selectedInviteUserIds.length === 0) {
      alert('招待するメンバーを選択してください。');
      return;
    }
    alert(`${selectedInviteUserIds.length}名のメンバーをテナントに招待しました。（ダミー処理）`);
    setSelectedInviteUserIds([]);
  };

  // ダミー認証情報
  const MOCK_ACCOUNT_EMAIL = 'user@example.com';
  const MOCK_ACCOUNT_PASSWORD = 'password';

  // AuthContextのprofileが変更されたらフォームに反映
  useEffect(() => {
    setName(profile.name);
    setBio(profile.bio);
    setSns(profile.sns);
    setSkills(profile.skills || []);
    setJobStatus(profile.jobStatus || 'closed');
  }, [profile]);

  // script.js updateMyProfile
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, bio, sns, skills, jobStatus);
  };

  const handleSkillChange = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSns(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`メールアドレスを ${email} に変更しました。（ダミー処理）`);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('新しいパスワードが一致しません。');
      return;
    }
    alert('パスワードを変更しました。（ダミー処理）');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError(''); // Clear previous errors

    // アカウント削除のバリデーション
    if (deleteEmail === MOCK_ACCOUNT_EMAIL && deletePassword === MOCK_ACCOUNT_PASSWORD) {
      alert('アカウントを削除しました。（ダミー処理）');
      setIsDeleteModalOpen(false);
      setDeleteEmail('');
      setDeletePassword('');
      setDeleteError('');
      // ここでログアウト処理などを呼ぶ想定
    } else {
      setDeleteError('メールアドレスもしくはパスワードが間違っています');
    }
  };

  // script.js renderMyPage
  const renderedContent = useMemo(() => {
    switch (activeTab) {
      case 'uploaded':
        const uploadedWorks = works.filter(w => w.uploaded);
        return <WorkGrid works={uploadedWorks} emptyMessage="まだアップロードした作品はありません。" isEditable={true} />;
      case 'liked':
        const likedWorks = works.filter(w => w.liked);
        return <WorkGrid works={likedWorks} emptyMessage="まだいいねした作品はありません。" />;
      case 'following':
        const followingUsers = users.filter(u => u.following);
        return <UserList users={followingUsers} actionLabel="フォロー解除" />;
      case 'followers':
        const followersUsers = users.filter(u => u.follower);
        return <UserList users={followersUsers} actionLabel="ブロック" />;
      case 'profile-edit':
        return (
          <form id="profile-edit-form" onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="user-name">ユーザー名</label>
              <input
                type="text"
                id="user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">自己紹介</label>
              <textarea
                id="bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="profile-image">プロフィール画像</label>
              <input type="file" id="profile-image" accept="image/*" />
            </div>
            <div className="form-group sns-links-group">
              <label>SNSリンク</label>
              <div className="sns-input-wrapper">
                <i className="fab fa-twitter"></i>
                <input type="url" name="twitter" placeholder="https://twitter.com/username" value={sns.twitter} onChange={handleSnsChange} />
              </div>
              <div className="sns-input-wrapper">
                <i className="fab fa-instagram"></i>
                <input type="url" name="instagram" placeholder="https://instagram.com/username" value={sns.instagram} onChange={handleSnsChange} />
              </div>
              <div className="sns-input-wrapper">
                <i className="fab fa-facebook"></i>
                <input type="url" name="facebook" placeholder="https://facebook.com/username" value={sns.facebook} onChange={handleSnsChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="job-status-select">お仕事依頼設定</label>
              <select
                id="job-status-select"
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value as any)}
              >
                <option value="accepting">募集中</option>
                <option value="discussion">相談可能</option>
                <option value="closed">募集停止中</option>
              </select>
            </div>

            <div className="form-group skills-group">
              <label>スキル</label>
              <div className="skills-checkbox-container">
                {AVAILABLE_SKILLS.map(skill => (
                  <label key={skill} className="skill-checkbox-label">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit">プロフィールを更新</button>
          </form>
        );
      case 'account-management':
        return (
          <div className="account-management">
            <h3>メールアドレス変更</h3>
            <form onSubmit={handleEmailSubmit} className="account-form">
              <div className="form-group">
                <label htmlFor="email">メールアドレス</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit">メールアドレスを変更</button>
            </form>

            <hr className="divider" />

            <h3>パスワード変更</h3>
            <form onSubmit={handlePasswordSubmit} className="account-form">
              <div className="form-group">
                <label htmlFor="current-password">現在のパスワード</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">新しいパスワード</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">新しいパスワード（確認）</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">パスワードを変更</button>
            </form>

            <hr className="divider" />

            <h3>アカウント削除</h3>
            <div className="account-form">
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                一度削除したアカウントは復元できません。
              </p>
              <button
                type="button"
                className="delete-account-button" // クラスを追加
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setDeleteError(''); // モーダルを開くときにエラーをクリア
                }}
              >
                アカウント削除
              </button>
            </div>
          </div>
        );

      // スタッフ用タブコンテンツ
      case 'comment-management':
        return (
          <div className="comment-management-container" style={{ padding: '0 1rem 2rem' }}>
            <div className="sub-tabs" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #ddd', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
              <button
                type="button"
                className={`tab-toggle-button ${commentTab === 'unread' ? 'active' : ''}`}
                onClick={() => setCommentTab('unread')}
              >
                未読
              </button>
              <button
                type="button"
                className={`tab-toggle-button ${commentTab === 'read' ? 'active' : ''}`}
                onClick={() => setCommentTab('read')}
              >
                既読
              </button>
              <button
                type="button"
                className={`tab-toggle-button ${commentTab === 'resolved' ? 'active' : ''}`}
                onClick={() => setCommentTab('resolved')}
              >
                対応済み
              </button>
            </div>

            {filteredReports.length === 0 ? (
              <p style={{ color: '#666', padding: '1rem' }}>該当する通知はありません。</p>
            ) : (
              <ul className="report-list" style={{ listStyle: 'none', padding: 0 }}>
                {filteredReports.map(report => {
                  const work = works.find(w => w.id === report.workId);
                  return (
                    <li key={report.id} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '1rem',
                      padding: '1rem', borderBottom: '1px solid #eee',
                      backgroundColor: '#f9f9f9', marginBottom: '0.5rem', borderRadius: '4px'
                    }}>
                      {commentTab !== 'resolved' && (
                        <input
                          type="checkbox"
                          checked={selectedReportIds.includes(report.id)}
                          onChange={() => toggleReportSelection(report.id)}
                          style={{ marginTop: '5px' }}
                        />
                      )}
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
                          <span style={{ marginRight: '1rem' }}>{report.date}</span>
                          {/* Work Title Link */}
                          <Link
                            to={`/work/${report.workId}`}
                            onClick={() => markReportAsRead(report.id)}
                            style={{ textDecoration: 'underline', color: '#007bff' }}
                          >
                            {work ? work.title : '不明な作品'}
                          </Link>
                        </div>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                          {report.commentText}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>
                          通報ID: {report.id} | 通報者: {report.reporterId || 'ゲスト'}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Bulk Delete Button */}
            {commentTab !== 'resolved' && (
              <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                <button
                  onClick={handleBulkDelete}
                  disabled={selectedReportIds.length === 0}
                  style={{
                    padding: '0.8rem 1.5rem',
                    backgroundColor: selectedReportIds.length > 0 ? '#e74c3c' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: selectedReportIds.length > 0 ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold'
                  }}
                >
                  選択したコメントを削除
                </button>
              </div>
            )}

            {/* コメント削除確認モーダル */}
            {showDeleteCommentModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3 style={{ marginBottom: '1rem' }}>確認</h3>
                  <p style={{ marginBottom: '1.5rem' }}>選択したコメントを削除しますか？<br />この操作は取り消せません。</p>
                  <div className="modal-actions">
                    <button className="modal-button confirm" onClick={confirmDeleteComments} style={{ backgroundColor: '#e74c3c' }}>削除する</button>
                    <button className="modal-button cancel" onClick={() => setShowDeleteCommentModal(false)}>キャンセル</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'inquiry-handling':
        return (
          <div className="inquiry-management-container" style={{ padding: '0 1rem 2rem' }}>
            <div className="sub-tabs" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #ddd', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
              <button
                type="button"
                className={`tab-toggle-button ${inquiryTab === 'unread' ? 'active' : ''}`}
                onClick={() => setInquiryTab('unread')}
              >
                未読
              </button>
              <button
                type="button"
                className={`tab-toggle-button ${inquiryTab === 'read' ? 'active' : ''}`}
                onClick={() => setInquiryTab('read')}
              >
                既読
              </button>
              <button
                type="button"
                className={`tab-toggle-button ${inquiryTab === 'resolved' ? 'active' : ''}`}
                onClick={() => setInquiryTab('resolved')}
              >
                対応済み
              </button>
            </div>

            {filteredInquiries.length === 0 ? (
              <p style={{ color: '#666', padding: '1rem' }}>該当するお問い合わせはありません。</p>
            ) : (
              <ul className="inquiry-list" style={{ listStyle: 'none', padding: 0 }}>
                {filteredInquiries.map(inquiry => (
                  <li key={inquiry.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '1rem',
                    padding: '1rem', borderBottom: '1px solid #eee',
                    backgroundColor: '#f9f9f9', marginBottom: '0.5rem', borderRadius: '4px'
                  }}>
                    {inquiryTab !== 'resolved' && (
                      <input
                        type="checkbox"
                        checked={selectedInquiryIds.includes(inquiry.id)}
                        onChange={() => toggleInquirySelection(inquiry.id)}
                        style={{ marginTop: '5px' }}
                      />
                    )}
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
                        <span style={{ marginRight: '1rem' }}>{inquiry.date}</span>
                        <span style={{ fontWeight: 'bold' }}>{inquiry.name}</span>
                      </div>
                      <Link
                        to={`/admin/inquiry/${inquiry.id}`}
                        onClick={() => markInquiryAsRead(inquiry.id)}
                        style={{ textDecoration: 'none', color: '#333', display: 'block' }}
                      >
                        <div style={{ fontWeight: 'bold', marginBottom: '0.2rem', color: '#007bff' }}>
                          {inquiry.category === 'job' ? '【仕事依頼】' : '【その他】'} {inquiry.message.substring(0, 50)}...
                        </div>
                      </Link>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>
                        ID: {inquiry.id} | Email: {inquiry.email}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Bulk Delete Button */}
            {inquiryTab !== 'resolved' && (
              <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                <button
                  onClick={handleBulkDeleteInquiries}
                  disabled={selectedInquiryIds.length === 0}
                  style={{
                    padding: '0.8rem 1.5rem',
                    backgroundColor: selectedInquiryIds.length > 0 ? '#e74c3c' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: selectedInquiryIds.length > 0 ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold'
                  }}
                >
                  選択したメールを削除
                </button>
              </div>
            )}

            {/* お問い合わせ削除確認モーダル */}
            {showDeleteInquiryModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3 style={{ marginBottom: '1rem' }}>確認</h3>
                  <p style={{ marginBottom: '1.5rem' }}>選択したメール（問い合わせ）を削除しますか？<br />この操作は取り消せません。</p>
                  <div className="modal-actions">
                    <button className="modal-button confirm" onClick={confirmDeleteInquiries} style={{ backgroundColor: '#e74c3c' }}>削除する</button>
                    <button className="modal-button cancel" onClick={() => setShowDeleteInquiryModal(false)}>キャンセル</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'tenants':
        return (
          <div className="tenant-management-container" style={{ padding: '0 1rem 2rem' }}>

            {/* 1. 新規テナント作成 */}
            <div className="create-tenant-section" style={{ marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>新規テナント作成</h3>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>テナント名</label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="例: 第1制作チーム"
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>テナントアイコン</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTenantIconChange}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {tenantIcon && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img src={tenantIcon} alt="Icon Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', border: '1px solid #ddd' }} />
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>テナント紹介</label>
                <textarea
                  value={tenantDescription}
                  onChange={(e) => setTenantDescription(e.target.value)}
                  placeholder="テナントの目的や概要を入力してください"
                  rows={3}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }}
                ></textarea>
              </div>
              <button
                onClick={handleCreateTenantClick}
                style={{
                  backgroundColor: '#333', color: 'white', padding: '0.8rem 2rem', border: 'none', borderRadius: '4px',
                  fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                テナントを作る
              </button>
            </div>

            {/* 2. メンバー招待 */}
            <div className="invite-member-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: '#333', margin: 0 }}>メンバー招待</h3>

                {/* 招待ボタン (バッジ付き) */}
                <button
                  onClick={handleInviteMembers}
                  disabled={selectedInviteUserIds.length === 0}
                  style={{
                    position: 'relative',
                    backgroundColor: selectedInviteUserIds.length > 0 ? '#007bff' : '#ccc',
                    color: 'white',
                    padding: '0.8rem 2rem',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: selectedInviteUserIds.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'background-color 0.3s'
                  }}
                >
                  招待する
                  {selectedInviteUserIds.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '-10px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}>
                      {selectedInviteUserIds.length}
                    </span>
                  )}
                </button>
              </div>

              {/* 検索・絞り込みフォーム (簡易版) */}
              <div className="search-and-filter" style={{
                backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>キーワード</label>
                  <input
                    type="text"
                    value={inviteKeyword}
                    onChange={(e) => setInviteKeyword(e.target.value)}
                    placeholder="名前検索..."
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>スキル</label>
                  <select
                    value={inviteSkill}
                    onChange={(e) => setInviteSkill(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    <option value="">すべて</option>
                    {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>並び順</label>
                  <select
                    value={inviteSortOrder}
                    onChange={(e) => setInviteSortOrder(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    <option value="name-asc">氏名 (昇順)</option>
                    <option value="name-desc">氏名 (降順)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>ステータス</label>
                  <select
                    value={inviteStatusFilter}
                    onChange={(e) => setInviteStatusFilter(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    <option value="all">すべて</option>
                    <option value="active">現役メンバー</option>
                    <option value="graduated">卒業メンバー</option>
                  </select>
                </div>
              </div>

              {/* 簡易メンバーリスト */}
              <div className="members-grid" style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem'
              }}>
                {filteredInviteUsers.map(user => (
                  <div key={user.id} className="member-card simple-card" style={{
                    position: 'relative', border: '1px solid #eee', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: 'white',
                    cursor: 'pointer', transition: 'box-shadow 0.2s',
                    boxShadow: selectedInviteUserIds.includes(user.id) ? '0 0 0 2px #007bff' : 'none'
                  }}
                    onClick={() => toggleInviteSelection(user.id)}
                  >
                    {/* Checkbox Overlay */}
                    <div style={{ position: 'absolute', top: '10px', right: '10px', pointerEvents: 'none' }}>
                      <input
                        type="checkbox"
                        checked={selectedInviteUserIds.includes(user.id)}
                        readOnly
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </div>

                    <img src={user.profileIconUrl} alt={user.name} style={{
                      width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.5rem'
                    }} />
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{user.name}</h4>
                    {user.skills && user.skills.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
                        {user.skills.slice(0, 2).map(s => (
                          <span key={s} style={{
                            fontSize: '0.7rem', backgroundColor: '#eee', padding: '2px 6px', borderRadius: '10px', color: '#666'
                          }}>
                            {s}
                          </span>
                        ))}
                        {user.skills.length > 2 && <span style={{ fontSize: '0.7rem', color: '#999' }}>+</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {filteredInviteUsers.length === 0 && <p>該当するメンバーがいません。</p>}

            </div>

            {/* テナント作成確認モーダル */}
            {showCreateTenantModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3 style={{ marginBottom: '1rem' }}>この内容でテナントを作成しますか？</h3>
                  <div style={{ textAlign: 'left', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                    {tenantIcon && (
                      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <img src={tenantIcon} alt="Icon" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} />
                      </div>
                    )}
                    <p style={{ marginBottom: '0.5rem' }}><strong>テナント名:</strong> {tenantName}</p>
                    <p style={{ whiteSpace: 'pre-wrap' }}><strong>紹介:</strong><br />{tenantDescription}</p>
                  </div>
                  <div className="modal-actions">
                    <button className="modal-button confirm" onClick={confirmCreateTenant}>作成する</button>
                    <button className="modal-button cancel" onClick={() => setShowCreateTenantModal(false)}>キャンセル</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, works, users, name, bio, sns, skills, updateProfile, email, currentPassword, newPassword, confirmPassword, commentTab, selectedReportIds, reports, inquiryTab, selectedInquiryIds, inquiries, tenantName, tenantDescription, tenantIcon, showCreateTenantModal, inviteKeyword, inviteSkill, inviteSortOrder, inviteStatusFilter, selectedInviteUserIds, filteredInviteUsers, allSkills, showDeleteCommentModal, showDeleteInquiryModal]);

  // ログインしていない場合はマイページを表示しない（またはログインを促す）
  if (!isLoggedIn) {
    return (
      <section id="mypage" className="page-section active-page mypage-section">
        <p>マイページを表示するにはログインが必要です。</p>
      </section>
    );
  }

  return (
    <section id="mypage" className="page-section active-page mypage-section">
      <div className="mypage-header"> {/* */}
        <img
          src={profile.profileIconUrl}
          alt="プロフィール画像"
          id="mypage-profile-icon"
          className="mypage-profile-icon"
        />
        <h2 id="mypage-title">{isStaff ? 'スタッフ' : `${profile.name}のマイページ`}</h2>
      </div>

      <div className="mypage-tabs"> {/* */}
        {!isStaff ? (
          (['uploaded', 'liked', 'following', 'followers', 'profile-edit', 'account-management'] as MyPageTab[]).map(tab => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              data-tab={tab}
              onClick={() => setActiveTab(tab)}
            >
              {/* 簡易的なタブ名 */}
              {tab === 'uploaded' && 'アップロード作品'}
              {tab === 'liked' && 'いいねした作品'}
              {tab === 'following' && 'フォロー'}
              {tab === 'followers' && 'フォロワー'}
              {tab === 'profile-edit' && 'プロフィール編集'}
              {tab === 'account-management' && 'アカウント管理'}
            </button>
          ))
        ) : (
          (['account-management', 'comment-management', 'inquiry-handling', 'tenants'] as StaffTab[]).map(tab => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              data-tab={tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'account-management' && 'アカウント管理'}
              {tab === 'comment-management' && 'コメント管理'}
              {tab === 'inquiry-handling' && 'お問い合わせ対応'}
              {tab === 'tenants' && 'テナント'}
            </button>
          ))
        )}
      </div>

      {/* script.jsのタブコンテンツ表示ロジック */}
      <div className="tab-content active" id={`${activeTab}-content`}>
        {renderedContent}
      </div>
      {/* アカウント削除モーダル */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsDeleteModalOpen(false)}>&times;</span>
            <h3 style={{ marginBottom: '1.5rem' }}>アカウント削除</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              アカウントを削除するには、<br />
              メールアドレスとパスワードを入力してください。
            </p>
            <form onSubmit={handleDeleteAccount} className="account-form" style={{ marginBottom: 0 }}>
              {deleteError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle" style={{ marginRight: '5px' }}></i>
                  {deleteError}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="delete-email" style={{ textAlign: 'left' }}>メールアドレス</label>
                <input
                  type="email"
                  id="delete-email"
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                  placeholder={MOCK_ACCOUNT_EMAIL}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="delete-password" style={{ textAlign: 'left' }}>パスワード</label>
                <input
                  type="password"
                  id="delete-password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </div>
              <button
                type="submit"
                className="delete-account-button" // クラスを追加
                style={{ width: '100%', marginTop: 0 }} // 微調整
              >
                アカウントを削除する
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

// ユーザーリストのコンポーネント (renderUserList に相当)
const UserList: React.FC<{ users: Creator[], actionLabel: string }> = ({ users, actionLabel }) => {
  const handleAction = (userId: string) => {
    alert(`ユーザー ${userId} に対してアクションを実行しました。（ダミー処理）`); //
  };

  if (users.length === 0) {
    return <p>該当するユーザーはいません。</p>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div className="user-card" key={user.id}>
          <i className="fas fa-user-circle user-avatar"></i>
          <div className="user-info">
            <h4>{user.name}</h4>
            <p>ID: {user.id}</p>
          </div>
          <button className="action-button" onClick={() => handleAction(user.id)}>
            {actionLabel}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyPage;