"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useMyClassBooks } from "../lib/useMyClassBooks";
import { useMyMaterials, type SavedMaterial } from "../lib/useMyMaterials";

const LESSON_MATERIALS = [
  { id: "vocab",     label: "어휘리스트",  icon: "📝", type: "PDF",  color: "text-rose-500",   border: "border-rose-200",   bg: "bg-rose-50"   },
  { id: "ppt",       label: "강의용 PPT",  icon: "📊", type: "PPT",  color: "text-orange-500", border: "border-orange-200", bg: "bg-orange-50" },
  { id: "worksheet", label: "워크시트",    icon: "📋", type: "PDF",  color: "text-green-600",  border: "border-green-200",  bg: "bg-green-50"  },
  { id: "text",      label: "본문파일",    icon: "📄", type: "PDF",  color: "text-blue-600",   border: "border-blue-200",   bg: "bg-blue-50"   },
  { id: "audio",     label: "듣기파일",    icon: "🎧", type: "MP3",  color: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50" },
];

type TocItem = { title: string; subItems: { label: string; pages: string }[] };
type BookEntry = {
  id: string; title: string; author: string;
  levelGroup: string; category: string; emoji: string;
  image?: string; publishDate: string; toc: TocItem[];
};

function gt(titles: string[]): TocItem[] {
  return titles.map((title, i) => ({
    title,
    subItems: [
      { label: "[1~2차시] 개념 학습 및 연습", pages: `pp. ${i * 12 + 1}~${i * 12 + 10}` },
      { label: "[3차시] 정리 및 평가",         pages: `pp. ${i * 12 + 11}~${i * 12 + 12}` },
    ],
  }));
}

const BOOK_CATALOG: Record<string, BookEntry> = {
  "1": {
    id: "1", title: "Reading Prime 1", author: "YBM 편집부",
    levelGroup: "중등", category: "독해", emoji: "📘",
    image: "/images/books/reading-prime-1.jpg", publishDate: "2025.03",
    toc: [
      { title: "Unit 1 - Daily Life",            subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 8~13" },  { label: "[3차시] Writing & Review", pages: "pp. 14~15" }] },
      { title: "Unit 2 - Nature & Environment",  subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 16~21" }, { label: "[3차시] Writing & Review", pages: "pp. 22~23" }] },
      { title: "Unit 3 - Science & Technology",  subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 24~29" }, { label: "[3차시] Writing & Review", pages: "pp. 30~31" }] },
      { title: "Unit 4 - Culture & Arts",        subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 32~37" }, { label: "[3차시] Writing & Review", pages: "pp. 38~39" }] },
      { title: "Unit 5 - People & Society",      subItems: [{ label: "[1~2차시] Reading Comprehension", pages: "pp. 40~45" }, { label: "[3차시] Writing & Review", pages: "pp. 46~47" }] },
      { title: "Unit 6 - Review & Assessment",   subItems: [{ label: "[1~2차시] 종합 독해 연습",         pages: "pp. 48~53" }, { label: "[3차시] 최종 평가",          pages: "pp. 54~55" }] },
    ],
  },
  "2": {
    id: "2", title: "알리GO 올리GO 서술형 쓰기 2", author: "YBM 편집부",
    levelGroup: "중등", category: "쓰기", emoji: "📗",
    image: "/images/books/aligo-oligo.jpg", publishDate: "2025.01",
    toc: gt(["Chapter 1 - 문장 기초", "Chapter 2 - 서술형 표현", "Chapter 3 - 단락 쓰기", "Chapter 4 - 실전 내신 대비"]),
  },
  "3": {
    id: "3", title: "Phonics NOW 1", author: "이재홍 외",
    levelGroup: "초등", category: "파닉스", emoji: "📙",
    image: "/images/books/phonics-now-1.jpg", publishDate: "2024.09",
    toc: [
      { title: "1장 - 단모음",     subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 6~11" },  { label: "[3차시] 실전 문제풀이", pages: "pp. 12~13" }] },
      { title: "2장 - 장모음",     subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 14~19" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 20~21" }] },
      { title: "3장 - 이중자음",   subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 22~27" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 28~29" }] },
      { title: "4장 - 이중모음",   subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 30~35" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 36~37" }] },
      { title: "5장 - Silent e",  subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 38~43" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 44~45" }] },
      { title: "6장 - 복합 패턴",  subItems: [{ label: "[1~2차시] 개념 학습 ~ 기초 연습", pages: "pp. 46~51" }, { label: "[3차시] 실전 문제풀이", pages: "pp. 52~53" }] },
    ],
  },
  "4": {
    id: "4", title: "연타 문법+쓰기 Level 1", author: "YBM 편집부",
    levelGroup: "중등", category: "문법", emoji: "📕",
    image: "/images/books/image-yeontar-grammar.jpg", publishDate: "2025.02",
    toc: gt(["Point 1 - 명사·대명사", "Point 2 - 동사의 시제", "Point 3 - 조동사", "Point 4 - 형용사·부사", "Point 5 - 전치사·접속사"]),
  },
  "5": {
    id: "5", title: "부스터 보카", author: "YBM 편집부",
    levelGroup: "고등", category: "어휘", emoji: "📓",
    image: "/images/books/booster-voca.jpg", publishDate: "2024.06",
    toc: gt(["Day 1 - 일상·생활 어휘", "Day 2 - 학문·학습 어휘", "Day 3 - 사회·경제 어휘", "Day 4 - 자연·환경 어휘", "Day 5 - 수능 빈출 고급 어휘"]),
  },
  "6": {
    id: "6", title: "Reading Prime 2", author: "YBM 편집부",
    levelGroup: "중등", category: "독해", emoji: "📔",
    image: "/images/books/reading-prime-2.jpg", publishDate: "2024.11",
    toc: gt(["Unit 1 - Social Issues", "Unit 2 - Science & Health", "Unit 3 - History & Culture", "Unit 4 - Environment", "Unit 5 - Technology", "Unit 6 - Final Review"]),
  },
  "7": {
    id: "7", title: "Business English Master", author: "John Kim",
    levelGroup: "성인", category: "회화", emoji: "📒", publishDate: "2025.04",
    toc: gt(["Chapter 1 - 미팅 영어", "Chapter 2 - 이메일 작성", "Chapter 3 - 프레젠테이션", "Chapter 4 - 협상 표현"]),
  },
  "8": {
    id: "8", title: "개념 연산 SOS 중등 수학 3·1", author: "YBM 편집부",
    levelGroup: "중등", category: "수학", emoji: "📃",
    image: "/images/books/gaenyeom-sos.jpg", publishDate: "2025.05",
    toc: gt(["I. 실수와 그 계산", "II. 다항식의 곱셈", "III. 이차방정식", "IV. 이차함수"]),
  },
  "9": {
    id: "9", title: "중학 영어 완성 1", author: "서연희 외",
    levelGroup: "중등", category: "종합", emoji: "📑", publishDate: "2024.08",
    toc: gt(["Unit 1 - 문법 기초", "Unit 2 - 독해 훈련", "Unit 3 - 듣기 연습", "Unit 4 - 어휘 확장", "Unit 5 - 종합 평가"]),
  },
  "10": {
    id: "10", title: "Booster 유형독해", author: "YBM 편집부",
    levelGroup: "고등", category: "독해", emoji: "📰",
    image: "/images/books/booster-reading.jpg", publishDate: "2025.02",
    toc: gt(["Part 1 - 주제·제목 유형", "Part 2 - 빈칸 추론 유형", "Part 3 - 순서·삽입 유형", "Part 4 - 장문 독해", "Part 5 - 실전 모의고사"]),
  },
  "11": {
    id: "11", title: "빈출구문 상승", author: "YBM 편집부",
    levelGroup: "고등", category: "구문", emoji: "📄",
    image: "/images/books/binchul-gumun.jpg", publishDate: "2024.12",
    toc: gt(["Chapter 1 - 명사구·명사절", "Chapter 2 - 관계사", "Chapter 3 - 분사구문", "Chapter 4 - 비교·강조 구문", "Chapter 5 - 실전 적용"]),
  },
  "12": {
    id: "12", title: "Benchmark Reading Starter 1", author: "YBM 편집부",
    levelGroup: "초등", category: "독해", emoji: "📗",
    image: "/images/books/benchmark-reading-starter-1.jpg", publishDate: "2024.03",
    toc: gt(["Unit 1 - Animals", "Unit 2 - My Body", "Unit 3 - Colors & Shapes", "Unit 4 - Food & Health"]),
  },
  "13": {
    id: "13", title: "Benchmark Reading Starter 3", author: "YBM 편집부",
    levelGroup: "초등", category: "독해", emoji: "📘",
    image: "/images/books/benchmark-reading-starter-3.jpg", publishDate: "2024.03",
    toc: gt(["Unit 1 - Nature", "Unit 2 - Science", "Unit 3 - Community", "Unit 4 - World Cultures"]),
  },
  "14": {
    id: "14", title: "Booster 구문독해", author: "YBM 편집부",
    levelGroup: "고등", category: "구문", emoji: "📒",
    image: "/images/books/booster-grammar.jpg", publishDate: "2025.01",
    toc: gt(["Part 1 - 핵심 구문 1~20", "Part 2 - 핵심 구문 21~42", "Part 3 - 핵심 구문 43~63", "Part 4 - 실전 TEST"]),
  },
  "15": {
    id: "15", title: "Write NOW 1", author: "YBM 편집부",
    levelGroup: "초등", category: "쓰기", emoji: "✏️",
    image: "/images/books/write-now-1.jpg", publishDate: "2025.03",
    toc: gt(["Unit 1 - Letters & Words", "Unit 2 - Simple Sentences", "Unit 3 - Describing", "Unit 4 - Short Paragraphs"]),
  },
  "16": {
    id: "16", title: "Listening Booster 30", author: "YBM 편집부",
    levelGroup: "고등", category: "듣기", emoji: "🎧",
    image: "/images/books/listening-booster-30.jpg", publishDate: "2025.02",
    toc: gt(["Part 1 - 목적·주제 유형", "Part 2 - 내용 일치 유형", "Part 3 - 그림·도표 유형", "Part 4 - 실전 모의고사 1~10", "Part 5 - 실전 모의고사 11~30"]),
  },
};

const TOOLS = [
  {
    label: "커넥팅북",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    href: "__connecting__",
    color: "text-indigo-600",
    border: "border-indigo-200",
    bg: "hover:bg-indigo-50",
  },
  {
    label: "어휘출제 마법사",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    href: "/edutech/vocab-wizard",
    color: "text-pink-600",
    border: "border-pink-200",
    bg: "hover:bg-pink-50",
  },
  {
    label: "클래스 게임",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    href: "__class-game__",
    color: "text-orange-500",
    border: "border-orange-200",
    bg: "hover:bg-orange-50",
  },
  {
    label: "온라인 콘텐츠",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: "__online__",
    color: "text-cyan-600",
    border: "border-cyan-200",
    bg: "hover:bg-cyan-50",
  },
  {
    label: "AI 자료생성",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    href: "__ai-material__",
    color: "text-violet-600",
    border: "border-violet-200",
    bg: "hover:bg-violet-50",
  },
];

// ── 공통자료 파일 목록 ────────────────────────────────────────────────────
const COMMON_FILE_ITEMS = [
  { id: "01", name: "Answer Keys",               type: "PDF", category: "평가용" },
  { id: "02", name: "MP3",                        type: "mp3", category: "수업용" },
  { id: "03", name: "Teachers' Guides",           type: "PDF", category: "수업용" },
  { id: "04", name: "PPT",                        type: "PPT", category: "수업용" },
  { id: "05", name: "Word List & Word Check",     type: "PDF", category: "수업용" },
  { id: "06", name: "Translation Worksheets",     type: "PDF", category: "수업용" },
  { id: "07", name: "Dictation Worksheets",       type: "PDF", category: "수업용" },
  { id: "08", name: "Unscramble Worksheets",      type: "PDF", category: "수업용" },
  { id: "09", name: "Build Language Worksheets",  type: "PDF", category: "수업용" },
  { id: "10", name: "Test Sheets",                type: "PDF", category: "평가용" },
];

const FILE_TYPE_STYLE: Record<string, { bg: string; label: string }> = {
  PDF: { bg: "bg-red-500",    label: "PDF" },
  mp3: { bg: "bg-blue-500",   label: "mp3" },
  PPT: { bg: "bg-orange-500", label: "PPT" },
  HWP: { bg: "bg-green-600",  label: "HWP" },
  ZIP: { bg: "bg-amber-500",  label: "ZIP" },
};

function bookCode(title: string) {
  return title.split(/\s+/).map(w => w[0]?.toUpperCase() ?? "").join("").slice(0, 3);
}

const MAT_TYPE: Record<string, { label: string; icon: string; color: string; bg: string; border: string }> = {
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

function BookMaterialCard({ mat, onDelete }: { mat: SavedMaterial; onDelete: (id: string) => void }) {
  const tc = MAT_TYPE[mat.typeId] ?? { label: mat.typeLabel, icon: "📄", color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" };
  const title = [mat.schoolLevel, mat.grade, mat.typeLabel, mat.topic ? `· ${mat.topic}` : ""].filter(Boolean).join(" ");
  return (
    <div className={`bg-white rounded-xl border ${tc.border} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
      <div className={`${tc.bg} px-3 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-1.5">
          <span className="text-base">{tc.icon}</span>
          <span className={`text-xs font-black ${tc.color}`}>{tc.label}</span>
        </div>
        <span className="text-[10px] text-slate-400">{formatDate(mat.createdAt)}</span>
      </div>
      <div className="px-3 py-2">
        <p className="text-sm font-bold text-slate-800 leading-snug truncate">{title}</p>
        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
          {mat.studentLevel && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              mat.studentLevel === "기초" ? "bg-green-100 text-green-700" :
              mat.studentLevel === "중급" ? "bg-blue-100 text-blue-700" :
              "bg-purple-100 text-purple-700"
            }`}>{mat.studentLevel}</span>
          )}
          {mat.topic && <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full truncate max-w-[120px]">{mat.topic}</span>}
        </div>
      </div>
      <div className="px-3 pb-3 flex gap-2">
        <Link
          href={`/edutech/ai-material?typeId=${mat.typeId}&schoolLevel=${encodeURIComponent(mat.schoolLevel)}&grade=${encodeURIComponent(mat.grade)}&studentLevel=${encodeURIComponent(mat.studentLevel)}&topic=${encodeURIComponent(mat.topic)}&count=${mat.count}`}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold border-2 ${tc.border} ${tc.color} ${tc.bg} hover:opacity-80 transition-all`}
        >
          다시 보기
        </Link>
        <button
          onClick={() => onDelete(mat.id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function MyClassClient() {
  const { ids: myBookIds, removeBook } = useMyClassBooks();
  const { materials, remove: removeMaterial } = useMyMaterials();
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (myBookIds.length > 0 && (!selectedId || !myBookIds.includes(selectedId))) {
      setSelectedId(myBookIds[0]);
    }
    if (myBookIds.length === 0) setSelectedId("");
  }, [myBookIds]);

  const book = BOOK_CATALOG[selectedId];

  // 수업안 만들기 팝업
  const [lessonPreviewPopup, setLessonPreviewPopup] = useState(false);

  // 자료 다운로드 모드 + 장바구니
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [downloadMode, setDownloadMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<"전체"|"평가용"|"수업용">("전체");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [commonExpanded, setCommonExpanded] = useState(true);
  const [cartBounce, setCartBounce] = useState(false);
  const triggerCartBounce = () => {
    setCartBounce(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setCartBounce(true)));
    setTimeout(() => setCartBounce(false), 500);
  };
  const toggleFile = (id: string) =>
    setSelectedFiles(prev => {
      const adding = !prev.includes(id);
      if (adding) triggerCartBounce();
      return adding ? [...prev, id] : prev.filter(f => f !== id);
    });
  const [scrapItems, setScrapItems] = useState<{ id: string; name: string; type: string }[]>([]);
  const scrapRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState(false);
  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 2500); };
  const [scrapToast, setScrapToast] = useState(false);
  const showScrapToast = () => { setScrapToast(true); setTimeout(() => setScrapToast(false), 2500); };

  // 온라인 콘텐츠 팝업
  const [onlinePopup, setOnlinePopup] = useState(false);
  const [onlineContentModal, setOnlineContentModal] = useState(false);
  const [onlineModalSelected, setOnlineModalSelected] = useState<string[]>([]);

  // 학급관리 팝업
  const [classManagePopup, setClassManagePopup] = useState(false);

  // 메시지 보내기 팝업
  const [messagePopup, setMessagePopup] = useState(false);

  // 온라인 워크시트 팝업
  const [worksheetPopup, setWorksheetPopup] = useState(false);

  // 자료 보기 팝업 (레슨별)
  const [viewPopup, setViewPopup] = useState<{ index: number; title: string } | null>(null);

  // 목차 펼침 상태 (첫 번째 레슨 기본 오픈)
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set([0]));
  const toggleLesson = (i: number) => {
    setExpandedLessons(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  // 자료 다운로드 팝오버 ref + 외부 클릭 닫기
  const downloadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!downloadMode) return;
    const handler = (e: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setDownloadMode(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [downloadMode]);

  // 자료 다운로드 계산 (모든 state 선언 이후)
  const dlCode = book ? bookCode(book.title) : "";
  const dlUnitFiles = book ? book.toc.map((_, i) => ({
    id: `unit-${i}`, name: `Unit ${i + 1}_Teaching Materials`, type: "ZIP", category: "수업용",
  })) : [];
  const dlAllFiles = [...COMMON_FILE_ITEMS, ...dlUnitFiles];
  const dlFiltered = dlAllFiles.filter(f =>
    (categoryFilter === "전체" || f.category === categoryFilter) &&
    (typeFilter === "전체" || f.type === typeFilter)
  );
  const dlLeft  = dlFiltered.filter((_, i) => i % 2 === 0);
  const dlRight = dlFiltered.filter((_, i) => i % 2 === 1);
  const dlAllIds = dlFiltered.map(f => f.id);
  const dlAllChecked = dlAllIds.length > 0 && dlAllIds.every(id => selectedFiles.includes(id));

  return (
    <>
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">

      {/* ── 왼쪽 사이드바 ── */}
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-[calc(100vh-64px)] overflow-y-auto">
        {/* 헤더 */}
        <div className="px-6 pt-7 pb-5">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-2xl">🐾</span>
            <h2 className="font-black text-slate-800 text-lg">마이클래스</h2>
          </div>

          {/* 교재 목록 */}
          {myBookIds.length === 0 ? (
            <p className="text-xs text-slate-400 leading-relaxed">
              담은 교재가 없습니다.<br />
              <Link href="/textbooks" className="text-blue-500 hover:underline">교재 페이지</Link>에서 추가하세요.
            </p>
          ) : (
            <ul className="space-y-1">
              {myBookIds.map((id) => {
                const b = BOOK_CATALOG[id];
                if (!b) return null;
                return (
                  <li key={id} className="flex items-center gap-1 group/item">
                    <button
                      onClick={() => setSelectedId(id)}
                      className={`flex-1 min-w-0 text-left flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all text-sm ${
                        selectedId === id
                          ? "text-blue-700 font-semibold"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        selectedId === id ? "bg-blue-600" : "bg-slate-300"
                      }`} />
                      <span className="truncate">{b.title}</span>
                    </button>
                    <button
                      onClick={() => removeBook(id)}
                      className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-red-400 transition-all opacity-0 group-hover/item:opacity-100 text-xs"
                      title="마이클래스에서 제거"
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* 교재 추가하기 */}
          <Link
            href="/textbooks"
            className="mt-6 flex items-center justify-center gap-1.5 w-full py-3 bg-slate-900 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            교재 추가하기
          </Link>
        </div>

        {/* ── 자료 장바구니 ── */}
        <div className="mt-auto border-t border-slate-200">
          <style>{`
            @keyframes cartPop { 0%{transform:scale(1)} 40%{transform:scale(1.55)} 70%{transform:scale(0.9)} 100%{transform:scale(1)} }
            @keyframes cartGlow { 0%,100%{box-shadow:none} 40%{box-shadow:0 0 0 6px rgba(255,255,255,0.35)} }
            .cart-badge-pop { animation: cartPop 0.45s cubic-bezier(.36,.07,.19,.97) forwards; }
            .cart-widget-glow { animation: cartGlow 0.45s ease-out forwards; }
          `}</style>
          <div
            className={`mx-4 my-4 rounded-2xl overflow-hidden shadow-md ${cartBounce ? "cart-widget-glow" : ""}`}
            style={{ background: "#e8453c" }}
          >
            <div className="px-4 pt-4 pb-3 text-center">
              <p className="text-white text-xs font-semibold leading-tight">내가<br/>선택한 자료</p>
              <div
                key={selectedFiles.length}
                className={`mt-2 w-10 h-10 rounded-full bg-slate-900 text-white font-black text-lg flex items-center justify-center mx-auto ${cartBounce ? "cart-badge-pop" : ""}`}
              >
                {selectedFiles.length}
              </div>
              <p className="text-white text-xs font-bold mt-1">건</p>
            </div>
            {/* 온라인 콘텐츠 만들기 */}
            <div className="px-3 pb-2">
              <button
                onClick={() => { setOnlineContentModal(true); setOnlineModalSelected([]); }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all border border-white/30">
                <span className="w-4 h-4 rounded-full bg-green-400 text-white text-[10px] font-black flex items-center justify-center shrink-0">S</span>
                온라인 콘텐츠 만들기
              </button>
            </div>
            {/* 다운로드 / 스크랩 */}
            <div className="flex border-t border-white/20">
              <button
                onClick={showToast}
                className="flex-1 flex flex-col items-center gap-1 py-3 hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-white text-[10px] font-bold">다운로드</span>
              </button>
              <div className="w-px bg-white/20" />
              <button
                onClick={() => {
                  const allFiles = [...COMMON_FILE_ITEMS, ...(book?.toc ?? []).map((_, i) => ({
                    id: `unit-${i}`, name: `Unit ${i + 1}_Teaching Materials`, type: "ZIP", category: "수업용",
                  }))];
                  const toAdd = allFiles.filter(f => selectedFiles.includes(f.id));
                  setScrapItems(prev => {
                    const existIds = new Set(prev.map(s => s.id));
                    return [...prev, ...toAdd.filter(f => !existIds.has(f.id))];
                  });
                  setSelectedFiles([]);
                  showScrapToast();
                  setTimeout(() => scrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
                }}
                className="flex-1 flex flex-col items-center gap-1 py-3 hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="text-white text-[10px] font-bold">스크랩</span>
              </button>
            </div>
          </div>

          {/* My Page */}
          <div className="px-5 pb-4">
            <Link
              href="/my-page"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Page
            </Link>
          </div>
        </div>
      </aside>

      {/* ── 메인 콘텐츠 ── */}
      <main className="flex-1 min-w-0 px-9 py-9 pr-56">

        {/* 페이지 타이틀 */}
        <div className="mb-7">
          <h1 className="text-3xl font-black text-slate-800">마이클래스</h1>
          <p className="text-slate-500 text-base mt-1">교재를 담으면 기능을 바로 이용할 수 있어요.</p>
        </div>

        {/* 빈 상태 */}
        {!book && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <span className="text-6xl">📚</span>
            <p className="text-lg font-bold text-slate-600">담은 교재가 없습니다</p>
            <p className="text-sm text-slate-400">교재 페이지에서 마이클래스 담기를 눌러 추가해보세요.</p>
            <Link href="/textbooks" className="mt-2 px-6 py-2.5 bg-[#1B3A6B] hover:bg-[#163060] text-white text-sm font-bold rounded-xl transition-colors">
              교재 보러 가기
            </Link>
          </div>
        )}

        {/* 교재가 있을 때만 렌더링 */}
        {book && (<>

        {/* ── 교재 카드 ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 mb-5">
          <div className="flex gap-7">

            {/* 표지 */}
            <div className="shrink-0 w-40">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-40 h-52 object-cover rounded-xl shadow-md border border-slate-100"
                />
              ) : (
                <div className="w-40 h-52 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center text-6xl shadow-md">
                  {book.emoji}
                </div>
              )}
            </div>

            {/* 정보 + 버튼 + 서비스 */}
            <div className="flex-1 min-w-0">
              {/* 교재명 + 저자 */}
              <h2 className="font-black text-slate-800 text-xl leading-tight">{book.title}</h2>
              <p className="text-base text-slate-500 mt-0.5 mb-4">{book.author}</p>

              {/* 자료 다운로드 / 내가 만든 자료 버튼 */}
              <div className="flex gap-2 mb-5 items-start">
                {/* 자료 다운로드 — 말풍선 팝오버 */}
                <div ref={downloadRef} className="relative">
                  <button
                    onClick={() => setDownloadMode(v => { if (!v) setSelectedFiles([]); return !v; })}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md ${downloadMode ? "bg-teal-600 text-white" : "bg-teal-500 hover:bg-teal-600 text-white"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    자료 다운로드
                    <svg className={`w-3 h-3 transition-transform ${downloadMode ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* 팝오버 */}
                  {downloadMode && (
                    <div className="absolute top-full left-0 mt-2 z-50" style={{width:"880px"}}>
                      {/* 말풍선 삼각형 */}
                      <div className="w-3 h-3 bg-teal-500 rotate-45 ml-5 -mb-1.5 relative z-10" />
                      <div className="bg-white rounded-2xl border border-teal-200 shadow-2xl overflow-hidden">
                        {/* 헤더 */}
                        <div className="flex items-center justify-between px-6 py-3.5 bg-teal-500">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-teal-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span className="text-white font-bold text-base">공통자료 다운로드</span>
                          </div>
                          <button onClick={() => setDownloadMode(false)}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* 분류 필터 */}
                        <div className="flex items-center gap-3 px-6 py-3 border-b border-slate-100">
                          <span className="text-sm font-bold text-slate-600 shrink-0">분류</span>
                          {(["전체","평가용","수업용"] as const).map(c => (
                            <button key={c} onClick={() => setCategoryFilter(c)}
                              className={`px-3 py-1 rounded-full text-sm font-semibold border transition-all ${categoryFilter === c ? "bg-red-50 border-red-400 text-red-600" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                              {c}
                            </button>
                          ))}
                        </div>

                        {/* 파일 유형 필터 */}
                        <div className="flex items-center gap-3 px-6 py-3 border-b border-slate-100 flex-wrap">
                          <span className="text-sm font-bold text-slate-600 shrink-0">파일 유형</span>
                          {["전체","PDF","mp3","PPT","HWP","ZIP"].map(t => (
                            <button key={t} onClick={() => setTypeFilter(t)}
                              className={`px-3 py-1 rounded-full text-sm font-semibold border transition-all ${typeFilter === t ? "bg-red-50 border-red-400 text-red-600" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                              {t}
                            </button>
                          ))}
                        </div>

                        {/* 공통자료 섹션 */}
                        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 cursor-pointer"
                          onClick={() => setCommonExpanded(v => !v)}>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10" />
                            </svg>
                            <span className="font-bold text-slate-700">공통자료</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className={`w-5 h-5 text-orange-500 transition-transform ${commonExpanded ? "" : "rotate-180"}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </div>
                        </div>

                        {commonExpanded && (
                          <div className="px-6 py-4 max-h-[56vh] overflow-y-auto">
                            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-2">
                              <input type="checkbox" checked={dlAllChecked}
                                onChange={() => {
                                  if (dlAllChecked) {
                                    setSelectedFiles(prev => prev.filter(id => !dlAllIds.includes(id)));
                                  } else {
                                    setSelectedFiles(prev => [...new Set([...prev, ...dlAllIds])]);
                                    triggerCartBounce();
                                  }
                                }}
                                className="w-4 h-4 rounded accent-red-500 cursor-pointer" />
                              <span className="text-sm font-bold text-slate-700">전체선택</span>
                              <span className="ml-auto text-xs text-slate-400">
                                {dlAllIds.filter(id => selectedFiles.includes(id)).length} / {dlAllIds.length} 선택
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-6">
                              {[dlLeft, dlRight].map((col, ci) => (
                                <ul key={ci} className="divide-y divide-slate-100">
                                  {col.map(f => {
                                    const ts = FILE_TYPE_STYLE[f.type] ?? { bg: "bg-slate-400", label: f.type };
                                    const isChecked = selectedFiles.includes(f.id);
                                    return (
                                      <li key={f.id} className="flex items-center gap-2 py-2.5 group">
                                        <input type="checkbox" checked={isChecked} onChange={() => toggleFile(f.id)}
                                          className="w-4 h-4 rounded accent-red-500 cursor-pointer shrink-0" />
                                        <span className={`${ts.bg} text-white text-[9px] font-black px-1.5 py-0.5 rounded shrink-0`}>{ts.label}</span>
                                        <span className="flex-1 text-sm text-slate-700 truncate">
                                          <span className="text-slate-400 mr-1">{dlCode}_</span>{f.name}
                                        </span>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                          <button className="text-slate-400 hover:text-slate-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                          </button>
                                          <button className="text-slate-400 hover:text-slate-600" onClick={showToast}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                          </button>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => document.getElementById("book-materials")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  내가 만든 자료
                </button>
              </div>

              {/* 서비스 버튼 */}
              <div className="grid grid-cols-3 gap-2.5">
                {TOOLS.map((tool) => {
                  const cls = `flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 ${tool.border} bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-150`;
                  const inner = (
                    <>
                      <span className={`shrink-0 ${tool.color}`}>{tool.icon}</span>
                      <span className={`text-xs font-bold leading-tight ${tool.color}`}>{tool.label}</span>
                    </>
                  );
                  if (tool.href === "__connecting__") {
                    return <Link key={tool.label} href={`/edutech/connecting-book/viewer?bookId=${selectedId}`} className={cls}>{inner}</Link>;
                  }
                  if (tool.href === "/edutech/vocab-wizard") {
                    return <Link key={tool.label} href={`/edutech/vocab-wizard?bookId=${selectedId}`} className={cls}>{inner}</Link>;
                  }
                  if (tool.href === "__online__") {
                    return <button key={tool.label} onClick={() => setOnlinePopup(true)} className={cls}>{inner}</button>;
                  }
                  if (tool.href === "__class-game__") {
                    return <Link key={tool.label} href={`/edutech/class-game?bookId=${selectedId}`} className={cls}>{inner}</Link>;
                  }
                  if (tool.href === "__ai-material__") {
                    return <Link key={tool.label} href={`/edutech/ai-material?bookId=${selectedId}&bookTitle=${encodeURIComponent(book.title)}`} className={cls}>{inner}</Link>;
                  }
                  return tool.href.startsWith("http") ? (
                    <a key={tool.label} href={tool.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  ) : (
                    <Link key={tool.label} href={tool.href} className={cls}>{inner}</Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── 학급학생관리 (가로 한 줄) ── */}
        <div className="rounded-2xl border border-[#1B3A6B]/20 overflow-hidden shadow-sm mb-5">
          <div className="flex items-center gap-5 px-6 py-3.5 bg-[#1B3A6B]">
            {/* 타이틀 */}
            <div className="flex items-center gap-2.5 shrink-0">
              <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white font-bold text-base">학급학생관리</span>
            </div>
            <div className="w-px h-5 bg-white/20" />
            {/* 버튼 두 개 */}
            <div className="flex gap-2.5">
              <button
                onClick={() => setClassManagePopup(true)}
                className="flex items-center gap-1.5 px-5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#1B3A6B] text-sm font-semibold rounded-lg transition-all border border-white/20 hover:border-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                학급 관리
              </button>
              <button
                onClick={() => setMessagePopup(true)}
                className="flex items-center gap-1.5 px-5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#1B3A6B] text-sm font-semibold rounded-lg transition-all border border-white/20 hover:border-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                메시지 보내기
              </button>
            </div>
          </div>
        </div>

        {/* ── 목차 ── */}
        <div className="rounded-2xl border border-[#1B3A6B]/20 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-6 py-3.5 bg-[#1B3A6B]">
            <svg className="w-5 h-5 text-blue-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h7" />
            </svg>
            <span className="text-white font-bold text-base">목차</span>
            <span className="ml-auto text-blue-300 text-sm">{book.toc.length}단원</span>
          </div>
          <ul className="divide-y divide-slate-100 bg-white">
            {book.toc.map((lesson, i) => {
              const isOpen = expandedLessons.has(i);
              return (
                <li key={i}>
                  {/* 레슨 헤더 행 */}
                  <div className={`flex items-center gap-4 px-5 py-3.5 ${isOpen ? "bg-slate-50" : "bg-white hover:bg-slate-50"} transition-colors`}>
                    {/* 번호 뱃지 */}
                    <span className="w-8 h-8 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-xs font-black shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* 레슨 제목 */}
                    <span className="flex-1 text-base font-bold text-slate-800 truncate">{lesson.title}</span>
                    {/* 액션 버튼 */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* 펼침 버튼 */}
                      <button
                        onClick={() => toggleLesson(i)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${
                          isOpen
                            ? "bg-[#1B3A6B] border-[#1B3A6B] text-white"
                            : "border-slate-200 bg-white text-slate-500 hover:border-[#1B3A6B] hover:text-[#1B3A6B]"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 하위 차시 목록 */}
                  {isOpen && (
                    <ul className="bg-slate-50/70 border-t border-slate-100">
                      {lesson.subItems.map((sub, j) => (
                        <li key={j} className="flex items-center gap-4 pl-10 pr-5 py-3 border-b border-slate-100 last:border-0 hover:bg-blue-50/40 transition-colors group">
                          {/* 왼쪽 세로선 + 들여쓰기 */}
                          <div className="w-px h-8 bg-slate-300 shrink-0 rounded-full" />
                          {/* 차시 내용 */}
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 block truncate">{sub.label}</span>
                            <span className="text-xs text-slate-400">{sub.pages}</span>
                          </div>
                          {/* 수업안 만들기 버튼 */}
                          <button
                            onClick={() => setLessonPreviewPopup(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap mr-2"
                          >
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            수업안 만들기
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── 내가 만든 자료 + 스크랩 자료 ── */}
        {(() => {
          const bookMaterials = materials.filter(m => m.bookId === selectedId);
          return (
            <div id="book-materials" className="flex gap-4 mt-5 items-stretch">

              {/* 내가 만든 자료 */}
              <div className="flex-1 rounded-2xl border border-indigo-200 overflow-hidden shadow-sm">
                <div className="flex items-center gap-2.5 px-6 py-3.5 bg-indigo-600">
                  <svg className="w-5 h-5 text-indigo-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="text-white font-bold text-base">내가 만든 자료</span>
                  <span className="ml-auto text-indigo-300 text-sm">{bookMaterials.length}개</span>
                </div>
                {bookMaterials.length === 0 ? (
                  <div className="bg-white px-6 py-8 flex flex-col items-center text-center gap-2">
                    <span className="text-4xl">📂</span>
                    <p className="text-sm font-semibold text-slate-500">이 교재로 만든 자료가 없습니다.</p>
                    <Link
                      href={`/edutech/ai-material?bookId=${selectedId}&bookTitle=${encodeURIComponent(book?.title ?? "")}`}
                      className="mt-1 flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      AI 자료 만들기
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bookMaterials.map(mat => (
                      <BookMaterialCard key={mat.id} mat={mat} onDelete={removeMaterial} />
                    ))}
                  </div>
                )}
              </div>

              {/* 스크랩 자료 */}
              <div ref={scrapRef} className="w-64 shrink-0 rounded-2xl border border-indigo-200 overflow-hidden shadow-sm flex flex-col">
                <div className="flex items-center gap-2 px-4 py-3 bg-indigo-600">
                  <svg className="w-4 h-4 text-indigo-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="text-white font-bold text-sm">스크랩 자료</span>
                  <span className="ml-auto text-indigo-300 text-xs">{scrapItems.length}개</span>
                  {scrapItems.length > 0 && (
                    <button onClick={() => setScrapItems([])}
                      className="text-indigo-200 hover:text-white text-xs font-bold transition-colors">전체삭제</button>
                  )}
                </div>
                {scrapItems.length === 0 ? (
                  <div className="bg-white px-4 py-6 text-center flex-1">
                    <span className="text-3xl">📌</span>
                    <p className="text-xs font-semibold text-slate-400 mt-2">자료를 선택하고<br/>스크랩 버튼을 눌러보세요.</p>
                  </div>
                ) : (
                  <ul className="bg-white divide-y divide-slate-100 flex-1 overflow-y-auto min-h-0">
                    {scrapItems.map(item => {
                      const ts = FILE_TYPE_STYLE[item.type] ?? { bg: "bg-slate-400", label: item.type };
                      return (
                        <li key={item.id} className="flex items-center gap-2 px-4 py-2.5 group">
                          <span className={`${ts.bg} text-white text-[9px] font-black px-1.5 py-0.5 rounded shrink-0`}>{ts.label}</span>
                          <span className="flex-1 text-xs text-slate-700 truncate">{item.name}</span>
                          <button onClick={() => setScrapItems(prev => prev.filter(s => s.id !== item.id))}
                            className="shrink-0 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

            </div>
          );
        })()}

        </> )}
      </main>
    </div>


    {/* ── 자료 다운로드 팝업 ── */}
    {downloadPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDownloadPopup(false)} />
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* 헤더 */}
          <div className="bg-[#1B3A6B] px-6 py-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-blue-200 text-xs font-medium mb-0.5">{book.title}</p>
              <h2 className="text-white font-black text-base">부가자료 다운로드</h2>
            </div>
            <button
              onClick={() => setDownloadPopup(false)}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 자료 목록 */}
          <div className="px-6 py-5">
            <p className="text-xs text-slate-400 mb-3">파일을 클릭하면 바로 다운로드됩니다.</p>
            <ul className="space-y-2">
              {LESSON_MATERIALS.map((m) => (
                <li key={m.id}>
                  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border ${m.border} ${m.bg} hover:opacity-80 transition-all group`}>
                    <span className="text-xl shrink-0">{m.icon}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-bold ${m.color}`}>{m.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{book.title} · {m.type}</p>
                    </div>
                    {/* 파일 타입 배지 */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.color} ${m.border} bg-white shrink-0`}>
                      {m.type}
                    </span>
                    {/* 다운로드 아이콘 */}
                    <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${m.color} border ${m.border} bg-white group-hover:bg-[#1B3A6B] group-hover:text-white group-hover:border-[#1B3A6B] transition-all`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* 모아받기 버튼 */}
            <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-black transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              전체 모아받기
            </button>
          </div>

        </div>
      </div>
    )}

    {/* ── 자료 보기 팝업 (레슨별) ── */}
    {viewPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewPopup(null)} />
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* 헤더 */}
          <div className="bg-[#1B3A6B] px-6 py-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-blue-200 text-xs font-medium mb-0.5">{book.title}</p>
              <h2 className="text-white font-black text-base leading-snug">
                {String(viewPopup.index + 1).padStart(2, "0")}. {viewPopup.title}
              </h2>
              {/* 레슨별자료 배지 */}
              <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                레슨별자료
              </span>
            </div>
            <button
              onClick={() => setViewPopup(null)}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors mt-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 자료 목록 */}
          <div className="px-6 py-5">
            <p className="text-xs text-slate-400 mb-3">해당 레슨의 자료를 확인하고 다운로드하세요.</p>
            <ul className="space-y-2">
              {LESSON_MATERIALS.map((m) => (
                <li key={m.id}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${m.border} ${m.bg}`}>
                    <span className="text-xl shrink-0">{m.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${m.color}`}>{m.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {String(viewPopup.index + 1).padStart(2, "0")}단원 · {m.type}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.color} ${m.border} bg-white shrink-0`}>
                      {m.type}
                    </span>
                    {/* 다운로드 버튼 */}
                    <button className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 ${m.border} bg-white ${m.color} hover:bg-[#1B3A6B] hover:text-white hover:border-[#1B3A6B] transition-all text-[10px] font-bold`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      다운로드
                    </button>
                    {/* 워크시트 전용: 온라인 워크시트 만들기 */}
                    {m.id === "worksheet" && (
                      <button
                        onClick={() => setWorksheetPopup(true)}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-2 border-emerald-400 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all text-[10px] font-bold whitespace-nowrap"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        온라인 워크시트 만들기
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setViewPopup(null)}
              className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              닫기
            </button>
          </div>

        </div>
      </div>
    )}

    {/* ── 학급관리 이미지 팝업 ── */}
    {classManagePopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setClassManagePopup(false)} />
        <div className="relative z-10 max-w-5xl w-full">
          <button
            onClick={() => setClassManagePopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/images/class-manage-preview.png"
            alt="학급 관리 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setClassManagePopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#163060] text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              학급 관리 바로가기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 메시지 보내기 이미지 팝업 ── */}
    {messagePopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMessagePopup(false)} />
        <div className="relative z-10 max-w-5xl w-full">
          <button
            onClick={() => setMessagePopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/images/message-preview.png"
            alt="메시지 보내기 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMessagePopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#163060] text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              메시지 보내기 바로가기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 온라인 워크시트 이미지 팝업 ── */}
    {worksheetPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setWorksheetPopup(false)} />
        <div className="relative z-10 max-w-4xl w-full">
          <button
            onClick={() => setWorksheetPopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/images/worksheet-preview.png"
            alt="온라인 워크시트 만들기 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWorksheetPopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              온라인 워크시트 만들기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 온라인 콘텐츠 만들기 모달 (카트 버튼) ── */}
    {onlineContentModal && book && (() => {
      const MODAL_FILES = [
        { id: "mf1", name: `${bookCode(book.title)}_교과서 PDF`,      sizeMB: 985  },
        { id: "mf2", name: `${bookCode(book.title)}_교사용 교과서 PDF`, sizeMB: 2048 },
      ];
      const totalMB = MODAL_FILES.filter(f => onlineModalSelected.includes(f.id)).reduce((s, f) => s + f.sizeMB, 0);
      const totalLabel = totalMB === 0 ? "0" : totalMB >= 1024 ? `${(totalMB/1024).toFixed(1)}GB` : `${totalMB}MB`;
      const toggleFile = (id: string) =>
        setOnlineModalSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOnlineContentModal(false)} />
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-4" style={{ background: "#e8453c" }}>
              <h2 className="text-white font-black text-lg">온라인 콘텐츠 만들기</h2>
              <button
                onClick={() => setOnlineContentModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 서브 헤더 */}
            <div className="bg-slate-100 px-6 py-5 text-center">
              <p className="font-black text-base" style={{ color: "#e8453c" }}>스마트스쿨 온라인 워크시트 만들기로 이동합니다.</p>
              <p className="text-slate-500 text-sm mt-1">제작할 파일을 선택해주세요.</p>
            </div>

            {/* 안내 */}
            <div className="flex items-start gap-2 px-6 py-4 border-b border-slate-100">
              <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-slate-500 leading-relaxed">
                온라인 워크시트는 최대 수량 <strong>5개</strong>, 최대 용량 <strong>50MB</strong>까지 제작 가능합니다.
              </p>
            </div>

            {/* 파일 목록 */}
            <ul className="divide-y divide-slate-100">
              {MODAL_FILES.map((f) => {
                const checked = onlineModalSelected.includes(f.id);
                const sizeLabel = f.sizeMB >= 1024 ? `${(f.sizeMB/1024).toFixed(0)}GB` : `${f.sizeMB}MB`;
                return (
                  <li
                    key={f.id}
                    onClick={() => toggleFile(f.id)}
                    className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                      className="w-4 h-4 rounded cursor-pointer shrink-0"
                      style={{ accentColor: "#e8453c" }}
                    />
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#e8453c" }}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
                      </svg>
                    </div>
                    <span className="flex-1 text-sm font-semibold text-slate-700 truncate">{f.name}</span>
                    <span className="text-sm text-slate-400 font-medium shrink-0">{sizeLabel}</span>
                  </li>
                );
              })}
            </ul>

            {/* 푸터 */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
              <p className="text-sm text-slate-600">
                선택 파일 <strong>{onlineModalSelected.length}개</strong>
                <span className="mx-2 text-slate-300">|</span>
                전체 용량 <strong>{totalLabel}</strong>
              </p>
              <button
                onClick={() => setOnlineContentModal(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-black transition-all"
                style={{ background: "#e8453c" }}
              >
                온라인 워크시트 만들기
              </button>
            </div>

          </div>
        </div>
      );
    })()}

    {/* ── 온라인 콘텐츠 이미지 팝업 ── */}
    {onlinePopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOnlinePopup(false)} />
        <div className="relative z-10 max-w-5xl w-full">
          {/* 닫기 버튼 */}
          <button
            onClick={() => setOnlinePopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* 이미지 */}
          <img
            src="/images/online-contents-preview.png"
            alt="온라인 콘텐츠 제작 화면"
            className="w-full rounded-2xl shadow-2xl"
          />
          {/* 하단 이동 버튼 */}
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOnlinePopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#163060] text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              YBM 스마트스쿨에서 바로 만들기
            </a>
          </div>
        </div>
      </div>
    )}

    {/* ── 수업안 만들기 팝업 2단계: 이미지 미리보기 ── */}
    {lessonPreviewPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLessonPreviewPopup(false)} />
        <div className="relative z-10 max-w-5xl w-full">
          <button
            onClick={() => setLessonPreviewPopup(false)}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src="/images/lesson-plan-preview.png" alt="수업안 만들기" className="w-full rounded-2xl shadow-2xl" />
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.ybmsmartschool.com/?sso_tag=49594ef7b1bd86898b8fb2bc4cc66b56"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setLessonPreviewPopup(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#163060] text-white font-bold rounded-xl shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              YBM 스마트스쿨에서 수업안 만들기
            </a>
          </div>
        </div>
      </div>
    )}
    {/* ── 스크랩 토스트 ── */}
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${scrapToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <div className="flex items-center gap-3 px-6 py-3.5 bg-amber-500/95 backdrop-blur text-white rounded-2xl shadow-2xl">
        <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <span className="text-sm font-semibold">스크랩되었습니다. 스크랩 자료 목록을 확인하세요.</span>
      </div>
    </div>

    {/* ── 다운로드 토스트 ── */}
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <div className="flex items-center gap-3 px-6 py-3.5 bg-slate-900/90 backdrop-blur text-white rounded-2xl shadow-2xl">
        <svg className="w-5 h-5 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="text-sm font-semibold">다운로드가 시작됩니다.</span>
      </div>
    </div>

    </>
  );
}
