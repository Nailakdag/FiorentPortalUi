"use client";
import { useMemo } from "react";
import { ChevronDownIcon } from "lucide-react";
import { useTableData } from "@/lib/hooks/use-table-data";
import { Column, DataTable } from "@/components/data-table/data-table";
import useGlobalFilter from "@/lib/hooks/use-global-filter";
import { usePagination } from "@/lib/hooks/use-pagination";
import { useSorting } from "@/lib/hooks/use-sorting";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function InspectionTable({}: any) {
  const router = useRouter();

  const { limit, onPaginationChange, skip, pagination } = usePagination();

  const { sorting, onSortingChange, field, order } = useSorting();

  const { globalFilter, setGlobalFilter } = useGlobalFilter(onPaginationChange);

  const otherFilters = useMemo(() => {
    return {};
  }, []);

  const { data, totalCount, loading, refetchData } = useTableData(
    "/api/inspection",
    {
      pagination: { limit, skip },
      sort: { field, order },
      globalFilter,
      otherFilters,
    },
  );

  const tableColumns: Column[] = [
    {
      key: "actions",
      header: "İşlemler",
      render: (_: any, row: any) => {
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
                    `/dashboard/inspection/create-or-edit?id=${row.id}`,
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
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    ...columns,
  ];

  return (
    <DataTable
      columns={tableColumns}
      data={data}
      totalCount={totalCount}
      loading={loading}
      showSearch={true}
      searchPlaceholder="Muayene Ara"
      showAddButton={true}
      addButtonText="Yeni Muayene"
      onAddClick={() => router.push("/dashboard/inspection/create-or-edit")}
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
  );
}
