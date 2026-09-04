import React, { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import WorkGrid from '../components/WorkGrid';
import { Link, useNavigate } from 'react-router-dom';
import { useDrafts } from '../hooks/useDrafts';
import { DraftWork } from '../types';

const EditWorkListPage: React.FC = () => {
    const { isLoggedIn, profile } = useAuth();
    const { works } = useData();
    const navigate = useNavigate();
    const { drafts, deleteDraft } = useDrafts(profile?.id);

    const [activeTab, setActiveTab] = useState<'published' | 'drafts'>('published');

    const myWorks = useMemo(() => {
        if (!isLoggedIn || !profile.id) return [];
        return works.filter(w => w.uploaded);
    }, [works, isLoggedIn, profile]);

    if (!isLoggedIn) {
        return (
            <section className="page-section active-page">
                <p>ログインが必要です。</p>
                <Link to="/signup">新規登録 / ログイン</Link>
            </section>
        );
    }

    const handleResumeDraft = (draft: DraftWork) => {
        if (draft.workId) {
            // 既存作品の編集下書き → EditWorkPage へ（draftId を state で渡す）
            navigate(`/work/edit/${draft.workId}`, { state: { draftId: draft.draftId } });
        } else {
            // 新規投稿下書き → UploadPage へ
            navigate(`/upload?draftId=${draft.draftId}`);
        }
    };

    const handleDeleteDraft = (draftId: string) => {
        if (window.confirm('この下書きを削除しますか？')) {
            deleteDraft(draftId);
        }
    };

    const formatDate = (iso: string) => {
        try {
            return new Date(iso).toLocaleString('ja-JP', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            });
        } catch {
            return iso;
        }
    };

    return (
        <section className="page-section active-page">
            <h2 style={{ marginBottom: '1.5rem' }}>作品編集・削除</h2>
            <p style={{ marginBottom: '2rem', color: '#666', lineHeight: '1.8' }}>
                編集したい作品を選択してください。<br />
                編集画面から作品情報の変更や削除が行えます。
            </p>

            {/* タブ */}
            <div className="draft-tabs">
                <button
                    id="tab-published"
                    className={`draft-tab-btn${activeTab === 'published' ? ' draft-tab-btn--active' : ''}`}
                    onClick={() => setActiveTab('published')}
                >
                    投稿済み作品
                    <span className="draft-tab-btn__count">{myWorks.length}</span>
                </button>
                <button
                    id="tab-drafts"
                    className={`draft-tab-btn${activeTab === 'drafts' ? ' draft-tab-btn--active' : ''}`}
                    onClick={() => setActiveTab('drafts')}
                >
                    下書き
                    {drafts.length > 0 && (
                        <span className="draft-tab-btn__count draft-tab-btn__count--accent">{drafts.length}</span>
                    )}
                </button>
            </div>

            {/* 投稿済み作品タブ */}
            {activeTab === 'published' && (
                <WorkGrid works={myWorks} isEditable={true} emptyMessage="アップロードした作品はありません。" />
            )}

            {/* 下書きタブ */}
            {activeTab === 'drafts' && (
                <div className="draft-list">
                    {drafts.length === 0 ? (
                        <div className="draft-list__empty">
                            <div className="draft-list__empty-icon">📝</div>
                            <p>下書きはありません。</p>
                            <p style={{ fontSize: '0.9rem', color: '#999' }}>
                                作品投稿フォームで「下書き保存」すると、ここに表示されます。
                            </p>
                            <Link to="/upload" className="draft-list__upload-link">
                                作品を投稿する
                            </Link>
                        </div>
                    ) : (
                        <div className="draft-card-grid">
                            {drafts.map((draft) => (
                                <div key={draft.draftId} className="draft-card">
                                    <div className="draft-card__header">
                                        <span className="draft-card__label">
                                            {draft.workId ? '編集中の下書き' : '新規投稿の下書き'}
                                        </span>
                                        <span className="draft-card__date">{formatDate(draft.savedAt)}</span>
                                    </div>
                                    <h3 className="draft-card__title">
                                        {draft.title || '（タイトル未入力）'}
                                    </h3>
                                    {draft.description && (
                                        <p className="draft-card__description">
                                            {draft.description.length > 80
                                                ? draft.description.slice(0, 80) + '…'
                                                : draft.description}
                                        </p>
                                    )}
                                    <div className="draft-card__meta">
                                        {draft.type && (
                                            <span className="draft-card__tag">
                                                {draft.type === 'image' ? '🖼 画像' :
                                                    draft.type === 'video' ? '🎬 動画' :
                                                        draft.type === 'product' ? '🌐 プロダクト' :
                                                            draft.type === 'zine' ? '📖 Zine' : '📎 その他'}
                                            </span>
                                        )}
                                        {draft.workType && (
                                            <span className="draft-card__tag">{draft.workType}</span>
                                        )}
                                    </div>
                                    <div className="draft-card__actions">
                                        <button
                                            id={`resume-draft-${draft.draftId}`}
                                            className="draft-card__resume-btn"
                                            onClick={() => handleResumeDraft(draft)}
                                        >
                                            編集を続ける
                                        </button>
                                        <button
                                            id={`delete-draft-${draft.draftId}`}
                                            className="draft-card__delete-btn"
                                            onClick={() => handleDeleteDraft(draft.draftId)}
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default EditWorkListPage;
