import { toast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";

type Pagination = {
  skip: number;
  limit: number;
};

type Sort = {
  field: string;
  order: string;
};

interface DataOptions {
  pagination: Pagination;
  sort?: Sort;
  globalFilter?: string;
  otherFilters?: any;
}

export function useTableData(
  url: string | null,
  { pagination, sort, globalFilter, otherFilters }: DataOptions,
) {
  const [data, setData] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);

    const sortingFn = customSortingQuery(sort?.field, sort?.order);

    const params = {
      maxResultCount: pagination.limit,
      skipCount: pagination.skip,
      pagination: true,
      sorting: `${sortingFn?.field} ${sortingFn?.order}`,
      filter: globalFilter,
    };

    const queryParams = new URLSearchParams();

    // Add basic params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, String(value));
      }
    });

    // Add other filters if provided
    if (otherFilters) {
      Object.entries(otherFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => queryParams.append(key, String(val)));
        } else if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const urlWithSearchParams = `${url}?${queryParams}`;

    try {
      const response = await fetch(urlWithSearchParams);

      if (!response?.ok) {
        setLoading(false);
        return toast({
          title: "Verileri çekerken sorun yaşadık.",
          description: "Lütfen daha sonra tekrar deneyin.",
          variant: "destructive",
        });
      }

      const body = await response.json();

      setData(body.data || []);
      setTotalCount(body.totalCount || 0);
    } catch (error) {
      toast({
        title: "Verileri çekerken sorun yaşadık.",
        description: "Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [
    url,
    pagination.limit,
    pagination.skip,
    sort?.field,
    sort?.order,
    globalFilter,
    otherFilters,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    totalCount,
    loading,
    refetchData: fetchData,
  };
}

const customSortingQuery = (field: any, order: any) => {
  return {
    field: field || "",
    order: order || "asc",
  };
};
