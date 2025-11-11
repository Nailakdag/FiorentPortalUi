import { WORK_ORDER } from "@/contants/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(WORK_ORDER);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
