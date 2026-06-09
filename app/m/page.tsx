import Link from "next/link";

const QUICK_SERVICES = [
  { label: "커넥팅북",    emoji: "📱", color: "bg-indigo-50 text-indigo-700 border-indigo-200",  href: "https://www.ybmcloud.com/connecting/content?siteType=E", ext: true },
  { label: "어휘마법사",  emoji: "✨", color: "bg-amber-50 text-amber-700 border-amber-200",      href: "/m/edutech", ext: false },
  { label: "클래스게임",  emoji: "🎮", color: "bg-orange-50 text-orange-700 border-orange-200",   href: "https://www.ybmcloud.com/twowaygames/content?siteType=E", ext: true },
  { label: "퀴즈나우",    emoji: "⚡", color: "bg-purple-50 text-purple-700 border-purple-200",   href: "https://school.ybmsmartschool.com/quiz/quiz_list?grd_cd=301002&sso_tag=4e89ae318b9ea3a9b6ab376912995b03", ext: true },
  { label: "라이브샷",    emoji: "📷", color: "bg-rose-50 text-rose-700 border-rose-200",         href: "https://school.ybmsmartschool.com/RxPs23/snstest", ext: true },
  { label: "화상수업",    emoji: "🎥", color: "bg-sky-50 text-sky-700 border-sky-200",            href: "https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56", ext: true },
];

const RECOMMENDED_BOOKS = [
  { id: "1",  title: "Reading Prime 1",    level: "중등", image: "/images/books/reading-prime-1.jpg" },
  { id: "5",  title: "부스터 보카",         level: "고등", image: "/images/books/booster-voca.jpg" },
  { id: "3",  title: "Phonics NOW 1",      level: "초등", image: "/images/books/phonics-now-1.jpg" },
  { id: "10", title: "Booster 유형독해",   level: "고등", image: "/images/books/booster-reading.jpg" },
  { id: "16", title: "Listening Booster",  level: "고등", image: "/images/books/listening-booster-30.jpg" },
];

const BANNERS = [
  { title: "마이클래스 이용 방법 안내", sub: "수업안 만들기 가이드", bg: "from-blue-600 to-indigo-700", href: "/m/my-class" },
  { title: "AI평가 서비스 OPEN",        sub: "AI 자동 채점·피드백", bg: "from-violet-600 to-purple-700", href: "/support/notices?id=3" },
  { title: "커넥팅북 E-BOOK 론칭",      sub: "디지털 교재로 스마트 수업", bg: "from-cyan-600 to-teal-700", href: "/support/notices?id=4" },
];

export default function MobileHomePage() {
  return (
    <div className="pb-4">

      {/* 검색바 */}
      <div className="bg-[#1B3A6B] px-4 pb-4">
        <Link href="/m/textbooks" className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm">
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm text-slate-400">교재명·저자 검색</span>
        </Link>
      </div>

      {/* 배너 슬라이더 */}
      <div className="px-4 mt-4 space-y-2.5">
        {BANNERS.map((b, i) => (
          <Link key={i} href={b.href} className={`flex items-center justify-between bg-gradient-to-r ${b.bg} rounded-2xl px-5 py-4 shadow-sm`}>
            <div>
              <p className="text-white font-bold text-sm leading-snug">{b.title}</p>
              <p className="text-white/70 text-xs mt-0.5">{b.sub}</p>
            </div>
            <svg className="w-5 h-5 text-white/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* 수업 도구 퀵메뉴 */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
          <span className="w-1 h-4 bg-[#1B3A6B] rounded-full inline-block" />
          수업 도구
        </h2>
        <div className="grid grid-cols-3 gap-2.5">
          {QUICK_SERVICES.map((s) => {
            const cls = `flex flex-col items-center gap-1.5 py-3.5 rounded-2xl border ${s.color} active:opacity-70 transition-opacity`;
            const inner = (
              <>
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-[11px] font-bold">{s.label}</span>
              </>
            );
            return s.ext ? (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
            ) : (
              <Link key={s.label} href={s.href} className={cls}>{inner}</Link>
            );
          })}
        </div>
      </div>

      {/* 추천 교재 */}
      <div className="mt-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <span className="w-1 h-4 bg-[#1B3A6B] rounded-full inline-block" />
            추천 교재
          </h2>
          <Link href="/m/textbooks" className="text-xs text-blue-600 font-semibold">전체보기 →</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {RECOMMENDED_BOOKS.map((book) => (
            <Link key={book.id} href={`/textbooks/${book.id}`} className="shrink-0 flex flex-col gap-2">
              <img src={book.image} alt={book.title} className="w-24 h-32 object-cover rounded-xl shadow-md border border-slate-100" />
              <div>
                <p className="text-xs font-semibold text-slate-800 w-24 line-clamp-2 leading-tight">{book.title}</p>
                <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full mt-0.5 inline-block">{book.level}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 바로가기 카드 */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-3">
        <Link href="/m/my-class" className="bg-[#1B3A6B] rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-2xl">📚</span>
          <p className="text-white font-bold text-sm">마이클래스</p>
          <p className="text-blue-200 text-xs">담은 교재 관리</p>
        </Link>
        <Link href="/m/edutech" className="bg-amber-400 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-2xl">💡</span>
          <p className="text-slate-900 font-bold text-sm">에듀테크</p>
          <p className="text-amber-800 text-xs">스마트 수업 도구</p>
        </Link>
        <Link href="/support/notices" className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-2xl">📢</span>
          <p className="text-slate-800 font-bold text-sm">공지사항</p>
          <p className="text-slate-400 text-xs">최신 소식 확인</p>
        </Link>
        <Link href="/my-page" className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-2xl">👤</span>
          <p className="text-slate-800 font-bold text-sm">마이페이지</p>
          <p className="text-slate-400 text-xs">회원정보 관리</p>
        </Link>
      </div>

    </div>
  );
}
