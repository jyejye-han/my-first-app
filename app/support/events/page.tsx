import Link from "next/link";

const events = [
  { id: 1, title: "신규 강사 등록 이벤트", period: "2025.05.01 ~ 2025.06.30", badge: "진행중", emoji: "🎁" },
  { id: 2, title: "AI평가 무료 체험 이벤트", period: "2025.05.15 ~ 2025.05.31", badge: "진행중", emoji: "🤖" },
  { id: 3, title: "커넥팅북 얼리버드 특가", period: "2025.04.01 ~ 2025.04.30", badge: "종료", emoji: "📱" },
  { id: 4, title: "YBM 강사 추천 이벤트", period: "2025.03.01 ~ 2025.03.31", badge: "종료", emoji: "⭐" },
];

export default function EventsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SupportNav current="events" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((ev) => (
          <div key={ev.id} className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-sm ${ev.badge === "종료" ? "opacity-60" : "hover:shadow-md"} transition-shadow cursor-pointer`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{ev.emoji}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${ev.badge === "진행중" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                {ev.badge}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">{ev.title}</h3>
            <p className="text-xs text-slate-500">{ev.period}</p>
          </div>
        ))}
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
