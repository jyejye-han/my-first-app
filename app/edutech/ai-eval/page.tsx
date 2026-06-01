import Link from "next/link";

export default function AIEvalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/edutech" className="hover:text-blue-600">에듀테크</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">AI평가</span>
      </nav>

      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">🤖</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black">AI평가</h1>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">NEW</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">유료</span>
            </div>
            <p className="text-violet-100 text-sm">AI 자동 채점 및 개인화 피드백</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4 mb-8">
        <span className="text-3xl">💳</span>
        <div>
          <p className="font-bold text-amber-800">유료 서비스입니다</p>
          <p className="text-sm text-amber-700 mt-0.5">월 구독 또는 건별 이용 가능합니다.</p>
        </div>
        <button className="ml-auto shrink-0 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          요금제 보기
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "자동 채점", emoji: "✅", desc: "AI가 서술형·주관식 답안을 자동으로 채점합니다" },
          { title: "개인 피드백", emoji: "💬", desc: "학생별 맞춤 피드백과 오답 분석을 제공합니다" },
          { title: "성취도 분석", emoji: "📊", desc: "클래스 전체 성취도를 한눈에 파악할 수 있습니다" },
        ].map((feat) => (
          <div key={feat.title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center">
            <div className="text-4xl mb-3">{feat.emoji}</div>
            <h3 className="font-bold text-slate-800 mb-2">{feat.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
