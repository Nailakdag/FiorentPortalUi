"use client";
import { ReactNode, createContext, useContext } from "react";

export type VehicleLashAndRescueLookupsContextProps = {
  equipments: any;
  equipmentSerialNumbers: any;
  generalStatuses: any;
  businessPartners: any;
};

const VehicleLashAndRescueLookupsContext =
  createContext<VehicleLashAndRescueLookupsContextProps | null>(null);

type VehicleLashAndRescueLookupsProviderProps = {
  children: ReactNode;
  value: VehicleLashAndRescueLookupsContextProps;
};

export const VehicleLashAndRescueLookupsProvider = ({
  children,
  value,
}: VehicleLashAndRescueLookupsProviderProps) => {
  return (
    <VehicleLashAndRescueLookupsContext.Provider value={value}>
      {children}
    </VehicleLashAndRescueLookupsContext.Provider>
  );
};

export function useVehicleLashAndRescueLookupsContext() {
  const context = useContext(VehicleLashAndRescueLookupsContext);
  if (!context) {
    return {
      equipments: [],
      equipmentSerialNumbers: [],
      generalStatuses: [],
      businessPartners: [],
    };
  }
  return context;
}
