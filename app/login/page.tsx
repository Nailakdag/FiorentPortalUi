import * as ROUTES from "@/contants/routes";
import { getCurrentUser } from "@/lib/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";

export const metadata: Metadata = {
  title: "Giriş Yap | Fiorent",
  description: "Fiorent hesabınıza güvenli giriş yapın",
  openGraph: {
    title: "Fiorent - Giriş Yap",
    description: "Hesabınıza güvenli bir şekilde giriş yapın",
  },
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(ROUTES.WORK_ORDER);
  }

  return (
    <main className="min-h-screen flex">
      <LeftPanel />
      <RightPanel />
    </main>
  );
}
