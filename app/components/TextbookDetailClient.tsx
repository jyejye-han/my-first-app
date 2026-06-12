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

const MATERIALS = [
  { id: "vocab",     label: "어휘리스트",  type: "PDF",  badge: "bg-red-500"    },
  { id: "ppt",       label: "강의용 PPT",  type: "PPT",  badge: "bg-orange-500" },
  { id: "worksheet", label: "워크시트",    type: "PDF",  badge: "bg-red-500"    },
  { id: "text",      label: "본문파일",    type: "PDF",  badge: "bg-red-500"    },
  { id: "audio",     label: "듣기파일",    type: "MP3",  badge: "bg-cyan-500"   },
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
  const [loginToast, setLoginToast] = useState(false);
  const [teacherAlert, setTeacherAlert] = useState<"login" | "noRole" | null>(null);
  const { isLoggedIn, isTeacher } = useAuth();
  const router = useRouter();

  const handleMyClass = () => {
    if (!isLoggedIn) {
      setLoginToast(true);
      setTimeout(() => { setLoginToast(false); router.push("/login?next=/my-class"); }, 1500);
      return;
    }
    router.push(`/my-class?add=${book.id}`);
  };

  const handleTeacherDownload = () => {
    if (!isLoggedIn) { setTeacherAlert("login"); return; }
    if (!isTeacher)  { setTeacherAlert("noRole"); return; }
    // 실제 다운로드 처리
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

      {/* 교사용 자료 접근 알럿 */}
      {teacherAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setTeacherAlert(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-800">
                {teacherAlert === "login" ? "로그인이 필요합니다." : "선생님 회원만 이용하실 수 있습니다."}
              </p>
              <p className="text-xs text-slate-500">
                {teacherAlert === "login"
                  ? "교사용 자료는 로그인 후 이용할 수 있습니다."
                  : "해당 자료는 강사 회원 전용 서비스입니다."}
              </p>
              <div className="flex gap-2 w-full mt-1">
                {teacherAlert === "login" && (
                  <Link
                    href={`/login?next=${encodeURIComponent("/textbooks/" + book.id)}`}
                    onClick={() => setTeacherAlert(null)}
                    className="flex-1 py-2.5 bg-[#1B3A6B] hover:bg-[#163060] text-white text-sm font-bold rounded-xl transition-colors text-center"
                  >
                    로그인하기
                  </Link>
                )}
                <button
                  onClick={() => setTeacherAlert(null)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* ── 상단 영역: 썸네일 + 정보 ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-7">

          {/* 표지 이미지 */}
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
            <div className="flex gap-2 w-[211px]">
              <button className="flex-1 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                미리보기
              </button>
              <button className="flex-1 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                크게보기
              </button>
            </div>
          </div>

          {/* 우측 정보 패널 */}
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
                <Link
                  href={`/edutech/connecting-book/viewer?bookId=${book.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold rounded-xl transition-colors">
                  커넥팅북
                </Link>
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

            <div className="border-t border-slate-200" />

            {/* 제공 서비스 */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2.5">제공 서비스</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "MP3 바로 듣기", icon: "mp3",  needLogin: false },
                  { label: "어휘출제마법사", icon: "star", needLogin: true  },
                  { label: "문법예문뱅크",  icon: "db",   needLogin: true  },
                ].map((svc) => (
                  <button
                    key={svc.label}
                    onClick={svc.needLogin ? handleTeacherDownload : undefined}
                    className="relative flex items-center gap-2 px-3 py-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-left"
                  >
                    {svc.icon === "mp3"  && <Mp3Icon      className="w-4 h-4 text-slate-500 shrink-0" />}
                    {svc.icon === "star" && <StarIcon     className="w-4 h-4 text-slate-500 shrink-0" />}
                    {svc.icon === "db"   && <DatabaseIcon className="w-4 h-4 text-slate-500 shrink-0" />}
                    <span className="flex-1 text-xs font-medium text-slate-700 truncate">{svc.label}</span>
                    {svc.needLogin && (
                      <span className="shrink-0 text-[10px] bg-orange-100 text-orange-600 border border-orange-200 px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                        로그인
                      </span>
                    )}
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
                    onClick={!file.free ? handleTeacherDownload : undefined}
                    className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-left transition-colors ${
                      file.free
                        ? "border-slate-200 bg-white hover:bg-slate-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {file.icon === "mp3" ? (
                      <Mp3Icon className={`w-4 h-4 shrink-0 ${file.free ? "text-slate-500" : "text-slate-400"}`} />
                    ) : (
                      <DocIcon className={`w-4 h-4 shrink-0 ${file.free ? "text-slate-500" : "text-slate-400"}`} />
                    )}
                    <span className={`flex-1 text-xs font-medium truncate ${file.free ? "text-slate-700" : "text-slate-600"}`}>
                      {file.label}
                    </span>
                    {!file.free ? (
                      <span className="shrink-0 text-[10px] bg-orange-100 text-orange-600 border border-orange-200 px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                        로그인
                      </span>
                    ) : (
                      <svg className="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* 교사용 자료 */}
              <div className="mt-3 border border-blue-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border-b border-blue-200">
                  <span className="w-1 h-4 bg-blue-500 rounded-full shrink-0" />
                  <span className="text-xs font-bold text-blue-700">교사용 자료</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-blue-100">
                  {MATERIALS.map((m) => (
                    <div key={m.id} className="flex items-center gap-2 px-3 py-2.5 bg-white hover:bg-blue-50/40 transition-colors">
                      <span className={`shrink-0 text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${m.badge}`}>
                        {m.type}
                      </span>
                      <span className="flex-1 text-xs font-medium text-slate-700 truncate">{m.label}</span>
                      <button
                        onClick={handleTeacherDownload}
                        className="shrink-0 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 구매 버튼 */}
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
        </div>
      </div>

      {/* ── 하단 탭: 도서소개 / 목차 ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
