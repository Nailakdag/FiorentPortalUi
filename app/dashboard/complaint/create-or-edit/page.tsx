"use client";

import React, { Suspense } from "react";
import General from "./general";

function ComplaintPageContent() {
  return (
    <div className="bg-gray-50 min-h-screen lg:px-24 xl:px-48">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 px-4">
        <div className="md:col-span-6 flex w-full flex-col gap-8">
          <General />
        </div>
      </div>
    </div>
  );
}

export default function WorkOrderCreateOrEditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComplaintPageContent />
    </Suspense>
  );
}
