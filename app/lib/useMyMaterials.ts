"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "ytuter_my_materials";

export type SavedMaterial = {
  id: string;
  typeId: string;
  typeLabel: string;
  schoolLevel: string;
  grade: string;
  studentLevel: string;
  topic: string;
  count: string;
  bookId?: string;
  bookTitle?: string;
  createdAt: string;
};

export function useMyMaterials() {
  const [materials, setMaterials] = useState<SavedMaterial[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setMaterials(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const save = useCallback((mat: Omit<SavedMaterial, "id" | "createdAt">) => {
    const next: SavedMaterial = {
      ...mat,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMaterials(prev => {
      const updated = [next, ...prev];
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
    return next.id;
  }, []);

  const remove = useCallback((id: string) => {
    setMaterials(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { materials, save, remove };
}
