import { Suspense } from "react";
import VocabWizardClient from "../../components/VocabWizardClient";

export default function VocabWizardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">로딩 중...</div>}>
      <VocabWizardClient />
    </Suspense>
  );
}
