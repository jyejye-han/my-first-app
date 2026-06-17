"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SLIDES = [
  {
    badge: "YBM 강사 전용 플랫폼",
    title: <>스마트한 수업,<br /><span className="text-amber-400">Y튜터</span>와 함께</>,
    sub: "교재·수업도구·학습로드맵을 한 곳에서 관리하세요",
    cta: { label: "지금 바로 시작하기", href: "/textbooks" },
    grad: "linear-gradient(135deg, #0f2a56 0%, #1B3A6B 45%, #2558a8 100%)",
    accent: "#2558a8",
  },
  {
    badge: "NEW",
    title: <>AI평가 서비스<br /><span className="text-violet-300">정식 OPEN</span></>,
    sub: "AI 기반 자동 채점 · 피드백으로 수업 효율을 높이세요",
    cta: { label: "AI평가 체험하기", href: "/edutech/ai-eval" },
    grad: "linear-gradient(135deg, #2d1b69 0%, #4c1d95 50%, #6d28d9 100%)",
    accent: "#6d28d9",
  },
  {
    badge: "업데이트",
    title: <>커넥팅북 E-BOOK<br /><span className="text-teal-300">론칭!</span></>,
    sub: "디지털 교재로 수업 퀄리티를 한 단계 높이세요",
    cta: { label: "커넥팅북 바로가기", href: "/edutech/connecting-book" },
    grad: "linear-gradient(135deg, #0c3835 0%, #0f5151 50%, #0d9488 100%)",
    accent: "#0d9488",
  },
  {
    badge: "강사 필수",
    title: <>마이클래스로<br /><span className="text-amber-300">수업 시작</span></>,
    sub: "교재를 담고, 수업안을 만들고, 자료를 다운로드하세요",
    cta: { label: "마이클래스 가기", href: "/my-class" },
    grad: "linear-gradient(135deg, #1a2744 0%, #1e3a5f 50%, #1d4ed8 100%)",
    accent: "#1d4ed8",
  },
];

export default function HomeBannerSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <div
      className="flex-1 relative overflow-hidden rounded-xl flex flex-col justify-between"
      style={{ background: slide.grad, transition: "background 0.6s ease" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 도트 그리드 */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

      {/* 장식 원 */}
      <div className="absolute -top-10 right-10 w-40 h-40 rounded-full border-2 border-white/10 pointer-events-none" />
      <div className="absolute -top-4 right-16 w-24 h-24 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute bottom-0 left-6 w-16 h-16 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-amber-400/60 pointer-events-none" />
      <div className="absolute top-14 right-14 w-2 h-2 rounded-full bg-blue-300/50 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-2.5 h-2.5 rounded-full bg-white/30 pointer-events-none" />

      {/* 콘텐츠 */}
      <div className="relative z-10 px-8 pt-8 pb-4 flex flex-col gap-2 flex-1 justify-center">
        <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-[11px] font-bold px-3 py-1 rounded-full w-fit">
          {slide.badge}
        </span>
        <h1 className="text-[24px] md:text-[30px] font-black tracking-tight leading-tight text-white">
          {slide.title}
        </h1>
        <p className="text-white/70 text-[13px]">{slide.sub}</p>
        <Link
          href={slide.cta.href}
          className="mt-1 inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-all w-fit"
        >
          {slide.cta.label}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 하단 네비게이션 */}
      <div className="relative z-10 flex items-center justify-between px-6 pb-4">
        {/* 화살표 + 페이지 */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 border border-white/20 text-white transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-white/70 text-xs font-semibold tabular-nums">
            {current + 1} / {SLIDES.length}
          </span>
          <button
            onClick={next}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 border border-white/20 text-white transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 점 인디케이터 */}
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
