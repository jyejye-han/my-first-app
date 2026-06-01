import Link from "next/link";

const faqs = [
  { q: "Y튜터는 누가 사용할 수 있나요?", a: "YBM 소속 강사라면 누구든지 사용할 수 있습니다. 일부 유료 서비스는 별도 구독이 필요합니다." },
  { q: "교재 자료는 어디서 다운받나요?", a: "교재 목록 페이지에서 해당 교재를 선택 후 '자료 다운로드' 버튼을 클릭하세요. 강사 인증 후 이용 가능합니다." },
  { q: "마이클래스 학생 수 제한이 있나요?", a: "기본 플랜에서는 클래스당 최대 30명까지 등록 가능합니다. 더 많은 학생이 필요하면 고객센터로 문의해 주세요." },
  { q: "유료 서비스는 어떻게 결제하나요?", a: "My Page > 이용권 관리에서 신용카드, 계좌이체, 무통장입금 등 다양한 방법으로 결제 가능합니다." },
  { q: "E-BOOK은 어떤 기기에서 사용할 수 있나요?", a: "PC(Chrome 브라우저), 태블릿(iOS/Android), 스마트폰에서 모두 사용 가능합니다." },
  { q: "비밀번호를 잊어버렸어요.", a: "로그인 페이지에서 '비밀번호 찾기'를 클릭하고 가입 이메일로 인증 후 재설정할 수 있습니다." },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SupportNav current="faq" />
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm group">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">Q</span>
                <span className="text-sm font-semibold text-slate-800">{faq.q}</span>
              </div>
              <svg className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 flex gap-3">
              <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">A</span>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          </details>
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
