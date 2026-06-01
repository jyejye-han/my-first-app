import Link from "next/link";
import SearchBar from "./components/SearchBar";


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

const recommendedBooks = [
  { id: "1",  title: "Reading Prime 1",             level: "중등", category: "독해",   emoji: "📘", image: "/images/books/reading-prime-1.jpg" },
  { id: "15", title: "Write NOW 1",                 level: "초등", category: "쓰기",   emoji: "✏️", image: "/images/books/write-now-1.jpg" },
  { id: "3",  title: "Phonics NOW 1",               level: "초등", category: "파닉스", emoji: "📙", image: "/images/books/phonics-now-1.jpg" },
  { id: "12", title: "Benchmark Reading Starter 1", level: "초등", category: "독해",   emoji: "📗", image: "/images/books/benchmark-reading-starter-1.jpg" },
  { id: "10", title: "Booster 유형독해",             level: "고등", category: "독해",   emoji: "📰", image: "/images/books/booster-reading.jpg" },
  { id: "16", title: "Listening Booster 30",        level: "고등", category: "듣기",   emoji: "🎧", image: "/images/books/listening-booster-30.jpg" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#1B3A6B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
          <div className="text-center mb-8">
            <p className="text-blue-300 text-sm font-medium mb-2 tracking-wider uppercase">YBM 강사 전용 플랫폼</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              스마트한 수업, <span className="text-amber-400">Y튜터</span>와 함께
            </h1>
            <p className="text-blue-200 text-base md:text-lg">
              교재·수업도구·학습로드맵을 한 곳에서 관리하세요
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar />

        </div>
      </section>


{/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Banners */}
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

        {/* Recommended Books */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-slate-100">
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
                    className="w-16 h-[88px] object-cover rounded-lg shadow-sm border border-slate-100 mb-2.5"
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
      </div>
    </div>
  );
}
