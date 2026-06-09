"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const GAMES = [
  {
    id: "matching-block",
    name: "Matching Block Game",
    isNew: true,
    modes: ["개인"],
    desc: "단어에 해당하는 그림이나 뜻을 가진 블럭을 찾아 매칭하기",
    thumb: {
      bg: "from-amber-100 to-orange-200",
      content: (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-2 grid grid-cols-3 gap-1.5 opacity-80">
            {["table","chair","book","lamp","pen","clock","bag","door","window"].map((w,i)=>(
              <div key={i} className={`rounded-lg border-2 flex items-center justify-center text-[9px] font-bold ${i===4?"bg-indigo-200 border-indigo-400 text-indigo-700":"bg-white/80 border-amber-300 text-amber-800"}`}>{w}</div>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 w-5 h-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center font-black">1</div>
          <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-blue-400 text-white text-xs flex items-center justify-center font-black">2</div>
        </div>
      ),
    },
  },
  {
    id: "build-word",
    name: "Build The Word",
    isNew: true,
    modes: ["개인"],
    desc: "순서대로 철자를 골라 그림에 해당하는 단어 완성하기",
    thumb: {
      bg: "from-sky-200 to-blue-300",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-sky-100/60 to-transparent" />
          <div className="flex gap-1 z-10">
            {["B","U","I","L","D"].map((l,i)=>(
              <div key={i} className="w-8 h-8 bg-white rounded-xl shadow-md flex items-center justify-center font-black text-sm text-sky-700 border-2 border-sky-300">{l}</div>
            ))}
          </div>
          <div className="text-3xl z-10">🌸</div>
          <div className="flex gap-1 z-10">
            {["n","_","i","_","_"].map((l,i)=>(
              <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm border-2 ${l==="_"?"border-dashed border-slate-400 bg-white/40 text-slate-400":"bg-white border-sky-400 text-sky-700"}`}>{l}</div>
            ))}
          </div>
        </div>
      ),
    },
  },
  {
    id: "word-typing",
    name: "Word Typing Game",
    isNew: false,
    modes: ["개인"],
    desc: "바닥에 닿기 전에 빠르게 타이핑하여 단어 완성하기",
    thumb: {
      bg: "from-teal-100 to-emerald-200",
      content: (
        <div className="w-full h-full flex flex-col items-end justify-center pr-4 gap-3 relative overflow-hidden">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-5xl opacity-50">🧒</div>
          {[{word:"si_epy",label:"a. 졸린"},{word:"clea_ the park",label:"v. 공원을 청소하다"}].map((item,i)=>(
            <div key={i} className="bg-slate-700 rounded-lg px-3 py-2 text-right shadow-lg">
              <div className="text-slate-300 text-[10px]">{item.label}</div>
              <div className="text-white font-bold text-sm tracking-wider">{item.word}</div>
            </div>
          ))}
        </div>
      ),
    },
  },
  {
    id: "infinite-stairs",
    name: "Infinite Stairs Game",
    isNew: true,
    modes: ["개인"],
    desc: "장애물을 피하며 그림과 일치하는 단어를 찾아 계단 오르기",
    thumb: {
      bg: "from-green-100 to-lime-200",
      content: (
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            {[0,1,2,3,4].map(i=>(
              <div key={i} className="flex" style={{marginLeft:`${i*18}px`,marginBottom:`${i*18}px`,position:"absolute",bottom:0,left:0}}>
                <div className="bg-amber-600 border-b-4 border-amber-800 rounded-sm" style={{width:`${180-i*30}px`,height:"18px"}}/>
              </div>
            ))}
          </div>
          <div className="absolute bottom-16 left-8 text-3xl">🐰</div>
          {["piano","weekend"].map((w,i)=>(
            <div key={i} className="absolute bg-yellow-300 border-2 border-yellow-500 rounded-lg px-2 py-1 text-xs font-bold text-yellow-900 shadow"
              style={{top:`${25+i*28}%`,right:`${15+i*10}%`}}>{w}</div>
          ))}
        </div>
      ),
    },
  },
  {
    id: "bombing",
    name: "Bombing Game",
    isNew: true,
    modes: ["개인"],
    desc: "대포의 위치와 각도를 조절하여 뜻과 일치하는 단어 맞추기",
    thumb: {
      bg: "from-stone-200 to-amber-100",
      content: (
        <div className="w-full h-full relative overflow-hidden flex items-end pb-3 px-3 gap-2">
          <div className="text-4xl">💣</div>
          {["write","animal","eye"].map((w,i)=>(
            <div key={i} className="bg-yellow-300 border-2 border-yellow-500 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 shadow"
              style={{marginBottom:`${i*16}px`}}>{w}</div>
          ))}
          <div className="absolute top-2 right-4 flex gap-3">
            {["🏛️","🏛️","🏛️"].map((e,i)=><span key={i} className="text-2xl">{e}</span>)}
          </div>
        </div>
      ),
    },
  },
  {
    id: "word-search",
    name: "Word Search",
    isNew: false,
    modes: ["개인", "모둠"],
    desc: "가로, 세로, 대각선으로 단어 완성",
    thumb: {
      bg: "from-teal-500 to-emerald-600",
      content: (
        <div className="w-full h-full flex items-center justify-center p-2">
          <div className="grid gap-px" style={{gridTemplateColumns:"repeat(10,1fr)",fontSize:"8px"}}>
            {"VCFIRSTKFSBK AMSFRVFKMHW BKCYLMTVATF ISKCOUFAOCMEO GPOVOICROFV CISHURIUVIAL ZNICRPEVOFTJ VENBHLHIRTHF JHOFHATOIR HL RTVHVNCRNVNB MWAVAIK RAK".split(" ").join("").split("").slice(0,100).map((c,i)=>(
              <div key={i} className={`w-4 h-4 flex items-center justify-center font-bold rounded-sm ${[5,15,25,35].includes(i)?"bg-yellow-300 text-slate-800":"text-white"}`}>{c||"A"}</div>
            ))}
          </div>
        </div>
      ),
    },
  },
  {
    id: "speed-game",
    name: "Speed Game",
    isNew: false,
    modes: ["개인"],
    desc: "빠르게 정답을 선택해 최고 점수 달성하기",
    thumb: {
      bg: "from-sky-300 to-cyan-400",
      content: (
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-400" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl">🐒</div>
          {[{x:"20%",y:"55%"},{x:"55%",y:"35%"},{x:"72%",y:"60%"}].map((p,i)=>(
            <div key={i} className="absolute text-2xl" style={{left:p.x,top:p.y}}>⭐</div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-purple-400 rounded-t-2xl" />
          <div className="absolute bottom-0 left-1/4 w-16 h-14 bg-purple-300 rounded-t-xl" />
          <div className="absolute bottom-0 right-1/4 w-12 h-12 bg-purple-300 rounded-t-xl" />
        </div>
      ),
    },
  },
  {
    id: "spell-it",
    name: "Spell it",
    isNew: false,
    modes: ["개인"],
    desc: "흩어진 철자를 올바른 순서로 배열하여 단어 완성하기",
    thumb: {
      bg: "from-indigo-800 to-purple-900",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <div className="flex gap-1">
            {["d","c","m","e","n"].map((l,i)=>(
              <div key={i} className="w-8 h-8 bg-blue-400 rounded-xl shadow-lg flex items-center justify-center font-black text-white text-sm border-b-4 border-blue-600">{l}</div>
            ))}
          </div>
          <div className="flex gap-1">
            {["_","e","_","i","i","_"].map((l,i)=>(
              <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm border-2 ${l==="_"?"border-dashed border-purple-400 bg-purple-900/50 text-purple-400":"bg-purple-300 border-purple-500 text-purple-900"}`}>{l}</div>
            ))}
          </div>
        </div>
      ),
    },
  },
  {
    id: "matching-game",
    name: "Matching Game",
    isNew: false,
    modes: ["개인"],
    desc: "그림 카드와 단어 카드를 뒤집어 짝을 맞추기",
    thumb: {
      bg: "from-amber-300 to-orange-400",
      content: (
        <div className="w-full h-full grid grid-cols-2 gap-2 p-3">
          {[
            {emoji:"😼",word:"classroom",active:true},
            {emoji:"😼",word:"classroom",active:false},
            {emoji:"🤠",word:"fifth",active:false},
            {emoji:"🤠",word:"",active:false},
          ].map((c,i)=>(
            <div key={i} className={`rounded-xl flex flex-col items-center justify-between p-2 shadow ${c.active?"bg-yellow-200 border-2 border-yellow-400":"bg-amber-100 border border-amber-300"}`}>
              <div className="flex items-center justify-between w-full">
                <span className="text-xs">🔊</span>
                {c.active && <span className="w-4 h-4 bg-orange-400 rounded-full text-white text-[8px] flex items-center justify-center font-black">👆</span>}
              </div>
              <span className="text-2xl">{c.emoji}</span>
              <span className="text-[10px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-full">{c.word || "?"}</span>
            </div>
          ))}
        </div>
      ),
    },
  },
];

const MODE_STYLE: Record<string, string> = {
  개인: "bg-violet-500 text-white",
  모둠: "bg-teal-400 text-white",
};

function ClassGameSelectContent() {
  const params = useSearchParams();
  const bookId = params.get("bookId") ?? "";

  return (
    <div className="min-h-screen" style={{ background: "#e85d45" }}>
      {/* 헤더 */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-white tracking-tight drop-shadow">클래스</span>
          <span className="text-2xl font-black text-yellow-300 tracking-tight drop-shadow">게임</span>
          <span className="ml-1 px-2.5 py-0.5 bg-orange-400 text-white text-xs font-black rounded-full border border-white/30">영어</span>
        </div>
        <Link href="/my-class"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-800 text-white transition-colors shadow"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>

      {/* 게임 그리드 */}
      <div className="px-5 pb-10 grid grid-cols-3 gap-4">
        {GAMES.map((game) => (
          <Link
            key={game.id}
            href={`/edutech/class-game/play?bookId=${bookId}&game=${game.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-150 cursor-pointer group"
          >
            {/* 썸네일 */}
            <div className={`relative h-44 bg-gradient-to-br ${game.thumb.bg} overflow-hidden`}>
              {game.isNew && (
                <div className="absolute top-0 left-0 z-10 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-br-xl">
                  NEW
                </div>
              )}
              {game.thumb.content}
            </div>
            {/* 정보 */}
            <div className="px-4 pt-3 pb-4">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-black text-slate-900 text-sm">{game.name}</span>
                {game.modes.map(mode => (
                  <span key={mode} className={`text-[10px] font-black px-2 py-0.5 rounded-full ${MODE_STYLE[mode]}`}>
                    {mode}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{game.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ClassGameSelectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white" style={{background:"#e85d45"}}>로딩 중...</div>}>
      <ClassGameSelectContent />
    </Suspense>
  );
}
