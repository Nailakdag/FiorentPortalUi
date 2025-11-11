"use client";

import { WorkOrderReasonCode } from "@/contants/enums";
import WorkOrderTable from "../work-orders/table/page";
import { columns } from "../work-orders/table/columns";

export default function Table() {
  return (
    <WorkOrderTable
      customColumns={columns}
      workOrderReasonCode={WorkOrderReasonCode.WorkOrderReasonCode_Tire}
    />
  );
}
