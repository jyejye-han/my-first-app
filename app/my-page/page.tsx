"use client";
import { useState } from "react";
import Link from "next/link";
import { useMyMaterials, type SavedMaterial } from "../lib/useMyMaterials";

/* ───────── 탭 정의 ───────── */
type Tab = "profile" | "materials" | "orders";

/* ───────── 자료 타입 설정 ───────── */
const TYPE_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string; border: string }> = {
  vocab:     { label: "어휘 학습지",  icon: "📝", color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200" },
  reading:   { label: "독해 문제",    icon: "📖", color: "text-green-700",  bg: "bg-green-50",  border: "border-green-200" },
  grammar:   { label: "문법 문제",    icon: "📐", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
  cloze:     { label: "빈칸 채우기",  icon: "✏️", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  formative: { label: "형성평가",     icon: "📋", color: "text-red-700",    bg: "bg-red-50",    border: "border-red-200" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/* ───────── 자료 카드 ───────── */
function MaterialCard({ mat, onDelete }: { mat: SavedMaterial; onDelete: (id: string) => void }) {
  const tc = TYPE_CONFIG[mat.typeId] ?? { label: mat.typeLabel, icon: "📄", color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" };
  const title = [mat.schoolLevel, mat.grade, mat.typeLabel, mat.topic ? `· ${mat.topic}` : ""].filter(Boolean).join(" ");

  return (
    <div className={`bg-white rounded-xl border ${tc.border} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
      <div className={`${tc.bg} px-4 py-2.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{tc.icon}</span>
          <span className={`text-xs font-black ${tc.color}`}>{tc.label}</span>
        </div>
        <span className="text-[10px] text-slate-400">{formatDate(mat.createdAt)}</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-bold text-slate-800 leading-snug truncate">{title}</p>
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {mat.schoolLevel  && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{mat.schoolLevel}</span>}
          {mat.grade        && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{mat.grade}</span>}
          {mat.studentLevel && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              mat.studentLevel === "기초" ? "bg-green-100 text-green-700" :
              mat.studentLevel === "중급" ? "bg-blue-100 text-blue-700" :
              "bg-purple-100 text-purple-700"
            }`}>{mat.studentLevel}</span>
          )}
          {mat.topic && <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full truncate max-w-[100px]">{mat.topic}</span>}
        </div>
      </div>
      <div className="px-4 pb-3 flex gap-2">
        <Link
          href={`/edutech/ai-material?typeId=${mat.typeId}&schoolLevel=${encodeURIComponent(mat.schoolLevel)}&grade=${encodeURIComponent(mat.grade)}&studentLevel=${encodeURIComponent(mat.studentLevel)}&topic=${encodeURIComponent(mat.topic)}&count=${mat.count}`}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border-2 ${tc.border} ${tc.color} ${tc.bg} hover:opacity-80 transition-all`}
        >
          다시 보기
        </Link>
        <button
          onClick={() => onDelete(mat.id)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ───────── 탭: 프로필 ───────── */
function ProfileTab() {
  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-blue-600 rounded-full inline-block" />
          회원정보 수정
        </h3>
        <div className="space-y-0">
          {[
            { label: "이름",     value: "홍길동" },
            { label: "이메일",   value: "hong@ybm.co.kr" },
            { label: "소속기관", value: "YBM 어학원 강남점" },
            { label: "담당과목", value: "영어 (독해, 문법)" },
            { label: "가입일",   value: "2024년 3월 1일" },
          ].map((field) => (
            <div key={field.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-xs text-slate-500 w-20 shrink-0">{field.label}</span>
              <span className="text-xs font-medium text-slate-800 flex-1">{field.value}</span>
              <button className="text-[11px] text-blue-600 hover:underline shrink-0">수정</button>
            </div>
          ))}
        </div>
        <button className="mt-3 w-full bg-[#1B3A6B] hover:bg-[#163060] text-white py-2 rounded-lg font-semibold text-xs transition-colors">
          정보 저장
        </button>
      </div>
    </div>
  );
}

/* ───────── 탭: 내가 만든 자료 ───────── */
function MaterialsTab() {
  const { materials, remove } = useMyMaterials();
  const [filterType, setFilterType] = useState("all");

  const filtered = filterType === "all" ? materials : materials.filter(m => m.typeId === filterType);
  const typeCounts = Object.keys(TYPE_CONFIG).reduce<Record<string, number>>((acc, k) => {
    acc[k] = materials.filter(m => m.typeId === k).length;
    return acc;
  }, {});

  return (
    <div>
      {/* 자료 수 */}
      <p className="text-xs text-slate-500 mb-4">총 <span className="font-bold text-slate-800">{materials.length}</span>개의 자료</p>

      {/* 필터 탭 */}
      {materials.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          <button onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 whitespace-nowrap transition-all ${
              filterType === "all" ? "bg-slate-800 border-slate-800 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
            }`}>
            전체 ({materials.length})
          </button>
          {Object.entries(TYPE_CONFIG).map(([k, tc]) => typeCounts[k] > 0 && (
            <button key={k} onClick={() => setFilterType(k)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border-2 whitespace-nowrap transition-all ${
                filterType === k ? `${tc.bg} ${tc.border} ${tc.color}` : "border-slate-200 text-slate-600 hover:border-slate-400"
              }`}>
              {tc.icon} {tc.label} ({typeCounts[k]})
            </button>
          ))}
        </div>
      )}

      {/* 목록 */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <span className="text-5xl">📂</span>
          <p className="text-sm font-bold text-slate-600">
            {filterType === "all" ? "아직 저장된 자료가 없습니다" : `저장된 ${TYPE_CONFIG[filterType]?.label}가 없습니다`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(mat => (
            <MaterialCard key={mat.id} mat={mat} onDelete={remove} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────── 탭: 주문내역 ───────── */
function OrdersTab() {
  const [period, setPeriod] = useState<string>("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo]   = useState("");

  const selectPeriod = (p: string) => {
    setPeriod(p);
    const to = new Date();
    const from = new Date();
    if (p === "1w") from.setDate(to.getDate() - 7);
    else if (p === "1m") from.setMonth(to.getMonth() - 1);
    else if (p === "3m") from.setMonth(to.getMonth() - 3);
    else if (p === "6m") from.setMonth(to.getMonth() - 6);
    setDateFrom(from.toISOString().slice(0, 10));
    setDateTo(to.toISOString().slice(0, 10));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* 디지털콘텐츠 헤더 */}
      <div className="flex border-b border-slate-200">
        <div className="px-5 py-3 text-sm font-bold border-b-2 border-[#1B3A6B] text-[#1B3A6B] -mb-px">
          디지털콘텐츠
        </div>
      </div>

      {/* 기간선택 */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-600 shrink-0">기간선택</span>
        {[
          { label: "1주일", value: "1w" },
          { label: "1개월", value: "1m" },
          { label: "3개월", value: "3m" },
          { label: "6개월", value: "6m" },
        ].map(p => (
          <button
            key={p.value}
            onClick={() => selectPeriod(p.value)}
            className={`px-3 py-1 text-xs font-semibold rounded border transition-all ${
              period === p.value
                ? "bg-[#1B3A6B] border-[#1B3A6B] text-white"
                : "bg-white border-slate-300 text-slate-600 hover:border-[#1B3A6B] hover:text-[#1B3A6B]"
            }`}
          >
            {p.label}
          </button>
        ))}
        <div className="flex items-center gap-1.5 ml-1">
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="text-xs border border-slate-300 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-[#1B3A6B]"
          />
          <span className="text-slate-400 text-xs">~</span>
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="text-xs border border-slate-300 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-[#1B3A6B]"
          />
          <button className="px-3 py-1 bg-[#1B3A6B] hover:bg-[#163060] text-white text-xs font-bold rounded transition-colors">
            조회
          </button>
        </div>
      </div>

      {/* 총 건수 */}
      <div className="px-4 py-2 border-b border-slate-100">
        <span className="text-xs text-slate-600">총 <span className="font-bold text-red-500">0</span>건</span>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1B3A6B] text-white">
              {["주문번호", "주문일", "주문내용", "주문금액/수량", "주문상태", "주문관리"].map((h, i) => (
                <th key={h} className={`py-3 px-3 font-semibold text-center whitespace-nowrap ${i > 0 ? "border-l border-white/20" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="py-10 text-center text-slate-400">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  주문 내역이 없습니다.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 디지털콘텐츠 주문 상태 흐름 */}
      <div className="border-t border-slate-200 px-4 py-5">
          <div className="flex items-start justify-center gap-0">
            {[
              { label: "주문접수",       icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )},
              { label: "결제완료",       icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              )},
              { label: "다운로드 대기중", icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )},
              { label: "다운로드 완료",  icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
            ].map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center gap-2 w-24">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    {step.icon}
                  </div>
                  <span className="text-[11px] text-slate-500 text-center leading-tight">{step.label}</span>
                </div>
                {i < 3 && (
                  <div className="flex flex-col items-center mb-5 mx-1">
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {i === 0 && (
                      <span className="text-[9px] text-slate-400 whitespace-nowrap mt-0.5">주문취소 가능</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      {/* 주문 및 배송안내 */}
      <div className="border-t border-slate-200 px-4 py-4 bg-slate-50">
        <p className="text-xs font-bold text-slate-700 mb-2">주문 및 배송안내</p>
        <ul className="space-y-1 text-[11px] text-slate-500 leading-relaxed">
          <li>- 주문하신 상품 다운로드 전에는 주문 취소가 가능합니다.</li>
          <li>- 디지털콘텐츠 특성상 1회 이상 다운로드 시 환불되지 않습니다.</li>
          <li>- 다운로드 기간(결제일 후 6개월) 및 다운로드 횟수(20회) 이후에는 해당 콘텐츠 제공이 불가능 합니다.</li>
        </ul>
      </div>

    </div>
  );
}

/* ───────── 메인 페이지 ───────── */
export default function MyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "profile",   label: "프로필",        icon: "👤" },
    { id: "materials", label: "내가 만든 자료", icon: "📝" },
    { id: "orders",    label: "주문내역",       icon: "🛒" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-lg font-black text-slate-800 mb-4">My Page</h1>

      {/* 프로필 카드 */}
      <div className="bg-[#1B3A6B] rounded-xl px-6 py-5 text-white text-center mb-4 shadow-sm">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">
          👩‍🏫
        </div>
        <h2 className="font-black text-base">홍길동 강사님</h2>
        <p className="text-blue-200 text-xs mt-0.5">hong@ybm.co.kr</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex bg-slate-100 rounded-xl p-1 mb-5 gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === "profile"   && <ProfileTab />}
      {activeTab === "materials" && <MaterialsTab />}
      {activeTab === "orders"    && <OrdersTab />}
    </div>
  );
}
