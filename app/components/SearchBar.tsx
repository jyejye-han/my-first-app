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

    </div>
  );
}
