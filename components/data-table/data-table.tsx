"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  GripVertical,
  Pin,
  PinOff,
} from "lucide-react";
import { TableLoading } from "./data-table-loading";
import { DataTableEmptyStates } from "./data-table-empty-states";
import { DataTableSearchAndAddButton } from "./data-table-seach-add-button";
import { DataTablePagination } from "./data-table-pagination";
import useDebounce from "@/lib/hooks/useDebounce";

export interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any, index: number) => React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  sortingId?: string; // Farklı bir sıralama ID'si kullanmak için
  sortable?: boolean;
  pinnable?: boolean;
  width?: number;
}

export interface DataTableProps {
  columns: Column[];
  data: any[];
  totalCount?: number;
  loading?: boolean;
  className?: string;
  emptyMessage?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddClick?: () => void;
  enableDragDrop?: boolean;
  enableSort?: boolean;
  enablePin?: boolean;
  externalSort?: boolean;
  externalPagination?: boolean;
  limit: number;
  skip: number;
  sorting?: Array<{ id: string; desc: boolean }>;
  onSortingChange?: (updater: any) => void;
  onPaginationChange?: any;
  showPageSizeSelector?: boolean;
  globalFilter?: string;
  setGlobalFilter?: (filter: string) => void;
}

export function DataTable({
  columns: initialColumns,
  data,
  totalCount,
  loading = false,
  className = "",
  emptyMessage = "Veri bulunamadı",
  showSearch = false,
  searchPlaceholder = "Ara...",
  showAddButton = false,
  addButtonText = "Yeni Ekle",
  onAddClick,
  enableDragDrop = true,
  enableSort = true,
  enablePin = true,
  externalPagination = false,
  limit,
  globalFilter,
  skip,
  sorting = [],
  onSortingChange,
  onPaginationChange,
  setGlobalFilter,
  showPageSizeSelector = true,
}: DataTableProps) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [columns, setColumns] = useState(initialColumns);
  const [pinnedColumns, setPinnedColumns] = useState<Set<string>>(new Set());
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const tableRef = useRef<HTMLTableElement>(null);

  const currentPage = externalPagination
    ? Math.floor(skip / limit) + 1
    : internalCurrentPage;

  const organizedColumns = useMemo(() => {
    const pinned = columns.filter((col) => pinnedColumns.has(col.key));
    const unpinned = columns.filter((col) => !pinnedColumns.has(col.key));
    return [...pinned, ...unpinned];
  }, [columns, pinnedColumns]);

  const getPinnedColumnPosition = (columnKey: string) => {
    let leftPosition = 0;
    const pinnedColumnsArray = organizedColumns.filter((col) =>
      pinnedColumns.has(col.key),
    );

    for (const col of pinnedColumnsArray) {
      if (col.key === columnKey) break;
      leftPosition += columnWidths[col.key] || col.width || 150;
    }

    return leftPosition;
  };

  useEffect(() => {
    if (!tableRef.current) return;
    const measureColumns = () => {
      const table = tableRef.current;
      if (!table) return;

      const headerCells = table.querySelectorAll("thead th");
      const newWidths: Record<string, number> = {};

      headerCells.forEach((cell, index) => {
        const columnKey = organizedColumns[index]?.key;
        if (columnKey) {
          newWidths[columnKey] = cell.getBoundingClientRect().width;
        }
      });

      setColumnWidths(newWidths);
    };
    measureColumns();
    window.addEventListener("resize", measureColumns);
    return () => {
      window.removeEventListener("resize", measureColumns);
    };
  }, [organizedColumns, data]);

  const handleSort = (columnKey: string) => {
    if (!enableSort || !onSortingChange) return;

    const column = columns.find((col) => col.key === columnKey);
    if (!column || column.sortable === false) return;

    const sortId = column.sortingId ?? column.key;

    onSortingChange((old: Array<{ id: string; desc: boolean }>) => {
      const existingSort = old.find((sort) => sort.id === sortId);
      if (!existingSort) {
        return [{ id: sortId, desc: false }];
      }
      if (!existingSort.desc) {
        return [{ id: sortId, desc: true }];
      }
      return [];
    });
  };

  const handlePin = (key: string) => {
    if (!enablePin) return;

    setPinnedColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleDragStart = (e: React.DragEvent, columnKey: string) => {
    if (!enableDragDrop) return;
    setDraggedColumn(columnKey);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, columnKey: string) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    setDragOverColumn(columnKey);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetKey: string) => {
    if (!enableDragDrop) return;
    e.preventDefault();

    if (draggedColumn && draggedColumn !== targetKey) {
      const draggedIndex = columns.findIndex(
        (col) => col.key === draggedColumn,
      );
      const targetIndex = columns.findIndex((col) => col.key === targetKey);
      const newColumns = [...columns];
      const [removed] = newColumns.splice(draggedIndex, 1);
      newColumns.splice(targetIndex, 0, removed);

      setColumns(newColumns);
    }

    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const totalPages = Math.ceil(totalCount || 0);

  const currentData = useMemo(() => {
    return data;
  }, [data]);

  const handleSearchChange = useDebounce((value: string) => {
    setGlobalFilter?.(value);
  }, 500);

  const renderCellValue = (column: Column, row: any, index: number) => {
    const value = row[column.key];
    if (column.render) {
      return column.render(value, row, index);
    }
    return value;
  };

  const renderSortIcon = (column: Column) => {
    if (!enableSort || column.sortable === false) return null;

    const sortId = column.sortingId ?? column.key;
    const currentSort = sorting.find((sort) => sort.id === sortId);

    if (currentSort) {
      if (currentSort.desc) {
        return <ChevronDown className="w-4 h-4" />;
      } else {
        return <ChevronUp className="w-4 h-4" />;
      }
    }

    return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
  };

  if (loading) {
    return (
      <TableLoading
        loading={loading}
        className={className}
        showSearch={showSearch}
        searchPlaceholder={searchPlaceholder}
        globalFilter={globalFilter}
        handleSearchChange={handleSearchChange}
        showAddButton={showAddButton}
        addButtonText={addButtonText}
        onAddClick={onAddClick}
      />
    );
  }

  if (data.length === 0 && !loading) {
    return (
      <DataTableEmptyStates
        className={className}
        showSearch={showSearch}
        searchPlaceholder={searchPlaceholder}
        globalFilter={globalFilter}
        handleSearchChange={handleSearchChange}
        showAddButton={showAddButton}
        addButtonText={addButtonText}
        onAddClick={onAddClick}
        emptyMessage={emptyMessage}
      />
    );
  }

  return (
    <div className={`space-y-6 pb-10 ${className}`}>
      {/* Header */}
      <DataTableSearchAndAddButton
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        showSearch={showSearch}
        searchPlaceholder={searchPlaceholder}
        globalFilter={globalFilter}
        handleSearchChange={handleSearchChange}
        showAddButton={showAddButton}
        addButtonText={addButtonText}
        onAddClick={onAddClick}
      />

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-auto max-h-[655px] relative">
          <table ref={tableRef} className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                {organizedColumns.map((column, index) => {
                  const isPinned = pinnedColumns.has(column.key);
                  const leftPosition = isPinned
                    ? getPinnedColumnPosition(column.key)
                    : 0;

                  return (
                    <th
                      key={column.key}
                      className={`
                        px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap
                        ${column.className || ""}
                        ${dragOverColumn === column.key ? "bg-blue-50" : ""}
                        ${isPinned ? "bg-gray-100" : ""}
                        transition-colors
                      `}
                      style={
                        isPinned
                          ? {
                              position: "sticky",
                              left: `${leftPosition}px`,
                              zIndex: 20,
                              boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
                            }
                          : {}
                      }
                      draggable={enableDragDrop}
                      onDragStart={(e) => handleDragStart(e, column.key)}
                      onDragOver={(e) => handleDragOver(e, column.key)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, column.key)}
                      onDragEnd={handleDragEnd}
                    >
                      <div
                        className={`flex flex-1 items-center justify-start gap-2 `}
                      >
                        {enableDragDrop && (
                          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        )}
                        <span className="whitespace-nowrap">
                          {column.header}
                        </span>
                        {enableSort && column.sortable !== false && (
                          <button
                            onClick={() => handleSort(column.key)}
                            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {renderSortIcon(column)}
                          </button>
                        )}
                        {enablePin && column.pinnable !== false && (
                          <button
                            onClick={() => handlePin(column.key)}
                            className="ml-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {isPinned ? (
                              <PinOff className="w-3 h-3" />
                            ) : (
                              <Pin className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors py-4 max-h-16 h-16"
                >
                  {organizedColumns.map((column) => {
                    const isPinned = pinnedColumns.has(column.key);
                    const leftPosition = isPinned
                      ? getPinnedColumnPosition(column.key)
                      : 0;

                    return (
                      <td
                        key={column.key}
                        className={`px-6 whitespace-nowrap text-sm text-gray-900
                          ${column.className || ""}
                          ${isPinned ? "bg-gray-50" : ""}
                        `}
                        style={
                          isPinned
                            ? {
                                position: "sticky",
                                left: `${leftPosition}px`,
                                zIndex: 10,
                                boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
                              }
                            : {}
                        }
                      >
                        {renderCellValue(
                          column,
                          row,
                          externalPagination
                            ? skip + index
                            : (internalCurrentPage - 1) * limit + index,
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4 p-4">
          {currentData.map((row, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                {organizedColumns.map((column) => (
                  <div
                    key={column.key}
                    className="flex justify-between items-start"
                  >
                    <span className="text-sm text-gray-500 min-w-0 flex-shrink-0 mr-2 flex items-center gap-1">
                      {column.icon && (
                        <span className="text-gray-400">{column.icon}</span>
                      )}
                      {column.header}:
                    </span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                      {renderCellValue(
                        column,
                        row,
                        externalPagination
                          ? skip + index
                          : (internalCurrentPage - 1) * limit + index,
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <DataTablePagination
          limit={limit}
          skip={skip}
          totalCount={totalCount}
          externalPagination={externalPagination}
          currentPage={currentPage}
          totalPages={totalPages}
          data={data}
          showPageSizeSelector={showPageSizeSelector}
          onPaginationChange={onPaginationChange}
          setInternalCurrentPage={setInternalCurrentPage}
          internalCurrentPage={internalCurrentPage}
        />
      </div>
    </div>
  );
}
