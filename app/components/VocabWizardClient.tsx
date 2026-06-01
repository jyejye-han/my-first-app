"use client";
import { useState } from "react";

/* ─── Types ─── */
type Book = {
  id: string; title: string; subtitle: string; emoji: string;
  image?: string;
  levelGroup: string; category: string; publisher: string; publishDate: string;
  bg: string;
};

/* ─── 실제 이미지 기반 교재 ─── */
const BOOKS: Book[] = [
  { id: "b1",  title: "부스터 보카",                   subtitle: "수능·내신 핵심 어휘 2,000개, CLASS CARD 앱 연동", image: "/images/books/booster-voca.jpg",                  emoji: "📓", levelGroup: "고등", category: "어휘",      publisher: "YBM 편집부", publishDate: "2024-06-01", bg: "from-amber-400 to-orange-600" },
  { id: "b2",  title: "Booster 유형독해",               subtitle: "수능영어 1등급 프로젝트, 32개 유형별 전략 제시",  image: "/images/books/booster-reading.jpg",               emoji: "📰", levelGroup: "고등", category: "독해",      publisher: "YBM 편집부", publishDate: "2025-02-01", bg: "from-yellow-500 to-amber-700" },
  { id: "b3",  title: "Booster 구문독해",               subtitle: "수능영어 1등급 프로젝트, 63개 핵심구문 패턴",     image: "/images/books/booster-grammar.jpg",               emoji: "📒", levelGroup: "고등", category: "문법/구문", publisher: "YBM 편집부", publishDate: "2025-01-01", bg: "from-orange-400 to-red-600" },
  { id: "b4",  title: "빈출구문 상승",                  subtitle: "수능대비 독해실력 상승 프로젝트! 53개 핵심구문",   image: "/images/books/binchul-gumun.jpg",                 emoji: "📄", levelGroup: "고등", category: "문법/구문", publisher: "YBM 편집부", publishDate: "2024-12-01", bg: "from-orange-500 to-yellow-600" },
  { id: "b5",  title: "Listening Booster 30",           subtitle: "EBS 듣기 교재 집필진, 영어듣기 모의고사 30회",   image: "/images/books/listening-booster-30.jpg",          emoji: "🎧", levelGroup: "고등", category: "듣기",      publisher: "YBM 편집부", publishDate: "2025-02-01", bg: "from-blue-500 to-indigo-700" },
  { id: "b6",  title: "Reading Prime 1",                subtitle: "중등 독해 6단계 시리즈, 다양한 주제의 지문 수록", image: "/images/books/reading-prime-1.jpg",               emoji: "📘", levelGroup: "중등", category: "독해",      publisher: "YBM 편집부", publishDate: "2025-03-01", bg: "from-blue-400 to-indigo-600" },
  { id: "b7",  title: "Reading Prime 2",                subtitle: "중등 독해 6단계 시리즈, 심화 독해력 완성",       image: "/images/books/reading-prime-2.jpg",               emoji: "📔", levelGroup: "중등", category: "독해",      publisher: "YBM 편집부", publishDate: "2024-11-01", bg: "from-sky-400 to-blue-600" },
  { id: "b8",  title: "알리GO 올리GO 서술형 쓰기 2",   subtitle: "중학영어 내신대비 서술형 쓰기 완성",             image: "/images/books/aligo-oligo.jpg",                   emoji: "📗", levelGroup: "중등", category: "쓰기",      publisher: "YBM 편집부", publishDate: "2025-01-01", bg: "from-purple-400 to-violet-600" },
  { id: "b9",  title: "연타 문법+쓰기 Level 1",        subtitle: "포인트 30개로 중학영어 문법·쓰기 마스터",        image: "/images/books/image-yeontar-grammar.jpg",         emoji: "📕", levelGroup: "중등", category: "문법/구문", publisher: "YBM 편집부", publishDate: "2025-02-01", bg: "from-slate-400 to-slate-600" },
  { id: "b10", title: "Benchmark Reading Starter 1",   subtitle: "YBM×Benchmark Education 공동 개발 초등 리딩",  image: "/images/books/benchmark-reading-starter-1.jpg",   emoji: "📗", levelGroup: "초등", category: "독해",      publisher: "YBM 편집부", publishDate: "2024-03-01", bg: "from-green-400 to-emerald-600" },
  { id: "b11", title: "Benchmark Reading Starter 3",   subtitle: "30 words 수준 논픽션 지문, 사고력·독해력 향상",  image: "/images/books/benchmark-reading-starter-3.jpg",   emoji: "📘", levelGroup: "초등", category: "독해",      publisher: "YBM 편집부", publishDate: "2024-03-01", bg: "from-teal-400 to-green-600" },
  { id: "b12", title: "Phonics NOW 1",                 subtitle: "AR 기능 탑재 초등 파닉스 완성 교재",             image: "/images/books/phonics-now-1.jpg",                 emoji: "📙", levelGroup: "초등", category: "어휘",      publisher: "YBM 편집부", publishDate: "2024-09-01", bg: "from-orange-400 to-amber-600" },
  { id: "b13", title: "Write NOW 1",                   subtitle: "A Guide to Writing Sentences, 초등 쓰기 입문",  image: "/images/books/write-now-1.jpg",                   emoji: "✏️", levelGroup: "초등", category: "쓰기",      publisher: "YBM 편집부", publishDate: "2025-03-01", bg: "from-pink-400 to-rose-600" },
];

const LEVELS = ["초등", "중등", "고등"];
const CATEGORIES = ["ELT", "교과서", "단기 특강", "독해", "듣기", "모의고사", "문법/구문", "수능대비", "수험서", "쓰기", "어휘", "평가문제집/자습서"];
const SORT_OPTIONS = ["출간일순", "인기순", "도서명순"] as const;
const QUIZ_TYPES = [
  { id: "read",   label: "읽고 푸는\n어휘 문제 만들기",  sub: "시험지, 정답지 생성",           bg: "bg-slate-800 hover:bg-slate-700" },
  { id: "listen", label: "듣고 푸는\n어휘 문제 만들기",  sub: "시험지, 정답지 + MP3 생성",     bg: "bg-red-500 hover:bg-red-400" },
  { id: "online", label: "온라인 단어\n시험지 만들기",    sub: "학습/테스트/수업 모드 지원",    bg: "bg-blue-600 hover:bg-blue-500" },
];

const MAX_BOOKS = 3;

export default function VocabWizardClient() {
  const [view, setView]                   = useState<"list" | "wizard">("list");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [filterOpen, setFilterOpen]       = useState(true);
  const [query, setQuery]                 = useState("");
  const [levelFilters, setLevelFilters]   = useState<string[]>([]);
  const [catFilters, setCatFilters]       = useState<string[]>([]);
  const [sortBy, setSortBy]               = useState<typeof SORT_OPTIONS[number]>("출간일순");
  const [listQuery, setListQuery]         = useState("");
  const [selectedType, setSelectedType]   = useState<string | null>(null);

  /* ── filter + sort ── */
  const filtered = BOOKS.filter((b) => {
    const q = (query + listQuery).toLowerCase();
    if (q && !b.title.toLowerCase().includes(q) && !b.subtitle.toLowerCase().includes(q)) return false;
    if (levelFilters.length && !levelFilters.includes(b.levelGroup)) return false;
    if (catFilters.length && !catFilters.includes(b.category)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "출간일순") return b.publishDate.localeCompare(a.publishDate);
    if (sortBy === "도서명순") return a.title.localeCompare(b.title);
    return 0;
  });

  const toggleLevel = (v: string) => setLevelFilters((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);
  const toggleCat   = (v: string) => setCatFilters((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);
  const resetFilters = () => { setLevelFilters([]); setCatFilters([]); setQuery(""); setListQuery(""); };

  const startWizard = (bookId: string) => {
    if (!selectedBooks.includes(bookId)) {
      setSelectedBooks((p) => [...p.slice(0, MAX_BOOKS - 1), bookId]);
    }
    setView("wizard");
  };
  const removeBook  = (bookId: string) => setSelectedBooks((p) => p.filter((id) => id !== bookId));
  const addSlotClick = () => setView("list");

  const firstBook = BOOKS.find((b) => b.id === selectedBooks[0]);

  /* ══════════════════ WIZARD VIEW ══════════════════ */
  if (view === "wizard") {
    return (
      <div className="min-h-screen bg-slate-100">
        {/* STEP header */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3">
          <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded">STEP 1</span>
          <span className="text-sm font-semibold text-slate-700">교재 선택</span>
          {firstBook && (
            <>
              <span className="text-slate-300">·</span>
              <span className="text-sm text-red-500 font-semibold">{firstBook.title}</span>
            </>
          )}
          <button
            onClick={() => setView("list")}
            className="ml-auto text-xs text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            ← 목록으로
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-snug">
              출제할 교재를 선택해주세요.
            </h2>
            <p className="text-slate-500 mt-1 text-sm">최대 3권까지 복수 선택 가능합니다.</p>
          </div>

          {/* Book slots */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Array.from({ length: MAX_BOOKS }).map((_, i) => {
              const bookId = selectedBooks[i];
              const book   = BOOKS.find((b) => b.id === bookId);
              return book ? (
                /* Filled slot */
                <div key={i} className="relative bg-white rounded-2xl border-2 border-blue-400 p-5 flex flex-col items-center gap-3 shadow-md">
                  <button
                    onClick={() => removeBook(book.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-slate-200 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center text-slate-500 transition-colors text-sm font-bold"
                  >
                    ×
                  </button>
                  {book.image ? (
                    <img src={book.image} alt={book.title} className="w-28 h-36 object-cover rounded-xl shadow-md border border-slate-100" />
                  ) : (
                    <div className={`w-28 h-36 bg-gradient-to-br ${book.bg} rounded-xl flex items-center justify-center text-6xl shadow-inner select-none`}>
                      {book.emoji}
                    </div>
                  )}
                  <p className="text-xs font-semibold text-slate-700 text-center leading-snug line-clamp-2">{book.title}</p>
                </div>
              ) : (
                /* Empty slot */
                <button
                  key={i}
                  onClick={addSlotClick}
                  className="bg-slate-200/70 hover:bg-blue-50 hover:border-blue-300 rounded-2xl border-2 border-dashed border-slate-300 transition-all flex flex-col items-center justify-center gap-3 py-10 group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-slate-400 group-hover:border-blue-400 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-400 group-hover:text-blue-500 text-center leading-relaxed transition-colors">
                    교재를 추가하시려면<br />클릭해주세요.
                  </p>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-300 mb-8" />

          {/* Type selection */}
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-black text-slate-800">출제 유형을 선택해주세요.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {QUIZ_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`${type.bg} text-white rounded-2xl px-6 py-8 text-center transition-all ${
                  selectedType === type.id ? "ring-4 ring-white/50 scale-[1.02]" : "hover:scale-[1.01]"
                }`}
              >
                <p className="text-lg font-black leading-snug whitespace-pre-line mb-2">{type.label}</p>
                <p className="text-sm text-white/70">({type.sub})</p>
              </button>
            ))}
          </div>

          {/* Confirm button */}
          {selectedType && selectedBooks.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button className="bg-[#1B3A6B] hover:bg-[#163060] text-white px-10 py-3.5 rounded-xl font-bold text-base transition-colors shadow-lg">
                ✨ 어휘출제 마법사 시작하기
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════════════ LIST VIEW ══════════════════ */
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Tool header bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3">
        <span className="text-base font-black text-slate-800">어휘출제 마법사</span>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {selectedBooks.length > 0 && (
          <button
            onClick={() => setView("wizard")}
            className="ml-auto flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            ✨ 선택된 교재로 시작하기
            <span className="bg-white/30 text-white text-xs px-1.5 py-0.5 rounded-full font-black">{selectedBooks.length}</span>
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Search + Filter toggle */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="교재명을 입력하세요"
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors">
            검색
          </button>
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            {filterOpen ? "필터 닫기" : "필터 열기"}
          </button>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[80px_1fr] gap-0 divide-y divide-slate-100">
              {/* 이용대상 */}
              <div className="px-4 py-3 bg-slate-50 flex items-center">
                <span className="text-xs font-bold text-slate-600">이용대상</span>
              </div>
              <div className="px-4 py-3 flex flex-wrap gap-2">
                {LEVELS.map((lv) => (
                  <button
                    key={lv}
                    onClick={() => toggleLevel(lv)}
                    className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                      levelFilters.includes(lv)
                        ? "bg-slate-800 border-slate-800 text-white"
                        : "border-slate-300 text-slate-600 hover:border-slate-500"
                    }`}
                  >
                    {lv}
                  </button>
                ))}
              </div>
              {/* 분류 */}
              <div className="px-4 py-3 bg-slate-50 flex items-start pt-4">
                <span className="text-xs font-bold text-slate-600">분류</span>
              </div>
              <div className="px-4 py-3 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCat(cat)}
                    className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                      catFilters.includes(cat)
                        ? "bg-slate-800 border-slate-800 text-white"
                        : "border-slate-300 text-slate-600 hover:border-slate-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result count + reset */}
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-slate-600">
            조건에 맞는 자료{" "}
            <span className="text-red-500 font-black">{filtered.length}</span>개가 검색되었습니다.
          </span>
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            초기화
          </button>
        </div>

        {/* Sort + inline search */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                  sortBy === opt
                    ? "bg-[#1B3A6B] text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {opt}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={listQuery}
              onChange={(e) => setListQuery(e.target.value)}
              placeholder="[제목+내용] 검색"
              className="bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
            />
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Book list */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">검색 결과가 없습니다.</div>
          ) : (
            filtered.map((book) => (
              <div key={book.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                {/* Cover thumbnail */}
                {book.image ? (
                  <img src={book.image} alt={book.title} className="shrink-0 w-12 h-16 object-cover rounded-lg shadow-sm border border-slate-100" />
                ) : (
                  <div className={`shrink-0 w-12 h-16 bg-gradient-to-br ${book.bg} rounded-lg flex items-center justify-center text-3xl select-none shadow-sm`}>
                    {book.emoji}
                  </div>
                )}
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm">{book.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{book.subtitle}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{book.levelGroup}</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{book.category}</span>
                    <span className="text-xs text-slate-400">{book.publisher}</span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs text-slate-400">{book.publishDate}</span>
                  </div>
                </div>
                {/* Action */}
                <button
                  onClick={() => startWizard(book.id)}
                  className="shrink-0 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  ✨ 어휘출제 마법사 시작하기
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
