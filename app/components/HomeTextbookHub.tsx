"use client";
import { useState } from "react";
import Link from "next/link";

const BOOKS = [
  { id: "1",  title: "Reading Prime 1",             author: "YBM 편집부", level: "중등", category: "독해",   image: "/images/books/reading-prime-1.jpg",              isNew: false },
  { id: "2",  title: "알리GO 올리GO 서술형 쓰기 2",  author: "YBM 편집부", level: "중등", category: "쓰기",   image: "/images/books/aligo-oligo.jpg",                  isNew: true  },
  { id: "3",  title: "Phonics NOW 1",               author: "YBM 편집부", level: "초등", category: "파닉스", image: "/images/books/phonics-now-1.jpg",                isNew: false },
  { id: "4",  title: "연타 문법+쓰기 Level 1",       author: "YBM 편집부", level: "중등", category: "문법",   image: "/images/books/image-yeontar-grammar.jpg",        isNew: true  },
  { id: "5",  title: "부스터 보카",                  author: "YBM 편집부", level: "고등", category: "어휘",   image: "/images/books/booster-voca.jpg",                 isNew: false },
  { id: "6",  title: "Reading Prime 2",             author: "YBM 편집부", level: "중등", category: "독해",   image: "/images/books/reading-prime-2.jpg",              isNew: false },
  { id: "8",  title: "개념 연산 SOS 중등 수학 3·1", author: "YBM 편집부", level: "중등", category: "수학",   image: "/images/books/gaenyeom-sos.jpg",                 isNew: true  },
  { id: "10", title: "Booster 유형독해",             author: "YBM 편집부", level: "고등", category: "독해",   image: "/images/books/booster-reading.jpg",              isNew: false },
  { id: "11", title: "빈출구문 상승",                author: "YBM 편집부", level: "고등", category: "구문",   image: "/images/books/binchul-gumun.jpg",                isNew: false },
  { id: "12", title: "Benchmark Reading Starter 1", author: "YBM 편집부", level: "초등", category: "독해",   image: "/images/books/benchmark-reading-starter-1.jpg", isNew: false },
  { id: "13", title: "Benchmark Reading Starter 3", author: "YBM 편집부", level: "초등", category: "독해",   image: "/images/books/benchmark-reading-starter-3.jpg", isNew: false },
  { id: "14", title: "Booster 구문독해",             author: "YBM 편집부", level: "고등", category: "구문",   image: "/images/books/booster-grammar.jpg",              isNew: false },
  { id: "15", title: "Write NOW 1",                 author: "YBM 편집부", level: "초등", category: "쓰기",   image: "/images/books/write-now-1.jpg",                  isNew: true  },
  { id: "16", title: "Listening Booster 30",        author: "YBM 편집부", level: "고등", category: "듣기",   image: "/images/books/listening-booster-30.jpg",         isNew: true  },
];

const LEVEL_TABS = ["전체", "초등", "중등", "고등"] as const;
type Level = typeof LEVEL_TABS[number];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  독해:   { bg: "bg-blue-50",    text: "text-blue-600"   },
  문법:   { bg: "bg-purple-50",  text: "text-purple-600" },
  쓰기:   { bg: "bg-teal-50",    text: "text-teal-600"   },
  어휘:   { bg: "bg-amber-50",   text: "text-amber-600"  },
  파닉스: { bg: "bg-pink-50",    text: "text-pink-600"   },
  구문:   { bg: "bg-orange-50",  text: "text-orange-600" },
  수학:   { bg: "bg-green-50",   text: "text-green-600"  },
  듣기:   { bg: "bg-sky-50",     text: "text-sky-600"    },
  종합:   { bg: "bg-slate-100",  text: "text-slate-600"  },
};

export default function HomeTextbookHub() {
  const [activeLevel, setActiveLevel] = useState<Level>("전체");

  const filtered = activeLevel === "전체"
    ? BOOKS
    : BOOKS.filter(b => b.level === activeLevel);

  // 현재 탭에서 나오는 카테고리 목록
  const categories = Array.from(new Set(filtered.map(b => b.category)));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-lg">📚</span>
          <h2 className="font-bold text-slate-800">교재 허브</h2>
          <span className="text-xs text-slate-400 font-normal ml-1">YBM 전체 교재</span>
        </div>
        <Link
          href="/textbooks"
          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5"
        >
          전체보기
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 레벨 탭 */}
      <div className="flex items-center gap-1 px-5 pt-4 pb-3">
        {LEVEL_TABS.map(tab => {
          const count = tab === "전체" ? BOOKS.length : BOOKS.filter(b => b.level === tab).length;
          const isActive = activeLevel === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveLevel(tab)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                isActive
                  ? "bg-[#1B3A6B] text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {tab}
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
              }`}>{count}</span>
            </button>
          );
        })}

        {/* 카테고리 뱃지 */}
        <div className="ml-3 flex items-center gap-1.5 flex-wrap">
          {categories.map(cat => {
            const c = CATEGORY_COLORS[cat] ?? { bg: "bg-slate-100", text: "text-slate-600" };
            return (
              <span key={cat} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                {cat}
              </span>
            );
          })}
        </div>
      </div>

      {/* 교재 그리드 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 divide-x divide-y divide-slate-100 border-t border-slate-100">
        {filtered.map(book => {
          const cc = CATEGORY_COLORS[book.category] ?? { bg: "bg-slate-100", text: "text-slate-600" };
          return (
            <Link
              key={book.id}
              href={`/textbooks/${book.id}`}
              className="p-3 hover:bg-blue-50 transition-colors group flex flex-col items-center text-center"
            >
              <div className="relative mb-2">
                {book.image ? (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-[72px] h-[100px] object-cover rounded-lg shadow-sm border border-slate-100"
                  />
                ) : (
                  <div className="w-[72px] h-[100px] bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center text-3xl shadow-sm" />
                )}
                {book.isNew && (
                  <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-black leading-none">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-[11px] font-semibold text-slate-700 group-hover:text-blue-700 line-clamp-2 leading-snug w-full">
                {book.title}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1.5 flex-wrap">
                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{book.level}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${cc.bg} ${cc.text}`}>{book.category}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
