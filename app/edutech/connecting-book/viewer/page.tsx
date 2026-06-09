"use client";
import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

/* ── 아이콘 ── */
const Icon = {
  toc:      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10" />,
  pin:      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
  search:   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  bookmark: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />,
  help:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  expand:   <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></>,
  pen:      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />,
  highlight:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
  close:    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
  prev:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />,
  next:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />,
  up:       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />,
  down:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />,
  back:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />,
};

function Svg({ d, size = 20 }: { d: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {d}
    </svg>
  );
}

/* ── 책 데이터 (마이클래스와 동일) ── */
const BOOKS: Record<string, { title: string; author: string; levelGroup: string; category: string; image?: string; units: { title: string; subtitle: string }[] }> = {
  "1":  { title: "Reading Prime 1", author: "YBM 편집부", levelGroup: "중등", category: "독해", image: "/images/books/reading-prime-1.jpg",
    units: [
      { title: "Unit 1", subtitle: "Daily Life" },
      { title: "Unit 2", subtitle: "Nature & Environment" },
      { title: "Unit 3", subtitle: "Science & Technology" },
      { title: "Unit 4", subtitle: "Culture & Arts" },
      { title: "Unit 5", subtitle: "People & Society" },
      { title: "Unit 6", subtitle: "Review & Assessment" },
    ]},
  "3":  { title: "Phonics NOW 1", author: "이재홍 외", levelGroup: "초등", category: "파닉스", image: "/images/books/phonics-now-1.jpg",
    units: [
      { title: "1장", subtitle: "단모음" },
      { title: "2장", subtitle: "장모음" },
      { title: "3장", subtitle: "이중자음" },
      { title: "4장", subtitle: "이중모음" },
      { title: "5장", subtitle: "Silent e" },
      { title: "6장", subtitle: "복합 패턴" },
    ]},
  "5":  { title: "부스터 보카", author: "YBM 편집부", levelGroup: "고등", category: "어휘", image: "/images/books/booster-voca.jpg",
    units: [
      { title: "Day 1", subtitle: "일상·생활 어휘" },
      { title: "Day 2", subtitle: "학문·학습 어휘" },
      { title: "Day 3", subtitle: "사회·경제 어휘" },
      { title: "Day 4", subtitle: "자연·환경 어휘" },
      { title: "Day 5", subtitle: "수능 빈출 고급 어휘" },
    ]},
  "10": { title: "Booster 유형독해", author: "YBM 편집부", levelGroup: "고등", category: "독해", image: "/images/books/booster-reading.jpg",
    units: [
      { title: "Part 1", subtitle: "주제·제목 유형" },
      { title: "Part 2", subtitle: "빈칸 추론 유형" },
      { title: "Part 3", subtitle: "순서·삽입 유형" },
      { title: "Part 4", subtitle: "장문 독해" },
      { title: "Part 5", subtitle: "실전 모의고사" },
    ]},
  "12": { title: "Benchmark Reading Starter 1", author: "YBM 편집부", levelGroup: "초등", category: "독해", image: "/images/books/benchmark-reading-starter-1.jpg",
    units: [
      { title: "Unit 1", subtitle: "Animals" },
      { title: "Unit 2", subtitle: "My Body" },
      { title: "Unit 3", subtitle: "Colors & Shapes" },
      { title: "Unit 4", subtitle: "Food & Health" },
    ]},
  "15": { title: "Write NOW 1", author: "YBM 편집부", levelGroup: "초등", category: "쓰기", image: "/images/books/write-now-1.jpg",
    units: [
      { title: "Unit 1", subtitle: "Letters & Words" },
      { title: "Unit 2", subtitle: "Simple Sentences" },
      { title: "Unit 3", subtitle: "Describing" },
      { title: "Unit 4", subtitle: "Short Paragraphs" },
    ]},
  "2":  { title: "알리GO 올리GO 서술형 쓰기 2", author: "YBM 편집부", levelGroup: "중등", category: "쓰기", image: "/images/books/aligo-oligo.jpg",
    units: [
      { title: "Chapter 1", subtitle: "문장 기초" },
      { title: "Chapter 2", subtitle: "서술형 표현" },
      { title: "Chapter 3", subtitle: "단락 쓰기" },
      { title: "Chapter 4", subtitle: "실전 내신 대비" },
    ]},
  "4":  { title: "연타 문법+쓰기 Level 1", author: "YBM 편집부", levelGroup: "중등", category: "문법", image: "/images/books/image-yeontar-grammar.jpg",
    units: [
      { title: "Point 1", subtitle: "명사·대명사" },
      { title: "Point 2", subtitle: "동사의 시제" },
      { title: "Point 3", subtitle: "조동사" },
      { title: "Point 4", subtitle: "형용사·부사" },
      { title: "Point 5", subtitle: "전치사·접속사" },
    ]},
  "6":  { title: "Reading Prime 2", author: "YBM 편집부", levelGroup: "중등", category: "독해", image: "/images/books/reading-prime-2.jpg",
    units: [
      { title: "Unit 1", subtitle: "Social Issues" },
      { title: "Unit 2", subtitle: "Science & Health" },
      { title: "Unit 3", subtitle: "History & Culture" },
      { title: "Unit 4", subtitle: "Environment" },
      { title: "Unit 5", subtitle: "Technology" },
      { title: "Unit 6", subtitle: "Final Review" },
    ]},
  "7":  { title: "Business English Master", author: "John Kim", levelGroup: "성인", category: "회화",
    units: [
      { title: "Chapter 1", subtitle: "미팅 영어" },
      { title: "Chapter 2", subtitle: "이메일 작성" },
      { title: "Chapter 3", subtitle: "프레젠테이션" },
      { title: "Chapter 4", subtitle: "협상 표현" },
    ]},
  "8":  { title: "개념 연산 SOS 중등 수학 3·1", author: "YBM 편집부", levelGroup: "중등", category: "수학", image: "/images/books/gaenyeom-sos.jpg",
    units: [
      { title: "I", subtitle: "실수와 그 계산" },
      { title: "II", subtitle: "다항식의 곱셈" },
      { title: "III", subtitle: "이차방정식" },
      { title: "IV", subtitle: "이차함수" },
    ]},
  "9":  { title: "중학 영어 완성 1", author: "서연희 외", levelGroup: "중등", category: "종합",
    units: [
      { title: "Unit 1", subtitle: "문법 기초" },
      { title: "Unit 2", subtitle: "독해 훈련" },
      { title: "Unit 3", subtitle: "듣기 연습" },
      { title: "Unit 4", subtitle: "어휘 확장" },
      { title: "Unit 5", subtitle: "종합 평가" },
    ]},
  "11": { title: "빈출구문 상승", author: "YBM 편집부", levelGroup: "고등", category: "구문", image: "/images/books/binchul-gumun.jpg",
    units: [
      { title: "Chapter 1", subtitle: "명사구·명사절" },
      { title: "Chapter 2", subtitle: "관계사" },
      { title: "Chapter 3", subtitle: "분사구문" },
      { title: "Chapter 4", subtitle: "비교·강조 구문" },
      { title: "Chapter 5", subtitle: "실전 적용" },
    ]},
  "13": { title: "Benchmark Reading Starter 3", author: "YBM 편집부", levelGroup: "초등", category: "독해", image: "/images/books/benchmark-reading-starter-3.jpg",
    units: [
      { title: "Unit 1", subtitle: "Nature" },
      { title: "Unit 2", subtitle: "Science" },
      { title: "Unit 3", subtitle: "Community" },
      { title: "Unit 4", subtitle: "World Cultures" },
    ]},
  "14": { title: "Booster 구문독해", author: "YBM 편집부", levelGroup: "고등", category: "구문", image: "/images/books/booster-grammar.jpg",
    units: [
      { title: "Part 1", subtitle: "핵심 구문 1~20" },
      { title: "Part 2", subtitle: "핵심 구문 21~42" },
      { title: "Part 3", subtitle: "핵심 구문 43~63" },
      { title: "Part 4", subtitle: "실전 TEST" },
    ]},
  "16": { title: "Listening Booster 30", author: "YBM 편집부", levelGroup: "고등", category: "듣기", image: "/images/books/listening-booster-30.jpg",
    units: [
      { title: "Part 1", subtitle: "목적·주제 유형" },
      { title: "Part 2", subtitle: "내용 일치 유형" },
      { title: "Part 3", subtitle: "그림·도표 유형" },
      { title: "Part 4", subtitle: "실전 모의고사 1~10" },
      { title: "Part 5", subtitle: "실전 모의고사 11~30" },
    ]},
};

const DEFAULT_BOOK = {
  title: "E-BOOK Viewer",
  author: "YBM 편집부",
  levelGroup: "중등",
  category: "독해",
  units: [
    { title: "Unit 1", subtitle: "Introduction" },
    { title: "Unit 2", subtitle: "Core Content" },
    { title: "Unit 3", subtitle: "Practice" },
    { title: "Unit 4", subtitle: "Review" },
  ],
};

/* ── 페이지 콘텐츠 ── */
function CoverSpread({ book }: { book: typeof DEFAULT_BOOK & { image?: string } }) {
  return (
    <>
      {/* 왼쪽 페이지 - 표지 */}
      <div className="flex-1 bg-gradient-to-br from-[#1B3A6B] via-[#1e4080] to-[#0d2249] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* 배경 원 장식 */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        {/* 표지 이미지 */}
        {book.image ? (
          <img src={book.image} alt={book.title}
            className="w-44 shadow-2xl rounded-lg border-4 border-white/20 mb-6" />
        ) : (
          <div className="w-44 h-56 bg-white/10 rounded-lg border-4 border-white/20 flex items-center justify-center text-6xl mb-6">📚</div>
        )}
        <div className="text-center text-white">
          <p className="text-xs font-bold text-blue-300 mb-1 tracking-widest uppercase">YBM E-BOOK</p>
          <h1 className="text-2xl font-black leading-tight">{book.title}</h1>
          <p className="text-blue-200 text-sm mt-2">{book.author}</p>
          <div className="flex gap-2 justify-center mt-3">
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{book.levelGroup}</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{book.category}</span>
          </div>
        </div>
        <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/30">1</p>
      </div>
      {/* 오른쪽 페이지 - 목차 */}
      <div className="flex-1 bg-white p-8 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-6 bg-[#1B3A6B] rounded-full" />
          <h2 className="text-lg font-black text-[#1B3A6B]">CONTENTS</h2>
        </div>
        <div className="space-y-2 flex-1">
          {book.units.map((unit, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-2 rounded-lg transition-colors">
              <span className="w-7 h-7 rounded-full bg-[#1B3A6B] text-white text-xs font-black flex items-center justify-center shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{unit.title}</p>
                <p className="text-xs text-slate-400">{unit.subtitle}</p>
              </div>
              <span className="text-xs text-slate-300">{(i + 1) * 8 + 2}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-300 mt-4">2</p>
      </div>
    </>
  );
}

function UnitOpenerSpread({ unit, pageLeft, pageRight, accentColor }: {
  unit: { title: string; subtitle: string };
  pageLeft: number;
  pageRight: number;
  accentColor: string;
}) {
  return (
    <>
      {/* 왼쪽 - 유닛 오프너 (컬러 일러스트 영역) */}
      <div className={`flex-1 relative overflow-hidden flex flex-col`}
        style={{ background: `linear-gradient(135deg, ${accentColor}ee 0%, ${accentColor}99 50%, #1B3A6B 100%)` }}>
        {/* 장식 원들 */}
        <div className="absolute top-6 right-8 w-32 h-32 rounded-full bg-white/10 blur-sm" />
        <div className="absolute bottom-16 left-4 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-white/5" />

        {/* 유닛 번호 뱃지 */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/20 border-4 border-white/50 flex items-center justify-center">
            <span className="text-white font-black text-xl">{unit.title.replace(/[^0-9]/g, "") || "1"}</span>
          </div>
          <div>
            <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Unit</p>
            <p className="text-white font-black text-lg leading-tight">{unit.subtitle}</p>
          </div>
        </div>

        {/* 중앙 일러스트 - 책/학습 아이콘 그룹 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* 큰 책 아이콘 */}
            <div className="w-32 h-32 bg-white/15 rounded-2xl flex items-center justify-center text-7xl shadow-xl border border-white/20">
              📖
            </div>
            {/* 주변 작은 아이콘들 */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl border border-white/30">✏️</div>
            <div className="absolute -bottom-4 -left-8 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl border border-white/30">🔊</div>
            <div className="absolute top-1/2 -right-12 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl border border-white/30">💡</div>
          </div>
        </div>

        {/* 학습 목표 하단 박스 */}
        <div className="mx-6 mb-6 bg-white/15 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-wide mb-2">Learning Goals</p>
          <div className="space-y-1">
            {["핵심 어휘를 이해하고 사용할 수 있다", "주제에 관련된 글을 읽고 내용을 파악할 수 있다"].map((goal, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-white/30 text-white text-[9px] flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-white text-xs leading-relaxed">{goal}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/30">{pageLeft}</p>
      </div>

      {/* 오른쪽 - Warm Up / Key Words */}
      <div className="flex-1 bg-[#fffef8] p-7 flex flex-col">
        {/* 섹션 헤더 */}
        <div className="flex items-center gap-2 mb-5">
          <div className="px-3 py-1 rounded-full text-white text-xs font-black" style={{ background: accentColor }}>
            Warm Up
          </div>
          <p className="text-xs text-slate-500">학습을 시작하기 전에 확인해 보세요</p>
        </div>

        {/* Key Vocabulary */}
        <div className="mb-5">
          <p className="text-xs font-black text-slate-700 mb-3 flex items-center gap-1.5">
            <span className="w-1 h-3.5 rounded-full inline-block" style={{ background: accentColor }} />
            Key Vocabulary
          </p>
          <div className="grid grid-cols-2 gap-2">
            {["environment", "technology", "community", "achieve"].map((word, i) => (
              <div key={word} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center shrink-0"
                  style={{ background: accentColor }}>{i + 1}</span>
                <div>
                  <p className="text-xs font-bold text-slate-800">{word}</p>
                  <p className="text-[10px] text-slate-400">{["환경", "기술", "공동체", "성취하다"][i]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Think & Talk */}
        <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-xs font-black text-slate-700 mb-2 flex items-center gap-1.5">
            <span className="w-1 h-3.5 rounded-full inline-block" style={{ background: accentColor }} />
            Think & Talk
          </p>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            다음 질문에 대해 생각해 보고, 친구와 이야기해 보세요.
          </p>
          <div className="space-y-2">
            {[
              "What topic does this unit cover?",
              "What do you already know about this topic?",
            ].map((q, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-2 border border-slate-200">
                <span className="text-lg shrink-0">💬</span>
                <p className="text-xs text-slate-700 leading-snug">{q}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-slate-300 mt-3">{pageRight}</p>
      </div>
    </>
  );
}

function ReadingSpread({ unit, pageLeft, pageRight, accentColor }: {
  unit: { title: string; subtitle: string };
  pageLeft: number;
  pageRight: number;
  accentColor: string;
}) {
  return (
    <>
      {/* 왼쪽 - 독해 지문 */}
      <div className="flex-1 bg-white p-7 flex flex-col overflow-auto">
        {/* 단원 표시 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 text-[10px] font-black text-white rounded" style={{ background: accentColor }}>
            {unit.title}
          </span>
          <h2 className="text-sm font-black text-slate-800">{unit.subtitle}</h2>
        </div>
        {/* 사진 영역 */}
        <div className="w-full h-32 rounded-xl mb-4 flex items-center justify-center text-4xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`, border: `2px solid ${accentColor}44` }}>
          🌍
        </div>
        {/* 지문 */}
        <div className="flex-1">
          <h3 className="text-sm font-black text-slate-800 mb-2 leading-snug">
            The World Around Us
          </h3>
          <div className="text-xs text-slate-700 leading-relaxed space-y-2">
            <p>
              Every day, we interact with the world in countless ways. From the food we eat to the technology we use, our daily lives are shaped by the environment around us. Understanding our world helps us make better choices and become responsible members of our community.
            </p>
            <p>
              <span className="font-bold" style={{ color: accentColor }}>① </span>
              Scientists have long studied the relationship between humans and their environment. Recent research shows that people who spend time in nature tend to feel happier and healthier. This suggests that maintaining a connection with the natural world is important for our well-being.
            </p>
            <p>
              <span className="font-bold" style={{ color: accentColor }}>② </span>
              Technology has changed the way we interact with each other and with nature. While it has brought many benefits, such as making communication easier and providing new tools for education, it has also created challenges. Finding a balance between technology use and real-world experiences is one of the key issues of our time.
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-slate-300 mt-3">{pageLeft}</p>
      </div>

      {/* 오른쪽 - 독해 문제 */}
      <div className="flex-1 bg-[#fffef8] p-7 flex flex-col overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="px-2.5 py-1 rounded-full text-white text-[10px] font-black" style={{ background: accentColor }}>
            Comprehension
          </div>
        </div>
        <div className="space-y-4 flex-1">
          {[
            { q: "1. What is the main topic of this passage?", opts: ["Daily habits", "Human-world relationship", "Scientific research", "Technology benefits"] },
            { q: "2. According to the passage, spending time in nature makes people feel ___.", opts: ["Busier", "Smarter", "Happier and healthier", "More creative"] },
            { q: "3. What is described as 'one of the key issues of our time'?", opts: ["Environmental pollution", "Balancing tech and real experiences", "Communication barriers", "Education systems"] },
          ].map((item, qi) => (
            <div key={qi} className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-800 mb-2">{item.q}</p>
              <div className="space-y-1">
                {item.opts.map((opt, oi) => (
                  <label key={oi} className="flex items-center gap-2 cursor-pointer group">
                    <span className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-teal-400 flex items-center justify-center shrink-0 transition-colors">
                      <span className="w-2 h-2 rounded-full" />
                    </span>
                    <span className="text-[11px] text-slate-600 group-hover:text-slate-800 transition-colors">
                      {String.fromCharCode(9312 + oi)} {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-300 mt-3">{pageRight}</p>
      </div>
    </>
  );
}

function VocabSpread({ unit, pageLeft, pageRight, accentColor }: {
  unit: { title: string; subtitle: string };
  pageLeft: number;
  pageRight: number;
  accentColor: string;
}) {
  return (
    <>
      {/* 왼쪽 - 어휘 학습 */}
      <div className="flex-1 bg-white p-7 flex flex-col overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="px-2.5 py-1 rounded-full text-white text-[10px] font-black" style={{ background: accentColor }}>
            Vocabulary
          </div>
          <p className="text-xs text-slate-500">핵심 어휘를 학습합니다</p>
        </div>
        <div className="space-y-2 flex-1">
          {[
            { word: "environment", pos: "n.", ko: "환경", ex: "We must protect our __." },
            { word: "achieve",     pos: "v.", ko: "성취하다", ex: "She worked hard to __ her goal." },
            { word: "community",   pos: "n.", ko: "공동체", ex: "They helped the local __." },
            { word: "challenge",   pos: "n.", ko: "도전, 어려움", ex: "Learning English is a big __." },
            { word: "balance",     pos: "n./v.", ko: "균형(을 맞추다)", ex: "Find a __ between work and play." },
            { word: "technology",  pos: "n.", ko: "기술", ex: "Modern __ makes life easier." },
          ].map((item, i) => (
            <div key={item.word} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
              <span className="w-6 h-6 rounded-full text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: accentColor }}>{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-black text-slate-800">{item.word}</span>
                  <span className="text-[10px] text-slate-400 italic">{item.pos}</span>
                  <span className="text-xs font-semibold" style={{ color: accentColor }}>{item.ko}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 italic">&ldquo;{item.ex}&rdquo;</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-all hover:bg-teal-100 hover:text-teal-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-300 mt-3">{pageLeft}</p>
      </div>

      {/* 오른쪽 - 어휘 연습 */}
      <div className="flex-1 bg-[#fffef8] p-7 flex flex-col overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="px-2.5 py-1 rounded-full text-white text-[10px] font-black" style={{ background: accentColor }}>
            Practice
          </div>
          <p className="text-xs text-slate-500">빈칸에 알맞은 어휘를 쓰세요</p>
        </div>
        <div className="space-y-4 flex-1">
          {[
            "We need to protect the natural __________ for future generations.",
            "It is a great __________ to learn a new language, but very rewarding.",
            "She volunteers every weekend to help her local __________ .",
            "Modern __________ has made communication much faster and easier.",
          ].map((sentence, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-slate-200">
              <p className="text-xs text-slate-500 mb-1 font-bold">Q{i + 1}.</p>
              <p className="text-xs text-slate-700 leading-relaxed">{sentence}</p>
              <div className="mt-2 border-b-2 border-dashed border-slate-300 w-28 h-5" />
            </div>
          ))}
          {/* 보기 박스 */}
          <div className="bg-slate-50 rounded-xl p-3 border border-dashed border-slate-300">
            <p className="text-[10px] font-black text-slate-500 mb-2 tracking-wide uppercase">Word Bank</p>
            <div className="flex flex-wrap gap-1.5">
              {["environment", "challenge", "community", "technology"].map(w => (
                <span key={w} className="text-[11px] px-2 py-0.5 bg-white border border-slate-300 rounded-full text-slate-600 font-medium">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-300 mt-3">{pageRight}</p>
      </div>
    </>
  );
}

/* ── 액센트 색상 ── */
const ACCENT_COLORS = ["#0d9488", "#7c3aed", "#ea580c", "#0284c7", "#be185d"];

/* ── 뷰어 본체 ── */
function ViewerContent() {
  const params = useSearchParams();
  const bookId = params.get("bookId") ?? "";
  const book = BOOKS[bookId] ?? DEFAULT_BOOK;

  const [spreadIndex, setSpreadIndex] = useState(0);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [activePanel, setActivePanel] = useState<"" | "toc" | "search" | "bookmark">("");
  const [pageInput, setPageInput] = useState("");
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<"spread" | "left" | "right">("spread");
  const [selectedClass, setSelectedClass] = useState("");

  const spreads = [
    { type: "cover", label: "표지 / 목차", pages: [1, 2] },
    ...book.units.map((unit, i) => ({ type: "opener", label: `${unit.title} - ${unit.subtitle}`, unit, pages: [i * 6 + 3, i * 6 + 4], accentIdx: i % ACCENT_COLORS.length })),
    ...book.units.map((unit, i) => ({ type: "reading", label: `${unit.title} Reading`, unit, pages: [i * 6 + 5, i * 6 + 6], accentIdx: i % ACCENT_COLORS.length })),
    ...book.units.map((unit, i) => ({ type: "vocab", label: `${unit.title} Vocabulary`, unit, pages: [i * 6 + 7, i * 6 + 8], accentIdx: i % ACCENT_COLORS.length })),
  ].sort((a, b) => a.pages[0] - b.pages[0]);

  const current = spreads[spreadIndex] ?? spreads[0];
  const isBookmarked = bookmarks.includes(spreadIndex);

  const toggleBookmark = useCallback(() => {
    setBookmarks(prev => prev.includes(spreadIndex)
      ? prev.filter(b => b !== spreadIndex)
      : [...prev, spreadIndex]);
  }, [spreadIndex]);

  const openPanel = (panel: typeof activePanel) => {
    setActivePanel(prev => prev === panel ? "" : panel);
  };

  return (
    <div className="flex flex-col h-screen bg-[#d6c9a8] select-none overflow-hidden">

      {/* ── 상단 툴바 ── */}
      {toolbarVisible && (
        <div className="bg-white shadow-md z-20 relative">
          <div className="flex items-center justify-between px-8 py-2">
            {/* 왼쪽 */}
            <div className="flex items-center gap-1">
              <Link href={`/edutech/connecting-book?bookId=${bookId}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-[#1B3A6B] hover:bg-slate-50 rounded-lg transition-all font-semibold">
                <Svg d={Icon.back} size={14} />
                나가기
              </Link>
              <div className="w-px h-4 bg-slate-200 mx-2" />
              {[
                { key: "toc" as const,      label: "목차",   icon: Icon.toc      },
                { key: "search" as const,   label: "검색",   icon: Icon.search   },
              ].map(tool => (
                <button key={tool.key}
                  onClick={() => openPanel(tool.key)}
                  className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-all ${
                    activePanel === tool.key ? "text-teal-600 bg-teal-50" : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                  }`}>
                  <Svg d={tool.icon} size={18} />
                  <span className="text-[10px] font-semibold">{tool.label}</span>
                </button>
              ))}
            </div>

            {/* 가운데 - 책 제목 */}
            <div className="text-center">
              <p className="text-xs font-black text-slate-700">{book.title}</p>
              <p className="text-[10px] text-slate-400">{current.label}</p>
            </div>

            {/* 오른쪽 */}
            <div className="flex items-center gap-1">
              <div className="w-px h-4 bg-slate-200 mx-2" />
              {[
                { key: "bookmark" as const, label: "북마크", icon: Icon.bookmark },
                { key: "" as const,         label: "도움말", icon: Icon.help,     action: () => {} },
              ].map(tool => (
                <button key={tool.label}
                  onClick={() => tool.key ? openPanel(tool.key) : undefined}
                  className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-all ${
                    (tool.key && activePanel === tool.key) || (tool.key === "" && false)
                      ? "text-teal-600 bg-teal-50"
                      : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                  }`}>
                  <Svg d={tool.icon} size={18} />
                  <span className="text-[10px] font-semibold">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* 툴바 숨기기 버튼 */}
          <button onClick={() => setToolbarVisible(false)}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-8 h-5 bg-white border border-slate-200 rounded-b-full flex items-center justify-center text-slate-400 hover:text-teal-500 shadow-sm z-10 transition-colors">
            <Svg d={Icon.up} size={10} />
          </button>
        </div>
      )}

      {/* 툴바 숨겨졌을 때 */}
      {!toolbarVisible && (
        <button onClick={() => setToolbarVisible(true)}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-5 bg-white border border-slate-200 rounded-b-full flex items-center justify-center text-slate-400 hover:text-teal-500 shadow-sm z-30 transition-colors">
          <Svg d={Icon.down} size={10} />
        </button>
      )}

      {/* ── 메인 영역 ── */}
      <div className="flex-1 flex relative overflow-hidden">

        {/* TOC 패널 */}
        {activePanel === "toc" && (
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-30 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800">목차</h3>
              <button onClick={() => setActivePanel("")} className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <Svg d={Icon.close} size={14} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 py-2">
              {spreads.map((s, i) => (
                <button key={i} onClick={() => { setSpreadIndex(i); setActivePanel(""); }}
                  className={`w-full text-left px-4 py-2.5 text-xs hover:bg-teal-50 hover:text-teal-700 transition-all flex items-center gap-2 ${
                    spreadIndex === i ? "bg-teal-50 text-teal-700 font-bold" : "text-slate-600"
                  }`}>
                  <span className="text-[10px] text-slate-300 w-10 shrink-0">p.{s.pages[0]}-{s.pages[1]}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 검색 패널 */}
        {activePanel === "search" && (
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-30 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800">검색</h3>
              <button onClick={() => setActivePanel("")} className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <Svg d={Icon.close} size={14} />
              </button>
            </div>
            <div className="px-4 pt-3">
              <input autoFocus placeholder="검색어를 입력하세요" className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400" />
            </div>
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">검색 결과가 없습니다</div>
          </div>
        )}

        {/* 북마크 패널 */}
        {activePanel === "bookmark" && (
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-30 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800">북마크 ({bookmarks.length})</h3>
              <button onClick={() => setActivePanel("")} className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <Svg d={Icon.close} size={14} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 py-2">
              {bookmarks.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-xs text-slate-400 py-12">북마크가 없습니다</div>
              ) : bookmarks.map(bi => {
                const s = spreads[bi];
                return (
                  <button key={bi} onClick={() => { setSpreadIndex(bi); setActivePanel(""); }}
                    className="w-full text-left px-4 py-2.5 text-xs hover:bg-teal-50 text-slate-600 flex items-center gap-2 transition-all">
                    <span className="text-teal-500">🔖</span>
                    <span>{s?.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 왼쪽 북마크 버튼 */}
        <button onClick={toggleBookmark}
          className={`absolute left-3 top-6 z-10 w-8 h-10 flex items-center justify-center transition-all ${
            isBookmarked ? "text-teal-500" : "text-[#d6c9a8] hover:text-teal-400"
          }`}>
          <svg width="24" height="30" viewBox="0 0 24 30" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M3 2h18v26l-9-5-9 5V2z" />
          </svg>
        </button>

        {/* 오른쪽 북마크 버튼 */}
        <button onClick={toggleBookmark}
          className={`absolute right-14 top-6 z-10 w-8 h-10 flex items-center justify-center transition-all ${
            isBookmarked ? "text-teal-500" : "text-[#d6c9a8] hover:text-teal-400"
          }`}>
          <svg width="24" height="30" viewBox="0 0 24 30" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M3 2h18v26l-9-5-9 5V2z" />
          </svg>
        </button>

        {/* ── 책 스프레드 ── */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="flex shadow-2xl rounded-sm overflow-hidden"
            style={{ width: "min(900px, calc(100vw - 160px))", height: "min(620px, calc(100vh - 160px))", minWidth: 600 }}>

            {/* 페이지 콘텐츠 */}
            {current.type === "cover" && <CoverSpread book={book} />}
            {current.type === "opener" && "unit" in current && (
              <UnitOpenerSpread
                unit={current.unit!}
                pageLeft={current.pages[0]}
                pageRight={current.pages[1]}
                accentColor={ACCENT_COLORS[current.accentIdx ?? 0]}
              />
            )}
            {current.type === "reading" && "unit" in current && (
              <ReadingSpread
                unit={current.unit!}
                pageLeft={current.pages[0]}
                pageRight={current.pages[1]}
                accentColor={ACCENT_COLORS[current.accentIdx ?? 0]}
              />
            )}
            {current.type === "vocab" && "unit" in current && (
              <VocabSpread
                unit={current.unit!}
                pageLeft={current.pages[0]}
                pageRight={current.pages[1]}
                accentColor={ACCENT_COLORS[current.accentIdx ?? 0]}
              />
            )}

            {/* 중앙 페이지 바인딩 선 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 pointer-events-none" />
          </div>
        </div>

        {/* ── 오른쪽 플로팅 툴바 ── */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          {[
            { icon: Icon.expand,    tip: "전체화면" },
            { icon: Icon.pen,       tip: "필기" },
            { icon: Icon.highlight, tip: "하이라이트" },
          ].map((tool, i) => (
            <button key={i}
              title={tool.tip}
              className="w-10 h-10 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95">
              <Svg d={tool.icon} size={16} />
            </button>
          ))}
        </div>

        {/* ── 페이지 이전/다음 화살표 ── */}
        <button onClick={() => setSpreadIndex(i => Math.max(0, i - 1))}
          disabled={spreadIndex === 0}
          className="absolute left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10">
          <Svg d={Icon.prev} size={16} />
        </button>
        <button onClick={() => setSpreadIndex(i => Math.min(spreads.length - 1, i + 1))}
          disabled={spreadIndex === spreads.length - 1}
          className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10">
          <Svg d={Icon.next} size={16} />
        </button>
      </div>

      {/* ── 하단 툴바 ── */}
      <div className="bg-white border-t border-slate-200 shadow-lg z-20 px-4 py-2 flex items-center gap-1 overflow-x-auto">

        {/* 썸네일 뷰 */}
        <button title="썸네일 보기"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-teal-500 hover:bg-teal-50 transition-all shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />

        {/* 처음 페이지 */}
        <button onClick={() => setSpreadIndex(0)} disabled={spreadIndex === 0} title="처음 페이지"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-teal-500 hover:bg-teal-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* 이전 페이지 */}
        <button onClick={() => setSpreadIndex(i => Math.max(0, i - 1))} disabled={spreadIndex === 0} title="이전 페이지"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-teal-500 hover:bg-teal-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* 페이지 입력 */}
        <div className="flex items-center gap-1.5 shrink-0">
          <input
            type="text"
            value={pageInput || String(current.pages[0])}
            onChange={e => setPageInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                const target = parseInt(pageInput);
                const idx = spreads.findIndex(s => s.pages[0] <= target && target <= s.pages[1]);
                if (idx >= 0) { setSpreadIndex(idx); setPageInput(""); }
              }
            }}
            className="w-10 text-center text-sm font-black text-teal-600 border border-slate-300 rounded-lg py-1 focus:outline-none focus:border-teal-400"
          />
          <span className="text-xs text-slate-400 shrink-0">/ {spreads[spreads.length - 1]?.pages[1]}</span>
          <button
            onClick={() => {
              const target = parseInt(pageInput);
              const idx = spreads.findIndex(s => s.pages[0] <= target && target <= s.pages[1]);
              if (idx >= 0) { setSpreadIndex(idx); setPageInput(""); }
            }}
            className="px-3 py-1 bg-teal-400 hover:bg-teal-500 text-white text-xs font-black rounded-full transition-colors">
            이동
          </button>
        </div>

        {/* 다음 페이지 */}
        <button onClick={() => setSpreadIndex(i => Math.min(spreads.length - 1, i + 1))} disabled={spreadIndex === spreads.length - 1} title="다음 페이지"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-teal-500 hover:bg-teal-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* 마지막 페이지 */}
        <button onClick={() => setSpreadIndex(spreads.length - 1)} disabled={spreadIndex === spreads.length - 1} title="마지막 페이지"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-teal-500 hover:bg-teal-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 5l7 7-7 7M6 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />

        {/* 확대 */}
        <button onClick={() => setZoom(z => Math.min(200, z + 10))} title="확대"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-teal-500 hover:bg-teal-50 transition-all shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
          </svg>
        </button>

        {/* 축소 */}
        <button onClick={() => setZoom(z => Math.max(50, z - 10))} title="축소"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-teal-500 hover:bg-teal-50 transition-all shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M8 11h6"/>
          </svg>
        </button>

        {/* 배율 표시 */}
        <span className="text-[11px] font-bold text-slate-500 w-10 text-center shrink-0">{zoom}%</span>

        <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />

        {/* 펼침 보기 */}
        <button onClick={() => setViewMode("spread")} title="펼침 보기"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all shrink-0 ${viewMode === "spread" ? "bg-teal-100 text-teal-600" : "text-teal-500 hover:bg-teal-50"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="9" height="16" rx="1"/><rect x="13" y="4" width="9" height="16" rx="1"/>
          </svg>
        </button>

        {/* 왼쪽 단면 */}
        <button onClick={() => setViewMode("left")} title="왼쪽 페이지만"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all shrink-0 ${viewMode === "left" ? "bg-teal-100 text-teal-600" : "text-teal-500 hover:bg-teal-50"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="11" height="16" rx="1"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4"/>
          </svg>
        </button>

        {/* 오른쪽 단면 */}
        <button onClick={() => setViewMode("right")} title="오른쪽 페이지만"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all shrink-0 ${viewMode === "right" ? "bg-teal-100 text-teal-600" : "text-teal-500 hover:bg-teal-50"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="11" y="4" width="11" height="16" rx="1"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8l-4 4 4 4"/>
          </svg>
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />

        {/* 인쇄 */}
        <button title="인쇄" onClick={() => window.print()}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-teal-500 hover:bg-teal-50 transition-all shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />

        {/* 학급 선택 */}
        <div className="flex items-center gap-1.5 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="text-xs border border-slate-300 rounded-full px-3 py-1.5 text-slate-600 font-semibold focus:outline-none focus:border-teal-400 bg-white appearance-none cursor-pointer hover:border-teal-400 transition-colors"
          >
            <option value="">학급 선택</option>
            <option value="class1">1반</option>
            <option value="class2">2반</option>
            <option value="class3">3반</option>
            <option value="class4">4반</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default function ConnectingBookViewerPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-[#d6c9a8]">
        <div className="text-center text-white">
          <div className="text-4xl mb-3 animate-bounce">📖</div>
          <p className="font-bold">E-BOOK 로딩 중...</p>
        </div>
      </div>
    }>
      <ViewerContent />
    </Suspense>
  );
}
