"use client";
import { ReactNode, createContext, useContext } from "react";

export type InspectionLookupsContextProps = {
  inspectionResponsibles: any;
  inspectionTypes: any;
  equipments: any;
  equipmentSerialNumbers: any;
  generalStatuses: any;
  businessPartners: any;
};

const InspectionLookupsContext =
  createContext<InspectionLookupsContextProps | null>(null);

type InspectionLookupsProviderProps = {
  children: ReactNode;
  value: InspectionLookupsContextProps;
};

export const InspectionLookupsProvider = ({
  children,
  value,
}: InspectionLookupsProviderProps) => {
  return (
    <InspectionLookupsContext.Provider value={value}>
      {children}
    </InspectionLookupsContext.Provider>
  );
};

export function useInspectionLookupsContext() {
  return useContext(InspectionLookupsContext) as InspectionLookupsContextProps;
}
