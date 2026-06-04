"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "ytuter_myclass_book_ids";
const DEFAULTS = ["1", "3"]; // Reading Prime 1, Phonics NOW 1

export function useMyClassBooks() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      setIds(stored !== null ? JSON.parse(stored) : DEFAULTS);
      if (stored === null) localStorage.setItem(KEY, JSON.stringify(DEFAULTS));
    } catch {
      setIds(DEFAULTS);
    }
    setReady(true);
  }, []);

  const addBook = useCallback((id: string) => {
    setIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeBook = useCallback((id: string) => {
    setIds(prev => {
      const next = prev.filter(x => x !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const hasBook = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, addBook, removeBook, hasBook, ready };
}
