import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1B3A6B] text-white mt-auto">
      {/* 상단 링크 그리드 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-black text-2xl tracking-tighter mb-3">
              Y<span className="text-amber-400">튜</span>터
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              YBM 강사를 위한<br />스마트 교육 솔루션 플랫폼
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xs mb-4 text-blue-300 uppercase tracking-widest">메뉴</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "교재", href: "/textbooks" },
                { label: "마이클래스", href: "/my-class" },
                { label: "학습로드맵", href: "/roadmap" },
                { label: "에듀테크", href: "/edutech" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-blue-100 hover:text-amber-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xs mb-4 text-blue-300 uppercase tracking-widest">고객센터</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "공지사항", href: "/support/notices" },
                { label: "이벤트", href: "/support/events" },
                { label: "이슈톡", href: "/support/issue-talk" },
                { label: "FAQ", href: "/support/faq" },
                { label: "마이페이지", href: "/my-page" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-blue-100 hover:text-amber-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xs mb-4 text-blue-300 uppercase tracking-widest">YBM</h3>
            <p className="text-sm text-blue-200">㈜와이비엠</p>
            <p className="text-sm text-blue-300 mt-2 leading-relaxed">
              서울시 종로구 종로 104<br />
              대표이사: 허문호
            </p>
          </div>
        </div>
      </div>

      {/* 하단 법적 정보 */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs text-blue-300 leading-relaxed">
            ㈜와이비엠&nbsp;&nbsp;서울시 종로구 종로 104&nbsp;&nbsp;대표이사 허문호&nbsp;&nbsp;사업자등록번호 101-81-14655&nbsp;&nbsp;통신판매신고번호 제 01-320 호
          </p>
          <p className="text-xs text-blue-300 mt-1.5">
            사이트 문의 : 02-2000-0500&nbsp;&nbsp;E-mail : ybmbooksam@ybm.co.kr
          </p>
          <p className="text-xs text-blue-400 mt-2">
            Copyright © ㈜와이비엠. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
