// src/pages/UploadPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDrafts } from '../hooks/useDrafts';

const UploadPage: React.FC = () => {
  const { isLoggedIn, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { saveDraft, loadDraft, deleteDraft } = useDrafts(profile?.id);

  // フォームの state（controlled）
  const [contentType, setContentType] = useState('image');
  const [workType, setWorkType] = useState('Works');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [toolsStr, setToolsStr] = useState('');
  const [duration, setDuration] = useState('');

  // 下書き管理
  const [currentDraftId, setCurrentDraftId] = useState<string | undefined>(undefined);
  const [draftToast, setDraftToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // URLパラメータから下書きを読み込む
  useEffect(() => {
    const draftId = searchParams.get('draftId');
    if (draftId && isLoggedIn) {
      const draft = loadDraft(draftId);
      if (draft) {
        setCurrentDraftId(draftId);
        setTitle(draft.title ?? '');
        setDescription(draft.description ?? '');
        setContentType(draft.type ?? 'image');
        setWorkType(draft.workType ?? 'Works');
        setTags(draft.tags?.join(', ') ?? '');
        setProductionDate(draft.createdDate ?? '');
        setToolsStr(draft.tools?.join(', ') ?? '');
        setDuration(draft.duration ?? '');
        // URL フィールド復元
        if (draft.type === 'video') setUrl(draft.videoUrl ?? '');
        else if (draft.type === 'product') setUrl(draft.productUrl ?? '');
        else if (draft.type === 'zine') setUrl(draft.pdfUrl ?? '');
        else if (draft.type === 'other') setUrl(draft.otherUrl ?? '');
        showToast('下書きを読み込みました', 'success');
      }
    }
  }, [searchParams, isLoggedIn, loadDraft]);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setDraftToast({ message, type });
    setTimeout(() => setDraftToast(null), 3000);
  }, []);

  const collectFormData = useCallback(() => ({
    title: title || undefined,
    description: description || undefined,
    type: contentType as DraftWorkType,
    workType: workType as 'Works' | '個人制作',
    tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    createdDate: productionDate || undefined,
    tools: toolsStr ? toolsStr.split(',').map((t) => t.trim()).filter(Boolean) : [],
    duration: duration || undefined,
    videoUrl: contentType === 'video' ? url : undefined,
    productUrl: contentType === 'product' ? url : undefined,
    pdfUrl: contentType === 'zine' ? url : undefined,
    otherUrl: contentType === 'other' ? url : undefined,
  }), [title, description, contentType, workType, tags, productionDate, toolsStr, duration, url]);

  const handleSaveDraft = () => {
    if (!isLoggedIn) {
      showToast('ログインが必要です', 'error');
      return;
    }
    try {
      const saved = saveDraft({ ...collectFormData(), draftId: currentDraftId });
      setCurrentDraftId(saved.draftId);
      showToast('下書きを保存しました', 'success');
    } catch {
      showToast('下書きの保存に失敗しました', 'error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // モック投稿処理
    alert('作品が投稿されました！（ダミー処理）');
    // 下書きがあれば削除
    if (currentDraftId) {
      deleteDraft(currentDraftId);
    }
    navigate('/edit-works');
  };

  return (
    <section id="upload" className="page-section active-page upload-section">
      <h2>作品投稿</h2>

      {/* トースト通知 */}
      {draftToast && (
        <div className={`draft-toast draft-toast--${draftToast.type}`}>
          <span className="draft-toast__icon">{draftToast.type === 'success' ? '✓' : '✕'}</span>
          {draftToast.message}
        </div>
      )}

      {isLoggedIn ? (
        <div id="upload-form-container">
          {currentDraftId && (
            <div className="draft-badge">
              <span className="draft-badge__icon">📝</span>
              下書き編集中
            </div>
          )}
          <form id="work-upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="work-type">作品タイプ</label>
              <select id="work-type" value={workType} onChange={(e) => setWorkType(e.target.value)}>
                <option value="Works">Works</option>
                <option value="個人制作">個人制作</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="content-type">コンテンツの種類</label>
              <select id="content-type" value={contentType} onChange={(e) => setContentType(e.target.value)}>
                <option value="image">画像</option>
                <option value="video">動画</option>
                <option value="product">プロダクト/Webサイト</option>
                <option value="zine">Zine</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="work-title">作品タイトル</label>
              <input
                type="text"
                id="work-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="work-image">作品ファイル (複数選択可)</label>
              <input type="file" id="work-image" accept="image/*" multiple />
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                ※ファイルアップロードは現在モックアップです。
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="work-description">作品説明</label>
              <textarea
                id="work-description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="work-url">
                {contentType === 'product' ? 'Webサイト/プロダクトのURL' :
                  contentType === 'video' ? '動画URL (YouTube等)' :
                    contentType === 'zine' ? 'PDFのダウンロードURL' : '関連URL'}
              </label>
              <input
                type="url"
                id="work-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={
                  contentType === 'product' ? 'https://example.com' :
                    contentType === 'video' ? 'https://youtube.com/...' :
                      contentType === 'zine' ? 'https://... (PDFファイルのURL)' : 'https://...'
                }
                required={contentType === 'product' || contentType === 'video' || contentType === 'other'}
              />
            </div>

            {contentType === 'zine' && (
              <div className="form-group">
                <label htmlFor="work-file">作品ファイル (PDF)</label>
                <input type="file" id="work-file" accept=".pdf" />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="work-tags">タグ (カンマ区切り)</label>
              <input
                type="text"
                id="work-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="例: デジタルアート, 青, 幻想"
              />
            </div>

            <div className="form-group">
              <label htmlFor="production-date">制作日</label>
              <input
                type="date"
                id="production-date"
                value={productionDate}
                onChange={(e) => setProductionDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="work-tools">使用ツール (カンマ区切り)</label>
              <input
                type="text"
                id="work-tools"
                value={toolsStr}
                onChange={(e) => setToolsStr(e.target.value)}
                placeholder="例: Photoshop, Illustrator, Unity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="work-duration">制作期間</label>
              <input
                type="text"
                id="work-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="例: 3日, 2週間"
              />
            </div>

            <div className="draft-form-actions">
              <button
                type="button"
                id="save-draft-btn"
                className="draft-save-button"
                onClick={handleSaveDraft}
              >
                <span className="draft-save-button__icon">💾</span>
                下書き保存
              </button>
              <button type="submit" id="submit-work-btn" className="submit-button">
                投稿する
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div id="upload-login-message">
          <p>作品を投稿するにはログインが必要です。</p>
        </div>
      )}
    </section>
  );
};

// TypeScript helper (型アサーション用)
type DraftWorkType = 'image' | 'video' | 'product' | 'zine' | 'other';

export default UploadPage;