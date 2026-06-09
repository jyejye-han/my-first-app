"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ── 게임용 교재·단원·어휘 데이터 ─────────────────────────────────────────
const GAME_BOOKS: Record<string, {
  title: string;
  lessons: { title: string; words: string[] }[];
}> = {
  "1": {
    title: "Reading Prime 1",
    lessons: [
      { title: "Unit 1  Daily Life",           words: ["routine", "morning", "breakfast", "school", "homework", "evening", "dinner", "sleep", "weekend", "holiday", "schedule", "activity", "chore", "leisure", "habit"] },
      { title: "Unit 2  Nature & Environment", words: ["forest", "river", "mountain", "ocean", "wildlife", "pollution", "recycle", "climate", "weather", "season", "plant", "animal", "natural", "resource", "energy"] },
      { title: "Unit 3  Science & Technology", words: ["experiment", "discover", "robot", "internet", "software", "data", "research", "invention", "laboratory", "scientist", "device", "network", "digital", "wireless", "artificial"] },
      { title: "Unit 4  Culture & Arts",       words: ["museum", "gallery", "painting", "sculpture", "tradition", "festival", "costume", "music", "dance", "theater", "heritage", "artist", "exhibition", "creative", "performance"] },
      { title: "Unit 5  People & Society",     words: ["community", "volunteer", "charity", "leader", "citizen", "rights", "responsibility", "diversity", "equality", "justice", "society", "government", "election", "democracy", "culture"] },
      { title: "Unit 6  Review & Assessment",  words: ["review", "summary", "evaluate", "comprehend", "analyze", "conclude", "infer", "predict", "compare", "contrast", "identify", "describe", "explain", "argue", "support"] },
    ],
  },
  "3": {
    title: "Phonics NOW 1",
    lessons: [
      { title: "Lesson 1  단모음 A/E",   words: ["cat", "hat", "bat", "mat", "rat", "bed", "red", "pet", "net", "set", "ten", "hen"] },
      { title: "Lesson 2  단모음 I/O",   words: ["big", "pig", "dig", "fig", "wig", "dog", "log", "fog", "hot", "pot", "mop", "top"] },
      { title: "Lesson 3  단모음 U",     words: ["bug", "hug", "mug", "rug", "tug", "cup", "pup", "sun", "run", "fun", "bus", "cut"] },
      { title: "Lesson 4  이중자음 bl/cl",words: ["black", "block", "blade", "blank", "bless", "clock", "clap", "clay", "climb", "clean", "close", "cloth"] },
      { title: "Lesson 5  이중자음 br/cr",words: ["bread", "break", "brick", "brown", "bring", "crown", "crab", "craft", "crash", "cream", "cross", "crow"] },
      { title: "Lesson 6  복합 패턴",     words: ["train", "trail", "brain", "grain", "paint", "street", "green", "sleep", "sweet", "three", "throw", "thread"] },
    ],
  },
  "5": {
    title: "부스터 보카",
    lessons: [
      { title: "Day 1  일상·생활 어휘",     words: ["purchase", "delivery", "receipt", "refund", "exchange", "discount", "grocery", "laundry", "appliance", "furniture", "renovation", "maintenance", "utility", "subscription", "budget"] },
      { title: "Day 2  학문·학습 어휘",     words: ["hypothesis", "variable", "experiment", "analyze", "conclude", "argument", "evidence", "thesis", "bibliography", "abstract", "methodology", "criteria", "evaluate", "interpret", "validate"] },
      { title: "Day 3  사회·경제 어휘",     words: ["inflation", "recession", "revenue", "expenditure", "investment", "dividend", "mortgage", "insurance", "corporation", "enterprise", "compete", "monopoly", "regulation", "sanction", "welfare"] },
      { title: "Day 4  자연·환경 어휘",     words: ["biodiversity", "extinction", "habitat", "ecosystem", "sustainable", "deforestation", "emission", "renewable", "conservation", "contamination", "drought", "erosion", "irrigation", "vegetation", "atmosphere"] },
      { title: "Day 5  수능 빈출 고급 어휘", words: ["ambiguous", "scrutinize", "eloquent", "inevitable", "perspective", "paradigm", "inherent", "profound", "contradictory", "alleviate", "deteriorate", "reinforce", "substantiate", "pervasive", "nuance"] },
    ],
  },
  default: {
    title: "",
    lessons: [
      { title: "Lesson 1  Where Are You From?",         words: ["where", "from", "country", "born", "live", "speak", "hello", "meet", "nice", "friend", "name", "city", "town", "place", "visit", "stay", "welcome", "introduce"] },
      { title: "Lesson 2  Whose Phone Is This?",        words: ["whose", "phone", "mine", "yours", "belong", "owner", "lost", "found", "borrow", "return", "keep", "give"] },
      { title: "Lesson 3  My Favorite Subject Is Math", words: ["favorite", "subject", "math", "science", "history", "art", "music", "enjoy", "study", "class", "test"] },
      { title: "Lesson 4  What Time Do You Go Home?",   words: ["time", "hour", "minute", "morning", "afternoon", "evening", "early", "late", "schedule", "leave", "arrive", "finish"] },
      { title: "Lesson 5  I'd Like a Steak",            words: ["steak", "order", "menu", "restaurant", "waiter", "delicious", "spicy", "recommend", "serve", "taste", "beverage", "dessert", "bill"] },
      { title: "Lesson 6  What's in the Kitchen?",      words: ["kitchen", "bathroom", "room", "tent", "may", "move around", "there is", "dream", "night", "star", "family", "stove", "mirror"] },
      { title: "Lesson 7  I Went on a Trip",            words: ["trip", "travel", "abroad", "passport", "luggage", "hotel", "ticket", "souvenir", "adventure", "flight", "tour", "explore", "journey", "destination", "guide"] },
      { title: "Lesson 8  What Does He Look Like?",     words: ["tall", "short", "thin", "heavy", "curly", "straight", "blond", "dark", "handsome", "pretty", "glasses", "beard", "appearance", "describe"] },
      { title: "Lesson 9  I Ride a Bike",               words: ["bike", "ride", "helmet", "park", "exercise", "healthy", "fitness", "sport", "activity", "outdoor", "trail", "path", "pedal", "wheel"] },
      { title: "Lesson 10 What's Wrong?",               words: ["wrong", "sick", "cold", "fever", "headache", "stomachache", "medicine", "doctor", "hospital", "rest", "better", "pain"] },
    ],
  },
};

const TOPIC_LESSONS = [
  { title: "주제 1  음식 & 요리",  words: ["apple", "banana", "bread", "butter", "cheese", "chicken", "coffee", "cookie", "egg", "flour", "fruit", "garlic", "honey", "juice", "lemon"] },
  { title: "주제 2  여행 & 장소",  words: ["airport", "beach", "bridge", "castle", "church", "city", "desert", "forest", "harbor", "hotel", "island", "jungle", "lake", "market", "mountain"] },
  { title: "주제 3  스포츠 & 건강", words: ["athlete", "coach", "compete", "exercise", "fitness", "game", "goal", "gym", "health", "league", "medal", "practice", "race", "score", "team"] },
  { title: "주제 4  직업 & 사회",  words: ["artist", "banker", "builder", "chef", "doctor", "driver", "engineer", "farmer", "judge", "lawyer", "nurse", "pilot", "police", "soldier", "teacher"] },
];

// ── 퀵 책 목록 (다시 선택 드롭다운용) ────────────────────────────────────
const QUICK_BOOKS = [
  { id: "1",  title: "Reading Prime 1" },
  { id: "3",  title: "Phonics NOW 1" },
  { id: "5",  title: "부스터 보카" },
  { id: "10", title: "Booster 유형독해" },
  { id: "12", title: "Benchmark Reading Starter 1" },
  { id: "15", title: "Write NOW 1" },
];

// ── 메인 컴포넌트 (useSearchParams 사용) ─────────────────────────────────
function ClassGameContent() {
  const params = useSearchParams();
  const initialBookId = params.get("bookId") ?? "default";
  const gameId = params.get("game") ?? "matching-block";
  const GAME_NAMES: Record<string, string> = {
    "matching-block": "Matching Block Game",
    "build-word": "Build The Word",
    "word-typing": "Word Typing Game",
    "infinite-stairs": "Infinite Stairs Game",
    "bombing": "Bombing Game",
    "word-search": "Word Search",
    "speed-game": "Speed Game",
    "spell-it": "Spell it",
    "matching-game": "Matching Game",
  };
  const gameName = GAME_NAMES[gameId] ?? "Class Game";

  const [tab, setTab] = useState<"essential" | "topic">("essential");
  const [bookId, setBookId] = useState(initialBookId);
  const [showBookSelect, setShowBookSelect] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const bookData = GAME_BOOKS[bookId] ?? GAME_BOOKS["default"];
  const lessons = tab === "essential" ? bookData.lessons : TOPIC_LESSONS;
  const selectedWords = selectedLesson !== null ? lessons[selectedLesson]?.words ?? [] : [];
  const totalWords = selectedLesson !== null ? selectedWords.length : 0;

  return (
    <div className="min-h-screen" style={{ background: "#f0efff" }}>

      {/* ── 상단 헤더 ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900 tracking-tight">클래스</span>
          <span className="text-2xl font-black text-amber-400 tracking-tight">게임</span>
          <span className="ml-1 px-2.5 py-0.5 bg-orange-400 text-white text-xs font-black rounded-full">영어</span>
        </div>
        {/* 게임명 + 홈 */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-black" style={{ color: "#4338ca", textShadow: "1px 1px 0 #a5b4fc, -1px -1px 0 #a5b4fc" }}>
            {gameName}
          </span>
          <Link href={`/edutech/class-game?bookId=${bookId}`}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors shadow"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── 탭 바 ── */}
      <div className="px-6 pt-4 pb-1 flex gap-2">
        <button
          onClick={() => { setTab("essential"); setSelectedLesson(null); }}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black transition-all"
          style={tab === "essential"
            ? { background: "#3730a3", color: "#fff" }
            : { background: "#c7d2fe", color: "#4338ca" }
          }
        >
          <span className="w-5 h-5 bg-red-500 text-white rounded text-[10px] font-black flex items-center justify-center shrink-0">A</span>
          필수 단어
        </button>
        <button
          onClick={() => { setTab("topic"); setSelectedLesson(null); }}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black transition-all"
          style={tab === "topic"
            ? { background: "#3730a3", color: "#fff" }
            : { background: "#c7d2fe", color: "#4338ca" }
          }
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          주제별 단어
        </button>
      </div>

      {/* ── 콘텐츠 영역 ── */}
      <div className="px-6 py-4 space-y-4 pb-28">

        {/* ── Step 1: 선택된 교재 (필수 단어 탭만) ── */}
        {tab === "essential" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-4 flex items-center gap-4">
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
              style={{ background: "#4338ca" }}>1</span>
            <span className="flex-1 font-semibold text-slate-700 text-base">
              {bookData.title || "교재를 선택하세요"}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowBookSelect(v => !v)}
                className="px-5 py-2 rounded-xl border-2 border-slate-300 bg-white text-slate-600 text-sm font-bold hover:border-indigo-400 hover:text-indigo-600 transition-all"
              >
                다시 선택
              </button>
              {/* 드롭다운 */}
              {showBookSelect && (
                <div className="absolute right-0 top-12 z-30 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
                  <div className="px-4 py-2.5 bg-indigo-50 border-b border-indigo-100">
                    <p className="text-xs font-black text-indigo-700">교재 선택</p>
                  </div>
                  <ul>
                    {QUICK_BOOKS.map(b => (
                      <li key={b.id}>
                        <button
                          onClick={() => { setBookId(b.id); setSelectedLesson(null); setShowBookSelect(false); }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-indigo-50 transition-colors flex items-center justify-between ${bookId === b.id ? "font-bold text-indigo-700 bg-indigo-50" : "text-slate-700"}`}
                        >
                          {b.title}
                          {bookId === b.id && (
                            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Step 2: 단원 선택 ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
              style={{ background: "#4338ca" }}>{tab === "essential" ? 2 : 1}</span>
            <span className="font-black text-slate-800 text-base">단원 선택</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 왼쪽: 단원 목록 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: "#eef0fb" }}>
                <svg className="w-4 h-4" fill="none" stroke="#4338ca" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-black" style={{ color: "#4338ca" }}>학습 단원 선택</span>
              </div>
              <ul className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {lessons.map((lesson, i) => {
                  const isSelected = selectedLesson === i;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => setSelectedLesson(isSelected ? null : i)}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
                      >
                        {/* 체크박스 */}
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? "bg-green-500 border-green-500" : "border-slate-300"}`}>
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className={`flex-1 text-sm leading-snug ${isSelected ? "font-black text-green-700" : "text-slate-600"}`}>
                          {lesson.title}
                        </span>
                        <span className={`text-xs font-bold shrink-0 ${isSelected ? "text-green-600" : "text-orange-500"}`}>
                          {lesson.words.length}단어
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 오른쪽: 단어 목록 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: "#eef0fb" }}>
                <svg className="w-4 h-4" fill="none" stroke="#4338ca" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10" />
                </svg>
                <span className="text-sm font-black" style={{ color: "#4338ca" }}>단어 목록</span>
                {totalWords > 0 && (
                  <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-black text-white" style={{ background: "#4338ca" }}>
                    {totalWords}단어
                  </span>
                )}
              </div>
              <div className="p-4 min-h-[240px]">
                {selectedLesson === null ? (
                  <p className="text-xs text-slate-400 text-center mt-10">왼쪽에서 단원을 선택하면<br />단어 목록이 표시됩니다.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedWords.map((word, i) => (
                      <span key={i}
                        className="px-3 py-1.5 bg-white border-2 border-slate-200 rounded-full text-sm text-slate-700 font-medium hover:border-indigo-300 hover:text-indigo-700 transition-colors cursor-default"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                )}
                {selectedLesson !== null && totalWords < 5 && (
                  <p className="mt-4 text-xs font-semibold" style={{ color: "#4338ca" }}>
                    게임 최소 단어 수는 5단어입니다. 5단어 미만일 경우 Lesson을 추가 선택해 주세요.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── 하단 다음 버튼 ── */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-3 bg-gradient-to-t from-[#f0efff] to-transparent">
        <button
          disabled={selectedLesson === null || totalWords < 5}
          className="w-full py-4 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg"
          style={selectedLesson !== null && totalWords >= 5
            ? { background: "#0d9488" }
            : { background: "#94a3b8", cursor: "not-allowed" }
          }
        >
          다음
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default function ClassGamePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">로딩 중...</div>}>
      <ClassGameContent />
    </Suspense>
  );
}
