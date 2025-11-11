import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface IDataTablePaginationProps {
  externalPagination: boolean;
  skip: number;
  totalCount?: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  internalCurrentPage: number;
  data: any[];
  showPageSizeSelector: boolean;
  onPaginationChange: (options: {
    pageSize: number;
    pageIndex: number;
  }) => void;
  setInternalCurrentPage: (page: number) => void;
}

export function DataTablePagination({
  externalPagination,
  skip,
  totalCount,
  limit,
  currentPage,
  internalCurrentPage,
  totalPages,
  data,
  showPageSizeSelector,
  onPaginationChange,
  setInternalCurrentPage,
}: IDataTablePaginationProps) {
  const isLastPage = currentPage * limit > totalPages;
  const handlePaginationUpdate = (options: {
    page?: number;
    pageSize?: number;
  }) => {
    const { page, pageSize } = options;

    if (page !== undefined) {
      if (page >= 1 && page <= totalPages) {
        if (externalPagination && onPaginationChange) {
          onPaginationChange({
            pageSize: limit,
            pageIndex: page - 1,
          });
        } else {
          setInternalCurrentPage(page);
        }
      }
    }
    if (pageSize !== undefined) {
      if (externalPagination && onPaginationChange) {
        onPaginationChange({
          pageSize: pageSize,
          pageIndex: skip,
        });
      } else {
        setInternalCurrentPage(1);
      }
    }
  };

  return (
    <div className="bg-white px-6 py-3 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-700">
            <span className="font-medium">
              {externalPagination
                ? skip + 1
                : (internalCurrentPage - 1) * limit + 1}
            </span>{" "}
            -{" "}
            <span className="font-medium">
              {externalPagination
                ? Math.min(skip + limit, totalCount || 0)
                : Math.min(internalCurrentPage * limit, data.length)}
            </span>{" "}
            /{" "}
            <span className="font-medium">
              {externalPagination ? totalCount || 0 : data.length}
            </span>{" "}
            kayıt
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {showPageSizeSelector && (
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm text-gray-700">Sayfa başına kayıt:</span>
              <Select
                value={limit?.toString()}
                onValueChange={(e: any) => {
                  handlePaginationUpdate({
                    pageSize: Number(e),
                  });
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 50, 100, 200, 500, 1000].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => handlePaginationUpdate({ page: 1 })}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => handlePaginationUpdate({ page: currentPage - 1 })}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            disabled={isLastPage}
            onClick={() => handlePaginationUpdate({ page: currentPage + 1 })}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={isLastPage}
            onClick={() => {
              if (externalPagination && totalCount !== undefined) {
                const lastPageIndex = Math.floor((totalCount - 1) / limit);
                onPaginationChange({
                  pageSize: limit,
                  pageIndex: lastPageIndex,
                });
              } else {
                setInternalCurrentPage(totalPages);
              }
            }}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
