"use client";
import { useState, useEffect } from "react";

const KEY = "ytutor-profile";
const EVENT = "ytutor-profile-change";

export type Profile = {
  name: string;
  email: string;
  institution: string;
  subject: string;
  joinDate: string;
};

const DEFAULT: Profile = {
  name: "홍길동",
  email: "hong@ybm.co.kr",
  institution: "YBM 어학원 강남점",
  subject: "영어 (독해, 문법)",
  joinDate: "2024년 3월 1일",
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(DEFAULT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem(KEY);
        setProfile(stored ? { ...DEFAULT, ...JSON.parse(stored) } : DEFAULT);
      } catch {
        setProfile(DEFAULT);
      }
    };
    load();
    setReady(true);
    window.addEventListener(EVENT, load);
    return () => window.removeEventListener(EVENT, load);
  }, []);

  const save = (p: Profile) => {
    localStorage.setItem(KEY, JSON.stringify(p));
    setProfile(p);
    window.dispatchEvent(new Event(EVENT));
  };

  return { profile, save, ready };
}
