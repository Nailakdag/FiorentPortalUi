"use client";
import useFetchAndSetState from "@/lib/hooks/useFetchAndSetState";
import { useSearchParams } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

type InspectionContextProps = {
  inspection: any;
  isLoading: boolean;
  refetch: () => void;
};

const InspectionContext = createContext<InspectionContextProps | null>(null);

type InspectionProviderProps = {
  children: ReactNode;
};

export const InspectionProvider = ({ children }: InspectionProviderProps) => {
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const relatedRecordId = currentQueryParams.get("id");
  const {
    refetch,
    data: inspection,
    isLoading,
  } = useFetchAndSetState(
    `/api/inspection/create-or-edit${
      relatedRecordId ? `?id=${relatedRecordId}` : ""
    }`,
  );

  return (
    <InspectionContext.Provider
      value={{
        inspection: inspection,
        isLoading,
        refetch,
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
};

export function useInspectionContext() {
  return useContext(InspectionContext) as InspectionContextProps;
}
