import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import WorkGrid from '../components/WorkGrid';
import { Link } from 'react-router-dom';

const EditWorkListPage: React.FC = () => {
    const { isLoggedIn, profile } = useAuth();
    const { works } = useData();

    const myWorks = useMemo(() => {
        if (!isLoggedIn || !profile.id) return [];
        // mockDataのauthorIdとprofile.idのマッチング
        // mockDataではprofile.id='my-user'だがworksには'user-a'などが割り当てられている
        // 今回の要件では「自分がアップロードした作品」として、
        // ログインユーザーIDと一致するもの、あるいはデバッグ用に全作品を表示しつつ編集可能にするか？
        // 通常は w.authorId === profile.id
        // ただし、タスクの文脈では「アップロード作品一覧」と同じロジックが必要
        // MyPage.tsxでは: works.filter(w => w.uploaded) を表示している (uploadedフラグが自分アップロードの意味)
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

    return (
        <section className="page-section active-page">
            <h2 style={{ marginBottom: '1.5rem' }}>作品編集・削除</h2>
            <p style={{ marginBottom: '3rem', color: '#666', lineHeight: '1.8' }}>
                編集したい作品を選択してください。<br />
                編集画面から作品情報の変更や削除が行えます。
            </p>
            <WorkGrid works={myWorks} isEditable={true} emptyMessage="アップロードした作品はありません。" />
        </section>
    );
};

export default EditWorkListPage;
