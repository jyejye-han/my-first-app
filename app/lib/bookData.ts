export type BookBasic = {
  id: string;
  title: string;
  author: string;
  image?: string;
  emoji: string;
  levelGroup: string;
  category: string;
};

export const BOOKS_BASIC: Record<string, BookBasic> = {
  "1":  { id: "1",  title: "Reading Prime 1",                  author: "YBM 편집부",       emoji: "📘", image: "/images/books/reading-prime-1.jpg",             levelGroup: "중등", category: "독해"  },
  "2":  { id: "2",  title: "알리GO 올리GO 서술형 쓰기 2",       author: "YBM 편집부",       emoji: "📗", image: "/images/books/aligo-oligo.jpg",                  levelGroup: "중등", category: "쓰기"  },
  "3":  { id: "3",  title: "Phonics NOW 1",                    author: "이재홍 외",         emoji: "📙", image: "/images/books/phonics-now-1.jpg",               levelGroup: "초등", category: "파닉스"},
  "4":  { id: "4",  title: "연타 문법+쓰기 Level 1",            author: "YBM 편집부",       emoji: "📕", image: "/images/books/image-yeontar-grammar.jpg",       levelGroup: "중등", category: "문법"  },
  "5":  { id: "5",  title: "부스터 보카",                       author: "YBM 편집부",       emoji: "📓", image: "/images/books/booster-voca.jpg",                levelGroup: "고등", category: "어휘"  },
  "6":  { id: "6",  title: "Reading Prime 2",                  author: "YBM 편집부",       emoji: "📔", image: "/images/books/reading-prime-2.jpg",             levelGroup: "중등", category: "독해"  },
  "7":  { id: "7",  title: "Business English Master",          author: "John Kim",         emoji: "📒",                                                         levelGroup: "성인", category: "회화"  },
  "8":  { id: "8",  title: "개념 연산 SOS 중등 수학 3·1",       author: "YBM 편집부",       emoji: "📃", image: "/images/books/gaenyeom-sos.jpg",                levelGroup: "중등", category: "수학"  },
  "9":  { id: "9",  title: "중학 영어 완성 1",                  author: "서연희 외",         emoji: "📑",                                                         levelGroup: "중등", category: "종합"  },
  "10": { id: "10", title: "Booster 유형독해",                  author: "YBM 편집부",       emoji: "📰", image: "/images/books/booster-reading.jpg",             levelGroup: "고등", category: "독해"  },
  "11": { id: "11", title: "빈출구문 상승",                     author: "YBM 편집부",       emoji: "📄", image: "/images/books/binchul-gumun.jpg",               levelGroup: "고등", category: "구문"  },
  "12": { id: "12", title: "Benchmark Reading Starter 1",      author: "YBM 편집부",       emoji: "📗", image: "/images/books/benchmark-reading-starter-1.jpg", levelGroup: "초등", category: "독해"  },
  "13": { id: "13", title: "Benchmark Reading Starter 3",      author: "YBM 편집부",       emoji: "📘", image: "/images/books/benchmark-reading-starter-3.jpg", levelGroup: "초등", category: "독해"  },
  "14": { id: "14", title: "Booster 구문독해",                  author: "YBM 편집부",       emoji: "📒", image: "/images/books/booster-grammar.jpg",             levelGroup: "고등", category: "구문"  },
  "15": { id: "15", title: "Write NOW 1",                      author: "YBM 편집부",       emoji: "✏️", image: "/images/books/write-now-1.jpg",                 levelGroup: "초등", category: "쓰기"  },
  "16": { id: "16", title: "Listening Booster 30",             author: "YBM 편집부",       emoji: "🎧", image: "/images/books/listening-booster-30.jpg",        levelGroup: "고등", category: "듣기"  },
};
