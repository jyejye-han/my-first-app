import Link from "next/link";

export default function InquiryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SupportNav current="inquiry" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 mb-5">1:1 문의 작성</h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">문의 유형</label>
                <select className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>서비스 이용 문의</option>
                  <option>결제/환불 문의</option>
                  <option>기술 오류 신고</option>
                  <option>교재 문의</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">제목</label>
                <input
                  type="text"
                  placeholder="문의 제목을 입력하세요"
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">내용</label>
                <textarea
                  placeholder="문의 내용을 자세히 입력해 주세요"
                  rows={6}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button type="submit" className="w-full bg-[#1B3A6B] hover:bg-[#163060] text-white py-3 rounded-xl font-bold text-sm transition-colors">
                문의 접수
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
            <h3 className="font-bold text-blue-800 text-sm mb-2">운영시간</h3>
            <p className="text-sm text-blue-700">평일 09:00 ~ 18:00</p>
            <p className="text-xs text-blue-500 mt-1">점심시간 12:00~13:00<br />주말·공휴일 휴무</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm mb-3">빠른 도움말</h3>
            <ul className="space-y-2">
              {["비밀번호 재설정", "이용권 구매", "환불 정책", "서비스 오류 신고"].map((item) => (
                <li key={item} className="text-sm text-blue-600 hover:underline cursor-pointer">→ {item}</li>
              ))}
            </ul>
          </div>
        </div>
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
