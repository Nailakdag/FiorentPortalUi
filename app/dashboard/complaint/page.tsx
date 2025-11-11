import { Metadata } from "next";
import { Suspense } from "react";
import ComplaintTable from "./table";

export const metadata: Metadata = {
  title: "Şikayetler",
};

async function ComplaintPage() {
  return (
    <div className="h-full w-full flex-1 flex-col space-y-8  md:flex">
      <div className="flex-1">
        <ComplaintTable />
      </div>
    </div>
  );
}

export default async function Page() {
  return (
    <Suspense fallback={"..."}>
      <ComplaintPage />
    </Suspense>
  );
}
