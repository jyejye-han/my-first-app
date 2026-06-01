"use client";
import { useState } from "react";
import Link from "next/link";

const TOOLS = [
  {
    id: "tabboard", label: "탭보드",   emoji: "✅",
    href: "https://www.ybmcloud.com/tapboard.html?siteType=E",
    iconBg: "bg-teal-500", isExt: true,
  },
  {
    id: "quiznow",  label: "퀴즈나우", emoji: "⚡",
    href: "__quiznow__",
    iconBg: "bg-purple-500",
  },
  {
    id: "liveshot", label: "라이브샷", emoji: "📷",
    href: "__liveshot__",
    iconBg: "bg-violet-500",
  },
  {
    id: "aicubot",  label: "AI큐봇",   emoji: "🤖",
    href: "/edutech/ai-eval",
    iconBg: "bg-blue-500",
  },
  {
    id: "video",    label: "화상수업", emoji: "🎥",
    href: "__video__",
    iconBg: "bg-sky-500",
  },
];

export default function FloatingQuickMenu() {
  const [open, setOpen] = useState(true);

  // ── 화상수업 팝업 상태 ──
  const [videoPopup, setVideoPopup]   = useState(false);
  const [videoHours, setVideoHours]   = useState("1");
  const [videoMins,  setVideoMins]    = useState("10");
  const [videoParticipants, setVideoParticipants] = useState("30");
  const [accessCode, setAccessCode]   = useState("1029");
  const videoUrl = "https://school.ybmsmartschool.com/openair/de2ab...";

  // ── 라이브샷 팝업 상태 ──
  const [liveshotPopup, setLiveshotPopup] = useState(false);

  // ── 퀴즈나우 팝업 상태 ──
  const [quiznowPopup, setQuiznowPopup] = useState(false);

  const handleClick = (href: string) => {
    if (href === "__video__")    { setVideoPopup(true);    return; }
    if (href === "__liveshot__") { setLiveshotPopup(true); return; }
    if (href === "__quiznow__")  { setQuiznowPopup(true);  return; }
  };

  return (
    <>
      {/* ── 퀵메뉴 사이드바 ── */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center">
        {/* 접기/펼치기 탭 */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-5 h-14 bg-white border border-slate-200 border-r-0 rounded-l-xl shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
        >
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 메인 카드 */}
        <div
          className={`bg-white rounded-l-2xl shadow-[0_8px_40px_rgba(0,0,0,0.28)] ring-1 ring-slate-200 overflow-hidden transition-all duration-200 ${
            open ? "w-[166px] opacity-100" : "w-0 opacity-0 pointer-events-none"
          }`}
        >
          {/* 헤더 */}
          <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-slate-100 bg-slate-50">
            <svg className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[11px] font-black text-slate-700 whitespace-nowrap">
              수업도구 <span className="font-medium text-slate-400">(퀵메뉴)</span>
            </span>
          </div>

          {/* 메뉴 아이템 */}
          <ul className="divide-y divide-slate-50 py-0.5">
            {TOOLS.map((tool) => {
              const rowCls = "w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-slate-50 transition-colors group text-left";
              const inner = (
                <>
                  <div className={`w-7 h-7 shrink-0 ${tool.iconBg} rounded-lg flex items-center justify-center text-[13px] shadow-sm`}>
                    {tool.emoji}
                  </div>
                  <span className="flex-1 text-[11px] font-semibold text-slate-700 group-hover:text-slate-900 whitespace-nowrap">
                    {tool.label}
                  </span>
                </>
              );

              if (tool.href === "__video__" || tool.href === "__liveshot__" || tool.href === "__quiznow__") {
                return (
                  <li key={tool.id}>
                    <button onClick={() => handleClick(tool.href)} className={rowCls}>{inner}</button>
                  </li>
                );
              }
              if ("isExt" in tool && tool.isExt) {
                return (
                  <li key={tool.id}>
                    <a href={tool.href} target="_blank" rel="noopener noreferrer" className={rowCls}>{inner}</a>
                  </li>
                );
              }
              return (
                <li key={tool.id}>
                  <Link href={tool.href} className={rowCls}>{inner}</Link>
                </li>
              );
            })}
          </ul>
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
              {/* URL */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-700 w-16 shrink-0">URL</span>
                  <input readOnly value={videoUrl} className="flex-1 text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 truncate" />
                  <button
                    onClick={() => navigator.clipboard.writeText(videoUrl)}
                    className="shrink-0 px-4 py-2 border-2 border-blue-500 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors"
                  >링크복사</button>
                </div>
                <p className="mt-1.5 ml-16 text-xs text-slate-400">※새 공개 화상수업 링크는 선생님 고유 URL로 변경되지 않습니다.</p>
              </div>

              {/* 접속코드 */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-700 w-16 shrink-0">접속코드</span>
                <input value={accessCode} onChange={(e) => setAccessCode(e.target.value)}
                  className="w-24 text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 text-center font-bold" />
                <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold rounded-lg transition-colors">저장</button>
              </div>

              {/* 시간 설정 */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <p className="text-sm font-bold text-slate-700">화상수업 시간 설정 및 참여인원 설정</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <select value={videoHours} onChange={(e) => setVideoHours(e.target.value)}
                      className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700 bg-white">
                      {[1,2,3,4].map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <span className="text-sm text-slate-600">시간</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={videoMins} onChange={(e) => setVideoMins(e.target.value)}
                      className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700 bg-white">
                      {[0,10,20,30,40,50].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <span className="text-sm text-slate-600">분</span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-slate-600">예상 참여인원</span>
                    <input type="number" value={videoParticipants} onChange={(e) => setVideoParticipants(e.target.value)}
                      min={1} max={100}
                      className="w-16 border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-bold text-slate-700 text-center" />
                    <span className="text-sm text-slate-600">명</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>※설정된 종료시간 30분 경과시 자동 종료됩니다.</span>
                  <span>※최대 100명까지 설정됩니다.</span>
                </div>
              </div>

              {/* 안내사항 */}
              <ol className="space-y-2 text-sm text-slate-600 list-none">
                <li className="flex gap-2"><span className="text-slate-400">1.</span><span><span className="text-blue-600 font-semibold">[공개 화상수업 시작하기]</span>를 클릭하시면 바로 시작됩니다.</span></li>
                <li className="flex gap-2"><span className="text-slate-400">2.</span><span>YBM스마트스쿨 <span className="text-blue-600 font-semibold">로그인 상태</span>에서만 호스트로 화상수업을 진행하실 수 있으니 로그인 상태를 유지해주세요.</span></li>
                <li className="flex gap-2"><span className="text-slate-400">3.</span><span>사전에 공개수업대상자에게 <span className="text-blue-600 font-semibold">링크를 복사해서 안내</span>해주세요.</span></li>
                <li className="flex gap-2"><span className="text-slate-400">*</span><span className="text-slate-400">공개 화상수업 링크는 선생님 고유 URL로 변경되지 않습니다.</span></li>
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
            <button
              onClick={() => setLiveshotPopup(false)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src="/images/liveshot-preview.png"
              alt="라이브 샷 화면"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-4 flex justify-center">
              <a
                href="https://school.ybmsmartschool.com/RxPs23/snstest"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setLiveshotPopup(false)}
                className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
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
            <button
              onClick={() => setQuiznowPopup(false)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src="/images/quiznow-preview.png"
              alt="퀴즈나우 화면"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-4 flex justify-center">
              <a
                href="https://school.ybmsmartschool.com/quiz/quiz_list?grd_cd=301002&sso_tag=4e89ae318b9ea3a9b6ab376912995b03"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setQuiznowPopup(false)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                퀴즈나우 시작하기
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
