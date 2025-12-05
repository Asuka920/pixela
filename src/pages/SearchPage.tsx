// src/pages/SearchPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../contexts/DataContext';
import WorkGrid from '../components/WorkGrid';
import WorkTypeFilter from '../components/WorkTypeFilter';
import { Work } from '../types';

const SearchPage: React.FC = () => {
  const { searchWorks } = useData();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [workType, setWorkType] = useState('all');
  const [results, setResults] = useState<Work[] | null>(null);

  // 機能追加: 検索サジェスト・履歴用State
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionList, setSuggestionList] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 予測変換用のキーワード候補（ダミーデータ）
  const predictionKeywords = [
    'イラスト', 'アイコン', 'アニメーション', 'アート',
    'Webデザイン', 'Webサイト', 'WordPress', 'UI/UX',
    'グラフィック', 'ロゴ', 'ポスター', '名刺',
    '写真', 'ポートレート', '風景', 'プロダクトデザイン',
    '3D', 'ファンタジー', 'SF', '水彩', '厚塗り',
    'ゲーム', 'パズル', 'ZINE'
  ];

  // 履歴をlocalStorageから取得
  const getHistory = (): string[] => {
    const history = localStorage.getItem('search_history');
    return history ? JSON.parse(history) : [];
  };

  // 履歴を保存
  const saveHistory = (val: string) => {
    if (!val.trim()) return;
    let history = getHistory();
    // 重複排除して先頭に追加
    history = history.filter(item => item !== val);
    history.unshift(val);
    // 最大5件
    if (history.length > 5) history.pop();
    localStorage.setItem('search_history', JSON.stringify(history));
  };

  // 入力欄フォーカス時
  const handleFocus = () => {
    if (!keyword) {
      // 空欄なら履歴を表示
      setSuggestionList(getHistory());
    } else {
      // 入力済みなら予測変換
      filterPredictions(keyword);
    }
    setShowSuggestions(true);
  };

  // 入力変更時
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);

    if (val) {
      filterPredictions(val);
    } else {
      setSuggestionList(getHistory());
    }
    setShowSuggestions(true);
  };

  // 予測変換ロジック
  const filterPredictions = (val: string) => {
    const filtered = predictionKeywords.filter(word =>
      word.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestionList(filtered);
  };

  // サジェストクリック時
  const handleSuggestionClick = (word: string) => {
    setKeyword(word);
    setShowSuggestions(false);
  };

  // 検索実行
  const handleSearch = () => {
    let foundWorks = searchWorks(keyword, category);

    // 作品タイプでフィルタリング
    if (workType !== 'all') {
      foundWorks = foundWorks.filter(work => work.type === workType);
    }

    setResults(foundWorks);
    saveHistory(keyword);
    setShowSuggestions(false);
  };

  // 作品タイプ変更時
  const handleWorkTypeChange = (type: string) => {
    setWorkType(type);

    // すでに検索結果がある場合は再フィルタリング
    if (results) {
      let foundWorks = searchWorks(keyword, category);
      if (type !== 'all') {
        foundWorks = foundWorks.filter(work => work.type === type);
      }
      setResults(foundWorks);
    }
  };

  // 外側クリックで閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section id="find-works" className="page-section active-page find-works-section">
      <h2>作品ギャラリー</h2>

      {/* 作品タイプフィルター */}
      <WorkTypeFilter
        selectedType={workType}
        onTypeChange={handleWorkTypeChange}
      />

      <div className="search-and-filter">
        <div className="search-form-group" style={{ position: 'relative' }} ref={wrapperRef}>
          <label htmlFor="keyword-search">キーワード検索</label>
          <input
            type="text"
            id="keyword-search"
            placeholder="タイトル、タグ、作者名..."
            value={keyword}
            onChange={handleChange}
            onFocus={handleFocus}
            autoComplete="off"
          />

          {/* 機能追加: サジェストリスト表示 */}
          {showSuggestions && suggestionList.length > 0 && (
            <ul className="search-suggestions-list">
              {suggestionList.map((item, index) => (
                <li key={index} onClick={() => handleSuggestionClick(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="search-form-group">
          <label htmlFor="category-select">カテゴリ</label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">すべて</option>
            <option value="イラスト">イラスト</option>
            <option value="写真">写真</option>
            <option value="3D">3D</option>
            <option value="ファンタジー">ファンタジー</option>
            <option value="アニメーション">アニメーション</option>
            <option value="ゲーム">ゲーム</option>
            <option value="Webデザイン">Webデザイン</option>
            <option value="ZINE">ZINE</option>
          </select>
        </div>
        <button id="search-button" className="search-button" onClick={handleSearch}>
          検索
        </button>
      </div>

      {/* 検索結果の表示 */}
      {results && (
        <WorkGrid
          works={results}
          emptyMessage="該当する作品は見つかりませんでした。"
        />
      )}
    </section>
  );
};

export default SearchPage;