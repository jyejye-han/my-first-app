"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMyClassBooks } from "../lib/useMyClassBooks";
import { useAuth } from "../lib/useAuth";
import { BOOK_DB } from "../lib/bookDb";
import TextbookDetailModal from "./TextbookDetailModal";

type ResourceType = "MP3" | "강의용PPT" | "기타" | "보충문제" | "본문파일" | "워크시트" | "정답&해설" | "온라인 수업자료";

type Book = {
  id: string;
  title: string;
  author: string;
  levelGroup: "초등" | "중등" | "고등" | "성인";
  category: string;
  emoji: string;
  image?: string;
  publishDate: string;
  description: string;
  isNew?: boolean;
};

const BOOKS: Book[] = [
  {
    id: "1", title: "Reading Prime 1", author: "YBM 편집부",
    levelGroup: "중등", category: "독해", emoji: "📘",
    image: "/images/books/reading-prime-1.jpg",
    publishDate: "2025.03",
    description: "중학교 1학년을 위한 체계적 독해 훈련서. 다양한 지문으로 실전 독해 실력을 키웁니다.",
  },
  {
    id: "2", title: "알리GO 올리GO 서술형 쓰기 2", author: "YBM 편집부",
    levelGroup: "중등", category: "쓰기", emoji: "📗",
    image: "/images/books/aligo-oligo.jpg",
    publishDate: "2025.01", isNew: true,
    description: "중학영어 내신대비 서술형 쓰기 완성. 핵심 문법·표현을 활용한 단계별 쓰기 훈련으로 서술형 고득점을 목표로 합니다.",
  },
  {
    id: "3", title: "Phonics NOW 1", author: "YBM 편집부",
    levelGroup: "초등", category: "파닉스", emoji: "📙",
    image: "/images/books/phonics-now-1.jpg",
    publishDate: "2024.09",
    description: "AR 기능 탑재 초등 파닉스 완성. Single Letters부터 체계적으로 영어 소리와 철자를 익힙니다.",
  },
  {
    id: "4", title: "연타 문법+쓰기 Level 1", author: "YBM 편집부",
    levelGroup: "중등", category: "문법", emoji: "📕",
    image: "/images/books/image-yeontar-grammar.jpg",
    publishDate: "2025.02", isNew: true,
    description: "포인트 30개로 중학영어 문법·쓰기 마스터. 문법 포인트와 쓰기를 연결하여 연속으로 타파합니다.",
  },
  {
    id: "5", title: "부스터 보카", author: "YBM 편집부",
    levelGroup: "고등", category: "어휘", emoji: "📓",
    image: "/images/books/booster-voca.jpg",
    publishDate: "2024.06",
    description: "어디서나 술술 풀리는 영단어! 수능·내신 핵심 어휘를 CLASS CARD 앱 연동으로 학습합니다.",
  },
  {
    id: "6", title: "Reading Prime 2", author: "YBM 편집부",
    levelGroup: "중등", category: "독해", emoji: "📔",
    image: "/images/books/reading-prime-2.jpg",
    publishDate: "2024.11",
    description: "중학교 2학년 수준의 심화 독해. 논리적 사고력과 독해력을 동시에 키웁니다.",
  },
  {
    id: "7", title: "Business English Master", author: "John Kim",
    levelGroup: "성인", category: "회화", emoji: "📒",
    publishDate: "2025.04",
    description: "비즈니스 현장에서 바로 쓰는 실용 영어. 미팅·이메일·프레젠테이션 표현 총정리.",
  },
  {
    id: "8", title: "개념 연산 SOS 중등 수학 3·1", author: "YBM 편집부",
    levelGroup: "중등", category: "수학", emoji: "📃",
    image: "/images/books/gaenyeom-sos.jpg",
    publishDate: "2025.05", isNew: true,
    description: "2022 개정 교육과정. 연산 반복 학습으로 개념을 확립하는 진도북+드릴북 구성의 중등 수학 교재.",
  },
  {
    id: "9", title: "중학 영어 완성 1", author: "서연희 외",
    levelGroup: "중등", category: "종합", emoji: "📑",
    publishDate: "2024.08",
    description: "중학교 1학년 전 영역 종합 교재. 문법·독해·듣기·어휘를 균형 있게 학습합니다.",
  },
  {
    id: "10", title: "Booster 유형독해", author: "YBM 편집부",
    levelGroup: "고등", category: "독해", emoji: "📰",
    image: "/images/books/booster-reading.jpg",
    publishDate: "2025.02",
    description: "수능영어 1등급 프로젝트. 17번의 수능모의 분석 및 32개 유형별 제시, 실전처럼 모의고사 총 3회 수록.",
  },
  {
    id: "11", title: "빈출구문 상승", author: "YBM 편집부",
    levelGroup: "고등", category: "구문", emoji: "📄",
    image: "/images/books/binchul-gumun.jpg",
    publishDate: "2024.12",
    description: "수능대비 독해실력 상승 프로젝트! 53개 핵심구문 포인트를 통해 수능 영어 독해 실력을 완성합니다.",
  },
  {
    id: "12", title: "Benchmark Reading Starter 1", author: "YBM 편집부",
    levelGroup: "초등", category: "독해", emoji: "📗",
    image: "/images/books/benchmark-reading-starter-1.jpg",
    publishDate: "2024.03",
    description: "20 words 수준의 초등 입문 독해서. Benchmark Education과 협력한 리딩 프로그램으로 체계적인 읽기 능력을 기릅니다.",
  },
  {
    id: "13", title: "Benchmark Reading Starter 3", author: "YBM 편집부",
    levelGroup: "초등", category: "독해", emoji: "📘",
    image: "/images/books/benchmark-reading-starter-3.jpg",
    publishDate: "2024.03",
    description: "30 words 수준의 초등 독해서. 다양한 논픽션 주제의 지문으로 사고력과 독해력을 동시에 향상시킵니다.",
  },
  {
    id: "14", title: "Booster 구문독해", author: "YBM 편집부",
    levelGroup: "고등", category: "구문", emoji: "📒",
    image: "/images/books/booster-grammar.jpg",
    publishDate: "2025.01",
    description: "수능영어 1등급 프로젝트. 63개 핵심 구문 패턴 분석 및 고난도 TEST 3회 수록. 구문 독해의 완성.",
  },
  {
    id: "15", title: "Write NOW 1", author: "YBM 편집부",
    levelGroup: "초등", category: "쓰기", emoji: "✏️",
    image: "/images/books/write-now-1.jpg",
    publishDate: "2025.03", isNew: true,
    description: "A Guide to Writing Sentences. 초등 영어 쓰기 입문서로 문장 구성 원리를 재미있게 익힙니다.",
  },
  {
    id: "16", title: "Listening Booster 30", author: "YBM 편집부",
    levelGroup: "고등", category: "듣기", emoji: "🎧",
    image: "/images/books/listening-booster-30.jpg",
    publishDate: "2025.02", isNew: true,
    description: "수능영어 1등급 프로젝트. EBS 듣기 교재 집필진이 만든 영어듣기 모의고사 30회 완성 교재.",
  },
];

const BOOK_RESOURCES: Record<string, ResourceType[]> = {
  "1":  ["MP3", "본문파일", "워크시트", "정답&해설"],
  "2":  ["강의용PPT", "보충문제", "워크시트", "정답&해설"],
  "3":  ["MP3", "강의용PPT", "온라인 수업자료", "정답&해설"],
  "4":  ["강의용PPT", "보충문제", "워크시트", "정답&해설"],
  "5":  ["MP3", "보충문제", "정답&해설", "온라인 수업자료"],
  "6":  ["MP3", "본문파일", "워크시트", "정답&해설"],
  "7":  ["MP3", "강의용PPT", "온라인 수업자료", "기타"],
  "8":  ["보충문제", "워크시트", "정답&해설"],
  "9":  ["MP3", "보충문제", "본문파일", "워크시트", "정답&해설"],
  "10": ["본문파일", "강의용PPT", "워크시트", "정답&해설"],
  "11": ["본문파일", "강의용PPT", "정답&해설"],
  "12": ["MP3", "본문파일", "정답&해설", "온라인 수업자료"],
  "13": ["MP3", "본문파일", "워크시트", "정답&해설"],
  "14": ["본문파일", "강의용PPT", "워크시트", "정답&해설"],
  "15": ["보충문제", "본문파일", "정답&해설", "온라인 수업자료"],
  "16": ["MP3", "정답&해설", "온라인 수업자료"],
};

const LEVEL_TABS = ["전체", "초등", "중등", "고등"] as const;
type LevelTab = (typeof LEVEL_TABS)[number];

function ResourceBadge({ type }: { type: ResourceType }) {
  const getIcon = () => {
    switch (type) {
      case "MP3":
        return (
          <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] shrink-0">
            <path d="M3 9a6 6 0 0 0 12 0" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <rect x="1.5" y="9" width="3" height="4.5" rx="1" fill="#ef4444"/>
            <rect x="13.5" y="9" width="3" height="4.5" rx="1" fill="#ef4444"/>
          </svg>
        );
      case "강의용PPT":
        return (
          <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] shrink-0">
            <rect x="1" y="2.5" width="16" height="10" rx="1.5" fill="#64748b"/>
            <rect x="2.5" y="4" width="13" height="7" rx="0.5" fill="white"/>
            <rect x="5" y="5.5" width="8" height="1" rx="0.5" fill="#3b82f6"/>
            <rect x="5" y="7.5" width="5" height="1" rx="0.5" fill="#94a3b8"/>
            <path d="M0.5 14h17" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <path d="M6.5 14l1 2M11.5 14l-1 2" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case "기타":
        return (
          <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] shrink-0">
            <circle cx="9" cy="9" r="7.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2"/>
            <path d="M9 9 L9 1.5 A7.5 7.5 0 0 1 16.5 9 Z" fill="#94a3b8"/>
          </svg>
        );
      case "보충문제":
        return (
          <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] shrink-0">
            <rect x="2" y="1" width="12" height="16" rx="1.2" fill="#fb923c"/>
            <path d="M5 6h7M5 9h7M5 12h5" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <circle cx="14" cy="14" r="3.5" fill="#ef4444"/>
            <path d="M12.5 14h3M14 12.5v3" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case "본문파일":
        return (
          <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] shrink-0">
            <path d="M1.5 4H9v12L1.5 14V4z" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.1"/>
            <path d="M9 4h7.5v10L9 16V4z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.1"/>
            <path d="M3.5 7h3.5M3.5 9.5h2.5" stroke="#3b82f6" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
            <path d="M11 7h3.5M11 9.5h2.5" stroke="#3b82f6" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case "워크시트":
        return (
          <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] shrink-0">
            <rect x="1.5" y="11" width="3.5" height="5.5" rx="0.5" fill="#ef4444"/>
            <rect x="7" y="7" width="3.5" height="9.5" rx="0.5" fill="#3b82f6"/>
            <rect x="12.5" y="3" width="3.5" height="13.5" rx="0.5" fill="#ef4444"/>
            <path d="M1 17.5h16" stroke="#64748b" strokeWidth="1" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case "정답&해설":
        return (
          <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] shrink-0">
            <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.4" fill="none"/>
            <circle cx="9" cy="9" r="5" stroke="#ef4444" strokeWidth="1.4" fill="none"/>
            <circle cx="9" cy="9" r="2" fill="#ef4444"/>
          </svg>
        );
      case "온라인 수업자료":
        return (
          <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] shrink-0">
            <circle cx="9" cy="9" r="7.5" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.3"/>
            <ellipse cx="9" cy="9" rx="3.8" ry="7.5" stroke="#3b82f6" strokeWidth="1" fill="none"/>
            <path d="M1.5 9h15M3 5.5h12M3 12.5h12" stroke="#3b82f6" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
          </svg>
        );
    }
  };
  return (
    <span className="flex items-center gap-1 text-[11px] text-slate-600 font-medium whitespace-nowrap">
      {getIcon()}
      {type}
    </span>
  );
}

export default function TextbooksClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { ids: pinned, addBook, removeBook, hasBook } = useMyClassBooks();
  const [activeTab, setActiveTab] = useState<LevelTab>("전체");
  const [showGuide, setShowGuide] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [loginToast, setLoginToast] = useState(false);
  const [detailBookId, setDetailBookId] = useState<string | null>(null);

  const query   = searchParams.get("q") ?? "";
  const urlLevels = (searchParams.get("levels") ?? "").split(",").filter(Boolean);

  const togglePin = (id: string) => {
    if (!isLoggedIn) {
      setLoginToast(true);
      setTimeout(() => { setLoginToast(false); router.push("/login?next=/my-class"); }, 1500);
      return;
    }
    if (hasBook(id)) {
      removeBook(id);
    } else {
      addBook(id);
      setShowGuide(true);
      setTimeout(() => setShowGuide(false), 4000);
    }
  };

  const filtered = BOOKS
    .filter((b) => {
      const matchTab   = activeTab === "전체" || b.levelGroup === activeTab;
      const matchQuery = !query ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase());
      const matchLevel = urlLevels.length === 0 || urlLevels.includes(b.levelGroup);
      return matchTab && matchQuery && matchLevel;
    })
    .sort((a, b) => {
      if (sortByDate) {
        return b.publishDate.localeCompare(a.publishDate);
      }
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    });

  const pinnedBooks = isLoggedIn ? BOOKS.filter((b) => pinned.includes(b.id)) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* 로그인 필요 토스트 */}
      {loginToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0-6v2m0-10a9 9 0 100 18 9 9 0 000-18z" />
          </svg>
          로그인이 필요합니다. 로그인 페이지로 이동합니다.
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800">교재</h1>
        <p className="text-slate-500 text-sm mt-1">강사 전용 교재 목록을 확인하세요</p>
      </div>

      {/* ── 내교재 고정 영역 ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">📌</span>
          <span className="text-sm font-bold text-slate-700">내교재</span>
          {isLoggedIn && <span className="text-xs text-slate-400 ml-1">— 마이클래스 담기 버튼으로 추가됩니다</span>}
          {/* 마이클래스 바로가기 */}
          {isLoggedIn && pinnedBooks.length > 0 && (
            <Link
              href="/my-class"
              className="ml-auto flex items-center gap-1 text-xs text-[#1B3A6B] font-semibold hover:underline"
            >
              마이클래스 바로가기
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {!isLoggedIn ? (
          <div className="flex items-center gap-3 py-2 pl-1">
            <p className="text-xs text-slate-400">로그인 후 이용 가능합니다.</p>
            <Link
              href="/login?next=/textbooks"
              className="flex items-center gap-1 text-xs font-semibold text-white bg-[#1B3A6B] hover:bg-[#163060] px-3 py-1.5 rounded-lg transition-colors"
            >
              로그인
            </Link>
          </div>
        ) : pinnedBooks.length === 0 ? (
          <p className="text-xs text-slate-400 py-2 pl-1">
            담은 교재가 없습니다. 아래 교재에서 <strong className="text-slate-500">마이클래스 담기</strong> 버튼을 눌러 추가해 보세요.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-3">
              {pinnedBooks.map((b) => (
                <div key={b.id} className="relative group">
                  {/* 클릭 → 마이클래스 이동 */}
                  <Link
                    href="/my-class"
                    className="flex flex-col items-center gap-1 w-16 p-2 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
                    title="마이클래스에서 확인하기"
                  >
                    {b.image ? (
                      <img src={b.image} alt={b.title} className="w-10 h-14 object-cover rounded shadow-sm" />
                    ) : (
                      <span className="text-2xl">{b.emoji}</span>
                    )}
                    <span className="text-[10px] font-semibold text-blue-800 text-center leading-tight line-clamp-2">{b.title}</span>
                  </Link>
                  <button
                    onClick={() => togglePin(b.id)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-slate-400 hover:bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* 담기 직후 안내 말풍선 */}
            {showGuide && (
              <div className="mt-4 relative">
                {/* 말풍선 꼬리 */}
                <div className="absolute -top-2 left-8 w-4 h-4 bg-red-500 rotate-45 rounded-sm" />
                <div className="relative flex items-center gap-3 px-4 py-3.5 bg-red-500 rounded-2xl shadow-lg">
                  <span className="text-2xl shrink-0 animate-bounce">📚</span>
                  <p className="text-sm text-white font-semibold leading-snug flex-1">
                    마이클래스에서 더 다양한 기능을 활용해보세요!<br />
                    <span className="text-red-100 text-xs font-normal">어휘마법사 · 커넥팅북 · 수업안 만들기</span>
                  </p>
                  <Link
                    href="/my-class"
                    className="shrink-0 flex items-center gap-1 text-xs font-black text-red-500 bg-white px-3 py-2 rounded-xl hover:bg-red-50 transition-colors whitespace-nowrap shadow-sm"
                  >
                    바로가기
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  {/* 닫기 */}
                  <button
                    onClick={() => setShowGuide(false)}
                    className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── 레벨 탭 필터 ── */}
      <div className="flex gap-2 mb-5">
        {LEVEL_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
              activeTab === tab
                ? "bg-[#1B3A6B] text-white border-[#1B3A6B] shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setSortByDate((v) => !v)}
            className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
              sortByDate ? "text-[#1B3A6B]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            출간일순
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M12 8v12M8 16l4 4 4-4" />
            </svg>
          </button>
          <span className="text-xs text-slate-400">{filtered.length}권</span>
        </div>
      </div>

      {/* ── 교재 리스트 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((book, idx) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 group overflow-hidden"
          >
            <Link href={`/textbooks/${book.id}`} className="block p-5">
              <div className="flex gap-4">
                {/* 표지 이미지 or 이모지 */}
                {book.image ? (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-[67px] h-24 object-cover rounded-lg shrink-0 shadow-sm border border-slate-100"
                  />
                ) : (
                  <div className="text-5xl shrink-0 w-[67px] flex items-center justify-center">{book.emoji}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-800 group-hover:text-blue-700 text-sm leading-snug">
                      {book.title}
                    </p>
                    {book.isNew && idx < 3 && (
                      <span className="shrink-0 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                    )}
                  </div>
                  {/* 저자 / 출간일 */}
                  <p className="text-xs text-slate-500 mt-1">
                    {book.author} · <span className="text-slate-400">{book.publishDate}</span>
                  </p>
                  {/* 한줄소개 */}
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {book.description}
                  </p>
                  {/* 태그 */}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{book.levelGroup}</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{book.category}</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 제공 자료 */}
            {(BOOK_RESOURCES[book.id] ?? []).length > 0 && (
              <div className="px-4 pb-3 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {(BOOK_RESOURCES[book.id] ?? []).map((r) => (
                    <ResourceBadge key={r} type={r} />
                  ))}
                </div>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="flex items-center gap-1.5 px-4 pb-4">
              {/* 마이클래스 담기 + 툴팁 */}
              <div className="relative group/tip">
                <button
                  onClick={() => togglePin(book.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all leading-tight ${
                    isLoggedIn && pinned.includes(book.id)
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-[#1B3A6B] hover:bg-[#163060] text-white"
                  }`}
                >
                  {isLoggedIn && pinned.includes(book.id) ? "✓ 담김" : "마이클래스 담기"}
                </button>
                {/* 툴팁 */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-slate-800 text-white text-[11px] rounded-xl px-3 py-2.5 leading-relaxed opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity duration-150 z-20 text-center shadow-xl whitespace-normal">
                  마이클래스에 교재를 담아서<br />한번에 서비스를 이용해보세요 📚
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                </div>
              </div>
              {/* 교재 자세히 보기 */}
              <button
                onClick={() => setDetailBookId(book.id)}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                자세히 보기
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">검색 결과가 없습니다</p>
        </div>
      )}

      {/* 교재 상세 모달 */}
      {detailBookId && BOOK_DB[detailBookId] && (
        <TextbookDetailModal
          book={BOOK_DB[detailBookId]}
          onClose={() => setDetailBookId(null)}
          onMyClassToggle={() => togglePin(detailBookId)}
          isPinned={isLoggedIn && pinned.includes(detailBookId)}
        />
      )}
    </div>
  );
}
