import Link from "next/link";

export default function ClassGamePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/edutech" className="hover:text-blue-600">에듀테크</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">클래스게임</span>
      </nav>

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl">🎮</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black">클래스게임</h1>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">NEW</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">유료</span>
            </div>
            <p className="text-blue-100 text-sm">게임처럼 즐기는 참여형 수업 활동</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
        <span className="text-3xl">💳</span>
        <div>
          <p className="font-bold text-amber-800">유료 서비스입니다</p>
          <p className="text-sm text-amber-700 mt-0.5">이용권 구매 후 사용 가능합니다. 첫 30일 무료 체험 제공.</p>
        </div>
        <button className="ml-auto shrink-0 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          무료 체험 시작
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {["퀴즈 배틀", "카드 매칭", "단어 스피드"].map((mode) => (
          <div key={mode} className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
            <div className="text-4xl mb-3">🎲</div>
            <h3 className="font-bold text-slate-800">{mode}</h3>
            <p className="text-xs text-slate-500 mt-1">재미있는 수업 게임 모드</p>
          </div>
        ))}
      </div>
    </div>
  );
}
