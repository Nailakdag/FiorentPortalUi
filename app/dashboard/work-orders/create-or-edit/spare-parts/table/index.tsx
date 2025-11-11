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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddItemForm } from "../form/add-item-form";
import { useWorkOrderLookupsContext } from "../../context/workOrderLookupsContext";

interface SparePartsTableProps {
  fleetWorkOrderId?: string;
}

export default function SparePartsTable({
  fleetWorkOrderId,
}: SparePartsTableProps) {
  const {
    unitOfMeasures,
    materialTypes,
    materialClasses,
    reflected,
    taxRates,
    generalStatus,
  } = useWorkOrderLookupsContext();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null); // Row setleme

  const { limit, onPaginationChange, skip } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const { globalFilter, setGlobalFilter } = useGlobalFilter(onPaginationChange);

  const otherFilters = useMemo(() => {
    return fleetWorkOrderId ? { fleetWorkOrderId } : {};
  }, [fleetWorkOrderId]);

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

  const tableColumns = [
    {
      key: "actions",
      header: "Düzenle",
      render: (_: any, row: any) => (
        <Button
          size="sm"
          type="button"
          className="bg-denizFiloBlue"
          onClick={() => {
            setSelectedRow(row);
            setIsOpen(true);
          }}
        >
          Düzenle
        </Button>
      ),
    },
    ...columns,
  ];

  return (
    <div>
      <AccordionCardContainer
        title="Yedek Parça & İşçilik"
        icon={<Settings />}
        colorScheme="gray"
        isOpen={isAccordionOpen}
        onToggle={handleAccordionToggle}
      >
        <div className="mt-2">
          <DataTable
            columns={tableColumns}
            data={data}
            totalCount={totalCount}
            loading={loading}
            showSearch
            searchPlaceholder="Araç ara (plaka, marka, model, sürücü...)"
            showAddButton
            addButtonText="Ekle"
            onAddClick={() => setIsOpen(true)}
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yedek Parça</DialogTitle>
          </DialogHeader>
          <AddItemForm
            openAddItem={(open: boolean) => {
              refetchData?.();
              setIsOpen(open);
            }}
            unitOfMeasures={unitOfMeasures}
            materialTypes={materialTypes}
            materialClasses={materialClasses}
            statuses={generalStatus}
            reflected={reflected}
            taxRates={taxRates}
            row={selectedRow}
            refetchData={refetchData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
