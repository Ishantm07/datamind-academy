import { redirect } from "next/navigation";

export default function ResourceSectionRedirect({ params }: { params: { section: string } }) {
  const section = params.section || "cheatsheets";
  redirect(`/resources?tab=${section}`);
}
