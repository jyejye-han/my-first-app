import TextbookDetailClient from "../../components/TextbookDetailClient";

const BOOK_DB: Record<string, {
  id: string; title: string; author: string; levelGroup: string; category: string;
  emoji: string; image?: string; publishDate: string; description: string;
  isbn?: string; pages?: number; toc?: string[]; isNew?: boolean;
}> = {
  "1": {
    id: "1", title: "Reading Prime 1", author: "YBM 편집부",
    levelGroup: "중등", category: "독해", emoji: "📘",
    image: "/images/books/reading-prime-1.jpg",
    publishDate: "2025.03", isbn: "978-89-1234-001-1", pages: 192,
    description: `Reading Prime Series 특징

Reading Prime Series는 6단계로 구성된 중등 독해서입니다. 지문, 어휘, 문제 및 학습 활동들을 각 단계의 난이도에 맞도록 제시하여 체계적으로 학습할 수 있도록 구성하였습니다. 다양한 주제 및 최신 소재를 활용하여 흥미로운 내용뿐 아니라, 과학·사회·역사·지리 등의 배경지식도 함양할 수 있도록 학교 교과과정 연계성에 맞춘 지문들을 수록하였습니다.

[책의 특징]

- 교과목 연계 및 배경지식 습득에 유용한 다양한 주제 및 소재의 독해 지문
- 총 6단계로 각 단계별 난이도에 적합한 짜임새 있는 내용 및 구성
- 내신대비(영영) 및 Critical Thinking 문제 등 다양한 문제 유형 제시
- 지문에 대한 Core Point 정리, 어휘 추가 학습 및 지문 요약 등 유용한 액티비티 제시
- 각 지문 당 QR 코드 및 MP3 파일 제공, 학습 편의성 도모 (www.ybmbooks.com)

[책의 구성]

* Before Reading_ Vocabulary
: 각 Unit의 Key Words를 영영 정의와 함께 학습할 수 있습니다.

* Reading Passage
: 다양한 주제의 논픽션·픽션 지문을 수록하였습니다.

* Comprehension Check
: 독해 이해도 확인 및 Critical Thinking 문제를 제공합니다.

* After Reading_ Activity
: Core Point 정리, 어휘 학습, 지문 요약 활동이 포함되어 있습니다.`,
    toc: ["Unit 1 - Daily Life", "Unit 2 - Nature & Environment", "Unit 3 - Science & Technology", "Unit 4 - Culture & Arts", "Unit 5 - People & Society", "Unit 6 - Review & Assessment"],
  },
  "2": {
    id: "2", title: "알리GO 올리GO 서술형 쓰기 2", author: "YBM 편집부",
    levelGroup: "중등", category: "쓰기", emoji: "📗",
    image: "/images/books/aligo-oligo.jpg",
    publishDate: "2025.01", isbn: "978-89-1234-002-8", pages: 168, isNew: true,
    description: `알리GO 올리GO 시리즈 특징

중학영어 내신대비 서술형 쓰기 완성 교재입니다. 학교 시험에 자주 출제되는 핵심 문법과 표현을 단계별로 학습하고, 이를 활용한 서술형 쓰기 훈련으로 내신 고득점을 목표로 합니다.

[책의 특징]

- 학교 내신 시험 빈출 서술형 유형 집중 수록
- 문법 개념 → 문장 쓰기 → 서술형 완성의 3단계 구성
- 다양한 쓰기 활동으로 표현력과 작문 실력을 동시에 향상
- 핵심 문법 포인트를 간결하게 정리하여 빠른 이해 가능
- 실전 대비 모의 서술형 문제 수록

[책의 구성]

* 문법 알리GO
: 서술형에 꼭 필요한 핵심 문법을 이해하고 정리합니다.

* 문장 쓰기 연습
: 배운 문법을 활용하여 문장을 직접 써봅니다.

* 서술형 올리GO
: 실제 내신 서술형 문제 유형으로 실전 감각을 키웁니다.

* Review Test
: 단원별 학습 내용을 종합 점검합니다.`,
    toc: ["Chapter 1 - 문장의 형식", "Chapter 2 - 시제 표현", "Chapter 3 - 조동사 활용", "Chapter 4 - 수동태 쓰기", "Chapter 5 - 관계사 활용", "Chapter 6 - 실전 서술형 완성"],
  },
  "3": {
    id: "3", title: "Phonics NOW 1", author: "YBM 편집부",
    levelGroup: "초등", category: "파닉스", emoji: "📙",
    image: "/images/books/phonics-now-1.jpg",
    publishDate: "2024.09", isbn: "978-89-1234-003-5", pages: 128,
    description: `Phonics NOW 시리즈 특징

AR(증강현실) 기능을 탑재한 초등 파닉스 완성 교재입니다. Single Letters 단계부터 체계적으로 영어 소리와 철자의 관계를 익히며, 생동감 있는 일러스트와 스토리로 흥미롭게 학습합니다. 앱 연동을 통해 실감형 학습 경험을 제공합니다.

[책의 특징]

- AR 앱 연동으로 실감나는 파닉스 학습 경험 제공
- Single Letters부터 단계적으로 소리와 철자 관계 학습
- 풍부한 일러스트와 스토리로 학습 흥미 유발
- 반복 학습 구조로 자연스러운 파닉스 규칙 습득
- QR 코드를 통한 원어민 발음 제공

[책의 구성]

* Letter & Sound
: 알파벳 소리와 단어를 함께 익힙니다.

* Phonics Story
: 배운 소리가 담긴 짧은 스토리를 읽습니다.

* Practice
: 다양한 활동으로 파닉스 규칙을 반복 연습합니다.

* Review
: 단원에서 배운 내용을 종합 점검합니다.`,
    toc: ["Lesson 1 - Short Vowels a, e", "Lesson 2 - Short Vowels i, o, u", "Lesson 3 - Consonants b, c, d, f", "Lesson 4 - Consonants g, h, j, k", "Lesson 5 - Consonants l, m, n, p", "Lesson 6 - Review"],
  },
  "4": {
    id: "4", title: "연타 문법+쓰기 Level 1", author: "YBM 편집부",
    levelGroup: "중등", category: "문법", emoji: "📕",
    image: "/images/books/image-yeontar-grammar.jpg",
    publishDate: "2025.02", isbn: "978-89-1234-004-2", pages: 156, isNew: true,
    description: `연타 시리즈 특징

포인트 30개로 중학영어 문법·쓰기를 마스터하는 교재입니다. 문법 포인트를 이해하고, 이를 쓰기와 연결하여 연속으로 타파하는 방식으로 실력을 빠르게 끌어올립니다. 문법 문제는 물론 서술형·쓰기 문제까지 한 권으로 대비합니다.

[책의 특징]

- 엄선된 30개 핵심 문법 포인트로 중학 문법 완전 정복
- 문법 → 문장 쓰기 → 단락 쓰기로 이어지는 체계적 구성
- 문법 설명을 최소화하고 문제와 쓰기 훈련에 집중
- 학교 내신 서술형·문법 문제를 동시에 대비
- 풍부한 연습 문제로 반복 학습 효과 극대화

[책의 구성]

* Grammar Point
: 핵심 문법 포인트를 간결한 설명과 예문으로 이해합니다.

* Grammar Practice
: 다양한 문법 문제로 개념을 확실히 다집니다.

* Writing Practice
: 문법을 활용한 문장·단락 쓰기로 서술형을 완성합니다.

* Review
: 단원 학습 내용을 종합 테스트로 최종 점검합니다.`,
    toc: ["Point 01~05 - 동사의 시제", "Point 06~10 - 조동사·수동태", "Point 11~15 - to부정사·동명사", "Point 16~20 - 형용사·부사절", "Point 21~25 - 관계사", "Point 26~30 - 가정법·비교"],
  },
  "5": {
    id: "5", title: "부스터 보카", author: "YBM 편집부",
    levelGroup: "고등", category: "어휘", emoji: "📓",
    image: "/images/books/booster-voca.jpg",
    publishDate: "2024.06", isbn: "978-89-1234-005-9", pages: 320,
    description: `부스터 보카 특징

어디서나 술술 풀리는 영단어! 수능·내신 필수 어휘를 체계적으로 학습하고, CLASS CARD 앱 연동을 통해 언제 어디서나 효율적으로 암기할 수 있습니다. 수능 빈출 어휘 2,000개와 풍부한 예문을 제공합니다.

[책의 특징]

- 수능 기출 및 EBS 연계 어휘 2,000개 수록
- CLASS CARD 앱 연동으로 스마트한 어휘 암기
- 표제어, 파생어, 유의어, 반의어를 함께 제공
- 수능 실전 예문으로 문맥 속 어휘 학습
- Day별 학습 계획표로 체계적인 학습 가이드 제공

[책의 구성]

* 표제어 학습
: 수능 빈출 어휘를 예문과 함께 학습합니다.

* 파생어 & 관련어
: 표제어의 파생어, 유의어, 반의어를 함께 익힙니다.

* Daily Test
: 하루 학습 어휘를 확인 테스트로 점검합니다.

* 누적 복습 Test
: 주기적인 누적 복습으로 장기 기억을 강화합니다.`,
    toc: ["Day 01-05 - 수능 핵심어휘 1", "Day 06-10 - 수능 핵심어휘 2", "Day 11-15 - 고난도 어휘 1", "Day 16-20 - 고난도 어휘 2", "Day 21-25 - 주제별 어휘", "Day 26-30 - 실전 어휘 마무리"],
  },
  "6": {
    id: "6", title: "Reading Prime 2", author: "YBM 편집부",
    levelGroup: "중등", category: "독해", emoji: "📔",
    image: "/images/books/reading-prime-2.jpg",
    publishDate: "2024.11", isbn: "978-89-1234-006-6", pages: 200,
    description: `Reading Prime Series 특징

Reading Prime Series는 6단계로 구성된 중등 독해서입니다. 지문, 어휘, 문제 및 학습 활동들을 각 단계의 난이도에 맞도록 제시하여 체계적으로 학습할 수 있도록 구성하였습니다. Level 2는 중학교 2학년 수준의 심화 독해로, 논리적 사고력과 독해력을 동시에 키웁니다.

[책의 특징]

- 교과목 연계 및 배경지식 습득에 유용한 다양한 주제 및 소재의 독해 지문
- Critical Thinking 문제로 수능형 고난도 문제 유형 대비
- 내신대비(영영) 문제로 서술형·주관식 대비까지 완성
- 지문에 대한 Core Point 정리 및 어휘 추가 학습 제공
- Virtual Reading 프로그램 연동으로 디지털 독해 학습 지원

[책의 구성]

* Before Reading_ Vocabulary
: 각 Unit의 Key Words를 영영 정의와 함께 학습합니다.

* Reading Passage
: 논픽션·픽션 다양한 주제의 지문을 수록하였습니다.

* Comprehension Check & Critical Thinking
: 독해 이해도 및 고난도 추론 문제를 제공합니다.

* After Reading_ Activity
: Core Point 정리, 요약문 완성 등 심화 활동을 제공합니다.`,
    toc: ["Unit 1 - Science & Nature", "Unit 2 - History & Culture", "Unit 3 - Technology & Future", "Unit 4 - Society & People", "Unit 5 - Arts & Literature", "Unit 6 - Review & Assessment"],
  },
  "7": {
    id: "7", title: "Business English Master", author: "John Kim",
    levelGroup: "성인", category: "회화", emoji: "📒",
    publishDate: "2025.04", isbn: "978-89-1234-007-3", pages: 240,
    description: `Business English Master 특징

비즈니스 현장에서 즉시 활용 가능한 실용 영어 표현을 총정리한 교재입니다. 미팅, 이메일, 프레젠테이션, 협상 등 실무 필수 상황을 중심으로 구성하여 직장인의 비즈니스 영어 실력을 업그레이드합니다.

[책의 특징]

- 실무 현장 빈출 비즈니스 영어 표현 수록
- 이메일·보고서·발표 등 비즈니스 문서 작성법 포함
- 원어민 수준의 자연스러운 표현으로 격식 있는 의사소통 가능
- 상황별 Role Play로 실전 감각 배양
- 오디오 파일 제공으로 비즈니스 영어 발음 학습

[책의 구성]

* Business Situation
: 실무 상황별 핵심 표현과 대화문을 학습합니다.

* Key Expressions
: 상황에 맞는 핵심 비즈니스 표현을 정리합니다.

* Practice & Role Play
: 실전 상황 연습으로 표현을 완전히 내재화합니다.`,
    toc: ["Chapter 1 - Business Greetings", "Chapter 2 - Email Communication", "Chapter 3 - Meetings & Presentations", "Chapter 4 - Negotiations", "Chapter 5 - Business Travel", "Chapter 6 - Company Culture"],
  },
  "8": {
    id: "8", title: "개념 연산 SOS 중등 수학 3·1", author: "YBM 편집부",
    levelGroup: "중등", category: "수학", emoji: "📃",
    image: "/images/books/gaenyeom-sos.jpg",
    publishDate: "2025.05", isbn: "978-89-1234-008-0", pages: 480, isNew: true,
    description: `개념 연산 SOS 시리즈 특징

2022 개정 교육과정을 완벽 반영한 중등 수학 연산 교재입니다. 연산 반복 학습으로 개념을 확실히 잡아주는 진도북과 추가 훈련을 위한 드릴북으로 구성되어 있습니다. 연산 실수를 줄이고 수학 자신감을 키웁니다.

[책의 특징]

- 2022 개정 교육과정 완벽 반영
- 개념 이해 → 연산 훈련의 단계별 반복 학습 구조
- 진도북 + 드릴북 2권 구성으로 충분한 연습량 확보
- 틀리기 쉬운 연산 포인트를 콕 집어주는 SOS 코너 제공
- 학교 시험 빈출 연산 문제 유형 집중 수록

[책의 구성]

* 개념 정리 (진도북)
: 핵심 개념을 이해하고 대표 예제로 확인합니다.

* 연산 훈련 (진도북)
: 유형별 연산 문제를 단계적으로 반복 학습합니다.

* 드릴북
: 진도북에서 학습한 내용을 추가 연산으로 완전히 익힙니다.

* 단원 마무리
: 단원 핵심 연산을 종합 점검합니다.`,
    toc: ["1. 제곱근과 실수", "2. 근호를 포함한 식의 계산", "3. 다항식의 곱셈", "4. 인수분해", "5. 이차방정식", "6. 이차함수"],
  },
  "9": {
    id: "9", title: "중학 영어 완성 1", author: "서연희 외",
    levelGroup: "중등", category: "종합", emoji: "📑",
    publishDate: "2024.08", isbn: "978-89-1234-009-7", pages: 288,
    description: `중학 영어 완성 시리즈 특징

중학교 1학년 전 영역을 아우르는 종합 영어 교재입니다. 문법·독해·듣기·어휘를 균형 있게 학습하며, 학교 내신 시험 대비와 기초 영어 실력 다지기에 최적화되어 있습니다.

[책의 특징]

- 중학교 교과과정과 완전 연계된 문법·독해·듣기·어휘 통합 학습
- 학교 시험 빈출 문제 유형 집중 수록
- 체계적인 단원 구성으로 자기주도 학습 가능
- 풍부한 예문과 삽화로 이해도 향상
- 단원별 확인 테스트로 학습 성취도 점검

[책의 구성]

* Grammar
: 핵심 문법 개념을 이해하고 실전 문제에 적용합니다.

* Vocabulary
: 교과서 연계 필수 어휘를 체계적으로 학습합니다.

* Reading & Listening
: 다양한 지문과 듣기 자료로 통합 영어 능력을 기릅니다.`,
    toc: ["1단원 - 기초 문법", "2단원 - 어휘와 표현", "3단원 - 독해 기초", "4단원 - 듣기 기초", "5단원 - 쓰기 기초", "6단원 - 종합 테스트"],
  },
  "10": {
    id: "10", title: "Booster 유형독해", author: "YBM 편집부",
    levelGroup: "고등", category: "독해", emoji: "📰",
    image: "/images/books/booster-reading.jpg",
    publishDate: "2025.02", isbn: "978-89-1234-010-3", pages: 264,
    description: `Booster 유형독해 특징

수능영어 1등급 프로젝트. 17번의 수능·모의고사를 철저히 분석하여 32개 유형별 전략을 제시하는 수능 영어 독해 완성 교재입니다. 실전처럼 모의고사 총 3회를 수록하여 시험 직전까지 완벽하게 대비할 수 있습니다.

[책의 특징]

- 수능·모의고사 17개년 기출 분석 기반 32개 유형 전략 제시
- 유형별 접근 방법과 함정 피하기 전략 상세 설명
- 실전 모의고사 3회 수록으로 최종 점검 가능
- MP3 파일 무료 다운로드 제공 (www.ybmbooksam.com)
- 빠른 정답 및 상세 해설 별책 제공

[책의 구성]

* 유형별 전략
: 수능 독해 유형별 접근 방법과 풀이 전략을 학습합니다.

* 유형별 Practice
: 유형에 맞는 연습 문제로 전략을 적용해 봅니다.

* 실전 모의고사 1~3회
: 수능과 동일한 조건으로 실전 감각을 완성합니다.`,
    toc: ["Part 1 - 유형별 전략 (빈칸추론)", "Part 2 - 유형별 전략 (순서·삽입)", "Part 3 - 유형별 전략 (주제·요지)", "Part 4 - 유형별 전략 (함의·어휘)", "실전모의고사 1회", "실전모의고사 2회", "실전모의고사 3회"],
  },
  "11": {
    id: "11", title: "빈출구문 상승", author: "YBM 편집부",
    levelGroup: "고등", category: "구문", emoji: "📄",
    image: "/images/books/binchul-gumun.jpg",
    publishDate: "2024.12", isbn: "978-89-1234-011-0", pages: 336,
    description: `빈출구문 상승 특징

수능대비 독해실력 상승 프로젝트! 53개 핵심구문 포인트를 집중 학습하여 수능 영어 독해 실력을 완성하는 교재입니다. 수능·모의고사에 반복 출제되는 핵심 구문을 선별하고, 이를 실전 지문에 바로 적용할 수 있도록 설계하였습니다.

[책의 특징]

- 수능·모의고사 기출 분석으로 선별한 53개 핵심구문 수록
- 구문 이해 → 문장 해석 → 지문 적용의 단계별 학습
- 수능 1등급을 위한 고난도 구문 집중 훈련
- 빠른 정답 및 상세 해설 별책 제공
- MP3 파일 무료 다운로드 (www.ybmbooksam.com)

[책의 구성]

* 핵심구문 학습
: 수능 빈출 53개 구문을 예문과 함께 정확히 이해합니다.

* 구문 적용 연습
: 학습한 구문을 실제 수능형 문장에 적용하여 연습합니다.

* 실전 지문 독해
: 기출 수준의 지문에서 핵심구문을 찾고 해석합니다.

* 누적 Review
: 앞서 배운 구문을 주기적으로 점검합니다.`,
    toc: ["Part 1 - 핵심구문 01~15 (명사·형용사구)", "Part 2 - 핵심구문 16~30 (부사구·절)", "Part 3 - 핵심구문 31~45 (비교·강조 구문)", "Part 4 - 핵심구문 46~53 (고난도 구문)", "실전 독해 Test 1회", "실전 독해 Test 2회"],
  },
  "12": {
    id: "12", title: "Benchmark Reading Starter 1", author: "YBM 편집부",
    levelGroup: "초등", category: "독해", emoji: "📗",
    image: "/images/books/benchmark-reading-starter-1.jpg",
    publishDate: "2024.03", isbn: "978-89-1234-012-7", pages: 96,
    description: `Benchmark Reading 시리즈 특징

세계적인 교육 출판사 Benchmark Education과 YBM이 공동 개발한 초등 영어 리딩 프로그램입니다. 과학·사회·문화 등 다양한 주제의 논픽션·픽션 지문으로 영어 독해 능력과 배경지식을 동시에 키웁니다.

[책의 특징]

- 세계 표준 Benchmark Education 리딩 프로그램 기반
- Lexile 지수 BR30L-30L 수준의 체계적 난이도 구성
- 논픽션·픽션 균형 있는 지문 구성으로 읽기 흥미 유발
- 20 words 수준의 짧고 명확한 지문으로 초등 입문자 최적화
- 다양한 독후 활동(어휘·이해력·쓰기)으로 완전 학습

[책의 구성]

* Build Background
: 배경지식을 활성화하고 읽기 전 준비를 합니다.

* Read the Passage
: 주제별 지문을 읽으며 내용을 파악합니다.

* Check Understanding
: 독해 이해도를 확인하는 문제를 풀어봅니다.

* Vocabulary & Writing
: 핵심 어휘와 간단한 쓰기 활동으로 마무리합니다.`,
    toc: ["Unit 1 - Animals", "Unit 2 - Plants & Nature", "Unit 3 - Community Helpers", "Unit 4 - Weather & Seasons", "Unit 5 - Food & Health", "Unit 6 - Review"],
  },
  "13": {
    id: "13", title: "Benchmark Reading Starter 3", author: "YBM 편집부",
    levelGroup: "초등", category: "독해", emoji: "📘",
    image: "/images/books/benchmark-reading-starter-3.jpg",
    publishDate: "2024.03", isbn: "978-89-1234-013-4", pages: 104,
    description: `Benchmark Reading 시리즈 특징

세계적인 교육 출판사 Benchmark Education과 YBM이 공동 개발한 초등 영어 리딩 프로그램입니다. Starter 3는 30 words 수준으로, 더욱 풍부한 논픽션 주제의 지문으로 사고력과 독해력을 동시에 향상시킵니다.

[책의 특징]

- Lexile 지수 BR30L-110L 수준에 최적화된 난이도
- 스포츠·과학·역사 등 다양한 논픽션 소재 활용
- 30 words 수준의 지문으로 독해 자신감 단계적 향상
- 풍부한 사진과 그래픽으로 배경지식 함양
- 독후 활동으로 어휘·이해력·쓰기 통합 학습

[책의 구성]

* Build Background
: 배경지식을 활성화하고 읽기 전 준비를 합니다.

* Read the Passage
: 논픽션 중심의 주제별 지문을 읽습니다.

* Check Understanding
: 독해 이해도를 다양한 문제 유형으로 확인합니다.

* Think About It
: 비판적 사고를 유도하는 심화 문제를 풀어봅니다.`,
    toc: ["Unit 1 - Science & Discovery", "Unit 2 - History & Culture", "Unit 3 - Sports & Activities", "Unit 4 - Technology & Innovation", "Unit 5 - People & Society", "Unit 6 - Review"],
  },
  "15": {
    id: "15", title: "Write NOW 1", author: "YBM 편집부",
    levelGroup: "초등", category: "쓰기", emoji: "✏️",
    image: "/images/books/write-now-1.jpg",
    publishDate: "2025.03", isbn: "978-89-1234-015-8", pages: 120, isNew: true,
    description: `Write NOW 시리즈 특징

A Guide to Writing Sentences. Write NOW 시리즈는 초등 영어 쓰기 능력을 단계적으로 완성하는 교재입니다. 단어 쓰기부터 시작하여 문장 구성의 원리를 익히고, 다양한 유형의 문장을 직접 써보며 영어 쓰기에 자신감을 키울 수 있도록 설계되었습니다.

[책의 특징]

- 단어 → 구 → 문장 순의 단계적 쓰기 학습 구성
- 핵심 문법 요소와 문장 구조를 동시에 익히는 통합 학습
- 다채로운 삽화와 활동으로 쓰기 흥미 유발
- 원어민 수준의 예문으로 자연스러운 문장 표현 습득
- QR 코드를 통한 예시 음성 및 부가자료 제공

[책의 구성]

* Word Practice
: 핵심 단어를 보고 듣고 쓰며 기초 어휘를 익힙니다.

* Sentence Building
: 단어 카드를 활용해 올바른 문장 순서를 학습합니다.

* Writing Practice
: 안내된 문장 틀에 맞춰 직접 문장을 완성합니다.

* My Writing
: 배운 표현을 활용하여 자유롭게 나만의 문장을 씁니다.`,
    toc: ["Unit 1 - Hello!", "Unit 2 - My Family", "Unit 3 - My School", "Unit 4 - I Like...", "Unit 5 - My Day", "Unit 6 - Review"],
  },
  "16": {
    id: "16", title: "Listening Booster 30", author: "YBM 편집부",
    levelGroup: "고등", category: "듣기", emoji: "🎧",
    image: "/images/books/listening-booster-30.jpg",
    publishDate: "2025.02", isbn: "978-89-1234-016-5", pages: 280, isNew: true,
    description: `Listening Booster 시리즈 특징

수능영어 1등급 프로젝트. EBS 듣기 교재 집필진이 직접 만든 영어듣기 모의고사 30회 완성 교재입니다. 실제 수능 듣기 유형을 완벽히 재현한 문항으로 실전 감각을 극대화하고, 반복 훈련을 통해 고득점을 달성할 수 있습니다.

[책의 특징]

- EBS 듣기 교재 집필진이 직접 출제한 양질의 문항
- 수능 듣기 17개 유형을 모두 반영한 실전형 모의고사 30회
- 회차별 난이도 조절로 점진적인 실력 향상 가능
- MP3 파일 무료 다운로드 및 QR 코드 즉시 청취 지원
- 빠른 정답 + 상세 스크립트·해설 별책 제공

[책의 구성]

* 유형 분석 가이드
: 수능 듣기 17개 유형별 접근법과 풀이 전략을 제시합니다.

* 실전 모의고사 1~30회
: 수능과 동일한 문항 수·시간으로 실전처럼 풀어봅니다.

* 정답 및 스크립트
: 모든 대화·담화의 스크립트와 해석·해설을 제공합니다.`,
    toc: ["유형 분석 가이드", "모의고사 01~05회", "모의고사 06~10회", "모의고사 11~15회", "모의고사 16~20회", "모의고사 21~25회", "모의고사 26~30회"],
  },
  "14": {
    id: "14", title: "Booster 구문독해", author: "YBM 편집부",
    levelGroup: "고등", category: "구문", emoji: "📒",
    image: "/images/books/booster-grammar.jpg",
    publishDate: "2025.01", isbn: "978-89-1234-014-1", pages: 248,
    description: `Booster 구문독해 특징

수능영어 1등급 프로젝트. 수능 영어에서 핵심이 되는 63개 구문 패턴을 체계적으로 분석하고, 고난도 TEST 3회를 통해 실전 감각을 완성하는 구문 독해 완성 교재입니다.

[책의 특징]

- 수능 기출 분석을 통한 63개 핵심 구문 패턴 선별·정리
- 구문 → 문장 → 지문 순의 단계적 학습으로 완전 이해
- 고난도 TEST 3회 수록으로 실전 대비 완성
- MP3 파일 무료 다운로드 제공 (www.ybmbooksam.com)
- 빠른 정답 및 상세 해설 별책 제공

[책의 구성]

* 구문 패턴 학습
: 수능 핵심 구문을 예문과 함께 명확하게 이해합니다.

* 구문 적용 연습
: 학습한 구문을 실제 문장에 적용하여 연습합니다.

* 실전 지문 독해
: 수능 실전 지문에서 구문을 찾고 해석합니다.

* 고난도 TEST 1~3회
: 수능 수준의 고난도 문제로 최종 실력을 점검합니다.`,
    toc: ["Part 1 - 기본 구문 패턴 (1~20)", "Part 2 - 중급 구문 패턴 (21~40)", "Part 3 - 고급 구문 패턴 (41~63)", "실전 TEST 1회", "실전 TEST 2회", "실전 TEST 3회"],
  },
};

export default async function TextbookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = BOOK_DB[id] ?? {
    id, title: `교재 #${id}`, author: "YBM 편집부",
    levelGroup: "공통", category: "종합", emoji: "📚",
    publishDate: "2025.01", pages: 200,
    description: "YBM에서 출간한 교재입니다. 강사 전용 부가자료를 함께 활용하세요.",
    toc: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"],
  };

  return <TextbookDetailClient book={book} />;
}
