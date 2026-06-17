import TextbookDetailClient from "../../components/TextbookDetailClient";
import { BOOK_DB } from "../../lib/bookDb";

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
