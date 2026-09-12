import { redirect } from "next/navigation";

export default function SubjectLearnIndexPage({
  params,
}: {
  params: { subjectId: string };
}) {
  const subjectId = (params.subjectId || "sql").toLowerCase();
  redirect(`/learn/${subjectId}/m1/theory`);
}
