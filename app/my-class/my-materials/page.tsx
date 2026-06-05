"use client";
import { useState } from "react";
import Link from "next/link";
import { useMyMaterials, type SavedMaterial } from "../../lib/useMyMaterials";

const TYPE_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string; border: string }> = {
  vocab:     { label: "어휘 학습지",  icon: "📝", color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200" },
  reading:   { label: "독해 문제",    icon: "📖", color: "text-green-700",  bg: "bg-green-50",  border: "border-green-200" },
  grammar:   { label: "문법 문제",    icon: "📐", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
  cloze:     { label: "빈칸 채우기",  icon: "✏️", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  formative: { label: "형성평가",     icon: "📋", color: "text-red-700",    bg: "bg-red-50",    border: "border-red-200" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")}`;
}

function MaterialCard({ mat, onDelete }: { mat: SavedMaterial; onDelete: (id: string) => void }) {
  const tc = TYPE_CONFIG[mat.typeId] ?? { label: mat.typeLabel, icon: "📄", color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" };
  const title = [mat.schoolLevel, mat.grade, mat.typeLabel, mat.topic ? `· ${mat.topic}` : ""].filter(Boolean).join(" ");

  return (
    <div className={`bg-white rounded-2xl border ${tc.border} shadow-sm overflow-hidden hover:shadow-md transition-shadow group`}>
      {/* 색상 헤더 */}
      <div className={`${tc.bg} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">{tc.icon}</span>
          <span className={`text-xs font-black ${tc.color}`}>{tc.label}</span>
        </div>
        <span className="text-[10px] text-slate-400">{formatDate(mat.createdAt)}</span>
      </div>

      {/* 본문 */}
      <div className="px-4 py-3">
        <p className="text-sm font-bold text-slate-800 leading-snug truncate">{title}</p>
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {mat.schoolLevel && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{mat.schoolLevel}</span>}
          {mat.grade       && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{mat.grade}</span>}
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

      {/* 액션 */}
      <div className="px-4 pb-3 flex gap-2">
        <Link
          href={`/edutech/ai-material?typeId=${mat.typeId}&schoolLevel=${encodeURIComponent(mat.schoolLevel)}&grade=${encodeURIComponent(mat.grade)}&studentLevel=${encodeURIComponent(mat.studentLevel)}&topic=${encodeURIComponent(mat.topic)}&count=${mat.count}`}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border-2 ${tc.border} ${tc.color} ${tc.bg} hover:opacity-80 transition-all`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
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

export default function MyMaterialsPage() {
  const { materials, remove } = useMyMaterials();
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = filterType === "all" ? materials : materials.filter(m => m.typeId === filterType);

  const typeCounts = Object.keys(TYPE_CONFIG).reduce<Record<string, number>>((acc, k) => {
    acc[k] = materials.filter(m => m.typeId === k).length;
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/my-class" className="hover:text-blue-600">마이클래스</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">내가 만든 자료</span>
      </nav>

      {/* 헤더 */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">내가 만든 자료</h1>
          <p className="text-slate-500 text-sm mt-1">AI 자료 생성기로 만든 학습 자료를 관리하세요.</p>
        </div>
        <Link
          href="/edutech/ai-material"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 자료 만들기
        </Link>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm">
          <p className="text-2xl font-black text-slate-800">{materials.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">전체</p>
        </div>
        {Object.entries(TYPE_CONFIG).map(([k, tc]) => (
          <div key={k} className={`rounded-xl border ${tc.border} ${tc.bg} p-3 text-center shadow-sm`}>
            <p className={`text-2xl font-black ${tc.color}`}>{typeCounts[k] ?? 0}</p>
            <p className={`text-[11px] mt-0.5 ${tc.color} opacity-80`}>{tc.label}</p>
          </div>
        ))}
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        <button onClick={() => setFilterType("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 whitespace-nowrap transition-all ${
            filterType === "all" ? "bg-slate-800 border-slate-800 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
          }`}>
          전체 ({materials.length})
        </button>
        {Object.entries(TYPE_CONFIG).map(([k, tc]) => typeCounts[k] > 0 && (
          <button key={k} onClick={() => setFilterType(k)}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold border-2 whitespace-nowrap transition-all ${
              filterType === k ? `${tc.bg} ${tc.border} ${tc.color}` : "border-slate-200 text-slate-600 hover:border-slate-400"
            }`}>
            {tc.icon} {tc.label} ({typeCounts[k]})
          </button>
        ))}
      </div>

      {/* 목록 */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <span className="text-6xl">📂</span>
          <div>
            <p className="text-lg font-bold text-slate-600">
              {filterType === "all" ? "아직 저장된 자료가 없습니다" : `저장된 ${TYPE_CONFIG[filterType]?.label}가 없습니다`}
            </p>
            <p className="text-sm text-slate-400 mt-1">AI 자료 생성기에서 자료를 만들고 저장해 보세요.</p>
          </div>
          <Link href="/edutech/ai-material"
            className="mt-2 flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI 자료 생성하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(mat => (
            <MaterialCard key={mat.id} mat={mat} onDelete={remove} />
          ))}
        </div>
      )}
    </div>
  );
}
