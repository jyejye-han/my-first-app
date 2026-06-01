"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const levels = ["초등", "중등", "고등"];

export default function SearchBar() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const toggle = (v: string) =>
    setSelected((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selected.length) params.set("level", selected.join(","));
    router.push(`/textbooks${params.toString() ? "?" + params.toString() : ""}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search row */}
      <div className="bg-white rounded-2xl p-3 flex gap-2 shadow-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="교재명·저자·ISBN 검색"
          className="flex-1 text-sm text-slate-700 px-3 py-2 focus:outline-none rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-[#1B3A6B] hover:bg-[#163060] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          검색
        </button>
        <button
          onClick={() => setFilterOpen((v) => !v)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
            filterOpen
              ? "bg-blue-50 border-blue-400 text-blue-700"
              : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          상세필터
          <svg
            className={`w-3 h-3 transition-transform duration-150 ${filterOpen ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter panel */}
      {filterOpen && (
        <div className="mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-5">
          {/* 이용대상 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-semibold text-slate-700 shrink-0">이용대상</span>
            <div className="flex gap-2">
              {levels.map((lv) => (
                <button
                  key={lv}
                  onClick={() => toggle(lv)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 ${
                    selected.includes(lv)
                      ? "bg-[#1B3A6B] border-[#1B3A6B] text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  {lv}
                </button>
              ))}
            </div>
          </div>

          {/* 논의 필요 안내 */}
          <div className="mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-xs text-amber-700 font-medium">상세 필터는 논의 필요</p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setSelected([])}
              className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl transition-colors"
            >
              초기화
            </button>
            <button
              onClick={() => setFilterOpen(false)}
              className="px-5 py-2 text-sm font-semibold bg-[#1B3A6B] hover:bg-[#163060] text-white rounded-xl transition-colors"
            >
              적용
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
