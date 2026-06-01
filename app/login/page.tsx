"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);

  if (showSignup) {
    return <SignupPage onBack={() => setShowSignup(false)} />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#1B3A6B] text-white font-black px-5 py-2.5 rounded-2xl text-3xl tracking-tighter mb-3">
            Y<span className="text-amber-400">튜</span>터
          </div>
          <p className="text-slate-600 text-sm">YBM 강사 전용 플랫폼</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-xl font-black text-slate-800 text-center mb-6">로그인</h1>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">아이디</label>
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded" />
                로그인 상태 유지
              </label>
              <button type="button" className="text-blue-600 hover:underline">비밀번호 찾기</button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1B3A6B] hover:bg-[#163060] text-white py-3 rounded-xl font-bold text-sm transition-colors mt-2"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              아직 계정이 없으신가요?{" "}
              <button
                onClick={() => setShowSignup(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                회원가입
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          YBM 강사 전용 서비스입니다.{" "}
          <Link href="/support/faq" className="text-blue-500 hover:underline">문의하기</Link>
        </p>
      </div>
    </div>
  );
}

function SignupPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-2xl">

        {/* 타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800 mb-2">회원가입</h1>
          <p className="text-slate-500 text-sm">
            YBM은 회원유형에 따라 다양한 맞춤 서비스 제공을 위해 통합회원제를 운영하고 있습니다.
          </p>
        </div>

        {/* 회원 유형 — 학원 선생님만 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-dashed border-[#1B3A6B] bg-white shadow-sm">
            <div className="w-6 h-6 rounded-full bg-[#1B3A6B] flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-bold text-[#1B3A6B] text-sm">학원 선생님</span>
          </div>
        </div>

        {/* 통합회원 안내 카드 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
          <h2 className="text-center text-lg font-black text-[#1B3A6B] mb-1">
            YBM 선생님 통합회원 가입 안내
          </h2>
          <p className="text-center text-sm text-slate-500 mb-8">
            YBM북스-초중고, Y튜터, YBM스마트스쿨 통합가입으로 다양한 맞춤 서비스와 혜택을 받아보세요.
          </p>

          {/* 서비스 카드 3개 */}
          <div className="flex items-center justify-center gap-3">
            {/* YBM북스 초중고 */}
            <div className="relative flex-1 max-w-[200px] bg-[#1B3A6B] rounded-2xl p-5 flex flex-col items-center gap-2 shadow-lg">
              <div className="w-7 h-7 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-black text-sm leading-snug mb-1">YBM북스<br />초중고</p>
                <p className="text-white/70 text-xs">YBM 참고서 지원 사이트</p>
              </div>
            </div>

            {/* + */}
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <span className="text-slate-500 font-black text-lg">+</span>
            </div>

            {/* Y튜터 */}
            <div className="relative flex-1 max-w-[200px] bg-amber-400 rounded-2xl p-5 flex flex-col items-center gap-2 shadow-lg">
              <div className="w-7 h-7 rounded-full bg-white/30 border-2 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-center">
                <div className="bg-[#1B3A6B] text-white font-black px-3 py-1 rounded-lg text-lg tracking-tighter mb-1 inline-block">
                  Y<span className="text-amber-400">튜</span>터
                </div>
                <p className="text-amber-900/70 text-xs">YBM 강사 전용 플랫폼</p>
              </div>
            </div>

            {/* + */}
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <span className="text-slate-500 font-black text-lg">+</span>
            </div>

            {/* 스마트스쿨 */}
            <div className="relative flex-1 max-w-[200px] bg-violet-600 rounded-2xl p-5 flex flex-col items-center gap-2 shadow-lg">
              <div className="w-7 h-7 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-black text-sm leading-snug mb-1">YBM<br />스마트스쿨</p>
                <p className="text-white/70 text-xs">YBM 교과서<br />수업지원 플랫폼</p>
              </div>
            </div>
          </div>

          {/* JOIN 구분선 */}
          <div className="relative flex items-center justify-center my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-4 text-xs font-bold text-slate-400 tracking-widest">JOIN</span>
          </div>

          {/* 가입하기 버튼 */}
          <button
            type="button"
            className="block w-full text-center py-4 bg-[#1B3A6B] hover:bg-[#163060] text-white font-black text-base rounded-xl transition-colors shadow-md"
          >
            새로운 ID로 가입하기
          </button>
        </div>

        {/* 뒤로가기 */}
        <div className="text-center mb-5">
          <button
            onClick={onBack}
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 mx-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            로그인으로 돌아가기
          </button>
        </div>

        {/* 내부 메모 */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl px-5 py-4 flex items-start gap-3">
          <span className="text-yellow-500 text-lg shrink-0">📝</span>
          <p className="text-sm text-yellow-800 font-medium leading-relaxed">
            <span className="font-bold">[ 논의 필요 ]</span><br />
            북스 초중고 + Y튜터 사이트 통합회원가입 시킬지 여부 논의 필요
          </p>
        </div>

      </div>
    </div>
  );
}
