"use client";
import { useState, useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { usePagination } from "@/lib/hooks/use-pagination";
import useGlobalFilter from "@/lib/hooks/use-global-filter";
import { useSorting } from "@/lib/hooks/use-sorting";
import { useTableData } from "@/lib/hooks/use-table-data";
import { columns } from "./columns";
import AccordionCardContainer from "@/components/ui/card-accordion";
import { Settings } from "lucide-react";

interface SparePartsHistoryTable {
  equipmentSerialNumberId?: string;
}

export default function SparePartsHistoryTable({
  equipmentSerialNumberId,
}: SparePartsHistoryTable) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  const { limit, onPaginationChange, skip } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const { globalFilter, setGlobalFilter } = useGlobalFilter(onPaginationChange);

  const otherFilters = useMemo(() => {
    return {
      ...(equipmentSerialNumberId
        ? { equipmentSerialNumberId: equipmentSerialNumberId }
        : {}),
    };
  }, [equipmentSerialNumberId]);

  const shouldFetch = isAccordionOpen || hasFetchedOnce;

  const { data, totalCount, loading, refetchData } = useTableData(
    shouldFetch ? "/api/work-orders/spare-parts" : null,
    {
      pagination: { limit, skip },
      sort: { field, order },
      globalFilter,
      otherFilters,
    },
  );

  const handleAccordionToggle = (open: boolean) => {
    setIsAccordionOpen(open);
    if (open && !hasFetchedOnce) {
      setHasFetchedOnce(true);
    }
  };

  return (
    <div>
      <AccordionCardContainer
        title="Yedek Parça & İşçilik Geçmişi"
        icon={<Settings />}
        colorScheme="gray"
        isOpen={isAccordionOpen}
        onToggle={handleAccordionToggle}
      >
        <div className="mt-2">
          <DataTable
            columns={columns}
            data={data}
            totalCount={totalCount}
            loading={loading}
            showSearch
            searchPlaceholder="Araç ara (plaka, marka, model, sürücü...)"
            addButtonText="Ekle"
            onAddClick={() => {}}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
            enableDragDrop
            limit={limit}
            skip={skip}
            enableSort
            onPaginationChange={onPaginationChange}
            enablePin
            onSortingChange={onSortingChange}
            sorting={sorting}
            externalPagination
            externalSort
          />
        </div>
      </AccordionCardContainer>
    </div>
  );
}
