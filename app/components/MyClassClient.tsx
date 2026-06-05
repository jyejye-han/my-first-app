"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useMyClassBooks } from "../lib/useMyClassBooks";

const LESSON_MATERIALS = [
  { id: "vocab",     label: "어휘리스트",  icon: "📝", type: "PDF",  color: "text-rose-500",   border: "border-rose-200",   bg: "bg-rose-50"   },
  { id: "ppt",       label: "강의용 PPT",  icon: "📊", type: "PPT",  color: "text-orange-500", border: "border-orange-200", bg: "bg-orange-50" },
  { id: "worksheet", label: "워크시트",    icon: "📋", type: "PDF",  color: "text-green-600",  border: "border-green-200",  bg: "bg-green-50"  },
  { id: "text",      label: "본문파일",    icon: "📄", type: "PDF",  color: "text-blue-600",   border: "border-blue-200",   bg: "bg-blue-50"   },
  { id: "audio",     label: "듣기파일",    icon: "🎧", type: "MP3",  color: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50" },
];

type TocItem = { title: string; subItems: { label: string; pages: string }[] };
type BookEntry = {
  id: string; title: string; author: string;
  levelGroup: string; category: string; emoji: string;
  image?: string; publishDate: string; toc: TocItem[];
};

function gt(titles: string[]): TocItem[] {
  return titles.map((title, i) => ({
    title,
    subItems: [
      { label: "[1~2차시] 개념 학습 및 연습", pages: `pp. ${i * 12 + 1}~${i * 12 + 10}` },
      { label: "[3차시] 정리 및 평가",         pages: `pp. ${i * 12 + 11}~${i * 12 + 12}` },
    ],
  }));
}

const BOOK_CATALOG: Record<string, BookEntry> = {
  "1": {
    id: "1", title: "Reading Prime 1", author: "YBM 편집부",
    levelGroup: "중등", category: "독해", emoji: "📘",
    image: "/images/books/reading-prime-1.jpg", publishDate: "2025.03",
    toc: [
      { title: "Unit 1 - Daily Life",            subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 8~13" },  { label: "[3차시] Writing & Review", pages: "pp. 14~15" }] },
      { title: "Unit 2 - Nature & Environment",  subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 16~21" }, { label: "[3차시] Writing & Review", pages: "pp. 22~23" }] },
      { title: "Unit 3 - Science & Technology",  subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 24~29" }, { label: "[3차시] Writing & Review", pages: "pp. 30~31" }] },
      { title: "Unit 4 - Culture & Arts",        subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 32~37" }, { label: "[3차시] Writing & Review", pages: "pp. 38~39" }] },
      { title: "Unit 5 - People & Society",      subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 40~45" }, { label: "[3차시] Writing & Review", pages: "pp. 46~47" }] },
      { title: "Unit 6 - Review & Assessment",   subItems: [{ label: "[1~2차시] 종합 독해 연습",         pages: "pp. 48~53" }, { label: "[3차시] 최종 평가",          pages: "pp. 54~55" }] },
    ],
  },
  "2": {
    id: "2", title: "알리GO 올리GO 서술형 쓰기 2", author: "YBM 편집부",
    levelGroup: "중등", category: "쓰기", emoji: "📗",
    image: "/images/books/aligo-oligo.jpg", publishDate: "2025.01",
    toc: gt(["Chapter 1 - 문장 기초", "Chapter 2 - 서술형 표현", "Chapter 3 - 단락 쓰기", "Chapter 4 - 실전 내신 대비"]),
  },
  "3": {
    id: "3", title: "Phonics NOW 1", author: "이재홍 외",
    levelGroup: "초등", category: "파닉스", emoji: "📙",
    image: "/images/books/phonics-now-1.jpg", publishDate: "2024.09",
    toc: [
      { title: "1장 - 단모음",     subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 6~11" },  { label: "[3차시] 실전 문제풀이", pages: "pp. 12~13" }] },
      { title: "2장 - 장모음",     subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 14~19" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 20~21" }] },
      { title: "3장 - 이중자음",   subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 22~27" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 28~29" }] },
      { title: "4장 - 이중모음",   subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 30~35" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 36~37" }] },
      { title: "5장 - Silent e",  subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 38~43" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 44~45" }] },
      { title: "6장 - 복합 패턴",  subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 46~51" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 52~53" }] },
    ],
  },
  "4": {
    id: "4", title: "연타 문법+쓰기 Level 1", author: "YBM 편집부",
    levelGroup: "중등", category: "문법", emoji: "📕",
    image: "/images/books/image-yeontar-grammar.jpg", publishDate: "2025.02",
    toc: gt(["Point 1 - 명사·대명사", "Point 2 - 동사의 시제", "Point 3 - 조동사", "Point 4 - 형용사·부사", "Point 5 - 전치사·접속사"]),
  },
  "5": {
    id: "5", title: "부스터 보카", author: "YBM 편집부",
    levelGroup: "고등", category: "어휘", emoji: "📓",
    image: "/images/books/booster-voca.jpg", publishDate: "2024.06",
    toc: gt(["Day 1 - 일상·생활 어휘", "Day 2 - 학문·학습 어휘", "Day 3 - 사회·경제 어휘", "Day 4 - 자연·환경 어휘", "Day 5 - 수능 빈출 고급 어휘"]),
  },
  "6": {
    id: "6", title: "Reading Prime 2", author: "YBM 편집부",
    levelGroup: "중등", category: "독해", emoji: "📔",
    image: "/images/books/reading-prime-2.jpg", publishDate: "2024.11",
    toc: gt(["Unit 1 - Social Issues", "Unit 2 - Science & Health", "Unit 3 - History & Culture", "Unit 4 - Environment", "Unit 5 - Technology", "Unit 6 - Final Review"]),
  },
  "7": {
    id: "7", title: "Business English Master", author: "John Kim",
    levelGroup: "성인", category: "회화", emoji: "📒", publishDate: "2025.04",
    toc: gt(["Chapter 1 - 미팅 영어", "Chapter 2 - 이메일 작성", "Chapter 3 - 프레젠테이션", "Chapter 4 - 협상 표현"]),
  },
  "8": {
    id: "8", title: "개념 연산 SOS 중등 수학 3·1", author: "YBM 편집부",
    levelGroup: "중등", category: "수학", emoji: "📃",
    image: "/images/books/gaenyeom-sos.jpg", publishDate: "2025.05",
    toc: gt(["I. 실수와 그 계산", "II. 다항식의 곱셈", "III. 이차방정식", "IV. 이차함수"]),
  },
  "9": {
    id: "9", title: "중학 영어 완성 1", author: "서연희 외",
    levelGroup: "중등", category: "종합", emoji: "📑", publishDate: "2024.08",
    toc: gt(["Unit 1 - 문법 기초", "Unit 2 - 독해 훈련", "Unit 3 - 듣기 연습", "Unit 4 - 어휘 확장", "Unit 5 - 종합 평가"]),
  },
  "10": {
    id: "10", title: "Booster 유형독해", author: "YBM 편집부",
    levelGroup: "고등", category: "독해", emoji: "📰",
    image: "/images/books/booster-reading.jpg", publishDate: "2025.02",
    toc: gt(["Part 1 - 주제·제목 유형", "Part 2 - 빈칸 추론 유형", "Part 3 - 순서·삽입 유형", "Part 4 - 장문 독해", "Part 5 - 실전 모의고사"]),
  },
  "11": {
    id: "11", title: "빈출구문 상승", author: "YBM 편집부",
    levelGroup: "고등", category: "구문", emoji: "📄",
    image: "/images/books/binchul-gumun.jpg", publishDate: "2024.12",
    toc: gt(["Chapter 1 - 명사구·명사절", "Chapter 2 - 관계사", "Chapter 3 - 분사구문", "Chapter 4 - 비교·강조 구문", "Chapter 5 - 실전 적용"]),
  },
  "12": {
    id: "12", title: "Benchmark Reading Starter 1", author: "YBM 편집부",
    levelGroup: "초등", category: "독해", emoji: "📗",
    image: "/images/books/benchmark-reading-starter-1.jpg", publishDate: "2024.03",
    toc: gt(["Unit 1 - Animals", "Unit 2 - My Body", "Unit 3 - Colors & Shapes", "Unit 4 - Food & Health"]),
  },
  "13": {
    id: "13", title: "Benchmark Reading Starter 3", author: "YBM 편집부",
    levelGroup: "초등", category: "독해", emoji: "📘",
    image: "/images/books/benchmark-reading-starter-3.jpg", publishDate: "2024.03",
    toc: gt(["Unit 1 - Nature", "Unit 2 - Science", "Unit 3 - Community", "Unit 4 - World Cultures"]),
  },
  "14": {
    id: "14", title: "Booster 구문독해", author: "YBM 편집부",
    levelGroup: "고등", category: "구문", emoji: "📒",
    image: "/images/books/booster-grammar.jpg", publishDate: "2025.01",
    toc: gt(["Part 1 - 핵심 구문 1~20", "Part 2 - 핵심 구문 21~42", "Part 3 - 핵심 구문 43~63", "Part 4 - 실전 TEST"]),
  },
  "15": {
    id: "15", title: "Write NOW 1", author: "YBM 편집부",
    levelGroup: "초등", category: "쓰기", emoji: "✏️",
    image: "/images/books/write-now-1.jpg", publishDate: "2025.03",
    toc: gt(["Unit 1 - Letters & Words", "Unit 2 - Simple Sentences", "Unit 3 - Describing", "Unit 4 - Short Paragraphs"]),
  },
  "16": {
    id: "16", title: "Listening Booster 30", author: "YBM 편집부",
    levelGroup: "고등", category: "듣기", emoji: "🎧",
    image: "/images/books/listening-booster-30.jpg", publishDate: "2025.02",
    toc: gt(["Part 1 - 목적·주제 유형", "Part 2 - 내용 일치 유형", "Part 3 - 그림·도표 유형", "Part 4 - 실전 모의고사 1~10", "Part 5 - 실전 모의고사 11~30"]),
  },
};

const TOOLS = [
  {
    label: "커넥팅북",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    href: "__connecting__",
    color: "text-indigo-600",
    border: "border-indigo-200",
    bg: "hover:bg-indigo-50",
  },
  {
    label: "어휘출제 마법사",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    href: "/edutech/vocab-wizard",
    color: "text-pink-600",
    border: "border-pink-200",
    bg: "hover:bg-pink-50",
  },
  {
    label: "클래스 게임",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    href: "https://www.ybmcloud.com/twowaygames/content?siteType=E",
    color: "text-orange-500",
    border: "border-orange-200",
    bg: "hover:bg-orange-50",
  },
  {
    label: "온라인 콘텐츠",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: "__online__",
    color: "text-cyan-600",
    border: "border-cyan-200",
    bg: "hover:bg-cyan-50",
  },
  {
    label: "퀴즈나우",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: "__quiznow__",
    color: "text-teal-600",
    border: "border-teal-200",
    bg: "hover:bg-teal-50",
  },
  {
    label: "라이브샷",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    href: "__liveshot__",
    color: "text-rose-500",
    border: "border-rose-200",
    bg: "hover:bg-rose-50",
  },
];

export default function MyClassClient() {
  const { ids: myBookIds, removeBook } = useMyClassBooks();
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (myBookIds.length > 0 && (!selectedId || !myBookIds.includes(selectedId))) {
      setSelectedId(myBookIds[0]);
    }
    if (myBookIds.length === 0) setSelectedId("");
  }, [myBookIds]);

  const book = BOOK_CATALOG[selectedId];

  // 수업안 만들기 팝업
  const [lessonPreviewPopup, setLessonPreviewPopup] = useState(false);

  // 자료 다운로드 팝업
  const [downloadPopup, setDownloadPopup] = useState(false);

  // 온라인 콘텐츠 팝업
  const [onlinePopup, setOnlinePopup] = useState(false);

  // 라이브샷 팝업
  const [liveshotPopup, setLiveshotPopup] = useState(false);

  // 학급관리 팝업
  const [classManagePopup, setClassManagePopup] = useState(false);

  // 메시지 보내기 팝업
  const [messagePopup, setMessagePopup] = useState(false);

  // 온라인 워크시트 팝업
  const [worksheetPopup, setWorksheetPopup] = useState(false);

  // 퀴즈나우 팝업
  const [quiznowPopup, setQuiznowPopup] = useState(false);


  // 자료 보기 팝업 (레슨별)
  const [viewPopup, setViewPopup] = useState<{ index: number; title: string } | null>(null);

  // 목차 펼침 상태 (첫 번째 레슨 기본 오픈)
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set([0]));
  const toggleLesson = (i: number) => {
    setExpandedLessons(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <>
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">

      {/* ── 왼쪽 사이드바 ── */}
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        {/* 헤더 */}
        <div className="px-6 pt-7 pb-5">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-2xl">🐾</span>
            <h2 className="font-black text-slate-800 text-lg">마이클래스</h2>
          </div>

          {/* 교재 목록 */}
          {myBookIds.length === 0 ? (
            <p className="text-xs text-slate-400 leading-relaxed">
              담은 교재가 없습니다.<br />
              <Link href="/textbooks" className="text-blue-500 hover:underline">교재 페이지</Link>에서 추가하세요.
            </p>
          ) : (
            <ul className="space-y-1">
              {myBookIds.map((id) => {
                const b = BOOK_CATALOG[id];
                if (!b) return null;
                return (
                  <li key={id} className="flex items-center gap-1 group/item">
                    <button
                      onClick={() => setSelectedId(id)}
                      className={`flex-1 min-w-0 text-left flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all text-sm ${
                        selectedId === id
                          ? "text-blue-700 font-semibold"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        selectedId === id ? "bg-blue-600" : "bg-slate-300"
                      }`} />
                      <span className="truncate">{b.title}</span>
                    </button>
                    <button
                      onClick={() => removeBook(id)}
                      className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-red-400 transition-all opacity-0 group-hover/item:opacity-100 text-xs"
                      title="마이클래스에서 제거"
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* 교재 추가하기 */}
          <Link
            href="/textbooks"
            className="mt-6 flex items-center justify-center gap-1.5 w-full py-3 bg-slate-900 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            교재 추가하기
          </Link>
        </div>

        {/* 하단 My Page */}
        <div className="mt-auto border-t border-slate-100 px-5 py-5">
          <Link
            href="/my-page"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Page
          </Link>
        </div>
      </aside>

      {/* ── 메인 콘텐츠 ── */}
      <main className="flex-1 min-w-0 px-9 py-9 pr-56">

        {/* 페이지 타이틀 */}
        <div className="mb-7">
          <h1 className="text-3xl font-black text-slate-800">마이클래스</h1>
          <p className="text-slate-500 text-base mt-1">교재를 담으면 기능을 바로 이용할 수 있어요.</p>
        </div>

        {/* 빈 상태 */}
        {!book && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <span className="text-6xl">📚</span>
            <p className="text-lg font-bold text-slate-600">담은 교재가 없습니다</p>
            <p className="text-sm text-slate-400">교재 페이지에서 마이클래스 담기를 눌러 추가해보세요.</p>
            <Link href="/textbooks" className="mt-2 px-6 py-2.5 bg-[#1B3A6B] hover:bg-[#163060] text-white text-sm font-bold rounded-xl transition-colors">
              교재 보러 가기
            </Link>
          </div>
        )}

        {/* 교재가 있을 때만 렌더링 */}
        {book && (<>

        {/* ── 교재 카드 ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 mb-5">
          <div className="flex gap-7">

            {/* 표지 + 자료 다운로드 버튼 */}
            <div className="shrink-0 flex flex-col gap-3">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-28 h-36 object-cover rounded-xl shadow-md border border-slate-100"
                />
              ) : (
                <div className="w-28 h-36 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center text-5xl shadow-md">
                  {book.emoji}
                </div>
              )}
              {/* 자료 다운로드 버튼 — 썸네일 아래 full width */}
              <button
                onClick={() => setDownloadPopup(true)}
                className="w-28 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#163060] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                자료 다운로드
              </button>
              {/* 내가 만든 자료 */}
              <Link
                href="/my-class/my-materials"
                className="w-28 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                내가만든자료
              </Link>
            </div>

            {/* 정보 + 서비스 버튼 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-black text-slate-800 text-xl leading-tight">{book.title}</h2>
                  <p className="text-base text-slate-500 mt-0.5">{book.author}</p>
                </div>
              </div>

              {/* 서비스 버튼 */}
              <div className="grid grid-cols-3 gap-2.5">
                {TOOLS.map((tool) => {
                  const cls = `flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 ${tool.border} bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-150`;
                  const inner = (
                    <>
                      <span className={`shrink-0 ${tool.color}`}>{tool.icon}</span>
                      <span className={`text-xs font-bold leading-tight ${tool.color}`}>{tool.label}</span>
                    </>
                  );
                  if (tool.href === "__connecting__") {
                    return <Link key={tool.label} href={`/edutech/connecting-book?bookId=${selectedId}`} className={cls}>{inner}</Link>;
                  }
                  if (tool.href === "__online__") {
                    return <button key={tool.label} onClick={() => setOnlinePopup(true)} className={cls}>{inner}</button>;
                  }
                  if (tool.href === "__liveshot__") {
                    return <button key={tool.label} onClick={() => setLiveshotPopup(true)} className={cls}>{inner}</button>;
                  }
                  if (tool.href === "__quiznow__") {
                    return <button key={tool.label} onClick={() => setQuiznowPopup(true)} className={cls}>{inner}</button>;
                  }
                  return tool.href.startsWith("http") ? (
                    <a key={tool.label} href={tool.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  ) : (
                    <Link key={tool.label} href={tool.href} className={cls}>{inner}</Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── 학급학생관리 (가로 한 줄) ── */}
        <div className="rounded-2xl border border-[#1B3A6B]/20 overflow-hidden shadow-sm mb-5">
          <div className="flex items-center gap-5 px-6 py-3.5 bg-[#1B3A6B]">
            {/* 타이틀 */}
            <div className="flex items-center gap-2.5 shrink-0">
              <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white font-bold text-base">학급학생관리</span>
            </div>
            <div className="w-px h-5 bg-white/20" />
            {/* 버튼 두 개 */}
            <div className="flex gap-2.5">
              <button
                onClick={() => setClassManagePopup(true)}
                className="flex items-center gap-1.5 px-5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#1B3A6B] text-sm font-semibold rounded-lg transition-all border border-white/20 hover:border-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                학급 관리
              </button>
              <button
                onClick={() => setMessagePopup(true)}
                className="flex items-center gap-1.5 px-5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#1B3A6B] text-sm font-semibold rounded-lg transition-all border border-white/20 hover:border-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                메시지 보내기
              </button>
            </div>
          </div>
        </div>

        {/* ── 목차 ── */}
        <div className="rounded-2xl border border-[#1B3A6B]/20 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-6 py-3.5 bg-[#1B3A6B]">
            <svg className="w-5 h-5 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h7" />
            </svg>
            <span className="text-white font-bold text-base">목차</span>
            <span className="ml-auto text-blue-300 text-sm">{book.toc.length}단원</span>
          </div>
          <ul className="divide-y divide-slate-100 bg-white">
            {book.toc.map((lesson, i) => {
              const isOpen = expandedLessons.has(i);
              return (
                <li key={i}>
                  {/* 레슨 헤더 행 */}
                  <div className={`flex items-center gap-4 px-5 py-3.5 ${isOpen ? "bg-slate-50" : "bg-white hover:bg-slate-50"} transition-colors`}>
                    {/* 번호 뱃지 */}
                    <span className="w-8 h-8 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-xs font-black shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* 레슨 제목 */}
                    <span className="flex-1 text-base font-bold text-slate-800 truncate">{lesson.title}</span>
                    {/* 액션 버튼 */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setViewPopup({ index: i, title: lesson.title })}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 bg-white rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-all whitespace-nowrap"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        단원 자료 보기
                      </button>
                      {/* 펼침 버튼 */}
                      <button
                        onClick={() => toggleLesson(i)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${
                          isOpen
                            ? "bg-[#1B3A6B] border-[#1B3A6B] text-white"
                            : "border-slate-200 bg-white text-slate-500 hover:border-[#1B3A6B] hover:text-[#1B3A6B]"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 하위 차시 목록 */}
                  {isOpen && (
                    <ul className="bg-slate-50/70 border-t border-slate-100">
                      {lesson.subItems.map((sub, j) => (
                        <li key={j} className="flex items-center gap-4 pl-10 pr-5 py-3 border-b border-slate-100 last:border-0 hover:bg-blue-50/40 transition-colors group">
                          {/* 왼쪽 세로선 + 들여쓰기 */}
                          <div className="w-px h-8 bg-slate-300 shrink-0 rounded-full" />
                          {/* 차시 내용 */}
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 block truncate">{sub.label}</span>
                            <span className="text-xs text-slate-400">{sub.pages}</span>
                          </div>
                          {/* 수업안 만들기 버튼 */}
                          <button
                            onClick={() => setLessonPreviewPopup(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap mr-2"
                          >
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            수업안 만들기
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        </>)}
      </main>
    </div>


    {/* ── 자료 다운로드 팝업 ── */}
    {downloadPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDownloadPopup(false)} />
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* 헤더 */}
          <div className="bg-[#1B3A6B] px-6 py-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-blue-200 text-xs font-medium mb-0.5">{book.title}</p>
              <h2 className="text-white font-black text-base">부가자료 다운로드</h2>
            </div>
            <button
              onClick={() => setDownloadPopup(false)}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 자료 목록 */}
          <div className="px-6 py-5">
            <p className="text-xs text-slate-400 mb-3">파일을 클릭하면 바로 다운로드됩니다.</p>
            <ul className="space-y-2">
              {LESSON_MATERIALS.map((m) => (
                <li key={m.id}>
                  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border ${m.border} ${m.bg} hover:opacity-80 transition-all group`}>
                    <span className="text-xl shrink-0">{m.icon}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-bold ${m.color}`}>{m.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{book.title} · {m.type}</p>
                    </div>
                    {/* 파일 타입 배지 */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.color} ${m.border} bg-white shrink-0`}>
                      {m.type}
                    </span>
                    {/* 다운로드 아이콘 */}
                    <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${m.color} border ${m.border} bg-white group-hover:bg-[#1B3A6B] group-hover:text-white group-hover:border-[#1B3A6B] transition-all`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* 모아받기 버튼 */}
            <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-black transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              전체 모아받기
            </button>
          </div>

        </div>
      </div>
    )}

    {/* ── 자료 보기 팝업 (레슨별) ── */}
    {viewPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewPopup(null)} />
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* 헤더 */}
          <div className="bg-[#1B3A6B] px-6 py-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-blue-200 text-xs font-medium mb-0.5">{book.title}</p>
              <h2 className="text-white font-black text-base leading-snug">
                {String(viewPopup.index + 1).padStart(2, "0")}. {viewPopup.title}
              </h2>
              {/* 레슨별자료 배지 */}
              <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                레슨별자료
              </span>
            </div>
            <button
              onClick={() => setViewPopup(null)}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors mt-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 자료 목록 */}
          <div className="px-6 py-5">
            <p className="text-xs text-slate-400 mb-3">해당 레슨의 자료를 확인하고 다운로드하세요.</p>
            <ul className="space-y-2">
              {LESSON_MATERIALS.map((m) => (
                <li key={m.id}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${m.border} ${m.bg}`}>
                    <span className="text-xl shrink-0">{m.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${m.color}`}>{m.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {String(viewPopup.index + 1).padStart(2, "0")}단원 · {m.type}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.color} ${m.border} bg-white shrink-0`}>
                      {m.type}
                    </span>
                    {/* 다운로드 버튼 */}
                    <button className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 ${m.border} bg-white ${m.color} hover:bg-[#1B3A6B] hover:text-white hover:border-[#1B3A6B] transition-all text-[10px] font-bold`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      다운로드
                    </button>
                    {/* 워크시트 전용: 온라인 워크시트 만들기 */}
                    {m.id === "worksheet" && (
                      <button
                        onClick={() => setWorksheetPopup(true)}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-emerald-400 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all text-[10px] font-bold whitespace-nowrap"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        온라인 워크시트 만들기
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setViewPopup(null)}
              className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              닫기
            </button>
          </div>

        </div>
      </div>
    )}

    {/* ── 라이브샷 이미지 팝업 ── */}
    {liveshotPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLiveshotPopup(false)} />
        <div className="relative z-10 max-w-4xl w-full">
          <button
            onClick={() => setLiveshotPopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/images/liveshot-preview.png"
            alt="라이브 샷 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex justify-center">
            <a
              href="https://school.ybmsmartschool.com/RxPs23/snstest"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setLiveshotPopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              라이브샷 시작하기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 학급관리 이미지 팝업 ── */}
    {classManagePopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setClassManagePopup(false)} />
        <div className="relative z-10 max-w-5xl w-full">
          <button
            onClick={() => setClassManagePopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/images/class-manage-preview.png"
            alt="학급 관리 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setClassManagePopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#163060] text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              학급 관리 바로가기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 메시지 보내기 이미지 팝업 ── */}
    {messagePopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMessagePopup(false)} />
        <div className="relative z-10 max-w-5xl w-full">
          <button
            onClick={() => setMessagePopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/images/message-preview.png"
            alt="메시지 보내기 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMessagePopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#163060] text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              메시지 보내기 바로가기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 온라인 워크시트 이미지 팝업 ── */}
    {worksheetPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setWorksheetPopup(false)} />
        <div className="relative z-10 max-w-4xl w-full">
          <button
            onClick={() => setWorksheetPopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/images/worksheet-preview.png"
            alt="온라인 워크시트 만들기 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWorksheetPopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              온라인 워크시트 만들기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 퀴즈나우 이미지 팝업 ── */}
    {quiznowPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setQuiznowPopup(false)} />
        <div className="relative z-10 max-w-4xl w-full">
          <button
            onClick={() => setQuiznowPopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/images/quiznow-preview.png"
            alt="퀴즈나우 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex justify-center">
            <a
              href="https://school.ybmsmartschool.com/quiz/quiz_list?grd_cd=301002&sso_tag=4e89ae318b9ea3a9b6ab376912995b03"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setQuiznowPopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              퀴즈나우 시작하기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 온라인 콘텐츠 이미지 팝업 ── */}
    {onlinePopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOnlinePopup(false)} />
        <div className="relative z-10 max-w-5xl w-full">
          {/* 닫기 버튼 */}
          <button
            onClick={() => setOnlinePopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* 이미지 */}
          <img
            src="/images/online-contents-preview.png"
            alt="온라인 콘텐츠 제작 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          {/* 하단 이동 버튼 */}
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOnlinePopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#163060] text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              YBM 스마트스쿨에서 바로 만들기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 수업안 만들기 팝업 2단계: 이미지 미리보기 ── */}
    {lessonPreviewPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLessonPreviewPopup(false)} />
        <div className="relative z-10 max-w-5xl w-full">
          <button
            onClick={() => setLessonPreviewPopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src="/images/lesson-plan-preview.png" alt="수업안 만들기" className="w-full rounded-2xl shadow-2xl" />
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setLessonPreviewPopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#163060] text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              YBM 스마트스쿨에서 수업안 만들기
            </a>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
