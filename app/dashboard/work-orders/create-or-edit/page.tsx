"use client";

import React from "react";
import General from "./general";
import Service from "./service";
import DocumentUpload from "./document-upload";
import SparePartsTable from "./spare-parts/table";
import { useWorkOrderContext } from "./context/workOrderContext";
import SparePartsHistoryTable from "./spare-parts-history/table";
import { useSearchParams } from "next/navigation";

export default function WorkOrderCreateOrEditPage() {
  const { workOrder, isLoading } = useWorkOrderContext();
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const id = currentQueryParams.get("id");
  return (
    <div className="bg-gray-50 min-h-screen md:px-8 lg:px-12 xl:px-24 2xl:px-48">
      <div
        id="general"
        className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:px-24 items-stretch"
      >
        <div className="lg:col-span-4 flex w-full flex-col gap-8 h-full">
          {isLoading ? (
            <div className="bg-gray-100 rounded-md h-[300px] animate-pulse" />
          ) : (
            <General />
          )}
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4 h-full">
          {isLoading ? (
            <>
              <div className="bg-gray-100 rounded-md h-[200px] animate-pulse" />
              {id && (
                <div className="bg-gray-100 rounded-md h-[150px] animate-pulse" />
              )}
            </>
          ) : (
            <>
              <Service />
              {workOrder?.fleetWorkOrder?.id && <DocumentUpload />}
            </>
          )}
        </div>
      </div>

      <div id="spare-parts" className="mt-12 w-full lg:px-24 mb-10">
        {isLoading && id ? (
          <div className="bg-gray-100 rounded-md h-[250px] animate-pulse" />
        ) : (
          workOrder?.fleetWorkOrder?.id && (
            <div className="grid grid-cols-1">
              <SparePartsTable fleetWorkOrderId={workOrder.fleetWorkOrder.id} />
            </div>
          )
        )}
      </div>

      <div id="spare-parts-history" className="mt-12 w-full lg:px-24 mb-10">
        {isLoading && id ? (
          <div className="bg-gray-100 rounded-md h-[250px] animate-pulse" />
        ) : (
          workOrder?.fleetWorkOrder?.equipmentSerialNumberId && (
            <div className="grid grid-cols-1">
              <SparePartsHistoryTable
                equipmentSerialNumberId={
                  workOrder.fleetWorkOrder.equipmentSerialNumberId
                }
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
