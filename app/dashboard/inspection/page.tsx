import { Metadata } from "next";
import { Suspense } from "react";
import InspectionTable from "./table";

export const metadata: Metadata = {
  title: "Muayene",
};

async function InspectionPage() {
  return (
    <div className="h-full w-full flex-1 flex-col space-y-8  md:flex">
      <div className="flex-1">
        <InspectionTable />
      </div>
    </div>
  );
}

export default async function Page() {
  return (
    <Suspense fallback={"..."}>
      <InspectionPage />
    </Suspense>
  );
}
