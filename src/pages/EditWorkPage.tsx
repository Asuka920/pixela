import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const EditWorkPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { getWorkById, updateWork, deleteWork } = useData();

    // 編集用ステート (UploadPageと同じ項目 + idなど)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentType, setContentType] = useState('image');
    // URL fields
    const [url, setUrl] = useState(''); // Generic for product/video/other/pdf
    const [tags, setTags] = useState('');

    // Images
    const [existingImages, setExistingImages] = useState<string[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [newFiles, setNewFiles] = useState<File[]>([]); // mock usage

    // 制作情報
    const [productionDate, setProductionDate] = useState('');
    const [tools, setTools] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            alert('ログインが必要です');
            navigate('/');
            return;
        }

        if (id) {
            const workId = parseInt(id, 10);
            const work = getWorkById(workId);
            if (work) {
                setTitle(work.title);
                setDescription(work.description);
                setContentType(work.type);

                // URLのマッピング
                let currentUrl = '';
                if (work.type === 'video') currentUrl = work.videoUrl || '';
                else if (work.type === 'product') currentUrl = work.productUrl || '';
                else if (work.type === 'zine') currentUrl = work.pdfUrl || '';
                else if (work.type === 'other') currentUrl = work.otherUrl || '';
                setUrl(currentUrl);

                setTags(work.tags.join(', '));

                // Initialize existing images
                setExistingImages(work.imageUrls || []);

                setProductionDate(work.createdDate || '');
                setTools(work.tools ? work.tools.join(', ') : '');
                setDuration(work.duration || '');

            } else {
                alert('作品が見つかりません');
                navigate('/edit-works');
            }
        }
    }, [id, isLoggedIn, navigate, getWorkById]);

    const handleImageDelete = (indexToDelete: number) => {
        if (window.confirm('この画像を削除しますか？')) {
            setExistingImages(prev => prev.filter((_, index) => index !== indexToDelete));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewFiles(filesArray);
            // In a real app, we would upload these or create preview URLs
            // For now, we can alert the user that file selection works
            // alert(`${filesArray.length}個のファイルが選択されました (モック)`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            const workId = parseInt(id, 10);
            const work = getWorkById(workId);
            if (work) {
                // 更新オブジェクトの作成
                const updatedWork = {
                    ...work,
                    title,
                    description,
                    type: contentType as any, // 簡易的にキャスト
                    tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
                    imageUrls: existingImages, // Update images
                    createdDate: productionDate,
                    tools: tools.split(',').map(t => t.trim()).filter(t => t !== ''),
                    duration,
                };

                // NOTE: Handling new files would typically go here (upload to server, get URLs, add to imageUrls)
                // For this mock, we only support deleting existing images via UI properly.

                // URLフィールドの更新
                if (contentType === 'video') updatedWork.videoUrl = url;
                else if (contentType === 'product') updatedWork.productUrl = url;
                else if (contentType === 'zine') updatedWork.pdfUrl = url;
                else if (contentType === 'other') updatedWork.otherUrl = url;

                updateWork(updatedWork);
                alert('作品情報を更新しました');
                navigate('/edit-works');
            }
        }
    };

    // Delete handler
    const handleDeleteClick = () => {
        if (id) {
            if (window.confirm('本当にこの作品を削除しますか？')) {
                deleteWork(parseInt(id, 10));
                navigate('/edit-works');
            }
        }
    };

    return (
        <section className="page-section active-page upload-section">
            <h2>作品編集</h2>
            <div id="upload-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="content-type">コンテンツの種類</label>
                        <select
                            id="content-type"
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value)}
                        >
                            <option value="image">画像</option>
                            <option value="video">動画</option>
                            <option value="product">プロダクト/Webサイト</option>
                            <option value="zine">Zine</option>
                            <option value="other">その他</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>現在の画像ファイル</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                            {existingImages.map((imgUrl, index) => (
                                <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                                    <img
                                        src={imgUrl}
                                        alt={`work-${index}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete(index)}
                                        style={{
                                            position: 'absolute',
                                            top: '-5px',
                                            right: '-5px',
                                            background: '#e74c3c',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            {existingImages.length === 0 && <p style={{ color: '#666', fontSize: '0.9rem' }}>画像はありません</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="work-files">画像ファイルを追加</label>
                        <input
                            type="file"
                            id="work-files"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                            ※ファイル追加機能は現在モックアップです。実際のアップロードは行われません。
                        </p>
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
                        <label htmlFor="work-description">作品説明</label>
                        <textarea
                            id="work-description"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* URL項目 */}
                    <div className="form-group">
                        <label htmlFor="work-url">
                            {contentType === 'product' ? 'Webサイト/プロダクトのURL' :
                                contentType === 'video' ? '動画URL (YouTube等)' :
                                    contentType === 'zine' ? 'PDFのダウンロードURL' :
                                        contentType === 'other' ? '関連URL' :
                                            '関連URL'}
                        </label>
                        <input
                            type="url"
                            id="work-url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder={
                                contentType === 'product' ? 'https://example.com' :
                                    contentType === 'video' ? 'https://youtube.com/...' :
                                        contentType === 'zine' ? 'https://... (PDFファイルのURL)' :
                                            'https://...'
                            }
                            required={contentType === 'product' || contentType === 'video' || contentType === 'other'}
                        />
                    </div>

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

                    {/* 制作情報 */}
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
                            value={tools}
                            onChange={(e) => setTools(e.target.value)}
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

                    <div className="work-actions" style={{ marginTop: '20px', justifyContent: 'flex-start' }}>
                        <button type="submit" className="edit-button">更新する</button>
                        <button type="button" className="delete-button" onClick={handleDeleteClick}>削除する</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditWorkPage;

