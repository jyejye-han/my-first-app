"use client";
import { useState } from "react";
import Link from "next/link";
import { useMyMaterials } from "../../lib/useMyMaterials";

/* ── 자료 유형 ── */
const MATERIAL_TYPES = [
  { id: "vocab",    label: "어휘 학습지",  icon: "📝", desc: "빈칸·영작·매칭 문제" },
  { id: "reading",  label: "독해 문제",    icon: "📖", desc: "지문 + 이해 문제 세트" },
  { id: "grammar",  label: "문법 문제",    icon: "📐", desc: "문법 포인트별 연습 문제" },
  { id: "cloze",    label: "빈칸 채우기",  icon: "✏️", desc: "문맥 이해 빈칸 완성" },
  { id: "formative",label: "형성평가",     icon: "📋", desc: "단원 마무리 평가지" },
];

/* ── 레벨별 샘플 생성 데이터 ── */
const SAMPLE_VOCAB: Record<string, { words: { en: string; ko: string; ex: string }[] }> = {
  "초등-기초": { words: [
    { en: "family",    ko: "가족",   ex: "My ___ is happy." },
    { en: "school",    ko: "학교",   ex: "I go to ___ every day." },
    { en: "friend",    ko: "친구",   ex: "She is my best ___." },
    { en: "happy",     ko: "행복한", ex: "I feel ___ today." },
    { en: "beautiful", ko: "아름다운", ex: "The flower is ___." },
  ]},
  "중등-기초": { words: [
    { en: "accomplish", ko: "성취하다", ex: "She wants to ___ her goal." },
    { en: "boundary",   ko: "경계",    ex: "Don't cross the ___." },
    { en: "challenge",  ko: "도전",    ex: "It was a big ___." },
    { en: "determine",  ko: "결정하다", ex: "He will ___ the answer." },
    { en: "evidence",   ko: "증거",    ex: "Where is the ___?" },
  ]},
  "중등-중급": { words: [
    { en: "advocate",    ko: "옹호하다", ex: "They ___ for equal rights." },
    { en: "comprehensive", ko: "포괄적인", ex: "This is a ___ guide." },
    { en: "elaborate",   ko: "정교한",  ex: "She gave an ___ plan." },
    { en: "fundamental", ko: "근본적인", ex: "This is a ___ problem." },
    { en: "innovative",  ko: "혁신적인", ex: "He is an ___ thinker." },
  ]},
  "고등-중급": { words: [
    { en: "ambiguous",   ko: "모호한",   ex: "The message was ___." },
    { en: "conjecture",  ko: "추측",     ex: "That's just a ___." },
    { en: "detrimental", ko: "해로운",   ex: "Stress is ___ to health." },
    { en: "illuminate",  ko: "밝히다",   ex: "Science can ___ the truth." },
    { en: "paradox",     ko: "역설",     ex: "It's an interesting ___." },
  ]},
  "고등-고급": { words: [
    { en: "ostensible",  ko: "표면상의", ex: "The ___ reason was clear." },
    { en: "pervasive",   ko: "만연한",   ex: "Fear became ___." },
    { en: "recalcitrant",ko: "반항적인", ex: "He was a ___ student." },
    { en: "tenacious",   ko: "끈질긴",   ex: "She was ___ in her effort." },
    { en: "vicarious",   ko: "대리의",   ex: "She felt ___ joy." },
  ]},
};

const SAMPLE_GRAMMAR: Record<string, { title: string; points: { rule: string; examples: string[]; q: string }[] }> = {
  "중등-기초": { title: "현재진행형 / 과거시제", points: [
    { rule: "현재진행형: be동사 + V-ing", examples: ["She is reading a book.", "They are playing soccer."], q: "다음 문장을 현재진행형으로 바꾸세요: She reads every day." },
    { rule: "과거시제 규칙 동사: V + -ed", examples: ["He walked to school.", "They watched TV."], q: "빈칸에 알맞은 과거형을 쓰세요: I ___ (study) last night." },
  ]},
  "중등-중급": { title: "관계대명사 / 수동태", points: [
    { rule: "관계대명사 who/which/that", examples: ["The boy who won is my friend.", "The book which I read was great."], q: "두 문장을 관계대명사로 연결하세요: The girl is smart. She got first place." },
    { rule: "수동태: be + p.p.", examples: ["The cake was eaten by him.", "English is spoken worldwide."], q: "다음 능동태를 수동태로 바꾸세요: She wrote the letter." },
  ]},
  "고등-중급": { title: "가정법 / 분사구문", points: [
    { rule: "가정법 과거: If + 과거형, would + 동사원형", examples: ["If I were rich, I would travel.", "If she studied harder, she could pass."], q: "우리말에 맞게 영작하세요: 내가 너라면, 그것을 하지 않겠다." },
    { rule: "분사구문: 부사절 → 분사", examples: ["Turning left, you'll see the park.", "Having finished, she went home."], q: "다음 문장을 분사구문으로 바꾸세요: When he arrived home, he ate dinner." },
  ]},
};

const SAMPLE_READING: Record<string, { title: string; passage: string; questions: string[] }> = {
  "중등-기초": {
    title: "The Power of Reading",
    passage: `Reading is one of the most important skills you can develop. When you read regularly, you improve your vocabulary and your ability to understand complex ideas. Many successful people say that reading helped them achieve their goals.\n\nYou don't have to read long books to benefit from reading. Even reading short articles or news stories every day can make a big difference. The key is to read something that interests you so that you enjoy the process.`,
    questions: [
      "1. What does regular reading help you improve? (2가지 이상)",
      "2. According to the passage, what do successful people say about reading?",
      "3. What is the key to enjoying reading, according to the author?",
      "4. 밑줄 친 'benefit from reading'의 의미를 우리말로 쓰시오.",
    ],
  },
  "고등-중급": {
    title: "The Paradox of Choice",
    passage: `In modern society, people have more choices than ever before. From hundreds of TV channels to thousands of products on store shelves, the abundance of options seems like a blessing. However, psychologist Barry Schwartz argues that too many choices can actually lead to paralysis and dissatisfaction.\n\nWhen faced with too many options, people often struggle to make decisions. Even after choosing, they wonder whether they made the best choice, leading to regret. This phenomenon, known as the "paradox of choice," suggests that limiting options can sometimes increase happiness and satisfaction.`,
    questions: [
      "1. What is Barry Schwartz's main argument in this passage?",
      "2. What happens to people when they face too many options?",
      "3. What does 'paralysis' mean in this context? Explain in Korean.",
      "4. 본문의 내용과 일치하면 T, 일치하지 않으면 F를 쓰시오: Having more choices always makes people happier. ( )",
      "5. 필자가 '선택의 역설'이라고 부르는 현상을 우리말로 설명하시오.",
    ],
  },
};

const SAMPLE_FORMATIVE: Record<string, { title: string; items: { type: string; q: string; options?: string[]; answer?: string }[] }> = {
  "중등-기초": { title: "Unit 3 형성평가 (현재완료 · 어휘)", items: [
    { type: "객관식", q: "Which is the correct present perfect form?", options: ["She has went.", "She has gone.", "She have gone.", "She gone."], answer: "②" },
    { type: "객관식", q: "빈칸에 알맞은 단어는? 'I have ___ finished my homework.'", options: ["yet", "already", "since", "ago"], answer: "②" },
    { type: "서술형", q: "다음 단어의 뜻을 쓰고 예문을 한 가지 작성하시오: 'accomplish'" },
    { type: "서술형", q: "현재완료를 사용하여 다음 상황을 영작하시오: 나는 그 영화를 세 번 봤다." },
    { type: "서술형", q: "밑줄 친 부분을 어법에 맞게 고치시오: She have lived here for 10 years." },
  ]},
  "고등-중급": { title: "수능 대비 형성평가 (독해 유형)", items: [
    { type: "객관식", q: "다음 글의 주제로 가장 적절한 것은?", options: ["Benefits of regular exercise", "The history of modern sports", "How to prevent sports injuries", "The importance of mental health in athletes"], answer: "①" },
    { type: "객관식", q: "글의 빈칸에 들어갈 말로 가장 적절한 것은? 'The key to success is not talent but ___.'", options: ["intelligence", "persistence", "creativity", "appearance"], answer: "②" },
    { type: "서술형", q: "다음 글의 밑줄 친 부분이 가리키는 것을 본문에서 찾아 쓰시오." },
    { type: "서술형", q: "주어진 문장이 들어가기에 가장 적절한 위치를 고르고 그 이유를 설명하시오." },
  ]},
};

/* ── 컴포넌트 ── */
export default function AiMaterialPage() {
  const [matType, setMatType] = useState<string>("vocab");
  const [schoolLevel, setSchoolLevel] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [studentLevel, setStudentLevel] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [count, setCount] = useState<string>("5");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const { save: saveMaterial } = useMyMaterials();

  const canGenerate = schoolLevel && studentLevel;

  const lookupKey = `${schoolLevel}-${studentLevel}`;

  const handleGenerate = () => setGenerated(true);
  const handleReset    = () => { setGenerated(false); setCopied(false); setSaved(false); };

  const handleSave = () => {
    const typeLabel = MATERIAL_TYPES.find(t => t.id === matType)?.label ?? matType;
    saveMaterial({ typeId: matType, typeLabel, schoolLevel, grade, studentLevel, topic, count });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── 미리보기 렌더링 ── */
  const renderPreview = () => {
    if (matType === "vocab") {
      const data = SAMPLE_VOCAB[lookupKey] ?? SAMPLE_VOCAB["중등-기초"];
      const words = data.words.slice(0, Number(count));
      return (
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3 mb-4">
            <h3 className="font-black text-slate-800 text-base">어휘 학습지</h3>
            <p className="text-xs text-slate-500 mt-0.5">{schoolLevel} {grade} · {studentLevel} · {topic || "일반 어휘"}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700 mb-2">[A] 다음 단어의 뜻을 빈칸에 쓰시오.</p>
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-slate-100"><th className="border border-slate-200 px-3 py-1.5 text-left text-xs">영단어</th><th className="border border-slate-200 px-3 py-1.5 text-left text-xs">뜻 (우리말)</th></tr></thead>
              <tbody>{words.map((w, i) => (
                <tr key={i} className={i%2===0?"bg-white":"bg-slate-50/50"}>
                  <td className="border border-slate-200 px-3 py-2 font-semibold text-blue-700">{w.en}</td>
                  <td className="border border-slate-200 px-3 py-2 text-slate-400 text-xs italic">( 정답: {w.ko} )</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700 mb-2">[B] 빈칸에 알맞은 단어를 보기에서 골라 쓰시오.</p>
            <div className="flex flex-wrap gap-1.5 mb-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
              {words.map((w) => <span key={w.en} className="text-xs bg-white border border-blue-200 px-2 py-0.5 rounded font-semibold text-blue-700">{w.en}</span>)}
            </div>
            <ol className="space-y-1.5">{words.map((w, i) => (
              <li key={i} className="text-sm text-slate-700">{i+1}. {w.ex} <span className="text-slate-300 text-xs">(정답: {w.en})</span></li>
            ))}</ol>
          </div>
        </div>
      );
    }
    if (matType === "grammar") {
      const data = SAMPLE_GRAMMAR[lookupKey] ?? SAMPLE_GRAMMAR["중등-기초"];
      return (
        <div className="space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-black text-slate-800 text-base">문법 연습 문제 · {data.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{schoolLevel} {grade} · {studentLevel}</p>
          </div>
          {data.points.map((pt, i) => (
            <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs font-black text-blue-700 mb-2">📌 포인트 {i+1}: {pt.rule}</p>
              <div className="space-y-1 mb-3">
                {pt.examples.map((ex, j) => <p key={j} className="text-xs text-slate-600 pl-3 border-l-2 border-blue-300">예) {ex}</p>)}
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <p className="text-sm text-slate-700">✏️ {pt.q}</p>
                <div className="mt-2 h-7 border-b border-dashed border-slate-300" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (matType === "reading") {
      const data = SAMPLE_READING[lookupKey] ?? SAMPLE_READING["중등-기초"];
      return (
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-black text-slate-800 text-base">독해 지문 + 이해 문제</h3>
            <p className="text-xs text-slate-500 mt-0.5">{schoolLevel} {grade} · {studentLevel}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-500 mb-1">[지문]</p>
            <h4 className="font-bold text-slate-800 text-sm mb-2">{data.title}</h4>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.passage}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700 mb-2">[이해 문제]</p>
            <ol className="space-y-2.5">{data.questions.map((q, i) => (
              <li key={i} className="text-sm text-slate-700">
                {q}
                <div className="mt-1 h-6 border-b border-dashed border-slate-300" />
              </li>
            ))}</ol>
          </div>
        </div>
      );
    }
    if (matType === "cloze") {
      const passage = lookupKey.includes("고등")
        ? "Many scientists believe that climate change is one of the most (1)___ challenges of our time. Rising temperatures are (2)___ sea levels, causing floods in coastal areas. Governments around the world need to (3)___ immediate action to reduce carbon emissions."
        : "Reading is one of the best ways to (1)___ your English skills. When you read (2)___, you learn new words and improve your grammar. Try to read something (3)___ every day.";
      const answers = lookupKey.includes("고등") ? ["pressing","raising","take"] : ["improve","regularly","interesting"];
      return (
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-black text-slate-800 text-base">빈칸 채우기</h3>
            <p className="text-xs text-slate-500 mt-0.5">{schoolLevel} {grade} · {studentLevel} · {topic || "일반"}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-sm text-slate-700 leading-relaxed">{passage}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-700 mb-1">📝 정답 (교사용)</p>
            <p className="text-xs text-amber-700">{answers.map((a,i) => `(${i+1}) ${a}`).join("  /  ")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700 mb-2">보기에서 알맞은 단어를 골라 빈칸을 채우시오.</p>
            <div className="flex flex-wrap gap-1.5 p-2 bg-blue-50 rounded-lg border border-blue-100 mb-3">
              {[...answers].sort(() => Math.random() - 0.5).map((a) => (
                <span key={a} className="text-xs bg-white border border-blue-200 px-2 py-0.5 rounded font-semibold text-blue-700">{a}</span>
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (matType === "formative") {
      const data = SAMPLE_FORMATIVE[lookupKey] ?? SAMPLE_FORMATIVE["중등-기초"];
      return (
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-black text-slate-800 text-base">{data.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{schoolLevel} {grade} · {studentLevel}</p>
          </div>
          {data.items.map((item, i) => (
            <div key={i} className={`rounded-xl border p-4 ${item.type === "객관식" ? "bg-blue-50 border-blue-100" : "bg-amber-50 border-amber-100"}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.type === "객관식" ? "bg-blue-600 text-white" : "bg-amber-500 text-white"}`}>{item.type}</span>
                <span className="text-xs font-bold text-slate-500">{i+1}번</span>
                {item.answer && <span className="ml-auto text-[10px] text-slate-400">정답: {item.answer}</span>}
              </div>
              <p className="text-sm text-slate-800 font-medium">{item.q}</p>
              {item.options && (
                <ol className="mt-2 space-y-0.5">{item.options.map((opt, j) => (
                  <li key={j} className="text-xs text-slate-600">{'①②③④'[j]} {opt}</li>
                ))}</ol>
              )}
              {item.type === "서술형" && <div className="mt-2 h-10 border-b border-dashed border-slate-300" />}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/edutech" className="hover:text-blue-600">에듀테크</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">AI 자료 생성</span>
      </nav>

      {/* 헤더 */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">🤖</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black">AI 자료 생성</h1>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">BETA</span>
            </div>
            <p className="text-indigo-200 text-sm mt-0.5">조건 입력만으로 맞춤형 영어 학습 자료를 즉시 생성합니다</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">

        {/* ── 왼쪽: 설정 패널 ── */}
        <div className="space-y-5">

          {/* 자료 유형 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <p className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] flex items-center justify-center font-black">1</span>
              자료 유형
            </p>
            <div className="space-y-2">
              {MATERIAL_TYPES.map((t) => (
                <button key={t.id} onClick={() => { setMatType(t.id); setGenerated(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border-2 text-left transition-all ${
                    matType === t.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xl">{t.icon}</span>
                  <div>
                    <p className={`text-sm font-bold ${matType === t.id ? "text-indigo-700" : "text-slate-700"}`}>{t.label}</p>
                    <p className="text-[10px] text-slate-400">{t.desc}</p>
                  </div>
                  {matType === t.id && (
                    <svg className="w-4 h-4 text-indigo-500 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 학생 정보 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] flex items-center justify-center font-black">2</span>
              학생 정보
            </p>

            {/* 학교급 */}
            <div>
              <p className="text-xs text-slate-500 mb-1.5">학교급</p>
              <div className="flex gap-2">
                {["초등","중등","고등"].map((lv) => (
                  <button key={lv} onClick={() => { setSchoolLevel(lv); setGrade(""); setGenerated(false); }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                      schoolLevel === lv ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-slate-600 hover:border-indigo-300"
                    }`}>{lv}</button>
                ))}
              </div>
            </div>

            {/* 학년 */}
            {schoolLevel && (
              <div>
                <p className="text-xs text-slate-500 mb-1.5">학년</p>
                <div className="flex gap-2 flex-wrap">
                  {(schoolLevel === "초등" ? ["3-4학년","5-6학년"] : schoolLevel === "중등" ? ["1학년","2학년","3학년"] : ["1학년","2-3학년"]).map((g) => (
                    <button key={g} onClick={() => setGrade(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                        grade === g ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-slate-600 hover:border-indigo-300"
                      }`}>{g}</button>
                  ))}
                </div>
              </div>
            )}

            {/* 수준 */}
            <div>
              <p className="text-xs text-slate-500 mb-1.5">학생 수준</p>
              <div className="flex gap-2">
                {["기초","중급","고급"].map((lv) => {
                  const cols = { 기초:"bg-green-600 border-green-600", 중급:"bg-blue-600 border-blue-600", 고급:"bg-purple-600 border-purple-600" };
                  return (
                    <button key={lv} onClick={() => { setStudentLevel(lv); setGenerated(false); }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                        studentLevel === lv ? cols[lv as keyof typeof cols] + " text-white" : "border-slate-200 text-slate-600 hover:border-indigo-300"
                      }`}>{lv}</button>
                  );
                })}
              </div>
            </div>

            {/* 주제 (선택) */}
            <div>
              <p className="text-xs text-slate-500 mb-1.5">주제 / 키워드 <span className="text-slate-400">(선택)</span></p>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예) environment, 가족, 수능 빈출어휘..."
                className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-400 placeholder:text-slate-300"
              />
            </div>

            {/* 문항 수 */}
            {(matType === "vocab") && (
              <div>
                <p className="text-xs text-slate-500 mb-1.5">단어 수</p>
                <div className="flex gap-2">
                  {["5","10","15","20"].map((n) => (
                    <button key={n} onClick={() => setCount(n)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                        count === n ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-slate-600 hover:border-indigo-300"
                      }`}>{n}개</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 생성 버튼 */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm transition-all shadow-sm ${
              canGenerate
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-md"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI 자료 생성하기
          </button>
        </div>

        {/* ── 오른쪽: 미리보기 ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {!generated ? (
            /* 빈 상태 */
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center p-8">
              <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center text-4xl">🤖</div>
              <div>
                <p className="font-bold text-slate-700">자료 유형과 학생 정보를 선택하세요</p>
                <p className="text-sm text-slate-400 mt-1">조건을 설정하고 생성 버튼을 누르면<br />맞춤형 학습 자료가 바로 만들어집니다.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {MATERIAL_TYPES.map((t) => (
                  <span key={t.id} className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">{t.icon} {t.label}</span>
                ))}
              </div>
            </div>
          ) : (
            /* 생성 결과 */
            <div>
              {/* 결과 액션 바 */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    {MATERIAL_TYPES.find((t) => t.id === matType)?.label}
                  </span>
                  <span className="text-xs text-slate-400">{schoolLevel} {grade} · {studentLevel}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleReset}
                    className="text-xs text-slate-500 hover:text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                    다시 설정
                  </button>
                  <button onClick={handleCopy}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                      copied ? "bg-green-100 text-green-700 border border-green-300" : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}>
                    {copied ? (
                      <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>복사됨</>
                    ) : (
                      <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>복사</>
                    )}
                  </button>
                  <button onClick={handleSave}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                      saved ? "bg-teal-100 text-teal-700 border border-teal-300" : "bg-white border border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                    }`}>
                    {saved ? (
                      <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>저장됨</>
                    ) : (
                      <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>저장</>
                    )}
                  </button>
                  <button className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    인쇄
                  </button>
                </div>
              </div>
              {/* 미리보기 본문 */}
              <div className="p-6 overflow-y-auto max-h-[640px]">
                {renderPreview()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
