"use client";
import { useState } from "react";
import Link from "next/link";
import { useProfile } from "../lib/useProfile";
import { useAuth } from "../lib/useAuth";
import { useRouter } from "next/navigation";

const TOOLS = [
  { id: "aicubot",  label: "AI큐봇",    icon: "🤖", href: "__aicubot__" },
  { id: "tabboard", label: "탭보드",    icon: "🖥️", href: "https://www.ybmcloud.com/tapboard.html?siteType=E", isExt: true },
  { id: "liveshot", label: "라이브샷",  icon: "📷", href: "__liveshot__" },
  { id: "quiznow",  label: "퀴즈나우",  icon: "⚡", href: "__quiznow__" },
  { id: "video",    label: "화상수업",  icon: "🎥", href: "__video__" },
];

export default function FloatingQuickMenu() {
  const [open, setOpen] = useState(true);

  /* ── 팝업 상태 ── */
  const [videoPopup,    setVideoPopup]    = useState(false);
  const [liveshotPopup, setLiveshotPopup] = useState(false);
  const [quiznowPopup,  setQuiznowPopup]  = useState(false);
  const [aicubotPopup,  setAicubotPopup]  = useState(false);
  const [chatOpen,      setChatOpen]      = useState(false);

  const { profile } = useProfile();
  const { isLoggedIn, login, logout } = useAuth();
  const router = useRouter();

  /* ── 로그인 폼 상태 ── */
  const [qId,        setQId]        = useState("");
  const [qPw,        setQPw]        = useState("");
  const [saveId,     setSaveId]     = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qId.trim() || !qPw.trim()) { setLoginError(true); return; }
    setLoginError(false);
    login();
    setQPw("");
  };

  const handleQuickLogout = () => {
    logout();
    router.push("/");
  };

  const [videoHours,        setVideoHours]        = useState("1");
  const [videoMins,         setVideoMins]          = useState("10");
  const [videoParticipants, setVideoParticipants]  = useState("30");
  const [accessCode,        setAccessCode]         = useState("1029");
  const videoUrl = "https://school.ybmsmartschool.com/openair/de2ab...";

  const handleClick = (href: string) => {
    if (href === "__video__")    { setVideoPopup(true);    return; }
    if (href === "__liveshot__") { setLiveshotPopup(true); return; }
    if (href === "__quiznow__")  { setQuiznowPopup(true);  return; }
    if (href === "__aicubot__")  { setAicubotPopup(true);  return; }
  };

  const ToolRow = ({ tool }: { tool: typeof TOOLS[number] }) => {
    const cls = "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left group";
    const inner = (
      <>
        <span className="text-lg w-6 text-center shrink-0">{tool.icon}</span>
        <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium">{tool.label}</span>
      </>
    );
    if (tool.href === "__noop__") {
      return <button className={cls}>{inner}</button>;
    }
    if (["__video__","__liveshot__","__quiznow__","__aicubot__"].includes(tool.href)) {
      return <button onClick={() => handleClick(tool.href)} className={cls}>{inner}</button>;
    }
    if ("isExt" in tool && tool.isExt) {
      return <a href={tool.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
    }
    return <Link href={tool.href} className={cls}>{inner}</Link>;
  };

  return (
    <>
      {/* ── 퀵메뉴 사이드바 ── */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center">

        {/* 접기/펼치기 탭 */}
        <button
          onClick={() => setOpen(v => !v)}
          className="w-5 h-14 bg-white border border-slate-200 border-r-0 rounded-l-xl shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
        >
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 메인 패널 */}
        <div
          className={`bg-white rounded-l-2xl shadow-[0_8px_40px_rgba(0,0,0,0.2)] ring-1 ring-slate-200 overflow-hidden transition-all duration-200 flex flex-col ${
            open ? "w-[208px] opacity-100" : "w-0 opacity-0 pointer-events-none"
          }`}
          style={{ maxHeight: "calc(100vh - 80px)" }}
        >
          {/* ── QUICK MENU 헤더 ── */}
          <div className="px-5 pt-5 pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-black text-slate-600 tracking-widest whitespace-nowrap">QUICK MENU</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
          </div>

          {/* 스크롤 영역 */}
          <div className="overflow-y-auto flex-1 min-h-0">

            {/* ── 사용자 정보 카드 / 로그인 폼 ── */}
            <div className="px-4 pb-3">
              {isLoggedIn ? (
                <>
                  <div className="bg-slate-100 rounded-2xl px-4 py-4 text-center">
                    <p className="text-xs text-slate-400 mb-0.5 truncate">{profile.institution || "YBM 강사 · Y튜터"}</p>
                    <p className="text-lg font-black text-slate-800 leading-tight">
                      {profile.name} <span className="font-normal text-slate-500 text-base">선생님</span>
                    </p>
                    <span
                      className="inline-block mt-2.5 px-5 py-1 rounded-full text-sm font-bold"
                      style={{ background: "#f9a8b8", color: "#c0385a" }}
                    >
                      정회원
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <Link href="/my-class" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">
                      MY Class
                    </Link>
                    <span className="w-px h-3 bg-slate-300" />
                    <button onClick={handleQuickLogout} className="text-xs text-slate-500 hover:text-red-500 transition-colors">
                      로그아웃
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleQuickLogin} className="space-y-2">
                  <input
                    type="text"
                    value={qId}
                    onChange={e => { setQId(e.target.value); setLoginError(false); }}
                    placeholder="아이디"
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                  <input
                    type="password"
                    value={qPw}
                    onChange={e => { setQPw(e.target.value); setLoginError(false); }}
                    placeholder="비밀번호"
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={saveId}
                      onChange={e => setSaveId(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 accent-[#1B3A6B]"
                    />
                    <span className="text-xs text-slate-500">아이디 저장</span>
                  </label>
                  {loginError && (
                    <p className="text-[11px] text-red-500">아이디와 비밀번호를 입력해주세요.</p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-bold text-sm text-white bg-[#1B3A6B] hover:bg-[#163060] transition-colors"
                  >
                    로그인
                  </button>
                </form>
              )}
            </div>

            <div className="h-px bg-slate-100 mx-4 mb-3" />

            {/* ── 수업도구 목록 ── */}
            <ul className="divide-y divide-slate-50 pb-4">
              {TOOLS.map(t => (
                <li key={t.id}><ToolRow tool={t} /></li>
              ))}
            </ul>

          </div>
        </div>
      </div>

      {/* ── 화상수업 팝업 ── */}
      {videoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setVideoPopup(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="font-black text-slate-800 text-lg">공개 화상수업</h2>
              <button onClick={() => setVideoPopup(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-700 w-16 shrink-0">URL</span>
                  <input readOnly value={videoUrl} className="flex-1 text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 truncate" />
                  <button onClick={() => navigator.clipboard.writeText(videoUrl)}
                    className="shrink-0 px-4 py-2 border-2 border-blue-500 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors">
                    링크복사
                  </button>
                </div>
                <p className="mt-1.5 ml-16 text-xs text-slate-400">※새 공개 화상수업 링크는 선생님 고유 URL로 변경되지 않습니다.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-700 w-16 shrink-0">접속코드</span>
                <input value={accessCode} onChange={e => setAccessCode(e.target.value)}
                  className="w-24 text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 text-center font-bold" />
                <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold rounded-lg transition-colors">저장</button>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <p className="text-sm font-bold text-slate-700">화상수업 시간 설정 및 참여인원 설정</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <select value={videoHours} onChange={e => setVideoHours(e.target.value)}
                      className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700 bg-white">
                      {[1,2,3,4].map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <span className="text-sm text-slate-600">시간</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={videoMins} onChange={e => setVideoMins(e.target.value)}
                      className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700 bg-white">
                      {[0,10,20,30,40,50].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <span className="text-sm text-slate-600">분</span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-slate-600">예상 참여인원</span>
                    <input type="number" value={videoParticipants} onChange={e => setVideoParticipants(e.target.value)}
                      min={1} max={100}
                      className="w-16 border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-bold text-slate-700 text-center" />
                    <span className="text-sm text-slate-600">명</span>
                  </div>
                </div>
              </div>
              <ol className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><span className="text-slate-400">1.</span><span><span className="text-blue-600 font-semibold">[공개 화상수업 시작하기]</span>를 클릭하시면 바로 시작됩니다.</span></li>
                <li className="flex gap-2"><span className="text-slate-400">2.</span><span>YBM스마트스쿨 <span className="text-blue-600 font-semibold">로그인 상태</span>에서만 호스트로 진행하실 수 있습니다.</span></li>
                <li className="flex gap-2"><span className="text-slate-400">3.</span><span>사전에 공개수업대상자에게 <span className="text-blue-600 font-semibold">링크를 복사해서 안내</span>해주세요.</span></li>
              </ol>
            </div>
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setVideoPopup(false)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-base font-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              공개 화상수업 시작하기
            </a>
          </div>
        </div>
      )}

      {/* ── 라이브샷 팝업 ── */}
      {liveshotPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLiveshotPopup(false)} />
          <div className="relative z-10 max-w-4xl w-full">
            <button onClick={() => setLiveshotPopup(false)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src="/images/liveshot-preview.png" alt="라이브 샷" className="w-full rounded-2xl shadow-2xl" />
            <div className="mt-4 flex justify-center">
              <a href="https://school.ybmsmartschool.com/RxPs23/snstest" target="_blank" rel="noopener noreferrer"
                onClick={() => setLiveshotPopup(false)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg transition-colors">
                라이브샷 시작하기
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── 퀴즈나우 팝업 ── */}
      {quiznowPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setQuiznowPopup(false)} />
          <div className="relative z-10 max-w-4xl w-full">
            <button onClick={() => setQuiznowPopup(false)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src="/images/quiznow-preview.png" alt="퀴즈나우" className="w-full rounded-2xl shadow-2xl" />
            <div className="mt-4 flex justify-center">
              <a href="https://school.ybmsmartschool.com/quiz/quiz_list?grd_cd=301002&sso_tag=4e89ae318b9ea3a9b6ab376912995b03"
                target="_blank" rel="noopener noreferrer"
                onClick={() => setQuiznowPopup(false)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow-lg transition-colors">
                퀴즈나우 시작하기
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── AI큐봇 팝업 ── */}
      {aicubotPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setAicubotPopup(false)} />
          <div className="relative z-10 max-w-4xl w-full">
            <button onClick={() => setAicubotPopup(false)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src="/images/aicubot-preview.png" alt="AI큐봇" className="w-full rounded-2xl shadow-2xl" />
            <div className="mt-4 flex justify-center">
              <a href="https://www.ybmcloud.com/?siteType=E" target="_blank" rel="noopener noreferrer"
                onClick={() => setAicubotPopup(false)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors">
                AI큐봇 시작하기
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── 채널톡 챗봇 패널 ── */}
      {chatOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col" style={{ maxHeight: "540px" }}>
          {/* 헤더 */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
            <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {/* YBM 로고 막대 */}
              <div className="flex items-end gap-[2px]">
                <div className="w-[3px] h-2.5 bg-red-500 rounded-sm" />
                <div className="w-[3px] h-3.5 bg-red-500 rounded-sm" />
                <div className="w-[3px] h-2 bg-red-500 rounded-sm" />
                <div className="w-[3px] h-3.5 bg-red-500 rounded-sm" />
                <div className="w-[3px] h-2.5 bg-red-500 rounded-sm" />
              </div>
              <span className="font-bold text-slate-800 text-sm">와이비엠</span>
            </div>
          </div>

          {/* 공지 바 */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm shrink-0">📢</span>
              <span className="text-xs text-slate-500 truncate">상담원 연결 가능시간: 평일 09:00~18:00 (점심시간 12:00~13:00 제외)</span>
            </div>
            <svg className="w-4 h-4 text-slate-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              안녕하세요, YBM북샘 AI 챗봇입니다! 😊<br />
              무엇을 도와드릴까요?
            </p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <span>🐯</span> YBM북샘
            </p>
          </div>

          {/* 빠른 답변 버튼 */}
          <div className="px-3 pb-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap gap-2 justify-end">
              {[
                { icon: "📖", label: "내용 문의" },
                { icon: "📋", label: "자료 문의" },
                { icon: "🌐", label: "사이트 이용" },
                { icon: "🪙", label: "구매 문의" },
                { icon: "🚚", label: "배송/반품/환불" },
                { icon: "✨", label: "이벤트문의" },
                { icon: "📄", label: "PDF요청" },
                { icon: "💬", label: "1:1문의" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs text-slate-700 transition-colors shadow-sm"
                >
                  <span>{btn.icon}</span>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 채널톡 챗봇 버튼 ── */}
      <button
        onClick={() => setChatOpen(v => !v)}
        className="fixed bottom-6 right-5 z-40 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #f07860 0%, #e04e38 100%)" }}
        aria-label="채널톡 채팅 상담"
      >
        <svg width="36" height="36" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 뒤쪽 말풍선 */}
          <path
            d="M3 5.5C3 4.4 3.9 3.5 5 3.5H18C19.1 3.5 20 4.4 20 5.5V14C20 15.1 19.1 16 18 16H14L11 19.5V16H5C3.9 16 3 15.1 3 14V5.5Z"
            fill="white" fillOpacity="0.55"
          />
          {/* 앞쪽 말풍선 */}
          <path
            d="M10 12C10 10.9 10.9 10 12 10H24C25.1 10 26 10.9 26 12V19.5C26 20.6 25.1 21.5 24 21.5H20V24.5L17 21.5H12C10.9 21.5 10 20.6 10 19.5V12Z"
            fill="white"
          />
          {/* 점 세 개 */}
          <circle cx="15" cy="15.8" r="1.1" fill="#e04e38" />
          <circle cx="18" cy="15.8" r="1.1" fill="#e04e38" />
          <circle cx="21" cy="15.8" r="1.1" fill="#e04e38" />
        </svg>
      </button>
    </>
  );
}
