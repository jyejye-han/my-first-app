import Link from "next/link";

export default function ConnectingBookPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/edutech" className="hover:text-blue-600">에듀테크</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">커넥팅북</span>
      </nav>

      <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">📱</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black">커넥팅북</h1>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">NEW</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">유료</span>
            </div>
            <p className="text-cyan-100 text-sm">YBM 교재 E-BOOK 디지털 플랫폼</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4 mb-8">
        <span className="text-3xl">💳</span>
        <div>
          <p className="font-bold text-amber-800">유료 서비스입니다</p>
          <p className="text-sm text-amber-700 mt-0.5">교재 구매 시 E-BOOK 이용권이 함께 제공됩니다.</p>
        </div>
        <button className="ml-auto shrink-0 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          이용권 확인
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: "디지털 교재", emoji: "📖", desc: "종이 교재를 디지털로 그대로 재현. PC·태블릿 모두 지원" },
          { title: "멀티미디어", emoji: "🎬", desc: "오디오·동영상 콘텐츠가 교재와 연동" },
          { title: "필기·메모", emoji: "✏️", desc: "교재에 직접 필기하고 하이라이트 표시 가능" },
          { title: "클래스 공유", emoji: "👥", desc: "학생들과 교재 페이지를 실시간으로 공유" },
        ].map((feat) => (
          <div key={feat.title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex gap-4">
            <div className="text-3xl shrink-0">{feat.emoji}</div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{feat.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
