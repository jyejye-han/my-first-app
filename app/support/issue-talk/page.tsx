import Link from "next/link";

const issues = [
  { id: 1, title: "커넥팅북 앱 로그인 오류 발생", status: "해결완료", date: "2025-05-19", replies: 3 },
  { id: 2, title: "어휘출제마법사 PDF 출력 오류", status: "처리중", date: "2025-05-18", replies: 1 },
  { id: 3, title: "AI평가 채점 결과 지연 문의", status: "해결완료", date: "2025-05-15", replies: 5 },
  { id: 4, title: "마이클래스 학생 추가 안됨", status: "해결완료", date: "2025-05-10", replies: 2 },
];

export default function IssueTalkPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SupportNav current="issue-talk" />
      <div className="flex justify-end mb-4">
        <button className="bg-[#1B3A6B] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#163060] transition-colors">
          이슈 등록
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <ul className="divide-y divide-slate-100">
          {issues.map((issue) => (
            <li key={issue.id} className="px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  issue.status === "해결완료" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {issue.status}
                </span>
                <p className="text-sm text-slate-700 flex-1">{issue.title}</p>
                <span className="text-xs text-blue-500 font-medium">답변 {issue.replies}</span>
                <span className="text-xs text-slate-400">{issue.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SupportNav({ current }: { current: string }) {
  const tabs = [
    { id: "notices", label: "공지사항", href: "/support/notices" },
    { id: "events", label: "이벤트", href: "/support/events" },
    
    { id: "faq", label: "FAQ", href: "/support/faq" },
    
  ];
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-black text-slate-800 mb-4">고객센터</h1>
      <div className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href} className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${current === tab.id ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
