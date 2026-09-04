// src/hooks/useDrafts.ts
import { useState, useCallback, useEffect } from 'react';
import { DraftWork } from '../types';

const STORAGE_KEY = 'pixela_drafts';

function loadAllDrafts(): DraftWork[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DraftWork[]) : [];
  } catch {
    return [];
  }
}

function saveAllDrafts(drafts: DraftWork[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

export function useDrafts(authorId: string | undefined) {
  const [drafts, setDrafts] = useState<DraftWork[]>([]);

  // 現在のユーザーの下書きだけ返す
  useEffect(() => {
    if (!authorId) {
      setDrafts([]);
      return;
    }
    const all = loadAllDrafts();
    setDrafts(all.filter((d) => d.authorId === authorId));
  }, [authorId]);

  /** 下書きを保存する（draftId が指定されていれば上書き、なければ新規作成） */
  const saveDraft = useCallback(
    (data: Omit<DraftWork, 'draftId' | 'savedAt' | 'authorId'> & { draftId?: string }): DraftWork => {
      if (!authorId) throw new Error('ログインが必要です');
      const all = loadAllDrafts();
      const draftId = data.draftId ?? `draft-${Date.now()}`;
      const savedAt = new Date().toISOString();
      const newDraft: DraftWork = { ...data, draftId, savedAt, authorId };

      const existingIndex = all.findIndex((d) => d.draftId === draftId);
      let updated: DraftWork[];
      if (existingIndex >= 0) {
        updated = all.map((d, i) => (i === existingIndex ? newDraft : d));
      } else {
        updated = [newDraft, ...all];
      }

      saveAllDrafts(updated);
      setDrafts(updated.filter((d) => d.authorId === authorId));
      return newDraft;
    },
    [authorId]
  );

  /** 指定 draftId の下書きを取得 */
  const loadDraft = useCallback((draftId: string): DraftWork | undefined => {
    return loadAllDrafts().find((d) => d.draftId === draftId);
  }, []);

  /** 指定 draftId の下書きを削除 */
  const deleteDraft = useCallback(
    (draftId: string): void => {
      const all = loadAllDrafts();
      const updated = all.filter((d) => d.draftId !== draftId);
      saveAllDrafts(updated);
      setDrafts(updated.filter((d) => d.authorId === authorId));
    },
    [authorId]
  );

  return { drafts, saveDraft, loadDraft, deleteDraft };
}
