"use client";
import { useState, useMemo, useRef } from "react";
import { Plus, ClipboardCheck, Cog, ChevronDownIcon } from "lucide-react";
import { useTableData } from "@/lib/hooks/use-table-data";
import { Column, DataTable } from "@/components/data-table/data-table";
import useGlobalFilter from "@/lib/hooks/use-global-filter";
import { usePagination } from "@/lib/hooks/use-pagination";
import { useSorting } from "@/lib/hooks/use-sorting";
import { useRouter } from "next/navigation";
import { startOfWeek, endOfWeek, subWeeks } from "date-fns";
import { isWithinInterval } from "date-fns"; // isAfter/isBefore yerine bunu kullanıyoruz

import { StatCard } from "@/components/ui/card-stack";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceForm } from "./forms/service-form";
import { GeneralStatus, WorkOrderReasonCode } from "@/contants/enums";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WorkOrderTable({
  workOrderReasonCode,
  customColumns,
}: any) {
  const router = useRouter();

  const { limit, onPaginationChange, skip, pagination } = usePagination();

  const { sorting, onSortingChange, field, order } = useSorting();

  const { globalFilter, setGlobalFilter } = useGlobalFilter(onPaginationChange);

  const otherFilters = useMemo(() => {
    return {
      ...(WorkOrderReasonCode
        ? { workOrderReasonCode: workOrderReasonCode }
        : {}),
    };
  }, [workOrderReasonCode]);

  const { data, totalCount, loading, refetchData } = useTableData(
    "/api/work-orders",
    {
      pagination: { limit, skip },
      sort: { field, order },
      globalFilter,
      otherFilters,
    },
  );

  // Trend hesaplama fonksiyonu
  const calculateTrend = (
    currentWeekCount: number,
    previousWeekCount: number,
  ) => {
    if (previousWeekCount === 0) {
      return currentWeekCount > 0 ? 100 : 0;
    }
    return ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;
  };

  const weeklyStats = useMemo(() => {
    const now = new Date();
    const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const thisWeekEnd = endOfWeek(now, { weekStartsOn: 1 });
    const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
    const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });

    const isInRange = (date: Date, start: Date, end: Date) =>
      isWithinInterval(date, { start, end });

    const thisWeekData = data.filter((item: any) =>
      isInRange(new Date(item.endingDate), thisWeekStart, thisWeekEnd),
    );

    const lastWeekData = data.filter((item: any) =>
      isInRange(new Date(item.endingDate), lastWeekStart, lastWeekEnd),
    );

    const countByStatus = (arr: any[], statuses: number[]) =>
      arr.filter((item) => statuses.includes(item.status)).length;

    const thisNew = countByStatus(thisWeekData, [
      GeneralStatus.GeneralStatus_New,
    ]);
    const lastNew = countByStatus(lastWeekData, [
      GeneralStatus.GeneralStatus_New,
    ]);

    const thisInProgress = countByStatus(thisWeekData, [
      GeneralStatus.GeneralStatus_InProgress,
    ]);
    const lastInProgress = countByStatus(lastWeekData, [
      GeneralStatus.GeneralStatus_InProgress,
    ]);

    const thisCompleted = countByStatus(thisWeekData, [
      GeneralStatus.GeneralStatus_Completed,
      GeneralStatus.GeneralStatus_Approved,
    ]);
    const lastCompleted = countByStatus(lastWeekData, [
      GeneralStatus.GeneralStatus_Completed,
      GeneralStatus.GeneralStatus_Approved,
    ]);

    const calculatePercentage = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    return {
      newTrend: calculatePercentage(thisNew, lastNew),
      inProgressTrend: calculatePercentage(thisInProgress, lastInProgress),
      completedTrend: calculatePercentage(thisCompleted, lastCompleted),
    };
  }, [data]);

  const [row, setSelectedRow] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (row: any) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const tableColumns: Column[] = [
    {
      key: "actions",
      header: "İşlemler",
      render: (_: any, row: any) => {
        const isServiste = !!row.endingDate;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                variant="ghost"
                className="inline-flex items-center px-4 py-2 hover:text-white bg-denizFiloBlue text-white text-sm font-medium rounded-lg hover:bg-denizFiloBlue focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                İşlemler
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-white-400"
                  aria-hidden="true"
                />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-auto z-[9999]">
              <DropdownMenuItem
                onClick={() => {
                  router.push(
                    `/dashboard/work-orders/create-or-edit?id=${row.id}`,
                  );
                }}
              >
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between items-center w-full"
                onClick={() => {}}
              >
                <span>Sil</span>
                <DropdownMenuShortcut>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => handleOpenModal(row)}
                className={isServiste ? "text-green-600" : "text-orange-600"}
              >
                {isServiste ? "Serviste" : "Servise Ata"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    ...(customColumns ?? columns),
  ];

  const newRequestCount = data.filter(
    (item: any) => item.status === GeneralStatus.GeneralStatus_New,
  ).length;
  const inProgressCount = data.filter(
    (item: any) => item.status === GeneralStatus.GeneralStatus_InProgress,
  ).length;
  const completedCount = data.filter(
    (item: any) =>
      item.status === GeneralStatus.GeneralStatus_Approved ||
      item.status === GeneralStatus.GeneralStatus_Completed,
  ).length;

  return (
    <div>
      <div className="flex gap-8 w-full flex-1 mb-4">
        <StatCard
          title="Yeni Talepler"
          value={newRequestCount}
          trend={weeklyStats.newTrend > 0 ? "up" : "down"}
          trendValue={Math.abs(weeklyStats.newTrend).toFixed(1)}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
          icon={<Plus className="w-6 h-6" />}
        />
        <StatCard
          title="Devam Eden Talepler"
          value={inProgressCount}
          trend={weeklyStats.inProgressTrend > 0 ? "up" : "down"}
          trendValue={Math.abs(weeklyStats.inProgressTrend).toFixed(1)}
          bgColor="bg-yellow-50"
          iconColor="text-yellow-600"
          icon={<Cog className="w-6 h-6" />}
        />
        <StatCard
          title="Tamamlanan Talepler"
          value={completedCount}
          trend={weeklyStats.completedTrend > 0 ? "up" : "down"}
          trendValue={Math.abs(weeklyStats.completedTrend).toFixed(1)}
          bgColor="bg-green-50"
          iconColor="text-green-600"
          icon={<ClipboardCheck className="w-6 h-6" />}
        />
      </div>

      <DataTable
        columns={tableColumns}
        data={data}
        totalCount={totalCount}
        loading={loading}
        showSearch={true}
        searchPlaceholder="Araç ara (plaka, marka, model, sürücü...)"
        showAddButton={true}
        addButtonText="Yeni Talep"
        onAddClick={() => router.push("/dashboard/work-orders/create-or-edit")}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        enableDragDrop={true}
        limit={limit}
        skip={skip}
        enableSort={true}
        onPaginationChange={onPaginationChange}
        enablePin={true}
        onSortingChange={onSortingChange}
        sorting={sorting}
        externalPagination={true}
        externalSort={true}
      />

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader className="mb-2">
            <DialogTitle>
              {row?.startingDate ? "Servisten Çıkart" : "Servise Al"}
            </DialogTitle>
          </DialogHeader>
          <ServiceForm
            row={row}
            refetchData={refetchData}
            isInService={row?.startingDate}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
