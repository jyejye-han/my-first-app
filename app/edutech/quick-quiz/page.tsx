import Link from "next/link";

export default function QuickQuizPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/edutech" className="hover:text-blue-600">에듀테크</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">깜짝퀴즈</span>
      </nav>

      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center gap-4">
          <span className="text-5xl">❓</span>
          <div>
            <h1 className="text-2xl font-black">깜짝퀴즈</h1>
            <p className="text-amber-100 text-sm mt-1">수업 중 즉석 퀴즈로 이해도 체크</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { type: "O/X 퀴즈", emoji: "⭕", color: "bg-red-50 border-red-200" },
          { type: "객관식", emoji: "📝", color: "bg-blue-50 border-blue-200" },
          { type: "주관식", emoji: "✏️", color: "bg-green-50 border-green-200" },
          { type: "빈칸채우기", emoji: "🔤", color: "bg-violet-50 border-violet-200" },
        ].map((q) => (
          <button key={q.type} className={`${q.color} border-2 rounded-2xl p-4 text-center hover:scale-105 transition-transform`}>
            <div className="text-3xl mb-2">{q.emoji}</div>
            <p className="text-sm font-bold text-slate-700">{q.type}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="font-bold text-slate-800 mb-4">퀴즈 만들기</h2>
        <div className="space-y-4">
          <textarea
            placeholder="질문을 입력하세요..."
            className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none h-24"
          />
          <div className="grid grid-cols-2 gap-3">
            {["보기 1", "보기 2", "보기 3", "보기 4"].map((p) => (
              <input key={p} type="text" placeholder={p} className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            ))}
          </div>
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold transition-colors">
            🚀 퀴즈 시작
          </button>
        </div>
      </div>
    </div>
  );
}
