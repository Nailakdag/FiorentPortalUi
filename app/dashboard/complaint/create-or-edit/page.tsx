"use client";

import React from "react";
import General from "./general";

export default function WorkOrderCreateOrEditPage() {
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
