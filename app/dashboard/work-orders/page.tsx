import { Metadata } from "next";
import { Suspense } from "react";
import WorkOrderTable from "./table/page";

export const metadata: Metadata = {
  title: "İş Emirleri",
};

async function WorkOrdersPage() {
  return (
    <div className="h-full w-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex-1">
        <WorkOrderTable />
      </div>
    </div>
  );
}

export default async function Page() {
  return (
    <Suspense fallback={"..."}>
      <WorkOrdersPage />
    </Suspense>
  );
}
