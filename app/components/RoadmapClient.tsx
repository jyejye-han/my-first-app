"use client";
import { useState } from "react";
import { BOOKS_BASIC } from "../lib/bookData";

/* ═══════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════ */
type SchoolLevel = "초등" | "중등" | "고등";
type StudentLevel = "기초" | "중급" | "고급";
type AreaKey = "reading" | "grammar" | "vocab" | "listening" | "writing";

type RecBook = {
  title: string;
  bookId?: string;
  area: AreaKey;
  month: number;
  tip: string;
};

type CourseRec = { duration: 2 | 3 | 6; books: RecBook[] };
type Recommendation = { key: string; courses: CourseRec[] };

/* ═══════════════════════════════════════════════
   RECOMMENDATION DATA
═══════════════════════════════════════════════ */
const RECOMMENDATIONS: Recommendation[] = [
  /* ── 초등 3-4학년 ── */
  {
    key: "초등-3-4학년-기초",
    courses: [
      { duration: 2, books: [
        { title: "Phonics NOW 1",              bookId: "3",  area: "reading", month: 1, tip: "파닉스 기초 완성, 단모음·이중자음 집중 학습" },
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 2, tip: "20단어 수준 초등 입문 독해" },
      ]},
      { duration: 3, books: [
        { title: "Phonics NOW 1",              bookId: "3",  area: "reading", month: 1, tip: "파닉스 기초 완성" },
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 2, tip: "초등 입문 독해" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 3, tip: "문장 구성 원리 · 쓰기 입문" },
      ]},
      { duration: 6, books: [
        { title: "Phonics NOW 1",              bookId: "3",  area: "reading", month: 1, tip: "파닉스 기초" },
        { title: "Phonics NOW 1",              bookId: "3",  area: "reading", month: 2, tip: "파닉스 심화 완성" },
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 3, tip: "초등 독해 입문" },
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 4, tip: "독해 연습 완성" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 5, tip: "쓰기 기초" },
        { title: "Benchmark Reading Starter 3",bookId: "13", area: "reading", month: 6, tip: "30단어 수준 독해로 업그레이드" },
      ]},
    ],
  },
  {
    key: "초등-3-4학년-중급",
    courses: [
      { duration: 2, books: [
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 1, tip: "입문 독해 기초 다지기" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 2, tip: "쓰기 기초 완성" },
      ]},
      { duration: 3, books: [
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 1, tip: "초등 독해 기초" },
        { title: "Benchmark Reading Starter 3",bookId: "13", area: "reading", month: 2, tip: "독해 심화" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 3, tip: "쓰기 완성" },
      ]},
      { duration: 6, books: [
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 1, tip: "독해 기초" },
        { title: "Benchmark Reading Starter 3",bookId: "13", area: "reading", month: 2, tip: "독해 심화" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 3, tip: "쓰기 기초" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 4, tip: "쓰기 완성" },
        { title: "Phonics NOW 1",              bookId: "3",  area: "reading", month: 5, tip: "파닉스 보완" },
        { title: "Benchmark Reading Starter 3",bookId: "13", area: "reading", month: 6, tip: "독해 마무리" },
      ]},
    ],
  },

  /* ── 초등 5-6학년 ── */
  {
    key: "초등-5-6학년-기초",
    courses: [
      { duration: 2, books: [
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 1, tip: "독해 기초 완성" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 2, tip: "쓰기 기초" },
      ]},
      { duration: 3, books: [
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 1, tip: "독해 기초" },
        { title: "Benchmark Reading Starter 3",bookId: "13", area: "reading", month: 2, tip: "독해 심화" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 3, tip: "쓰기 입문" },
      ]},
      { duration: 6, books: [
        { title: "Benchmark Reading Starter 1",bookId: "12", area: "reading", month: 1, tip: "독해 기초" },
        { title: "Benchmark Reading Starter 3",bookId: "13", area: "reading", month: 2, tip: "독해 업그레이드" },
        { title: "Write NOW 1",                bookId: "15", area: "writing", month: 3, tip: "쓰기 기초" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 4, tip: "중등 대비 기초 문법 선행" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 5, tip: "문법 완성" },
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 6, tip: "중등 독해 선행 준비" },
      ]},
    ],
  },
  {
    key: "초등-5-6학년-중급",
    courses: [
      { duration: 2, books: [
        { title: "Reading Prime 1",  bookId: "1",  area: "reading", month: 1, tip: "중등 독해 기초 선행" },
        { title: "연타 문법+쓰기 Level 1", bookId: "4", area: "grammar", month: 2, tip: "중등 문법 기초 선행" },
      ]},
      { duration: 3, books: [
        { title: "Benchmark Reading Starter 3",bookId: "13", area: "reading", month: 1, tip: "독해 완성" },
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 2, tip: "중등 독해 선행" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 3, tip: "중등 문법 선행" },
      ]},
      { duration: 6, books: [
        { title: "Benchmark Reading Starter 3",bookId: "13", area: "reading", month: 1, tip: "독해 업그레이드" },
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 2, tip: "중등 독해 선행" },
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 3, tip: "독해 완성" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 4, tip: "중등 문법 기초" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 5, tip: "문법 완성" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 6, tip: "서술형 내신 대비" },
      ]},
    ],
  },

  /* ── 중등 1학년 ── */
  {
    key: "중등-1학년-기초",
    courses: [
      { duration: 2, books: [
        { title: "Reading Prime 1",       bookId: "1", area: "reading", month: 1, tip: "중학 독해 기초 입문" },
        { title: "연타 문법+쓰기 Level 1",bookId: "4", area: "grammar", month: 2, tip: "핵심 문법 포인트 30개" },
      ]},
      { duration: 3, books: [
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 1, tip: "중학 독해 기초" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 2, tip: "문법 기초 완성" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 3, tip: "서술형 쓰기 완성" },
      ]},
      { duration: 6, books: [
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 1, tip: "독해 기초" },
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 2, tip: "독해 완성" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 3, tip: "문법 기초" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 4, tip: "문법 완성" },
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 5, tip: "독해 업그레이드" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 6, tip: "서술형 내신 대비" },
      ]},
    ],
  },
  {
    key: "중등-1학년-중급",
    courses: [
      { duration: 2, books: [
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 1, tip: "중학 독해 심화" },
        { title: "중학 영어 완성 1",            bookId: "9",  area: "grammar", month: 2, tip: "전 영역 종합 정리" },
      ]},
      { duration: 3, books: [
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 1, tip: "독해 기초 정리" },
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 2, tip: "독해 심화" },
        { title: "중학 영어 완성 1",            bookId: "9",  area: "grammar", month: 3, tip: "전 영역 종합" },
      ]},
      { duration: 6, books: [
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 1, tip: "독해 기초" },
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 2, tip: "독해 심화" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 3, tip: "문법 강화" },
        { title: "중학 영어 완성 1",            bookId: "9",  area: "grammar", month: 4, tip: "종합 정리" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 5, tip: "쓰기 완성" },
        { title: "개념 연산 SOS 중등 수학 3·1", bookId: "8",  area: "reading", month: 6, tip: "수학 연계 학습" },
      ]},
    ],
  },
  {
    key: "중등-1학년-고급",
    courses: [
      { duration: 2, books: [
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 1, tip: "심화 독해" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 2, tip: "서술형 완성" },
      ]},
      { duration: 3, books: [
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 1, tip: "중학 독해 심화" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 2, tip: "서술형 쓰기" },
        { title: "중학 영어 완성 1",            bookId: "9",  area: "grammar", month: 3, tip: "전 영역 마스터" },
      ]},
      { duration: 6, books: [
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 1, tip: "독해 심화" },
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 2, tip: "독해 완성" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 3, tip: "서술형 기초" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 4, tip: "서술형 완성" },
        { title: "중학 영어 완성 1",            bookId: "9",  area: "grammar", month: 5, tip: "종합 정리" },
        { title: "Booster 유형독해",            bookId: "10", area: "reading", month: 6, tip: "고등 수능 선행 독해" },
      ]},
    ],
  },

  /* ── 중등 2-3학년 ── */
  {
    key: "중등-2학년-기초",
    courses: [
      { duration: 2, books: [
        { title: "Reading Prime 1",  bookId: "1", area: "reading", month: 1, tip: "독해 기초 정비" },
        { title: "연타 문법+쓰기 Level 1", bookId: "4", area: "grammar", month: 2, tip: "문법 핵심 재정리" },
      ]},
      { duration: 3, books: [
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 1, tip: "독해 기초" },
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 2, tip: "독해 심화" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 3, tip: "문법 완성" },
      ]},
      { duration: 6, books: [
        { title: "Reading Prime 1",            bookId: "1",  area: "reading", month: 1, tip: "독해 기초 완성" },
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 2, tip: "독해 레벨업" },
        { title: "연타 문법+쓰기 Level 1",      bookId: "4",  area: "grammar", month: 3, tip: "문법 기초" },
        { title: "중학 영어 완성 1",            bookId: "9",  area: "grammar", month: 4, tip: "종합 완성" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 5, tip: "서술형 대비" },
        { title: "부스터 보카",                bookId: "5",  area: "vocab",   month: 6, tip: "고등 어휘 선행" },
      ]},
    ],
  },
  {
    key: "중등-2학년-중급",
    courses: [
      { duration: 2, books: [
        { title: "Reading Prime 2",  bookId: "6", area: "reading", month: 1, tip: "중학 독해 완성" },
        { title: "중학 영어 완성 1", bookId: "9", area: "grammar", month: 2, tip: "전 영역 정리" },
      ]},
      { duration: 3, books: [
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 1, tip: "독해 심화" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 2, tip: "서술형 완성" },
        { title: "부스터 보카",                bookId: "5",  area: "vocab",   month: 3, tip: "고등 어휘 선행" },
      ]},
      { duration: 6, books: [
        { title: "Reading Prime 2",            bookId: "6",  area: "reading", month: 1, tip: "독해 심화" },
        { title: "Booster 유형독해",           bookId: "10", area: "reading", month: 2, tip: "수능 독해 입문" },
        { title: "알리GO 올리GO 서술형 쓰기 2", bookId: "2",  area: "writing", month: 3, tip: "서술형" },
        { title: "부스터 보카",                bookId: "5",  area: "vocab",   month: 4, tip: "수능 어휘" },
        { title: "빈출구문 상승",              bookId: "11", area: "grammar", month: 5, tip: "구문 독해" },
        { title: "Booster 구문독해",           bookId: "14", area: "grammar", month: 6, tip: "구문 완성" },
      ]},
    ],
  },
  {
    key: "중등-3학년-고급",
    courses: [
      { duration: 2, books: [
        { title: "Booster 유형독해",  bookId: "10", area: "reading", month: 1, tip: "수능 유형 독해 입문" },
        { title: "부스터 보카",       bookId: "5",  area: "vocab",   month: 2, tip: "수능 핵심 어휘" },
      ]},
      { duration: 3, books: [
        { title: "Booster 유형독해",  bookId: "10", area: "reading", month: 1, tip: "수능 유형 독해" },
        { title: "빈출구문 상승",     bookId: "11", area: "grammar", month: 2, tip: "구문 독해 강화" },
        { title: "부스터 보카",       bookId: "5",  area: "vocab",   month: 3, tip: "수능 어휘 완성" },
      ]},
      { duration: 6, books: [
        { title: "Booster 유형독해",  bookId: "10", area: "reading", month: 1, tip: "수능 유형 입문" },
        { title: "Booster 유형독해",  bookId: "10", area: "reading", month: 2, tip: "유형 독해 완성" },
        { title: "빈출구문 상승",     bookId: "11", area: "grammar", month: 3, tip: "구문 기초" },
        { title: "Booster 구문독해",  bookId: "14", area: "grammar", month: 4, tip: "구문 완성" },
        { title: "부스터 보카",       bookId: "5",  area: "vocab",   month: 5, tip: "수능 어휘" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 6, tip: "수능 듣기 모의고사" },
      ]},
    ],
  },

  /* ── 고등 1학년 ── */
  {
    key: "고등-1학년-기초",
    courses: [
      { duration: 2, books: [
        { title: "Reading Prime 2",  bookId: "6",  area: "reading", month: 1, tip: "독해 기초 다지기" },
        { title: "부스터 보카",      bookId: "5",  area: "vocab",   month: 2, tip: "수능 핵심 어휘 입문" },
      ]},
      { duration: 3, books: [
        { title: "Reading Prime 2",   bookId: "6",  area: "reading", month: 1, tip: "독해 기초" },
        { title: "Booster 유형독해",  bookId: "10", area: "reading", month: 2, tip: "수능 유형 입문" },
        { title: "부스터 보카",       bookId: "5",  area: "vocab",   month: 3, tip: "어휘 완성" },
      ]},
      { duration: 6, books: [
        { title: "Reading Prime 2",      bookId: "6",  area: "reading",   month: 1, tip: "독해 기초 정비" },
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 2, tip: "수능 유형 입문" },
        { title: "부스터 보카",          bookId: "5",  area: "vocab",     month: 3, tip: "수능 어휘 기초" },
        { title: "빈출구문 상승",        bookId: "11", area: "grammar",   month: 4, tip: "수능 구문 기초" },
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 5, tip: "구문 완성" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 6, tip: "수능 듣기 훈련" },
      ]},
    ],
  },
  {
    key: "고등-1학년-중급",
    courses: [
      { duration: 2, books: [
        { title: "Booster 유형독해",  bookId: "10", area: "reading", month: 1, tip: "수능 17가지 유형 마스터" },
        { title: "빈출구문 상승",     bookId: "11", area: "grammar", month: 2, tip: "53개 핵심 구문 완성" },
      ]},
      { duration: 3, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "수능 유형 독해 완성" },
        { title: "빈출구문 상승",        bookId: "11", area: "grammar",   month: 2, tip: "구문 독해 강화" },
        { title: "부스터 보카",          bookId: "5",  area: "vocab",     month: 3, tip: "수능 어휘 완성" },
      ]},
      { duration: 6, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "유형 독해 기초" },
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 2, tip: "유형 독해 완성" },
        { title: "빈출구문 상승",        bookId: "11", area: "grammar",   month: 3, tip: "구문 기초" },
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 4, tip: "구문 심화" },
        { title: "부스터 보카",          bookId: "5",  area: "vocab",     month: 5, tip: "수능 어휘" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 6, tip: "수능 듣기 모의 30회" },
      ]},
    ],
  },
  {
    key: "고등-1학년-고급",
    courses: [
      { duration: 2, books: [
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 1, tip: "63개 구문 패턴 완성" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 2, tip: "수능 듣기 모의 30회" },
      ]},
      { duration: 3, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "유형 독해 완성" },
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 2, tip: "구문 완성" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 3, tip: "수능 듣기 완성" },
      ]},
      { duration: 6, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "유형 독해" },
        { title: "빈출구문 상승",        bookId: "11", area: "grammar",   month: 2, tip: "구문 기초" },
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 3, tip: "구문 완성" },
        { title: "부스터 보카",          bookId: "5",  area: "vocab",     month: 4, tip: "어휘 완성" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 5, tip: "듣기 집중" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 6, tip: "듣기 완성" },
      ]},
    ],
  },
  {
    key: "고등-2-3학년-중급",
    courses: [
      { duration: 2, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "수능 유형 완성" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 2, tip: "수능 듣기 완성" },
      ]},
      { duration: 3, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "유형 독해 완성" },
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 2, tip: "구문 완성" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 3, tip: "수능 듣기" },
      ]},
      { duration: 6, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "유형 기초" },
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 2, tip: "유형 완성" },
        { title: "빈출구문 상승",        bookId: "11", area: "grammar",   month: 3, tip: "구문 기초" },
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 4, tip: "구문 완성" },
        { title: "부스터 보카",          bookId: "5",  area: "vocab",     month: 5, tip: "수능 어휘" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 6, tip: "수능 듣기 완성" },
      ]},
    ],
  },
  {
    key: "고등-2-3학년-고급",
    courses: [
      { duration: 2, books: [
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 1, tip: "구문 심화 완성" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 2, tip: "수능 듣기 파이널" },
      ]},
      { duration: 3, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "수능 실전 독해" },
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 2, tip: "구문 마스터" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 3, tip: "수능 듣기 파이널" },
      ]},
      { duration: 6, books: [
        { title: "Booster 유형독해",     bookId: "10", area: "reading",   month: 1, tip: "수능 유형 완성" },
        { title: "빈출구문 상승",        bookId: "11", area: "grammar",   month: 2, tip: "구문 강화" },
        { title: "Booster 구문독해",     bookId: "14", area: "grammar",   month: 3, tip: "구문 마스터" },
        { title: "부스터 보카",          bookId: "5",  area: "vocab",     month: 4, tip: "수능 어휘 마스터" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 5, tip: "수능 듣기" },
        { title: "Listening Booster 30", bookId: "16", area: "listening", month: 6, tip: "수능 파이널" },
      ]},
    ],
  },
];

/* ═══════════════════════════════════════════════
   AREA CONFIG
═══════════════════════════════════════════════ */
const AREA_CONFIG: Record<AreaKey, { label: string; color: string; bg: string; light: string }> = {
  reading:   { label: "독해",   color: "text-blue-700",   bg: "bg-blue-600",   light: "bg-blue-50 border-blue-200"   },
  grammar:   { label: "문법·구문", color: "text-orange-700", bg: "bg-orange-500", light: "bg-orange-50 border-orange-200" },
  vocab:     { label: "어휘",   color: "text-purple-700", bg: "bg-purple-600", light: "bg-purple-50 border-purple-200" },
  listening: { label: "듣기",   color: "text-green-700",  bg: "bg-green-600",  light: "bg-green-50 border-green-200"  },
  writing:   { label: "쓰기",   color: "text-pink-700",   bg: "bg-pink-600",   light: "bg-pink-50 border-pink-200"    },
};

/* ═══════════════════════════════════════════════
   GRADE OPTIONS
═══════════════════════════════════════════════ */
const GRADE_OPTIONS: Record<SchoolLevel, string[]> = {
  "초등": ["3-4학년", "5-6학년"],
  "중등": ["1학년", "2학년", "3학년"],
  "고등": ["1학년", "2-3학년"],
};

/* ═══════════════════════════════════════════════
   CURRICULUM TABLE DATA (unchanged)
═══════════════════════════════════════════════ */
type BookRow = { subArea: string; q1: string; q2: string; q3: string; q4: string };
type Section = { area: string; rows: BookRow[] };
type LevelBlock = { level: string; levelId: "elementary"|"middle"|"high"; bg: string; text: string; sections: Section[] };
type FlatRow = { levelLabel: string; levelBg: string; levelText: string; levelSpan: number; showLevel: boolean; areaLabel: string; areaSpan: number; showArea: boolean; subArea: string; q1: string; q2: string; q3: string; q4: string; rowIndex: number };

const CURRICULUM: LevelBlock[] = [
  { level:"초등\n3·4학년", levelId:"elementary", bg:"bg-green-600", text:"text-white", sections:[
    { area:"Reading", rows:[
      { subArea:"ELT / 원서형",q1:"Let's Go 1",q2:"Let's Go 2",q3:"Oxford Reading Tree 1",q4:"Oxford Reading Tree 2"},
      { subArea:"독해 기본서",q1:"리딩튜터 입문",q2:"Reading Starter 1",q3:"리딩튜터 초급",q4:"Reading Starter 2"},
    ]},
    { area:"Listening", rows:[{ subArea:"",q1:"Junior Listening 1",q2:"Junior Listening 2",q3:"Junior Listening 3",q4:""}]},
    { area:"Grammar", rows:[{ subArea:"문법",q1:"Grammar Master Basic",q2:"Grammar Inside Starter",q3:"",q4:""}]},
  ]},
  { level:"초등\n5·6학년", levelId:"elementary", bg:"bg-green-500", text:"text-white", sections:[
    { area:"Reading", rows:[
      { subArea:"ELT / 원서형",q1:"Subject Link 1",q2:"Subject Link 2",q3:"Subject Link 3",q4:"Reading Explore 1"},
      { subArea:"독해 기본서",q1:"Reading Starter 3",q2:"Reading Relay 1",q3:"Reading Relay 2",q4:"리딩튜터 기초"},
    ]},
    { area:"Listening", rows:[{ subArea:"",q1:"Junior Listening 4",q2:"능률 초등 영어듣기 1",q3:"능률 초등 영어듣기 2",q4:""}]},
    { area:"Grammar\n& 어휘", rows:[
      { subArea:"문법",q1:"Grammar Master 2",q2:"Grammar Inside 1",q3:"Grammar Master 3",q4:"Grammar Inside 2"},
      { subArea:"어휘",q1:"Word Master 초등",q2:"Voca Inside Starter",q3:"",q4:""},
    ]},
  ]},
  { level:"중등 1", levelId:"middle", bg:"bg-cyan-600", text:"text-white", sections:[
    { area:"Reading", rows:[
      { subArea:"ELT / 원서형",q1:"Subject Link 7",q2:"Subject Link 8",q3:"Reading Inside 1",q4:"Jr Reading Expert 1"},
      { subArea:"독해 기본서",q1:"리딩튜터 주니어 1",q2:"1316 Reading Level 1",q3:"리딩튜터 주니어 2",q4:"1316 Reading Level 2"},
      { subArea:"독해 심화(수능)",q1:"",q2:"",q3:"수능 입독 중학 Level 1",q4:"첫번째 수능영어 기초편"},
    ]},
    { area:"Listening", rows:[{ subArea:"",q1:"주니어 리스닝튜터 입문",q2:"1316 Listening Level 1",q3:"",q4:"능률 중학영어듣기 1"}]},
    { area:"Grammar\n& 구문", rows:[
      { subArea:"문법",q1:"중학 영문법 Link 1",q2:"Grammar Inside 1",q3:"1316 Grammar Level 1",q4:"문나중 Level 1"},
      { subArea:"구문",q1:"",q2:"중학 구문 Level 1",q3:"",q4:""},
    ]},
  ]},
  { level:"중등 2", levelId:"middle", bg:"bg-cyan-500", text:"text-white", sections:[
    { area:"Reading", rows:[
      { subArea:"ELT / 원서형",q1:"Jr Reading Expert 2",q2:"Subject Link 9",q3:"Reading Inside 2",q4:"Jr Reading Expert 3"},
      { subArea:"독해 기본서",q1:"리딩튜터 주니어 3",q2:"1316 Reading Level 3",q3:"리딩튜터 주니어 4",q4:"1316 Reading Level 4"},
      { subArea:"독해 심화(수능)",q1:"수능 입독 중학 Level 2",q2:"",q3:"첫번째 수능영어 실력편",q4:""},
    ]},
    { area:"Listening", rows:[{ subArea:"",q1:"1316 Listening Level 2",q2:"",q3:"능률 중학영어듣기 2",q4:""}]},
    { area:"Grammar\n& 구문", rows:[
      { subArea:"문법",q1:"중학 영문법 Link 2",q2:"Grammar Inside 2",q3:"1316 Grammar Level 2",q4:"문나중 Level 2"},
      { subArea:"구문",q1:"중학 구문 Level 2",q2:"",q3:"중학 구문 Level 3",q4:""},
    ]},
  ]},
  { level:"중등 3", levelId:"middle", bg:"bg-cyan-400", text:"text-cyan-950", sections:[
    { area:"Reading", rows:[
      { subArea:"ELT / 원서형",q1:"Reading Inside 3",q2:"Reading Expert 1",q3:"Reading Inside 4",q4:"Reading Expert 2"},
      { subArea:"독해 기본서",q1:"YBM Reading Power 1",q2:"리딩튜터 실력",q3:"YBM Reading Power 2",q4:"1316 Reading Level 6"},
      { subArea:"독해 심화(수능)",q1:"수능 입독 고교 Level 1",q2:"첫번째 수능영어 완성편",q3:"수능 입독 고교 Level 2",q4:""},
    ]},
    { area:"Listening", rows:[{ subArea:"",q1:"1316 Listening Level 3",q2:"능률 중학영어듣기 3",q3:"",q4:"수능 기초 Listening"}]},
    { area:"Grammar\n& 구문", rows:[
      { subArea:"문법",q1:"Grammar Inside 3",q2:"1316 Grammar Level 3",q3:"문나중 Level 3",q4:"고교 문법 입문"},
      { subArea:"구문",q1:"중학 구문 완성",q2:"",q3:"고교 구문 입문",q4:""},
    ]},
  ]},
  { level:"고등 1", levelId:"high", bg:"bg-blue-600", text:"text-white", sections:[
    { area:"Reading", rows:[
      { subArea:"ELT / 원서형",q1:"Reading Expert 3",q2:"Reading Expert 4",q3:"Advanced Reading Expert 1",q4:""},
      { subArea:"독해 기본서",q1:"리딩튜터 완성 1",q2:"수능 기본 독해 Level 1",q3:"리딩튜터 완성 2",q4:"수능 기본 독해 Level 2"},
      { subArea:"독해 심화(수능)",q1:"수능 실전 독해 기본",q2:"",q3:"수능 모의 독해 1",q4:"능률 수능영어 독해 1"},
    ]},
    { area:"Listening", rows:[{ subArea:"",q1:"수능 기초 Listening",q2:"능률 수능 영어듣기 기본",q3:"수능 Listening 실전 1",q4:"능률 수능영어듣기 22회 1"}]},
    { area:"Grammar\n& 구문", rows:[
      { subArea:"문법",q1:"고교 영문법 Link 1",q2:"Grammar Inside 고교",q3:"1316 Grammar 고급",q4:"수능 문법 완성"},
      { subArea:"구문",q1:"고교 구문 Level 1",q2:"수능 구문 기본",q3:"고교 구문 Level 2",q4:""},
    ]},
  ]},
  { level:"고등\n2·3학년", levelId:"high", bg:"bg-blue-500", text:"text-white", sections:[
    { area:"Reading", rows:[
      { subArea:"ELT / 원서형",q1:"Advanced Reading Expert 2",q2:"",q3:"",q4:""},
      { subArea:"독해 기본서",q1:"수능 기본 독해 Level 3",q2:"리딩튜터 수능 실전",q3:"",q4:""},
      { subArea:"독해 심화(수능)",q1:"수능 모의 독해 2",q2:"능률 수능영어 독해 2",q3:"수능 실전 독해 심화",q4:"EBS 연계 독해 완성"},
    ]},
    { area:"Listening", rows:[{ subArea:"",q1:"수능 Listening 실전 2",q2:"능률 수능영어듣기 22회 2",q3:"수능 Listening 파이널",q4:""}]},
    { area:"Grammar\n& 구문", rows:[
      { subArea:"문법",q1:"수능 문법 실전",q2:"",q3:"",q4:""},
      { subArea:"구문",q1:"수능 구문 완성",q2:"고교 구문 마스터",q3:"",q4:""},
    ]},
  ]},
];

function flatten(blocks: LevelBlock[]): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const block of blocks) {
    const levelSpan = block.sections.reduce((s, sec) => s + sec.rows.length, 0);
    let firstInLevel = true; let rowIndex = 0;
    for (const section of block.sections) {
      const areaSpan = section.rows.length; let firstInArea = true;
      for (const row of section.rows) {
        rows.push({ levelLabel: block.level, levelBg: block.bg, levelText: block.text, levelSpan, showLevel: firstInLevel, areaLabel: section.area, areaSpan, showArea: firstInArea, subArea: row.subArea, q1: row.q1, q2: row.q2, q3: row.q3, q4: row.q4, rowIndex: rowIndex++ });
        firstInLevel = false; firstInArea = false;
      }
    }
  }
  return rows;
}

const LEVEL_TABS = [
  { id:"all", label:"전체", desc:"전체 커리큘럼을\n한눈에", figure:"👩‍🏫", activeBg:"bg-slate-700", activeBorder:"border-slate-700", activeFigBg:"bg-slate-800", inactiveFigBg:"bg-slate-100", inactiveText:"text-slate-700" },
  { id:"elementary", label:"초등", desc:"기초부터 쉽고\n재미있게 학습하는", figure:"🧒", activeBg:"bg-green-600", activeBorder:"border-green-600", activeFigBg:"bg-green-700", inactiveFigBg:"bg-green-50", inactiveText:"text-green-700" },
  { id:"middle", label:"중등", desc:"체계적으로 탄탄하게\n실력을 쌓는", figure:"🧑", activeBg:"bg-cyan-600", activeBorder:"border-cyan-600", activeFigBg:"bg-cyan-700", inactiveFigBg:"bg-cyan-50", inactiveText:"text-cyan-700" },
  { id:"high", label:"고등", desc:"수능 기본기부터\n실전 대비까지", figure:"👩‍🎓", activeBg:"bg-blue-600", activeBorder:"border-blue-600", activeFigBg:"bg-blue-700", inactiveFigBg:"bg-blue-50", inactiveText:"text-blue-700" },
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function RoadmapClient() {
  // ── Configurator state ──
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel | "">("");
  const [grade, setGrade]             = useState<string>("");
  const [studentLevel, setStudentLevel] = useState<StudentLevel | "">("");
  const [duration, setDuration]       = useState<2 | 3 | 6>(3);
  const [result, setResult]           = useState<CourseRec | null>(null);
  const [generated, setGenerated]     = useState(false);

  // ── Table state ──
  const [activeTab, setActiveTab] = useState("middle");
  const activeTabConfig = LEVEL_TABS.find((t) => t.id === activeTab)!;
  const filtered = activeTab === "all" ? CURRICULUM : CURRICULUM.filter((b) => b.levelId === activeTab);
  const rows = flatten(filtered);

  const gradeOptions = schoolLevel ? GRADE_OPTIONS[schoolLevel] : [];
  const canGenerate = schoolLevel && grade && studentLevel;

  const handleGenerate = () => {
    const key = `${schoolLevel}-${grade}-${studentLevel}`;
    const rec = RECOMMENDATIONS.find((r) => r.key === key);
    const course = rec?.courses.find((c) => c.duration === duration) ?? null;
    setResult(course);
    setGenerated(true);
  };

  const handleReset = () => { setSchoolLevel(""); setGrade(""); setStudentLevel(""); setResult(null); setGenerated(false); };

  // month groups
  const monthGroups: Record<number, RecBook[]> = {};
  if (result) {
    for (const b of result.books) {
      if (!monthGroups[b.month]) monthGroups[b.month] = [];
      monthGroups[b.month].push(b);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* ══════════════════════════════════════
          SECTION 1 : 맞춤 로드맵 설계
      ══════════════════════════════════════ */}
      <section>
        <div className="mb-5">
          <h1 className="text-2xl font-black text-slate-800">학습로드맵</h1>
          <p className="text-slate-500 text-sm mt-1">학생 수준에 맞는 맞춤 교재 코스를 설계하고, 전체 커리큘럼을 참고하세요.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-[#1B3A6B] to-blue-700 px-6 py-4 flex items-center gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <h2 className="text-white font-black text-base">맞춤 교재 로드맵 설계</h2>
              <p className="text-blue-200 text-xs mt-0.5">학교급 · 학년 · 레벨을 선택하면 최적의 코스를 추천해 드립니다</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Step 1: 학교급 */}
            <div>
              <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-[#1B3A6B] text-white rounded-full text-[10px] flex items-center justify-center font-black">1</span>
                학교급 선택
              </p>
              <div className="flex gap-2">
                {(["초등","중등","고등"] as SchoolLevel[]).map((lv) => (
                  <button key={lv} onClick={() => { setSchoolLevel(lv); setGrade(""); setResult(null); setGenerated(false); }}
                    className={`px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                      schoolLevel === lv ? "bg-[#1B3A6B] border-[#1B3A6B] text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                    }`}>{lv}</button>
                ))}
              </div>
            </div>

            {/* Step 2: 학년 */}
            {schoolLevel && (
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-[#1B3A6B] text-white rounded-full text-[10px] flex items-center justify-center font-black">2</span>
                  학년 선택
                </p>
                <div className="flex gap-2 flex-wrap">
                  {gradeOptions.map((g) => (
                    <button key={g} onClick={() => { setGrade(g); setResult(null); setGenerated(false); }}
                      className={`px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                        grade === g ? "bg-[#1B3A6B] border-[#1B3A6B] text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}>{g}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: 학생 수준 */}
            {grade && (
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-[#1B3A6B] text-white rounded-full text-[10px] flex items-center justify-center font-black">3</span>
                  학생 수준
                </p>
                <div className="flex gap-2">
                  {(["기초","중급","고급"] as StudentLevel[]).map((lv) => {
                    const colors = { 기초: "border-green-400 bg-green-600 text-white", 중급: "border-blue-400 bg-blue-600 text-white", 고급: "border-purple-400 bg-purple-600 text-white" };
                    const inact  = { 기초: "border-green-200 text-green-700 hover:border-green-400", 중급: "border-blue-200 text-blue-700 hover:border-blue-400", 고급: "border-purple-200 text-purple-700 hover:border-purple-400" };
                    return (
                      <button key={lv} onClick={() => { setStudentLevel(lv); setResult(null); setGenerated(false); }}
                        className={`px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${studentLevel === lv ? colors[lv] + " shadow-sm" : "bg-white " + inact[lv]}`}>
                        {lv}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: 코스 기간 */}
            {studentLevel && (
              <div>
                <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-[#1B3A6B] text-white rounded-full text-[10px] flex items-center justify-center font-black">4</span>
                  코스 기간
                </p>
                <div className="flex gap-2">
                  {([2,3,6] as (2|3|6)[]).map((d) => (
                    <button key={d} onClick={() => { setDuration(d); setResult(null); setGenerated(false); }}
                      className={`px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                        duration === d ? "bg-amber-500 border-amber-500 text-white shadow-sm" : "bg-white border-amber-200 text-amber-700 hover:border-amber-400"
                      }`}>{d}개월 코스</button>
                  ))}
                </div>
              </div>
            )}

            {/* 생성 버튼 */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm transition-all shadow-sm ${
                  canGenerate
                    ? "bg-[#1B3A6B] hover:bg-[#163060] text-white hover:shadow-md"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                로드맵 생성하기
              </button>
              {generated && (
                <button onClick={handleReset} className="text-sm text-slate-500 hover:text-slate-700 underline">
                  초기화
                </button>
              )}
            </div>
          </div>

          {/* ── 결과 ── */}
          {generated && (
            <div className="border-t border-slate-100">
              {result ? (
                <div className="p-6">
                  {/* 결과 헤더 */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-800">
                        {schoolLevel} {grade} · {studentLevel} · {duration}개월 코스
                      </span>
                      <span className="text-xs bg-[#1B3A6B] text-white px-2.5 py-0.5 rounded-full font-bold">추천 교재 {result.books.length}권</span>
                    </div>
                  </div>

                  {/* 영역 범례 */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {(Object.keys(AREA_CONFIG) as AreaKey[])
                      .filter((a) => result.books.some((b) => b.area === a))
                      .map((a) => (
                        <span key={a} className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${AREA_CONFIG[a].light} ${AREA_CONFIG[a].color}`}>
                          <span className={`w-2 h-2 rounded-full ${AREA_CONFIG[a].bg}`} />
                          {AREA_CONFIG[a].label}
                        </span>
                    ))}
                  </div>

                  {/* 타임라인 */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {Object.entries(monthGroups)
                      .sort(([a],[b]) => Number(a)-Number(b))
                      .map(([month, books]) => (
                        <div key={month} className="shrink-0 w-44">
                          {/* 월 헤더 */}
                          <div className="text-center mb-2">
                            <span className="inline-block text-xs font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{month}개월차</span>
                          </div>
                          <div className="space-y-2">
                            {books.map((book, j) => {
                              const ac = AREA_CONFIG[book.area];
                              const bk = book.bookId ? BOOKS_BASIC[book.bookId] : null;
                              return (
                                <div key={j} className={`rounded-xl border p-3 ${ac.light}`}>
                                  {/* 영역 뱃지 */}
                                  <span className={`inline-block text-[9px] font-black px-1.5 py-0.5 rounded-full text-white mb-2 ${ac.bg}`}>
                                    {ac.label}
                                  </span>
                                  {/* 표지 */}
                                  {bk?.image ? (
                                    <img src={bk.image} alt={book.title} className="w-10 h-14 object-cover rounded-lg shadow-sm border border-white mx-auto mb-2" />
                                  ) : (
                                    <div className="w-10 h-14 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto mb-2 text-xl border">
                                      {bk?.emoji ?? "📚"}
                                    </div>
                                  )}
                                  {/* 제목 */}
                                  <p className={`text-[10px] font-bold leading-snug ${ac.color} text-center line-clamp-2`}>{book.title}</p>
                                  {/* 팁 */}
                                  <p className="text-[9px] text-slate-400 leading-snug mt-1 text-center">{book.tip}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                    ))}
                  </div>

                  {/* 안내 문구 */}
                  <p className="mt-4 text-xs text-slate-400">
                    * 추천 교재는 YBM 대표 교재를 기준으로 구성되었으며, 학생 개인별 수준에 따라 조정하세요.
                  </p>
                </div>
              ) : (
                <div className="p-6 flex items-center gap-3 text-slate-500">
                  <span className="text-2xl">🤔</span>
                  <div>
                    <p className="font-semibold text-sm">해당 조건의 추천 코스를 준비 중입니다.</p>
                    <p className="text-xs mt-0.5">다른 조합을 선택하거나 아래 커리큘럼 표를 참고해 주세요.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 : 전체 교재 커리큘럼 표
      ══════════════════════════════════════ */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-black text-slate-800">전체 교재 커리큘럼</h2>
          <p className="text-slate-500 text-sm mt-0.5">YBM 대표 교재들로 구성된 수준별 연간 커리큘럼입니다.</p>
        </div>

        {/* 레벨 탭 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {LEVEL_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-200 text-left ${isActive ? `${tab.activeBg} ${tab.activeBorder} text-white shadow-lg` : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:shadow-md"}`}>
                <div className="px-4 pt-4 pb-2">
                  <p className={`text-[11px] leading-snug whitespace-pre-line ${isActive ? "text-white/80" : "text-slate-400"}`}>{tab.desc}</p>
                </div>
                <div className="flex justify-center pb-2">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl ${isActive ? tab.activeFigBg : tab.inactiveFigBg} transition-colors`}>{tab.figure}</div>
                </div>
                <div className={`text-center px-4 pb-4 pt-1 border-t ${isActive ? "border-white/20" : "border-slate-100"}`}>
                  <span className={`text-xl font-black tracking-tight ${isActive ? "text-white" : tab.inactiveText}`}>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 커리큘럼 표 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm" style={{ minWidth: "900px" }}>
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
                  <tr key={i} className={`border-b border-slate-100 last:border-0 ${row.rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                    {row.showLevel && (
                      <td rowSpan={row.levelSpan} className={`${row.levelBg} ${row.levelText} text-center px-3 py-3 font-black text-sm leading-snug align-middle border-r border-white/20 whitespace-pre-line`}>{row.levelLabel}</td>
                    )}
                    {row.showArea && (
                      <td rowSpan={row.areaSpan} className="px-3 py-3 text-center align-middle border-r border-slate-100 bg-slate-700 text-white">
                        <span className="text-xs font-bold whitespace-pre-line leading-snug">{row.areaLabel}</span>
                      </td>
                    )}
                    <td className="px-3 py-3 border-r border-slate-100 bg-slate-50">
                      {row.subArea ? <span className="text-xs text-slate-600 font-medium">· {row.subArea}</span> : <span className="text-xs text-slate-300">—</span>}
                    </td>
                    {[row.q1, row.q2, row.q3, row.q4].map((q, qi) => (
                      <td key={qi} className={`px-4 py-3 ${qi % 2 === 1 ? "bg-slate-50/40" : ""} ${qi < 3 ? "border-r border-slate-100" : ""}`}>
                        {q ? <span className="text-xs text-slate-700 leading-snug">{q}</span> : <span className="text-slate-200 text-xs">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400 text-center">
          * 위 커리큘럼은 권장 순서이며, 학습자 수준에 따라 조정할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
