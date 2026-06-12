"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/useAuth";

type Book = {
  id: string;
  title: string;
  author: string;
  levelGroup: string;
  category: string;
  emoji: string;
  image?: string;
  publishDate: string;
  description: string;
  isbn?: string;
  pages?: number;
  toc?: string[];
  isNew?: boolean;
};

type SiteMode = "ytutor" | "ybmbooks";

const THEME = {
  ytutor: {
    headerBg:      "bg-[#1B3A6B]",
    headerHover:   "hover:bg-[#163060]",
    accentText:    "text-blue-200",
    contentBg:     "bg-blue-50/40",
    contentBorder: "border-2 border-blue-100",
    divideBorder:  "divide-blue-100",
    tabLine:       "bg-blue-600",
    tabText:       "text-blue-700",
    badgeBg:       "bg-blue-50",
    badgeText:     "text-blue-600",
    toggleActiveBg: "bg-[#1B3A6B]",
    toggleActiveText: "text-white",
    label:         "Y튜터 강사용",
    icon:          "🎓",
  },
  ybmbooks: {
    headerBg:      "bg-amber-500",
    headerHover:   "hover:bg-amber-600",
    accentText:    "text-amber-100",
    contentBg:     "bg-amber-50/40",
    contentBorder: "border-2 border-amber-200",
    divideBorder:  "divide-amber-100",
    tabLine:       "bg-amber-500",
    tabText:       "text-amber-600",
    badgeBg:       "bg-amber-50",
    badgeText:     "text-amber-700",
    toggleActiveBg: "bg-amber-500",
    toggleActiveText: "text-white",
    label:         "YBM북스-초중고",
    icon:          "📚",
  },
} as const;

const MATERIALS = [
  { id: "vocab",     label: "어휘리스트",  icon: "📝", type: "PDF",  color: "text-rose-500",    bg: "bg-rose-50",    border: "border-rose-100" },
  { id: "ppt",       label: "강의용 PPT",  icon: "📊", type: "PPT",  color: "text-orange-500",  bg: "bg-orange-50",  border: "border-orange-100" },
  { id: "worksheet", label: "워크시트",    icon: "📋", type: "PDF",  color: "text-green-600",   bg: "bg-green-50",   border: "border-green-100" },
  { id: "text",      label: "본문파일",    icon: "📄", type: "PDF",  color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100" },
  { id: "audio",     label: "듣기파일",    icon: "🎧", type: "MP3",  color: "text-purple-600",  bg: "bg-purple-50",  border: "border-purple-100" },
];

// YBM북스 모드 전용 부가자료 파일 목록
const YBM_FILES = [
  { id: "errata",   label: "정오표",        type: "doc",  free: true  },
  { id: "answer",   label: "정답 및 해석",   type: "doc",  free: true  },
  { id: "mp3play",  label: "MP3 바로 듣기",  type: "mp3",  free: true  },
  { id: "textpdf",  label: "본문 (PDF)",     type: "doc",  free: false },
  { id: "mp3file",  label: "MP3 파일",       type: "mp3",  free: false },
];

function getShortDesc(description: string): string {
  const lines = description.split('\n').map(l => l.trim()).filter(l => l);
  const tagline = lines.find(l =>
    (l.endsWith('습니다.') || l.endsWith('니다.') || l.endsWith('다.')) &&
    !l.match(/^[A-Za-z가-힣\s·]+특징$/) &&
    l.length < 100
  );
  return tagline ?? "";
}

function getMockPrice(pages?: number): string {
  if (!pages) return "14,000";
  if (pages < 140) return "12,000";
  if (pages < 220) return "14,000";
  if (pages < 300) return "16,800";
  return "18,000";
}

function DocIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function Mp3Icon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

function renderDescription(text: string) {
  return text.split('\n').map((line, i) => {
    if (/^\[.+\]$/.test(line.trim())) {
      return <p key={i} className="font-bold text-slate-800 mt-4 mb-1 text-sm">{line.trim()}</p>;
    }
    if (line.startsWith('- ')) {
      return <p key={i} className="text-sm text-slate-600 leading-relaxed pl-3">• {line.slice(2)}</p>;
    }
    if (line.startsWith('* ')) {
      return <p key={i} className="text-sm font-semibold text-slate-700 mt-2">{line.slice(2)}</p>;
    }
    if (line.startsWith(': ')) {
      return <p key={i} className="text-sm text-slate-500 leading-relaxed pl-3 mb-1">{line.slice(2)}</p>;
    }
    if (line.trim() === '') return <div key={i} className="h-1" />;
    return <p key={i} className="text-sm text-slate-700 leading-relaxed">{line}</p>;
  });
}

export default function TextbookDetailClient({ book }: { book: Book }) {
  const [activeTab, setActiveTab] = useState<"intro" | "toc">("intro");
  const [siteMode, setSiteMode] = useState<SiteMode>("ytutor");
  const [loginToast, setLoginToast] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const t = THEME[siteMode];

  const handleMyClass = () => {
    if (!isLoggedIn) {
      setLoginToast(true);
      setTimeout(() => { setLoginToast(false); router.push("/login?next=/my-class"); }, 1500);
      return;
    }
    router.push(`/my-class?add=${book.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* 로그인 필요 토스트 */}
      {loginToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0-6v2m0-10a9 9 0 100 18 9 9 0 000-18z" />
          </svg>
          로그인이 필요합니다. 로그인 페이지로 이동합니다.
        </div>
      )}

      {/* ── 사이트 모드 전환 탭 ── */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl mb-6 shadow-inner">
        {(["ytutor", "ybmbooks"] as const).map((mode) => {
          const th = THEME[mode];
          const isActive = siteMode === mode;
          return (
            <button
              key={mode}
              onClick={() => setSiteMode(mode)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? `${th.toggleActiveBg} ${th.toggleActiveText} shadow-sm`
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span>{th.icon}</span>
              {th.label}
              {isActive && (
                <span className={`w-1.5 h-1.5 rounded-full ${mode === "ytutor" ? "bg-blue-300" : "bg-amber-200"}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* 브레드크럼 */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/textbooks" className="hover:text-blue-600 transition-colors">교재</Link>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-700 font-medium truncate">{book.title}</span>
      </nav>

      {/* ── 상단 영역: 썸네일 + 정보 + 자료 ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-7">

          {/* ── 표지 이미지 ── */}
          <div className="shrink-0 flex flex-col gap-3">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="w-[211px] h-[298px] object-cover rounded-xl shadow-lg border border-slate-100"
              />
            ) : (
              <div className="w-[211px] h-[298px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-8xl shadow-lg border border-slate-100">
                {book.emoji}
              </div>
            )}

            {/* Y튜터: 메타 정보 박스 | YBM북스: 미리보기·크게보기 */}
            {siteMode === "ytutor" ? (
              <div className="w-[211px] bg-slate-50 rounded-xl border border-slate-100 px-3 py-2.5 space-y-1.5">
                {book.publishDate && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">출간</span>
                    <span className="text-slate-700 font-semibold">{book.publishDate}</span>
                  </div>
                )}
                {book.pages && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">페이지</span>
                    <span className="text-slate-700 font-semibold">{book.pages}p</span>
                  </div>
                )}
                {book.isbn && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">ISBN</span>
                    <span className="text-slate-600 font-mono text-[10px]">{book.isbn.slice(-7)}</span>
                  </div>
                )}
                <div className="pt-1 border-t border-slate-200">
                  <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-3">{book.description}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 w-[211px]">
                <button className="flex-1 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  미리보기
                </button>
                <button className="flex-1 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  크게보기
                </button>
              </div>
            )}
          </div>

          {/* ── 우측 패널: Y튜터 vs YBM북스 ── */}
          {siteMode === "ytutor" ? (

            /* ---- Y튜터 강사용 레이아웃 ---- */
            <div className="flex-1 min-w-0 flex flex-col gap-5">

              {/* 도서 기본 정보 */}
              <div>
                <div className="flex items-start gap-2.5 mb-1.5">
                  <h1 className="text-2xl font-black text-slate-800 leading-tight">{book.title}</h1>
                  {book.isNew && (
                    <span className="shrink-0 mt-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                  )}
                </div>
                <p className="text-slate-500 text-sm mb-3">{book.author}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{book.levelGroup}</span>
                  <span className={`text-xs ${t.badgeBg} ${t.badgeText} px-3 py-1 rounded-full font-medium transition-colors duration-300`}>{book.category}</span>
                  <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1 rounded-full">{book.publishDate} 출간</span>
                  {book.pages && <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1 rounded-full">{book.pages}p</span>}
                  {book.isbn && <span className="text-xs bg-slate-50 text-slate-400 px-3 py-1 rounded-full font-mono">ISBN {book.isbn}</span>}
                </div>
              </div>

              {/* 부가자료 영역 */}
              <div className={`rounded-xl ${t.contentBorder} ${t.contentBg} overflow-hidden flex-1 transition-colors duration-300`}>
                <div className={`flex items-center justify-between px-4 py-2.5 ${t.headerBg} transition-colors duration-300`}>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <svg className={`w-4 h-4 ${t.accentText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    부가자료
                  </p>
                  <button className="flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold rounded-lg transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    모아받기
                  </button>
                </div>
                <ul className={`divide-y ${t.divideBorder} px-3 py-1.5`}>
                  {MATERIALS.map((m) => (
                    <li key={m.id} className="flex items-center gap-2 py-2">
                      <span className="text-sm shrink-0">{m.icon}</span>
                      <span className="text-xs font-semibold text-slate-700 w-20 shrink-0">{m.label}</span>
                      <span className={`text-[10px] font-bold ${m.color} bg-white px-1.5 py-0.5 rounded border ${m.border} shrink-0`}>{m.type}</span>
                      <button className={`ml-auto shrink-0 flex items-center gap-1 ${m.color} bg-white border ${m.border} hover:opacity-70 transition-opacity px-2 py-1 rounded-lg text-[10px] font-bold`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        받기
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-wrap gap-2">
                <div className="relative group/tip">
                  <button
                    onClick={handleMyClass}
                    className={`flex items-center gap-1.5 px-5 py-2.5 ${t.headerBg} ${t.headerHover} text-white text-sm font-semibold rounded-xl transition-colors`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    마이클래스 담기
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-56 bg-slate-800 text-white text-[11px] rounded-xl px-3.5 py-2.5 leading-relaxed opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity duration-150 z-20 text-center shadow-xl whitespace-normal">
                    <p className="font-semibold mb-0.5">마이클래스에 담아두세요! 📚</p>
                    <p className="text-white/75">교재를 담고 어휘마법사·커넥팅북 등<br/>모든 서비스를 한 곳에서 이용하세요</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-800" />
                  </div>
                </div>
                <Link href="/edutech/vocab-wizard" className="flex items-center gap-1.5 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-xl transition-colors">
                  어휘출제마법사
                </Link>
                <a href="https://www.ybmcloud.com/connecting/content?siteType=E" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl transition-colors">
                  커넥팅북 (E-Book)
                </a>
              </div>
            </div>

          ) : (

            /* ---- YBM북스-초중고 일반 레이아웃 ---- */
            <div className="flex-1 min-w-0 flex flex-col gap-4">

              {/* 태그 뱃지 */}
              <div className="flex flex-wrap gap-2">
                {["참고서", book.levelGroup, "영어", book.category].map((tag) => (
                  <span key={tag} className="text-xs text-slate-600 border border-slate-300 rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
                {book.isNew && (
                  <span className="text-xs bg-red-500 text-white border border-red-500 rounded-full px-3 py-1 font-bold">NEW</span>
                )}
              </div>

              {/* 도서명 + 액션 버튼 */}
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{book.title}</h1>
                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <button onClick={handleMyClass} className="flex items-center gap-1.5 px-4 py-2 bg-[#1B3A6B] hover:bg-[#163060] text-white text-xs font-semibold rounded-xl transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    마이클래스 담기
                  </button>
                  <Link href="/edutech/vocab-wizard" className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold rounded-xl transition-colors">
                    어휘출제마법사
                  </Link>
                  <a href="https://www.ybmcloud.com/connecting/content?siteType=E" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold rounded-xl transition-colors">
                    커넥팅북
                  </a>
                </div>
              </div>

              {/* 한줄 설명 */}
              {getShortDesc(book.description) && (
                <p className="text-sm text-slate-500 leading-relaxed">{getShortDesc(book.description)}</p>
              )}

              {/* 저자 · 출판사 · 날짜 */}
              <p className="text-sm text-slate-500">
                저자 <span className="font-semibold text-slate-700">{book.author}</span>
                {" · "}출판사 <span className="font-semibold text-slate-700">YBM</span>
                {" · "}{book.publishDate}
              </p>

              {/* 구분선 */}
              <div className="border-t border-slate-200" />

              {/* 제공 서비스 */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2.5">제공 서비스</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "MP3 바로 듣기", icon: "mp3" },
                    { label: "어휘출제마법사", icon: "star" },
                    { label: "문법예문뱅크",  icon: "db" },
                  ].map((svc) => (
                    <button key={svc.label} className="flex items-center gap-2 px-3 py-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-left">
                      {svc.icon === "mp3"  && <Mp3Icon      className="w-4 h-4 text-slate-500 shrink-0" />}
                      {svc.icon === "star" && <StarIcon     className="w-4 h-4 text-slate-500 shrink-0" />}
                      {svc.icon === "db"   && <DatabaseIcon className="w-4 h-4 text-slate-500 shrink-0" />}
                      <span className="text-xs font-medium text-slate-700 truncate">{svc.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 부가자료 */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-sm font-semibold text-slate-700">부가자료</p>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-800 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    자료 일괄 다운로드
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "errata",  label: "정오표",      icon: "doc", free: true  },
                    { id: "answer",  label: "정답 및 해석", icon: "doc", free: true  },
                    { id: "mp3file", label: "MP3 파일",    icon: "mp3", free: false },
                  ].map((file) => (
                    <button
                      key={file.id}
                      className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-left transition-colors ${
                        file.free
                          ? "border-slate-200 bg-white hover:bg-slate-50"
                          : "border-slate-200 bg-slate-50/60 cursor-default"
                      }`}
                    >
                      {file.icon === "mp3" ? (
                        <Mp3Icon className={`w-4 h-4 shrink-0 ${file.free ? "text-slate-500" : "text-slate-300"}`} />
                      ) : (
                        <DocIcon className={`w-4 h-4 shrink-0 ${file.free ? "text-slate-500" : "text-slate-300"}`} />
                      )}
                      <span className={`flex-1 text-xs font-medium truncate ${file.free ? "text-slate-700" : "text-slate-400"}`}>
                        {file.label}
                      </span>
                      {!file.free && (
                        <span className="shrink-0 text-[10px] bg-orange-100 text-orange-600 border border-orange-200 px-1.5 py-0.5 rounded font-bold">
                          로그인
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* 강사용 부가자료 목록 */}
                <ul className="mt-2 divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                  {MATERIALS.map((m) => (
                    <li key={m.id} className="flex items-center gap-2 px-3 py-2 bg-white">
                      <span className="text-sm shrink-0">{m.icon}</span>
                      <span className="text-xs font-semibold text-slate-700 w-20 shrink-0">{m.label}</span>
                      <span className={`text-[10px] font-bold ${m.color} bg-white px-1.5 py-0.5 rounded border ${m.border} shrink-0`}>{m.type}</span>
                      <button className={`ml-auto shrink-0 flex items-center gap-1 ${m.color} bg-white border ${m.border} hover:opacity-70 transition-opacity px-2 py-1 rounded-lg text-[10px] font-bold`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        받기
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 구매 버튼 영역 */}
              <div className="flex items-center gap-2 mt-auto">
                <button className="w-11 h-11 shrink-0 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-300 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="flex-1 h-11 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                  교보문고에서 구매하기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
                <button className="w-11 h-11 shrink-0 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors text-sm font-bold">
                  ?
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ── 하단 탭: 도서소개 / 목차 ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* 탭 헤더 */}
        <div className="flex">
          {(["intro", "toc"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${
                activeTab === tab
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {tab === "intro" ? "도서 소개" : "목차"}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="p-6">
          {activeTab === "intro" && (
            <div className="space-y-0.5">{renderDescription(book.description)}</div>
          )}

          {activeTab === "toc" && book.toc && book.toc.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
              {book.toc.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 py-2 border-b border-slate-50">
                  <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "toc" && (!book.toc || book.toc.length === 0) && (
            <p className="text-sm text-slate-400">목차 정보가 없습니다.</p>
          )}
        </div>
      </div>

    </div>
  );
}
