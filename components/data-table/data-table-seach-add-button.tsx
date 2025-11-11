"use client";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

interface IDataTableSearchAndAddButtonProps {
  className?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  globalFilter?: string;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddClick?: () => void;
}

export function DataTableSearchAndAddButton({
  className = "",
  showSearch = false,
  searchPlaceholder = "Ara...",
  globalFilter,
  handleSearchChange = () => {},
  showAddButton = false,
  addButtonText = "Yeni Ekle",
  onAddClick = () => {},
}: IDataTableSearchAndAddButtonProps) {
  const [globalFilterText, setGlobalFilterText] = useState<string>(
    globalFilter ?? "",
  );

  return (
    <>
      {(showSearch || showAddButton) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search */}
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={globalFilterText}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent the default action of the Enter key
                      e.stopPropagation();
                    }
                  }}
                  onChange={(event: any) => {
                    setGlobalFilterText(event.target?.value);
                    if (
                      event.target?.value === "" ||
                      event.target.value?.length > 2
                    ) {
                      handleSearchChange(event.target?.value);
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            )}

            {/* Add Button */}
            {showAddButton && (
              <button
                type="button"
                onClick={onAddClick}
                className="inline-flex items-center px-4 py-2 bg-denizFiloBlue text-white text-sm font-medium rounded-lg hover:bg-denizFiloBlue focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                {addButtonText}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
