import { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

export default function useGlobalFilter(onPaginationChange: any) {
  const getStorageKey = () => {
    if (typeof window !== "undefined") {
      return `${window.location.pathname}_globalFilter`;
    }
    return "globalFilter";
  };

  const [savedGlobalFilter, setValue] = useSessionStorage(getStorageKey(), "");
  const [globalFilter, setGlobalFilter] = useState(savedGlobalFilter);

  useEffect(() => {
    setValue(globalFilter);
  }, [globalFilter, setValue]);

  return {
    globalFilter,
    setGlobalFilter: (params: any) => {
      setGlobalFilter(params);
      onPaginationChange((prev: any) => ({ ...prev, pageIndex: 0 }));
    },
  };
}
