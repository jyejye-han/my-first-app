"use client";
import { useState } from "react";

/* ─────────────── Types ─────────────── */
type BookRow = {
  subArea: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
};

type Section = {
  area: string;
  rows: BookRow[];
};

type LevelBlock = {
  level: string;
  levelId: "elementary" | "middle" | "high";
  bg: string;        // Tailwind class for level cell bg
  text: string;      // Tailwind class for level cell text
  sections: Section[];
};

type FlatRow = {
  levelLabel: string;
  levelBg: string;
  levelText: string;
  levelSpan: number;
  showLevel: boolean;
  areaLabel: string;
  areaSpan: number;
  showArea: boolean;
  subArea: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  rowIndex: number; // within level, for alternating bg
};

/* ─────────────── Curriculum data ─────────────── */
const CURRICULUM: LevelBlock[] = [
  /* ====== 초등 ====== */
  {
    level: "초등\n3·4학년",
    levelId: "elementary",
    bg: "bg-green-600",
    text: "text-white",
    sections: [
      {
        area: "Reading",
        rows: [
          { subArea: "ELT / 원서형",  q1: "Let's Go 1",          q2: "Let's Go 2",              q3: "Oxford Reading Tree 1",  q4: "Oxford Reading Tree 2" },
          { subArea: "독해 기본서",   q1: "리딩튜터 입문",        q2: "Reading Starter 1",        q3: "리딩튜터 초급",           q4: "Reading Starter 2" },
        ],
      },
      {
        area: "Listening",
        rows: [
          { subArea: "",              q1: "Junior Listening 1",   q2: "Junior Listening 2",       q3: "Junior Listening 3",     q4: "" },
        ],
      },
      {
        area: "Grammar",
        rows: [
          { subArea: "문법",          q1: "Grammar Master Basic", q2: "Grammar Inside Starter",   q3: "",                       q4: "" },
        ],
      },
    ],
  },
  {
    level: "초등\n5·6학년",
    levelId: "elementary",
    bg: "bg-green-500",
    text: "text-white",
    sections: [
      {
        area: "Reading",
        rows: [
          { subArea: "ELT / 원서형",  q1: "Subject Link 1",       q2: "Subject Link 2",           q3: "Subject Link 3",         q4: "Reading Explore 1" },
          { subArea: "독해 기본서",   q1: "Reading Starter 3",    q2: "Reading Relay 1",          q3: "Reading Relay 2",        q4: "리딩튜터 기초" },
        ],
      },
      {
        area: "Listening",
        rows: [
          { subArea: "",              q1: "Junior Listening 4",   q2: "능률 초등 영어듣기 1",     q3: "능률 초등 영어듣기 2",   q4: "" },
        ],
      },
      {
        area: "Grammar\n& 어휘",
        rows: [
          { subArea: "문법",          q1: "Grammar Master 2",     q2: "Grammar Inside 1",         q3: "Grammar Master 3",       q4: "Grammar Inside 2" },
          { subArea: "어휘",          q1: "Word Master 초등",     q2: "Voca Inside Starter",      q3: "",                       q4: "" },
        ],
      },
    ],
  },

  /* ====== 중등 ====== */
  {
    level: "중등 1",
    levelId: "middle",
    bg: "bg-cyan-600",
    text: "text-white",
    sections: [
      {
        area: "Reading",
        rows: [
          { subArea: "ELT / 원서형",    q1: "Subject Link 7",            q2: "Subject Link 8",            q3: "Reading Inside 1",           q4: "Jr Reading Expert 1" },
          { subArea: "독해 기본서",     q1: "리딩튜터 주니어 1",         q2: "1316 Reading Level 1",      q3: "리딩튜터 주니어 2",          q4: "1316 Reading Level 2" },
          { subArea: "독해 심화(수능)", q1: "",                           q2: "",                          q3: "수능 입독 중학 Level 1",     q4: "첫번째 수능영어 기초편" },
        ],
      },
      {
        area: "Listening",
        rows: [
          { subArea: "",                q1: "주니어 리스닝튜터 입문",    q2: "1316 Listening Level 1",    q3: "",                           q4: "능률 중학영어듣기 1" },
        ],
      },
      {
        area: "Grammar\n& 구문",
        rows: [
          { subArea: "문법",            q1: "중학 영문법 Link 1",        q2: "Grammar Inside 1",          q3: "1316 Grammar Level 1",       q4: "문나중 Level 1" },
          { subArea: "구문",            q1: "",                           q2: "중학 구문 Level 1",         q3: "",                           q4: "" },
        ],
      },
    ],
  },
  {
    level: "중등 2",
    levelId: "middle",
    bg: "bg-cyan-500",
    text: "text-white",
    sections: [
      {
        area: "Reading",
        rows: [
          { subArea: "ELT / 원서형",    q1: "Jr Reading Expert 2",       q2: "Subject Link 9",            q3: "Reading Inside 2",           q4: "Jr Reading Expert 3" },
          { subArea: "독해 기본서",     q1: "리딩튜터 주니어 3",         q2: "1316 Reading Level 3",      q3: "리딩튜터 주니어 4",          q4: "1316 Reading Level 4" },
          { subArea: "독해 심화(수능)", q1: "수능 입독 중학 Level 2",    q2: "",                          q3: "첫번째 수능영어 실력편",     q4: "" },
        ],
      },
      {
        area: "Listening",
        rows: [
          { subArea: "",                q1: "1316 Listening Level 2",    q2: "",                          q3: "능률 중학영어듣기 2",        q4: "" },
        ],
      },
      {
        area: "Grammar\n& 구문",
        rows: [
          { subArea: "문법",            q1: "중학 영문법 Link 2",        q2: "Grammar Inside 2",          q3: "1316 Grammar Level 2",       q4: "문나중 Level 2" },
          { subArea: "구문",            q1: "중학 구문 Level 2",         q2: "",                          q3: "중학 구문 Level 3",          q4: "" },
        ],
      },
    ],
  },
  {
    level: "중등 3",
    levelId: "middle",
    bg: "bg-cyan-400",
    text: "text-cyan-950",
    sections: [
      {
        area: "Reading",
        rows: [
          { subArea: "ELT / 원서형",    q1: "Reading Inside 3",          q2: "Reading Expert 1",          q3: "Reading Inside 4",           q4: "Reading Expert 2" },
          { subArea: "독해 기본서",     q1: "YBM Reading Power 1",       q2: "리딩튜터 실력",             q3: "YBM Reading Power 2",        q4: "1316 Reading Level 6" },
          { subArea: "독해 심화(수능)", q1: "수능 입독 고교 Level 1",    q2: "첫번째 수능영어 완성편",    q3: "수능 입독 고교 Level 2",     q4: "" },
        ],
      },
      {
        area: "Listening",
        rows: [
          { subArea: "",                q1: "1316 Listening Level 3",    q2: "능률 중학영어듣기 3",       q3: "",                           q4: "수능 기초 Listening" },
        ],
      },
      {
        area: "Grammar\n& 구문",
        rows: [
          { subArea: "문법",            q1: "Grammar Inside 3",          q2: "1316 Grammar Level 3",      q3: "문나중 Level 3",             q4: "고교 문법 입문" },
          { subArea: "구문",            q1: "중학 구문 완성",            q2: "",                          q3: "고교 구문 입문",             q4: "" },
        ],
      },
    ],
  },

  /* ====== 고등 ====== */
  {
    level: "고등 1",
    levelId: "high",
    bg: "bg-blue-600",
    text: "text-white",
    sections: [
      {
        area: "Reading",
        rows: [
          { subArea: "ELT / 원서형",    q1: "Reading Expert 3",          q2: "Reading Expert 4",          q3: "Advanced Reading Expert 1",  q4: "" },
          { subArea: "독해 기본서",     q1: "리딩튜터 완성 1",           q2: "수능 기본 독해 Level 1",    q3: "리딩튜터 완성 2",            q4: "수능 기본 독해 Level 2" },
          { subArea: "독해 심화(수능)", q1: "수능 실전 독해 기본",       q2: "",                          q3: "수능 모의 독해 1",           q4: "능률 수능영어 독해 1" },
        ],
      },
      {
        area: "Listening",
        rows: [
          { subArea: "",                q1: "수능 기초 Listening",       q2: "능률 수능 영어듣기 기본",   q3: "수능 Listening 실전 1",      q4: "능률 수능영어듣기 22회 1" },
        ],
      },
      {
        area: "Grammar\n& 구문",
        rows: [
          { subArea: "문법",            q1: "고교 영문법 Link 1",        q2: "Grammar Inside 고교",       q3: "1316 Grammar 고급",          q4: "수능 문법 완성" },
          { subArea: "구문",            q1: "고교 구문 Level 1",         q2: "수능 구문 기본",            q3: "고교 구문 Level 2",          q4: "" },
        ],
      },
    ],
  },
  {
    level: "고등\n2·3학년",
    levelId: "high",
    bg: "bg-blue-500",
    text: "text-white",
    sections: [
      {
        area: "Reading",
        rows: [
          { subArea: "ELT / 원서형",    q1: "Advanced Reading Expert 2", q2: "",                          q3: "",                           q4: "" },
          { subArea: "독해 기본서",     q1: "수능 기본 독해 Level 3",    q2: "리딩튜터 수능 실전",        q3: "",                           q4: "" },
          { subArea: "독해 심화(수능)", q1: "수능 모의 독해 2",          q2: "능률 수능영어 독해 2",      q3: "수능 실전 독해 심화",        q4: "EBS 연계 독해 완성" },
        ],
      },
      {
        area: "Listening",
        rows: [
          { subArea: "",                q1: "수능 Listening 실전 2",     q2: "능률 수능영어듣기 22회 2",  q3: "수능 Listening 파이널",      q4: "" },
        ],
      },
      {
        area: "Grammar\n& 구문",
        rows: [
          { subArea: "문법",            q1: "수능 문법 실전",            q2: "",                          q3: "",                           q4: "" },
          { subArea: "구문",            q1: "수능 구문 완성",            q2: "고교 구문 마스터",          q3: "",                           q4: "" },
        ],
      },
    ],
  },
];

/* ─────────────── Flatten helper ─────────────── */
function flatten(blocks: LevelBlock[]): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const block of blocks) {
    const levelSpan = block.sections.reduce((s, sec) => s + sec.rows.length, 0);
    let firstInLevel = true;
    let rowIndex = 0;
    for (const section of block.sections) {
      const areaSpan = section.rows.length;
      let firstInArea = true;
      for (const row of section.rows) {
        rows.push({
          levelLabel: block.level,
          levelBg: block.bg,
          levelText: block.text,
          levelSpan,
          showLevel: firstInLevel,
          areaLabel: section.area,
          areaSpan,
          showArea: firstInArea,
          subArea: row.subArea,
          q1: row.q1,
          q2: row.q2,
          q3: row.q3,
          q4: row.q4,
          rowIndex: rowIndex++,
        });
        firstInLevel = false;
        firstInArea = false;
      }
    }
  }
  return rows;
}

/* ─────────────── Level tabs config ─────────────── */
const TABS = [
  {
    id: "all",
    label: "전체",
    desc: "전체 커리큘럼을\n한눈에",
    figure: "👩‍🏫",
    activeBg: "bg-slate-700",
    activeBorder: "border-slate-700",
    activeFigBg: "bg-slate-800",
    inactiveFigBg: "bg-slate-100",
    inactiveText: "text-slate-700",
  },
  {
    id: "elementary",
    label: "초등",
    desc: "기초부터 쉽고\n재미있게 학습하는",
    figure: "🧒",
    activeBg: "bg-green-600",
    activeBorder: "border-green-600",
    activeFigBg: "bg-green-700",
    inactiveFigBg: "bg-green-50",
    inactiveText: "text-green-700",
  },
  {
    id: "middle",
    label: "중등",
    desc: "체계적으로 탄탄하게\n실력을 쌓는",
    figure: "🧑",
    activeBg: "bg-cyan-600",
    activeBorder: "border-cyan-600",
    activeFigBg: "bg-cyan-700",
    inactiveFigBg: "bg-cyan-50",
    inactiveText: "text-cyan-700",
  },
  {
    id: "high",
    label: "고등",
    desc: "수능 기본기부터\n실전 대비까지",
    figure: "👩‍🎓",
    activeBg: "bg-blue-600",
    activeBorder: "border-blue-600",
    activeFigBg: "bg-blue-700",
    inactiveFigBg: "bg-blue-50",
    inactiveText: "text-blue-700",
  },
];

/* ─────────────── Component ─────────────── */
export default function RoadmapClient() {
  const [activeTab, setActiveTab] = useState("middle");

  const activeTabConfig = TABS.find((t) => t.id === activeTab)!;

  const filtered =
    activeTab === "all"
      ? CURRICULUM
      : CURRICULUM.filter((b) => b.levelId === activeTab);

  const rows = flatten(filtered);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800">학습로드맵</h1>
        <p className="text-slate-500 text-sm mt-1">
          YBM의 대표 교재들로 구성된 수준별 연간 커리큘럼을 추천해 드립니다.
        </p>
      </div>

      {/* ── Level selector tabs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-200 text-left ${
                isActive
                  ? `${tab.activeBg} ${tab.activeBorder} text-white shadow-lg`
                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:shadow-md"
              }`}
            >
              {/* Description text */}
              <div className="px-4 pt-4 pb-2">
                <p className={`text-[11px] leading-snug whitespace-pre-line ${isActive ? "text-white/80" : "text-slate-400"}`}>
                  {tab.desc}
                </p>
              </div>

              {/* Character figure */}
              <div className="flex justify-center pb-2">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl ${
                  isActive ? tab.activeFigBg : tab.inactiveFigBg
                } transition-colors`}>
                  {tab.figure}
                </div>
              </div>

              {/* Level label */}
              <div className={`text-center px-4 pb-4 pt-1 border-t ${isActive ? "border-white/20" : "border-slate-100"}`}>
                <span className={`text-xl font-black tracking-tight ${isActive ? "text-white" : tab.inactiveText}`}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Curriculum table ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm" style={{ minWidth: "900px" }}>
            {/* Header */}
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="px-4 py-3 text-center font-bold text-xs tracking-wide w-20">레벨</th>
                <th className="px-4 py-3 text-center font-bold text-xs tracking-wide w-28">영역</th>
                <th className="px-4 py-3 text-center font-bold text-xs tracking-wide w-32">세부영역</th>
                <th className="px-5 py-3 text-center font-bold text-xs tracking-wide">Quarter 1</th>
                <th className="px-5 py-3 text-center font-bold text-xs tracking-wide">Quarter 2</th>
                <th className="px-5 py-3 text-center font-bold text-xs tracking-wide">Quarter 3</th>
                <th className="px-5 py-3 text-center font-bold text-xs tracking-wide">Quarter 4</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-slate-100 last:border-0 ${
                    row.rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  {/* 레벨 (rowspan) */}
                  {row.showLevel && (
                    <td
                      rowSpan={row.levelSpan}
                      className={`${row.levelBg} ${row.levelText} text-center px-3 py-3 font-black text-sm leading-snug align-middle border-r border-white/20 whitespace-pre-line`}
                    >
                      {row.levelLabel}
                    </td>
                  )}

                  {/* 영역 (rowspan) */}
                  {row.showArea && (
                    <td
                      rowSpan={row.areaSpan}
                      className="px-3 py-3 text-center align-middle border-r border-slate-100 bg-slate-700 text-white"
                    >
                      <span className="text-xs font-bold whitespace-pre-line leading-snug">{row.areaLabel}</span>
                    </td>
                  )}

                  {/* 세부영역 */}
                  <td className="px-3 py-3 border-r border-slate-100 bg-slate-50">
                    {row.subArea ? (
                      <span className="text-xs text-slate-600 font-medium">· {row.subArea}</span>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </td>

                  {/* Q1 */}
                  <td className="px-4 py-3 border-r border-slate-100">
                    {row.q1 ? (
                      <span className="text-xs text-slate-700 leading-snug">{row.q1}</span>
                    ) : (
                      <span className="text-slate-200 text-xs">—</span>
                    )}
                  </td>

                  {/* Q2 */}
                  <td className="px-4 py-3 border-r border-slate-100 bg-slate-50/40">
                    {row.q2 ? (
                      <span className="text-xs text-slate-700 leading-snug">{row.q2}</span>
                    ) : (
                      <span className="text-slate-200 text-xs">—</span>
                    )}
                  </td>

                  {/* Q3 */}
                  <td className="px-4 py-3 border-r border-slate-100">
                    {row.q3 ? (
                      <span className="text-xs text-slate-700 leading-snug">{row.q3}</span>
                    ) : (
                      <span className="text-slate-200 text-xs">—</span>
                    )}
                  </td>

                  {/* Q4 */}
                  <td className="px-4 py-3 bg-slate-50/40">
                    {row.q4 ? (
                      <span className="text-xs text-slate-700 leading-snug">{row.q4}</span>
                    ) : (
                      <span className="text-slate-200 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-4 text-xs text-slate-400 text-center">
        * 위 커리큘럼은 권장 순서이며, 학습자 수준에 따라 조정할 수 있습니다.
      </p>
    </div>
  );
}
