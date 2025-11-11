import { Plus, Search } from "lucide-react";
import { DataTableSearchAndAddButton } from "./data-table-seach-add-button";

interface IDataTableEmptyStatesProps {
  className?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  globalFilter?: string;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddClick?: () => void;
  emptyMessage?: string;
}

export function DataTableEmptyStates({
  className = "",
  showSearch = false,
  searchPlaceholder = "Ara...",
  globalFilter,
  handleSearchChange = () => {},
  showAddButton = false,
  addButtonText = "Yeni Ekle",
  onAddClick = () => {},
  emptyMessage = "Henüz veri bulunmamaktadır.",
}: IDataTableEmptyStatesProps) {
  return (
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

      {/* Empty State */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
        </div>
      </div>
    </div>
  );
}
