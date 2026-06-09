import Link from "next/link";

const banners = [
  {
    id: 1,
    title: "마이클래스, 수업안 만들기 이용 방법 안내",
    sub: "마이클래스 기능 및 수업안 작성 가이드",
    bg: "from-blue-600 to-indigo-700",
    href: "/support/notices?id=7",
  },
  {
    id: 2,
    title: "AI평가 서비스 OPEN",
    sub: "AI 기반 자동 채점 · 피드백 제공",
    bg: "from-violet-600 to-purple-700",
    href: "/support/notices?id=3",
    isNew: true,
  },
  {
    id: 3,
    title: "커넥팅북 E-BOOK 론칭",
    sub: "디지털 교재로 수업 퀄리티를 높이세요",
    bg: "from-cyan-600 to-teal-700",
    href: "/support/notices?id=4",
    isNew: true,
  },
];

const notices = [
  { id: 7,  title: "마이클래스, 수업안 만들기 이용 방법 안내",             date: "2025-06-01", isImportant: true },
  { id: 1,  title: "[공지] 2025년 YBM 신규 교재 등록 안내",               date: "2025-05-20", isImportant: true },
  { id: 2,  title: "[공지] 에듀테크 서비스 점검 안내 (5/25 02:00~04:00)", date: "2025-05-18", isImportant: true },
  { id: 3,  title: "AI평가 서비스 정식 출시 안내",                         date: "2025-05-15", isImportant: false },
  { id: 4,  title: "커넥팅북 E-BOOK 업데이트 내역",                       date: "2025-05-10", isImportant: false },
];

const faqs = [
  { q: "Y튜터는 누가 사용할 수 있나요?" },
  { q: "교재 자료는 어디서 다운받나요?" },
  { q: "마이클래스 학생 수 제한이 있나요?" },
  { q: "유료 서비스는 어떻게 결제하나요?" },
  { q: "E-BOOK은 어떤 기기에서 사용할 수 있나요?" },
];

const recommendedBooks = [
  { id: "1",  title: "Reading Prime 1",             level: "중등", category: "독해",   emoji: "📘", image: "/images/books/reading-prime-1.jpg" },
  { id: "15", title: "Write NOW 1",                 level: "초등", category: "쓰기",   emoji: "✏️", image: "/images/books/write-now-1.jpg" },
  { id: "3",  title: "Phonics NOW 1",               level: "초등", category: "파닉스", emoji: "📙", image: "/images/books/phonics-now-1.jpg" },
  { id: "12", title: "Benchmark Reading Starter 1", level: "초등", category: "독해",   emoji: "📗", image: "/images/books/benchmark-reading-starter-1.jpg" },
  { id: "10", title: "Booster 유형독해",             level: "고등", category: "독해",   emoji: "📰", image: "/images/books/booster-reading.jpg" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#1B3A6B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[58px] md:pt-[77px] pb-[58px] md:pb-[77px]">
          <div className="text-center">
            <p className="text-blue-300 text-sm font-medium mb-2 tracking-wider uppercase">YBM 강사 전용 플랫폼</p>
            <h1 className="text-[36px] md:text-[44px] font-black tracking-tight mb-3">
              스마트한 수업, <span className="text-amber-400">Y튜터</span>와 함께
            </h1>
            <p className="text-blue-200 text-[19px] md:text-[21px]">
              교재·수업도구·학습로드맵을 한 곳에서 관리하세요
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* 배너 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className={`relative bg-gradient-to-br ${banner.bg} rounded-2xl p-5 text-white hover:scale-[1.02] transition-transform duration-200 overflow-hidden`}
            >
              {banner.isNew && (
                <span className="absolute top-3 right-3 text-[10px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-bold">
                  NEW
                </span>
              )}
              <p className="text-white/70 text-xs mb-1">{banner.sub}</p>
              <p className="font-bold text-base leading-snug">{banner.title}</p>
              <div className="mt-3 flex items-center gap-1 text-white/80 text-xs font-medium">
                자세히 보기
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* 추천 도서 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 text-lg">⭐</span>
              <h2 className="font-bold text-slate-800">추천 도서</h2>
            </div>
            <Link href="/textbooks" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
              전체보기
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y divide-slate-100">
            {recommendedBooks.map((book) => (
              <Link
                key={book.id}
                href={`/textbooks/${book.id}`}
                className="p-4 hover:bg-blue-50 transition-colors group flex flex-col items-center text-center"
              >
                {book.image ? (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-[84px] h-[115px] object-cover rounded-lg shadow-sm border border-slate-100 mb-2.5"
                  />
                ) : (
                  <div className="text-4xl mb-2">{book.emoji}</div>
                )}
                <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-2 leading-snug w-full">
                  {book.title}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1.5 flex-wrap">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{book.level}</span>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{book.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 공지사항 + FAQ */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row">
          {/* 공지사항 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
                <h3 className="text-xs font-bold text-slate-700">공지사항</h3>
              </div>
              <Link href="/support/notices" className="text-[10px] text-blue-500 hover:text-blue-700 font-medium flex items-center gap-0.5">
                더보기
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <ul>
              {notices.map((n) => (
                <li key={n.id} className="border-b border-slate-50 last:border-0">
                  <Link href={`/support/notices?id=${n.id}`} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors group">
                    {n.isImportant && (
                      <span className="shrink-0 text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-none">중요</span>
                    )}
                    <p className="flex-1 text-[11px] text-slate-700 group-hover:text-blue-700 truncate">{n.title}</p>
                    <span className="shrink-0 text-[10px] text-slate-400">{n.date.slice(5)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-px bg-slate-100 hidden sm:block" />
          <div className="h-px bg-slate-100 sm:hidden" />

          {/* FAQ */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <h3 className="text-xs font-bold text-slate-700">FAQ</h3>
              </div>
              <Link href="/support/faq" className="text-[10px] text-blue-500 hover:text-blue-700 font-medium flex items-center gap-0.5">
                더보기
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <ul>
              {faqs.map((faq, i) => (
                <li key={i} className="border-b border-slate-50 last:border-0">
                  <Link href="/support/faq" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors group">
                    <span className="shrink-0 w-3.5 h-3.5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[8px] font-bold">Q</span>
                    <p className="flex-1 text-[11px] text-slate-700 group-hover:text-blue-700 truncate">{faq.q}</p>
                    <svg className="w-2.5 h-2.5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
