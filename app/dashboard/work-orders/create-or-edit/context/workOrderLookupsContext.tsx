"use client";
import { ReactNode, createContext, useContext } from "react";

export type WorkOrderLookupsContextProps = {
  businessPartners?: any;
  invoiceTypes?: any;
  generalStatus?: any;
  paymentMethods?: any;
  currencies?: any;
  countries?: any;
  cities?: any;
  districts?: any;
  equipments?: any;
  maintenancePackageEquipments?: any;
  equipmentSerialNumbers?: any;
  priorities?: any;
  channels?: any;
  subReasons?: any;
  licensePlates?: any;
  damageTypes?: any;
  damageDocumentTypes?: any;
  responsiblePartnerTypes?: any;
  damageStatuses?: any;
  damagePayers?: any;
  damageDocumentStatuses?: any;
  replacementGroups?: any;
  tireTypes?: any;
  procurementTypes?: any;
  tireStorageTypes?: any;
  tireChangeReasons?: any;
  tireStorageLocations?: any;
  tireMakes?: any;
  unitOfMeasures?: any;
  materialTypes?: any;
  materialClasses?: any;
  reflected?: any;
  taxRates?: any;
  makes?: any;
  models?: any;
  invoiceDocumentTypes?: any;
  businessPartnerRoles?: any;
  invoiceStatuses?: any;
  deductionTypes?: any;
  paymentTerms?: any;
  users?: any;
  roles?: any;
  tirePositions?: any;
  tireStatuses?: any;
  generalStatuses?: any;
  district?: any;
  tireChangeLocations?: any;
  replacementReasons?: any;
  replacementClasses?: any;
};

const WorkOrderLookupsContext =
  createContext<WorkOrderLookupsContextProps | null>(null);

type WorkOrderLookupsProviderProps = {
  children: ReactNode;
  value: WorkOrderLookupsContextProps;
};

export const WorkOrderLookupsProvider = ({
  children,
  value,
}: WorkOrderLookupsProviderProps) => {
  return (
    <WorkOrderLookupsContext.Provider value={value}>
      {children}
    </WorkOrderLookupsContext.Provider>
  );
};

export function useWorkOrderLookupsContext() {
  return useContext(WorkOrderLookupsContext) as WorkOrderLookupsContextProps;
}
