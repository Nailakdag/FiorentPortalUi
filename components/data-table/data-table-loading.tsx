import { Search, Plus } from "lucide-react";
import { DataTableSearchAndAddButton } from "./data-table-seach-add-button";
interface ITableLoadingProps {
  className?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  globalFilter?: string;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddClick?: () => void;
  loading?: boolean;
}

export function TableLoading({
  className,
  showSearch,
  searchPlaceholder,
  globalFilter,
  handleSearchChange,
  showAddButton,
  loading,
  addButtonText,
  onAddClick,
}: ITableLoadingProps) {
  return (
    <>
      <div className={`space-y-6 ${className}`}>
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
        {/* Loading State */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-500 text-sm">Yükleniyor...</p>
          </div>
        </div>
      </div>
    </>
  );
}
