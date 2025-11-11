"use client";
import useFetchAndSetState from "@/lib/hooks/useFetchAndSetState";
import { useSearchParams } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

type ComplaintContextProps = {
  complaint: any;
  isLoading: boolean;
  refetch: () => void;
};

const ComplaintContext = createContext<ComplaintContextProps | null>(null);

type ComplaintProviderProps = {
  children: ReactNode;
};

export const ComplaintProvider = ({ children }: ComplaintProviderProps) => {
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const relatedRecordId = currentQueryParams.get("id");
  const {
    refetch,
    data: complaint,
    isLoading,
  } = useFetchAndSetState(
    `/api/complaint/create-or-edit${
      relatedRecordId ? `?id=${relatedRecordId}` : ""
    }`,
  );

  return (
    <ComplaintContext.Provider
      value={{
        complaint,
        isLoading,
        refetch,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export function useComplaintContext() {
  return useContext(ComplaintContext) as ComplaintContextProps;
}
