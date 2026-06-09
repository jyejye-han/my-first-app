"use client";
import { useState } from "react";
import Link from "next/link";

const BOOKS = [
  { id: "1",  title: "Reading Prime 1",               author: "YBM 편집부", level: "중등", category: "독해",   image: "/images/books/reading-prime-1.jpg",               isNew: false },
  { id: "6",  title: "Reading Prime 2",               author: "YBM 편집부", level: "중등", category: "독해",   image: "/images/books/reading-prime-2.jpg",               isNew: false },
  { id: "5",  title: "부스터 보카",                    author: "YBM 편집부", level: "고등", category: "어휘",   image: "/images/books/booster-voca.jpg",                  isNew: false },
  { id: "10", title: "Booster 유형독해",               author: "YBM 편집부", level: "고등", category: "독해",   image: "/images/books/booster-reading.jpg",               isNew: false },
  { id: "14", title: "Booster 구문독해",               author: "YBM 편집부", level: "고등", category: "구문",   image: "/images/books/booster-grammar.jpg",               isNew: false },
  { id: "16", title: "Listening Booster 30",          author: "YBM 편집부", level: "고등", category: "듣기",   image: "/images/books/listening-booster-30.jpg",          isNew: true  },
  { id: "11", title: "빈출구문 상승",                  author: "YBM 편집부", level: "고등", category: "구문",   image: "/images/books/binchul-gumun.jpg",                 isNew: false },
  { id: "3",  title: "Phonics NOW 1",                 author: "YBM 편집부", level: "초등", category: "파닉스", image: "/images/books/phonics-now-1.jpg",                 isNew: false },
  { id: "12", title: "Benchmark Reading Starter 1",   author: "YBM 편집부", level: "초등", category: "독해",   image: "/images/books/benchmark-reading-starter-1.jpg",   isNew: false },
  { id: "13", title: "Benchmark Reading Starter 3",   author: "YBM 편집부", level: "초등", category: "독해",   image: "/images/books/benchmark-reading-starter-3.jpg",   isNew: false },
  { id: "15", title: "Write NOW 1",                   author: "YBM 편집부", level: "초등", category: "쓰기",   image: "/images/books/write-now-1.jpg",                   isNew: true  },
  { id: "2",  title: "알리GO 올리GO 서술형 쓰기 2",   author: "YBM 편집부", level: "중등", category: "쓰기",   image: "/images/books/aligo-oligo.jpg",                   isNew: true  },
  { id: "4",  title: "연타 문법+쓰기 Level 1",        author: "YBM 편집부", level: "중등", category: "문법",   image: "/images/books/image-yeontar-grammar.jpg",         isNew: true  },
];

const LEVELS = ["전체", "초등", "중등", "고등"] as const;

export default function MobileTextbooksPage() {
  const [active, setActive] = useState<"전체"|"초등"|"중등"|"고등">("전체");
  const [query, setQuery] = useState("");

  const filtered = BOOKS.filter((b) => {
    const matchLevel = active === "전체" || b.level === active;
    const matchQuery = !query || b.title.toLowerCase().includes(query.toLowerCase());
    return matchLevel && matchQuery;
  }).sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  return (
    <div>
      {/* 검색 */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 sticky top-14 z-30">
        <div className="flex items-center gap-2 bg-slate-50 border-2 border-[#1B3A6B] rounded-xl px-3 py-2.5">
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="교재명 검색"
            className="flex-1 text-sm bg-transparent focus:outline-none text-slate-700"
          />
        </div>
        {/* 레벨 탭 */}
        <div className="flex gap-2 mt-2.5">
          {LEVELS.map((lv) => (
            <button
              key={lv}
              onClick={() => setActive(lv)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                active === lv ? "bg-[#1B3A6B] text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {lv}
            </button>
          ))}
        </div>
      </div>

      {/* 결과 수 */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <span className="text-xs text-slate-500">총 <span className="text-[#1B3A6B] font-bold">{filtered.length}</span>권</span>
      </div>

      {/* 교재 목록 */}
      <div className="px-4 space-y-3">
        {filtered.map((book) => (
          <Link
            key={book.id}
            href={`/textbooks/${book.id}`}
            className="flex items-center gap-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm active:bg-slate-50 transition-colors"
          >
            <img src={book.image} alt={book.title} className="w-14 h-20 object-cover rounded-xl shadow-sm border border-slate-100 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <p className="font-bold text-slate-800 text-sm leading-snug flex-1">{book.title}</p>
                {book.isNew && <span className="shrink-0 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
              </div>
              <p className="text-xs text-slate-500 mb-2">{book.author}</p>
              <div className="flex gap-1.5">
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{book.level}</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{book.category}</span>
              </div>
            </div>
            <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
      <div className="h-4" />
    </div>
  );
}
