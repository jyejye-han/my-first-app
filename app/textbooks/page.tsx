import { Suspense } from "react";
import TextbooksClient from "../components/TextbooksClient";

export default function TextbooksPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[40vh] text-slate-400">교재 목록을 불러오는 중…</div>}>
      <TextbooksClient />
    </Suspense>
  );
}
