import Link from "next/link";

const workspaceTools = [
  { label: "E-BOOK (커넥팅북)", emoji: "📱", href: "/edutech/connecting-book", isNew: true, isPaid: true, desc: "디지털 교재로 수업 진행" },
  { label: "어휘출제마법사", emoji: "✨", href: "/edutech/vocab-wizard", desc: "자동 어휘 시험지 생성" },
  { label: "온라인콘텐츠", emoji: "🖥️", href: "/edutech", desc: "교재 연계 온라인 콘텐츠" },
  { label: "학급관리", emoji: "👥", href: "#", desc: "학생 목록 및 출석 관리" },
  { label: "메시지보내기", emoji: "✉️", href: "#", desc: "학생·학부모에게 메시지 전송" },
  { label: "내 수업안 만들기", emoji: "📝", href: "#", desc: "수업 계획서 작성 및 관리" },
];

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;

  const classInfo = {
    cls1: { name: "중1 영어 독해반", book: "YBM Reading Power 1", emoji: "📘", students: 18 },
    cls2: { name: "중2 회화 집중반", book: "Speaking Up! Level 2", emoji: "📗", students: 12 },
    cls3: { name: "초등 문법 기초반", book: "Grammar Master Basic", emoji: "📙", students: 22 },
  }[classId] ?? { name: `클래스 ${classId}`, book: "교재명", emoji: "📚", students: 0 };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600">홈</Link>
        <span>/</span>
        <Link href="/my-class" className="hover:text-blue-600">마이클래스</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Workspace</span>
      </nav>

      {/* Class Header */}
      <div className="bg-[#1B3A6B] rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{classInfo.emoji}</div>
          <div>
            <h1 className="text-xl font-black">{classInfo.name}</h1>
            <p className="text-blue-200 text-sm mt-0.5">{classInfo.book}</p>
            <p className="text-blue-300 text-xs mt-1">학생 {classInfo.students}명</p>
          </div>
        </div>
      </div>

      {/* Workspace Tools */}
      <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-blue-600 rounded-full inline-block"></span>
        수업 도구
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaceTools.map((tool) => (
          <Link
            key={tool.label}
            href={tool.href}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{tool.emoji}</span>
              <div className="flex gap-1">
                {tool.isNew && (
                  <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                )}
                {tool.isPaid && (
                  <span className="text-[10px] bg-violet-500 text-white px-1.5 py-0.5 rounded-full font-bold">유</span>
                )}
              </div>
            </div>
            <p className="font-bold text-slate-800 group-hover:text-blue-700 text-sm">{tool.label}</p>
            <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
