"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const notices = [
  { id: 7, title: "마이클래스, 수업안 만들기 이용 방법 안내", date: "2025-06-01", isImportant: true,
    content: "마이클래스에 교재를 담고, 목차별 수업안 만들기 기능을 통해 수업 자료를 자동으로 구성할 수 있습니다. 어휘마법사·커넥팅북 등 다양한 에듀테크 서비스와 연계하여 더욱 스마트한 수업을 준비해 보세요." },
  { id: 1, title: "[공지] 2025년 YBM 신규 교재 등록 안내", date: "2025-05-20", isImportant: true,
    content: "2025년도 신규 교재가 등록되었습니다. 교재 메뉴에서 확인하실 수 있습니다." },
  { id: 2, title: "[공지] 에듀테크 서비스 점검 안내 (5/25 02:00~04:00)", date: "2025-05-18", isImportant: true,
    content: "정기 서비스 점검이 진행될 예정입니다. 해당 시간에는 서비스 이용이 제한될 수 있습니다." },
  { id: 3, title: "AI평가 서비스 정식 출시 안내", date: "2025-05-15",
    content: "AI 기반 자동 채점 및 피드백 서비스가 정식 출시되었습니다. 에듀테크 메뉴에서 이용하실 수 있습니다." },
  { id: 4, title: "커넥팅북 E-BOOK 업데이트 내역", date: "2025-05-10",
    content: "커넥팅북 E-BOOK 서비스가 업데이트되었습니다. 더욱 풍부한 멀티미디어 콘텐츠를 경험해 보세요." },
  { id: 5, title: "강사 전용 자료실 오픈 안내", date: "2025-04-28",
    content: "강사 전용 자료실이 오픈되었습니다. 교재별 부가 자료를 편리하게 다운로드하세요." },
  { id: 6, title: "2025년 YBM 강사 연수 일정 안내", date: "2025-04-15",
    content: "2025년 YBM 강사 연수 일정이 공개되었습니다. 자세한 내용은 공지를 확인해 주세요." },
];

function NoticesContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("id") ? Number(searchParams.get("id")) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SupportNav current="notices" />
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">공지사항</h2>
          <span className="text-xs text-slate-400">총 {notices.length}건</span>
        </div>
        <ul className="divide-y divide-slate-100">
          {notices.map((n) => {
            const isHighlighted = n.id === highlightId;
            return (
              <li
                key={n.id}
                id={`notice-${n.id}`}
                className={`transition-colors ${isHighlighted ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-slate-50"}`}
              >
                <div className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {n.isImportant && (
                      <span className="shrink-0 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">중요</span>
                    )}
                    {isHighlighted && (
                      <span className="shrink-0 text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                    )}
                    <p className={`text-sm flex-1 ${n.isImportant || isHighlighted ? "font-semibold text-slate-800" : "text-slate-700"}`}>
                      {n.title}
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">{n.date}</span>
                  </div>
                  {/* 하이라이트된 게시물은 본문 펼치기 */}
                  {isHighlighted && (
                    <div className="mt-3 pl-0 text-sm text-slate-600 leading-relaxed bg-white rounded-xl p-4 border border-blue-100">
                      {n.content}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function NoticesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">로딩 중...</div>}>
      <NoticesContent />
    </Suspense>
  );
}

function SupportNav({ current }: { current: string }) {
  const tabs = [
    { id: "notices",    label: "공지사항", href: "/support/notices" },
    { id: "events",     label: "이벤트",   href: "/support/events" },
    { id: "faq",        label: "FAQ",      href: "/support/faq" },
  ];
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-black text-slate-800 mb-4">고객센터</h1>
      <div className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              current === tab.id
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
