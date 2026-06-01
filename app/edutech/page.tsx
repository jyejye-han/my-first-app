import type { ReactNode } from "react";

const services = [
  {
    id: "class-game",
    label: "클래스게임",
    desc: "게임을 하면 공부가 되는 즐거운 학습의 시작. 실시간 쌍방향 게임으로 수업 집중도를 높이세요.",
    href: "https://www.ybmcloud.com/twowaygames/content?siteType=E",
    isExt: true,
  },
  {
    id: "vocab-wizard",
    label: "어휘출제마법사",
    desc: "교재 단어로 시험지를 자동 생성. 다양한 문제 유형을 몇 초 만에 만들어 보세요.",
    href: "/edutech/vocab-wizard",
    isExt: false,
  },
  {
    id: "quick-quiz",
    label: "깜짝퀴즈",
    desc: "수업 중 즉석 퀴즈로 학생 이해도를 실시간 확인. 간편한 O/X·객관식 지원.",
    href: "https://school.ybmsmartschool.com/quiz/quiz_list?grd_cd=301002&sso_tag=4e89ae318b9ea3a9b6ab376912995b03",
    isExt: true,
  },
  {
    id: "ai-eval",
    label: "AI평가",
    desc: "AI가 자동으로 채점하고 피드백을 생성합니다. 교사의 채점 시간을 획기적으로 줄여보세요.",
    href: "/edutech/ai-eval",
    isExt: false,
  },
  {
    id: "connecting-book",
    label: "커넥팅북",
    desc: "YBM 교재의 E-BOOK 버전. 풍부한 멀티미디어 콘텐츠와 함께 디지털 수업을 경험하세요.",
    href: "https://www.ybmcloud.com/connecting/content?siteType=E",
    isExt: true,
  },
];

function ClassGameThumb() {
  return (
    <div className="relative overflow-hidden h-48 bg-[#F05454] flex flex-col items-center justify-center">
      {/* 배경 원형 장식 */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-black/10 rounded-full" />
      <div className="absolute top-3 left-4 w-3 h-3 bg-yellow-300/60 rounded-full" />
      <div className="absolute bottom-5 right-8 w-2 h-2 bg-white/40 rounded-full" />
      {/* 트로피 */}
      <div className="text-5xl mb-1 drop-shadow-lg relative z-10">🏆</div>
      {/* 타이틀 */}
      <div className="relative z-10 text-center">
        <div className="font-black text-2xl tracking-tight leading-tight drop-shadow">
          <span className="text-white">클래스</span><span className="text-yellow-300">게임</span>
        </div>
        <p className="text-white/80 text-[11px] mt-0.5">게임으로 즐기는 쌍방향 수업</p>
      </div>
      {/* 과목 태그 */}
      <div className="relative z-10 flex gap-1.5 mt-3">
        {["영어", "사회", "음악", "수학"].map((s, i) => (
          <span
            key={s}
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
              i === 0 ? "bg-yellow-300 text-slate-800" : "bg-white/20 text-white"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      {/* 게임 카드 미니 UI */}
      <div className="absolute bottom-2.5 right-3 flex gap-1 opacity-60">
        {[["bg-sky-300",""],["bg-orange-300",""],["bg-green-300",""]].map(([c], i) => (
          <div key={i} className={`w-7 h-8 ${c} rounded-md shadow`} />
        ))}
      </div>
    </div>
  );
}

function VocabWizardThumb() {
  return (
    <div className="relative overflow-hidden h-48 bg-gradient-to-br from-emerald-500 to-teal-600">
      <div className="absolute -top-4 -right-4 w-28 h-28 bg-white/10 rounded-full" />
      <div className="absolute top-3 left-4">
        <div className="text-white font-black text-xl leading-tight">
          어휘출제<br />
          <span className="text-yellow-300">마법사</span> ✨
        </div>
        <p className="text-white/70 text-[11px] mt-1">자동 시험지 생성</p>
      </div>
      {/* 단어 카드 미니 UI */}
      <div className="absolute bottom-3 left-4 right-4 space-y-1.5">
        {[
          { word: "accomplish", meaning: "성취하다" },
          { word: "boundary", meaning: "경계" },
          { word: "cognitive", meaning: "인지의" },
        ].map((item) => (
          <div key={item.word} className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center justify-between">
            <span className="text-white text-[11px] font-bold">{item.word}</span>
            <span className="text-emerald-100 text-[10px]">{item.meaning}</span>
          </div>
        ))}
      </div>
      {/* 마법봉 아이콘 */}
      <div className="absolute top-2 right-4 text-3xl opacity-80">🪄</div>
    </div>
  );
}

function QuickQuizThumb() {
  return (
    <div className="relative overflow-hidden h-48 bg-gradient-to-b from-[#C8D8F0] to-[#D8E8FF]">
      {/* 상단 헤더 바 */}
      <div className="bg-slate-800 h-8 flex items-center px-3 gap-2">
        <span className="text-yellow-400 font-black text-sm tracking-tight">Y클라우드</span>
        <span className="text-white/40 text-xs">초등</span>
        <div className="flex-1" />
        <div className="w-5 h-5 rounded-full bg-teal-400 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">✦</div>
      </div>
      {/* 퀴즈 브랜드 */}
      <div className="px-3 pt-2 flex items-center gap-2">
        <div className="bg-slate-800 text-white font-black text-[13px] px-2 py-0.5 rounded flex items-center gap-1">
          <span className="text-green-400">✓</span>
          <span>QUIZ</span>
        </div>
        <span className="text-slate-700 font-black text-base">깜짝퀴즈</span>
        <span className="text-slate-500 text-xs">초등 ▾</span>
      </div>
      {/* 검색바 모형 */}
      <div className="mx-3 mt-1.5 bg-white rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm border border-slate-200">
        <span className="text-slate-400 text-[11px] flex-1">검색어를 입력해주세요</span>
        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {/* 과목 탭 */}
      <div className="flex gap-1 px-3 mt-2 overflow-hidden">
        {["영어", "수학", "사회", "과학", "음악"].map((s, i) => (
          <span
            key={s}
            className={`text-[10px] px-2 py-0.5 rounded font-semibold whitespace-nowrap ${
              i === 0 ? "bg-slate-800 text-white" : "bg-white/70 text-slate-600 border border-white"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      {/* 캐릭터 */}
      <div className="absolute bottom-1 right-3 text-4xl opacity-90">🐥</div>
    </div>
  );
}

function AiEvalThumb() {
  return (
    <div className="relative overflow-hidden h-48 bg-gradient-to-br from-violet-600 to-purple-700">
      <div className="absolute -top-6 -right-6 w-36 h-36 bg-white/10 rounded-full" />
      <div className="absolute top-4 left-4">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-2xl">🤖</span>
          <div>
            <span className="text-white font-black text-xl">AI</span>
            <span className="text-violet-200 font-black text-xl">평가</span>
          </div>
        </div>
        <p className="text-violet-200 text-[11px]">자동 채점 · 피드백 생성</p>
      </div>
      {/* 채점 결과 UI 모형 */}
      <div className="absolute bottom-3 left-4 right-4 space-y-1.5">
        <div className="bg-white/15 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <span className="text-[10px] text-violet-200">자동채점</span>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-green-400 rounded-full" />
          </div>
          <span className="text-white text-[11px] font-bold">92점</span>
        </div>
        <div className="bg-white/15 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <span className="text-[10px] text-violet-200">AI 피드백</span>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-yellow-300 rounded-full" />
          </div>
          <span className="text-white text-[11px] font-bold">완료</span>
        </div>
      </div>
      {/* NEW 뱃지 */}
      <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow">NEW</div>
    </div>
  );
}

function ConnectingBookThumb() {
  return (
    <div className="relative overflow-hidden h-48 bg-white">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50" />
      {/* 로고 영역 */}
      <div className="relative z-10 px-4 pt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-[#1D4ED8] font-black text-2xl tracking-tight">커넥팅</span>
          <span className="text-orange-500 font-black text-2xl tracking-tight">북</span>
          <span className="text-slate-500 text-xs ml-1">초등 ▾</span>
        </div>
        <p className="text-sky-600 text-[11px] font-semibold mt-0.5">A Connecting Book</p>
        <p className="text-slate-700 font-bold text-sm mt-1.5 leading-tight">
          선생님과 학생을 이어주는<br />실시간 쌍방향 교과서
        </p>
      </div>
      {/* 화면 모형 */}
      <div className="absolute right-2 bottom-2 w-32 h-24 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="h-4 bg-[#1D4ED8] flex items-center px-2 gap-1">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
        <div className="p-2 space-y-1">
          <div className="h-2 bg-blue-100 rounded w-full" />
          <div className="h-2 bg-slate-100 rounded w-4/5" />
          <div className="h-6 bg-sky-50 rounded border border-sky-200 flex items-center px-1.5 gap-1">
            <div className="w-4 h-3 bg-sky-200 rounded" />
            <div className="h-1.5 bg-sky-200 rounded flex-1" />
          </div>
          <div className="h-2 bg-slate-100 rounded w-3/5" />
        </div>
      </div>
      {/* 인터랙션 아이콘 */}
      <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
        <span className="text-lg">📱</span>
        <span className="text-[10px] text-slate-500 font-medium">디지털 교재 연동</span>
      </div>
    </div>
  );
}

const thumbMap: Record<string, ReactNode> = {
  "class-game": <ClassGameThumb />,
  "vocab-wizard": <VocabWizardThumb />,
  "quick-quiz": <QuickQuizThumb />,
  "ai-eval": <AiEvalThumb />,
  "connecting-book": <ConnectingBookThumb />,
};

export default function EdutechPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800">에듀테크</h1>
        <p className="text-slate-500 text-sm mt-1">YBM의 스마트 교육 서비스를 활용하세요</p>
      </div>

      <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
        에듀테크 서비스
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => {
          const cls =
            "group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer";
          const inner = (
            <>
              {thumbMap[service.id]}
              <div className="p-4">
                <p className="text-base font-bold text-slate-800 mb-1">{service.label}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-blue-600 text-xs font-semibold group-hover:gap-2 transition-all">
                  서비스 이용하기
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </>
          );
          return service.isExt ? (
            <a key={service.id} href={service.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {inner}
            </a>
          ) : (
            <a key={service.id} href={service.href} className={cls}>
              {inner}
            </a>
          );
        })}
      </div>
    </div>
  );
}
