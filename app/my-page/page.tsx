export default function MyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-slate-800 mb-6">My Page</h1>

      {/* 프로필 카드 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-5">
        <div className="bg-[#1B3A6B] px-6 py-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
            👩‍🏫
          </div>
          <h2 className="font-black text-xl">홍길동 강사님</h2>
          <p className="text-blue-200 text-sm mt-1">hong@ybm.co.kr</p>
        </div>
      </div>

      {/* 회원정보 수정 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
          회원정보 수정
        </h3>
        <div className="space-y-1">
          {[
            { label: "이름",     value: "홍길동" },
            { label: "이메일",   value: "hong@ybm.co.kr" },
            { label: "소속기관", value: "YBM 어학원 강남점" },
            { label: "담당과목", value: "영어 (독해, 문법)" },
            { label: "가입일",   value: "2024년 3월 1일" },
          ].map((field) => (
            <div key={field.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <span className="text-sm text-slate-500 w-24 shrink-0">{field.label}</span>
              <span className="text-sm font-medium text-slate-800 flex-1">{field.value}</span>
              <button className="text-xs text-blue-600 hover:underline shrink-0">수정</button>
            </div>
          ))}
        </div>
        <button className="mt-5 w-full bg-[#1B3A6B] hover:bg-[#163060] text-white py-3 rounded-xl font-semibold text-sm transition-colors">
          정보 저장
        </button>
      </div>

      {/* 내 유료서비스 내역 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
          <span className="w-1 h-5 bg-blue-600 rounded-full inline-block shrink-0" />
          <h3 className="font-bold text-slate-800">내 유료서비스 내역</h3>
          <span className="ml-1 text-xs text-slate-400 font-normal bg-slate-100 px-2.5 py-0.5 rounded-full">
            추후 도입 가능성
          </span>
        </div>

        {/* 안내 메시지 */}
        <div className="px-6 py-10 flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">
            🛒
          </div>
          <p className="text-sm font-semibold text-slate-600">현재 이용 중인 유료 서비스가 없습니다.</p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
            온라인 콘텐츠 유료화 서비스 도입 시 구독권·단건 결제 내역이<br />
            이 화면에서 조회됩니다.
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full max-w-xs">
            {/* 예시 목록 (비활성 미리보기) */}
            {[
              { name: "커넥팅북 이용권 (월정액)", date: "—", price: "—" },
              { name: "AI평가 크레딧 (10회)",     date: "—", price: "—" },
              { name: "어휘출제마법사 Pro",        date: "—", price: "—" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-dashed border-slate-200 opacity-50"
              >
                <span className="text-xs text-slate-500 font-medium">{item.name}</span>
                <span className="text-xs text-slate-400">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
