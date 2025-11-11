import useDebounce from "@/lib/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Combobox as RadixCombobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useVirtualizer } from "@tanstack/react-virtual";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "./use-toast";

const Combobox = RadixCombobox;

interface DynamicComboboxProps<T> {
  value: T | any;
  onChange?: (value: any) => any;
  label?: string;
  disabled?: boolean;
  items: any[];
  error?: string;
  displayValue: (item: any) => string;
  required?: boolean;
  id?: string;
  className?: string;
  inputClassname?: string;
  buttonClassName?: string;
  asyncItemsUrl?: string;
  additionalParams?: any;
  linkIcon?: boolean;
  type?: string;
  placeHolder?: string;
  closeIconExtraAction?: () => void;
}

const DynamicCombobox = <T,>({
  value,
  onChange,
  label,
  disabled,
  items,
  required = false,
  displayValue,
  id,
  className,
  inputClassname,
  buttonClassName,
  asyncItemsUrl,
  additionalParams,
  type,
  placeHolder,
  closeIconExtraAction,
}: DynamicComboboxProps<T>) => {
  const [query, setQuery] = React.useState("");
  const [localItems, setLocalItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lookupItems = [
    "equipmentSerialNumber",
    "equipment",
    "businessPartner",
    "quote",
  ];

  const handleClearInput = () => {
    setQuery("");
    if (onChange) {
      onChange(null);
    }
    if (closeIconExtraAction) {
      closeIconExtraAction();
    }
  };

  const fetchAsyncItems = useCallback(
    async (url: string, additionalParams?: any) => {
      setIsLoading(true);
      const params = new URLSearchParams(additionalParams || {});
      params.set("filter", query);
      params.set("pagination", "true");
      if (!params.has("sorting")) {
        params.set("sorting", "id desc");
      }
      params.set("maxResultCount", "100");
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response?.ok) {
        setIsLoading(false);
        return toast({
          title: "Beklenmedik bir hata oluştu.",
          description: "Lütfen daha sonra tekrar deneyin.",
          variant: "destructive",
        });
      }
      const items = await response?.json();
      setIsLoading(false);
      setLocalItems(items || []);
    },
    [query],
  );

  const debouncedSearch = useDebounce((url: string) => {
    fetchAsyncItems(url, additionalParams);
  }, 500);

  useEffect(() => {
    if (asyncItemsUrl) {
      debouncedSearch(asyncItemsUrl);
    }
  }, [asyncItemsUrl, query, additionalParams]);

  useEffect(() => {
    if (!asyncItemsUrl) {
      const filteredItems = items?.filter((item) => {
        return displayValue(item)
          ?.toLocaleLowerCase("tr")
          .includes(query.toLocaleLowerCase("tr"));
      });
      setLocalItems(filteredItems);
      if (filteredItems?.length === 0 && query !== "") {
        setQuery("");
      }
    }
  }, [asyncItemsUrl, displayValue, items, query]);

  return (
    <div className="relative">
      <Combobox
        id={id ? id : "id"}
        as="div"
        disabled={disabled}
        value={value ?? { id: null }} // ya da value || { id: null }
        onChange={(newValue) => {
          if (onChange) {
            onChange(newValue);
          }
        }}
        className={`w-full ${className}`}
        nullable
      >
        <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
          <div className="flex">
            {label}
            {required ? <div className="text-red-600">*</div> : null}
          </div>
        </Combobox.Label>
        <div className="relative">
          <Combobox.Button
            className={`inset-y-0 right-0 flex w-full items-center rounded-r-md leading-6 focus:outline-none ${buttonClassName}`}
          >
            <Combobox.Input
              placeholder={placeHolder !== undefined ? placeHolder : "Seçiniz"}
              autoComplete="off"
              className={cn(
                "w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6",
                disabled && "cursor-not-allowed opacity-50",
                value?.id !== undefined && value?.id !== null && inputClassname,
              )}
              onChange={(event) => setQuery(event.target.value)}
              displayValue={displayValue}
            />
            {value?.id !== undefined && value?.id !== null && (
              <span
                role="button"
                aria-disabled={disabled}
                className="absolute inset-y-0 right-0 flex items-center pr-2 focus:outline-none"
                onClick={handleClearInput}
              >
                <X
                  className="mr-6 h-4 w-4 rounded text-gray-400 hover:bg-secondary"
                  aria-hidden="true"
                />
              </span>
            )}
            <ChevronUpDownIcon
              className="ml-[-24px] h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          <Combobox.Options>
            <>
              {isLoading ? (
                <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <Combobox.Option
                    disabled
                    value={{ id: null }}
                    className={({ active }) =>
                      cn(
                        "relative cursor-default select-none py-2 pl-8 pr-4",
                        active ? "bg-indigo-500 text-white" : "text-gray-900",
                      )
                    }
                  >
                    <span className={cn("block truncate")}>Yükleniyor..</span>
                  </Combobox.Option>
                </div>
              ) : (
                <VirtualizedList
                  items={localItems ?? []}
                  displayValue={displayValue}
                />
              )}
            </>
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};

function VirtualizedList({
  items,
  displayValue,
}: {
  items: any[];
  displayValue: (item: any) => string;
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
          return (
            <Combobox.Option
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              value={items?.[virtualRow.index]}
              className={({ active }: { active: boolean }) =>
                cn(
                  "relative cursor-default select-none py-2 pl-8 pr-4",
                  active ? "bg-indigo-500 text-white" : "text-gray-900",
                )
              }
            >
              {({
                active,
                selected,
              }: {
                active: boolean;
                selected: boolean;
              }) => (
                <>
                  <span
                    className={cn(
                      "block truncate",
                      selected && "font-semibold",
                    )}
                  >
                    {displayValue(items?.[virtualRow.index])}
                  </span>

                  {selected && (
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 flex items-center pl-1.5",
                        active ? "text-white" : "text-indigo-600",
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          );
        })}
      </div>
    </div>
  );
}

export { DynamicCombobox as Combobox };
