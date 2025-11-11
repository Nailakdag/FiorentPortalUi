"use client";
import { usePathname } from "next/navigation";
import Layout from "@/components/layout/layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const isCreateOrEditPage = pathname.includes("/create-or-edit");

  if (isCreateOrEditPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen">
      <Layout>{children}</Layout>
    </div>
  );
}
