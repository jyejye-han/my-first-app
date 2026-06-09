"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BOOKS_BASIC } from "../../lib/bookData";

const FEATURES = [
  { emoji: "📖", title: "디지털 교재",   desc: "종이 교재를 디지털로 그대로 재현. PC·태블릿 모두 지원" },
  { emoji: "🎬", title: "멀티미디어",    desc: "오디오·동영상 콘텐츠가 교재와 연동" },
  { emoji: "✏️", title: "필기·메모",    desc: "교재에 직접 필기하고 하이라이트 표시 가능" },
  { emoji: "👥", title: "클래스 공유",   desc: "학생들과 교재 페이지를 실시간으로 공유" },
];

function ConnectingBookContent() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId") ?? "";
  const book = BOOKS_BASIC[bookId] ?? null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/edutech" className="hover:text-blue-600">에듀테크</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">커넥팅북</span>
      </nav>

      {/* 헤더 배너 */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl p-6 text-white mb-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">📱</span>
          <h1 className="text-xl font-black">커넥팅북</h1>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">NEW</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">유료</span>
        </div>
        <p className="text-cyan-100 text-sm ml-10">YBM 교재 E-BOOK 디지털 플랫폼</p>
      </div>

      {/* 선택된 교재 카드 */}
      {book ? (
        <div className="bg-white rounded-2xl border-2 border-teal-300 shadow-md p-5 mb-5">
          <p className="text-xs font-bold text-teal-600 mb-3 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            선택된 교재
          </p>
          <div className="flex items-center gap-5">
            {/* 표지 */}
            {book.image ? (
              <img src={book.image} alt={book.title} className="w-16 h-22 object-cover rounded-xl shadow-sm border border-slate-100 shrink-0" style={{height:'88px'}} />
            ) : (
              <div className="w-16 h-22 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{height:'88px'}}>
                {book.emoji}
              </div>
            )}
            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <h2 className="font-black text-slate-800 text-base leading-snug">{book.title}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{book.author}</p>
              <div className="flex gap-1.5 mt-2">
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{book.levelGroup}</span>
                <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{book.category}</span>
              </div>
            </div>
            {/* 열기 버튼 */}
            <Link
              href={`/edutech/connecting-book/viewer?bookId=${bookId}`}
              className="shrink-0 flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              E-BOOK 열기
            </Link>
          </div>
        </div>
      ) : (
        /* 교재 미선택 상태 */
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5 flex items-center gap-4">
          <span className="text-3xl">📚</span>
          <div className="flex-1">
            <p className="font-semibold text-slate-700 text-sm">선택된 교재가 없습니다</p>
            <p className="text-xs text-slate-400 mt-0.5">마이클래스에서 교재를 선택한 후 커넥팅북을 이용하세요.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/my-class" className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#163060] text-white text-sm font-bold rounded-xl transition-colors">
              마이클래스 가기
            </Link>
            <Link
              href="/edutech/connecting-book/viewer"
              className="px-4 py-2 border border-teal-300 text-teal-600 hover:bg-teal-50 text-sm font-bold rounded-xl transition-colors"
            >
              E-BOOK 열기
            </Link>
          </div>
        </div>
      )}

      {/* 유료 안내 */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 mb-6">
        <span className="text-2xl shrink-0">💳</span>
        <div className="flex-1">
          <p className="font-bold text-amber-800 text-sm">유료 서비스입니다</p>
          <p className="text-xs text-amber-700 mt-0.5">교재 구매 시 E-BOOK 이용권이 함께 제공됩니다.</p>
        </div>
        <button className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors">
          이용권 확인
        </button>
      </div>

      {/* 기능 소개 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FEATURES.map((feat) => (
          <div key={feat.title} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex gap-3">
            <div className="text-2xl shrink-0">{feat.emoji}</div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{feat.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConnectingBookPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">로딩 중...</div>}>
      <ConnectingBookContent />
    </Suspense>
  );
}
