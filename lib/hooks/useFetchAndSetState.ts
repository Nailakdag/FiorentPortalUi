import { useCallback, useEffect, useState } from "react";

export default function useFetchAndSetState(url: any) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const fetchedData = await response.json();
      if (fetchedData !== null) {
        setData(fetchedData);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  }, [url]);

  useEffect(() => {
    if (data?.length === 0) {
      fetchData();
    }
  }, [data?.length, fetchData, url]);

  return { data, isLoading, refetch: fetchData };
}
