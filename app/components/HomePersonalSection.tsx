"use client";
import Link from "next/link";
import { useMyClassBooks } from "../lib/useMyClassBooks";
import { BOOK_DB } from "../lib/bookDb";

export default function HomePersonalSection() {
  const { ids, ready } = useMyClassBooks();
  const shown = ids.slice(0, 6);

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-[#1B3A6B] text-sm font-bold">내 교재</span>
        <span className="text-slate-300 text-sm">·</span>
        <span className="text-slate-500 text-sm font-medium">{ids.length}권 담김</span>
        <span className="text-slate-400 text-[14px]">(마이클래스에서 수업 자료/AI 평가 즉시 이용)</span>
        <Link href="/my-class" className="ml-auto text-slate-400 hover:text-[#1B3A6B] text-sm transition-colors flex items-center gap-1 font-medium shrink-0">
          전체보기
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 교재 카드 */}
      {!ready ? (
        <div className="flex gap-3 flex-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 flex-1">
          {Array.from({ length: 6 }).map((_, i) => {
            const id = shown[i];
            const book = id ? BOOK_DB[id] : null;

            if (book) {
              return (
                <Link
                  key={id}
                  href="/my-class"
                  className="flex-1 min-w-0 flex flex-col items-center justify-center gap-2 group"
                >
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-[72px] h-[100px] object-cover rounded-lg shadow-md border border-slate-200 group-hover:shadow-lg group-hover:scale-[1.03] transition-all shrink-0"
                    />
                  ) : (
                    <div className="w-[72px] h-[100px] bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-2xl shadow-md group-hover:scale-[1.03] transition-all shrink-0">
                      {book.emoji}
                    </div>
                  )}
                  <p className="text-[11px] font-semibold text-slate-700 group-hover:text-[#1B3A6B] text-center line-clamp-2 leading-tight w-full transition-colors">
                    {book.title}
                  </p>
                </Link>
              );
            }

            return (
              <Link
                key={`empty-${i}`}
                href="/textbooks"
                className="flex-1 min-w-0 flex flex-col items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-blue-300 rounded-lg hover:bg-blue-50/50 transition-all group"
              >
                <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-[10px] text-slate-300 group-hover:text-blue-400 transition-colors">교재 추가</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
