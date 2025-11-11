import { Metadata } from "next";
import { Suspense } from "react";
import Table from "./table";

export const metadata: Metadata = {
  title: "Arıza",
};

async function WorkOrdersFaultPage() {
  return (
    <div className="h-full w-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex-1">
        <Table />
      </div>
    </div>
  );
}

export default async function Page() {
  return (
    <Suspense fallback={"..."}>
      <WorkOrdersFaultPage />
    </Suspense>
  );
}
