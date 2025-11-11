"use client";
import useFetchAndSetState from "@/lib/hooks/useFetchAndSetState";
import { useSearchParams } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

type VehicleLashAndRescueContextProps = {
  vehicleLashAndRescue: any;
  isLoading: boolean;
  refetch: () => void;
};

const VehicleLashAndRescueContext = createContext<VehicleLashAndRescueContextProps | null>(null);

type VehicleLashAndRescueProviderProps = {
  children: ReactNode;
};

export const VehicleLashAndRescueProvider = ({ children }: VehicleLashAndRescueProviderProps) => {
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const relatedRecordId = currentQueryParams.get("id");
  const {
    refetch,
    data: vehicleLashAndRescue,
    isLoading,
  } = useFetchAndSetState(
    `/api/vehicle-lash-and-rescue/create-or-edit${
      relatedRecordId ? `?id=${relatedRecordId}` : ""
    }`,
  );

  return (
    <VehicleLashAndRescueContext.Provider
      value={{
        vehicleLashAndRescue: vehicleLashAndRescue,
        isLoading,
        refetch,
      }}
    >
      {children}
    </VehicleLashAndRescueContext.Provider>
  );
};

export function useVehicleLashAndRescueContext() {
  return useContext(VehicleLashAndRescueContext) as VehicleLashAndRescueContextProps;
}

