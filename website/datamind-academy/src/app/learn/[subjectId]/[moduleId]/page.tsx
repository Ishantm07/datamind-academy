import { redirect } from "next/navigation";

export default function ModuleIndexPage({
  params,
}: {
  params: { subjectId: string; moduleId: string };
}) {
  const subjectId = (params.subjectId || "sql").toLowerCase();
  const moduleId = (params.moduleId || "m1").toLowerCase();

  redirect(`/learn/${subjectId}/${moduleId}/theory`);
}
