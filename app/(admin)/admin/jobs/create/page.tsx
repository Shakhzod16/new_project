import { redirect } from "next/navigation";

export default function LegacyCreateJobRedirect() {
  redirect("/admin/create-job");
}
