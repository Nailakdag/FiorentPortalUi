"use client";
import useFetchAndSetState from "@/lib/hooks/useFetchAndSetState";
import { useSearchParams } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

type WorkOrderContextProps = {
  workOrder: any;
  isLoading: boolean;
  refetch: () => void;
  isContract: boolean;
  setIsContract: (value: boolean) => void;
  isSubReasonReplacement: boolean;
  setIsSubReasonReplacement: (value: boolean) => void;
  isPreBackup: boolean;
  setIsPreBackup: (value: boolean) => void;
  externalReplacementEquipment: boolean;
  setExternalReplacementEquipment: (value: boolean) => void;
  internalReplacementEquipment: boolean;
  setInternalReplacementEquipment: (value: boolean) => void;
  isButtonLoading: boolean;
  setIsButtonLoading: (value: boolean) => void;
};

const WorkOrderContext = createContext<WorkOrderContextProps | null>(null);

type WorkOrderProviderProps = {
  children: ReactNode;
};

export const WorkOrderProvider = ({ children }: WorkOrderProviderProps) => {
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const relatedRecordId = currentQueryParams.get("id");
  const {
    refetch,
    data: workOrder,
    isLoading,
  } = useFetchAndSetState(
    `/api/work-orders/create-or-edit${
      relatedRecordId ? `?id=${relatedRecordId}` : ""
    }`,
  );
  const [isContract, setIsContract] = useState<boolean>(false);
  const [isSubReasonReplacement, setIsSubReasonReplacement] =
    useState<boolean>(false);
  const [isPreBackup, setIsPreBackup] = useState<boolean>(false);
  const [externalReplacementEquipment, setExternalReplacementEquipment] =
    useState<boolean>(false);
  const [internalReplacementEquipment, setInternalReplacementEquipment] =
    useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  return (
    <WorkOrderContext.Provider
      value={{
        workOrder,
        isLoading,
        refetch,
        isContract,
        setIsContract,
        isSubReasonReplacement,
        setIsSubReasonReplacement,
        isPreBackup,
        setIsPreBackup,
        externalReplacementEquipment,
        setExternalReplacementEquipment,
        internalReplacementEquipment,
        setInternalReplacementEquipment,
        isButtonLoading,
        setIsButtonLoading,
      }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
};

export function useWorkOrderContext() {
  return useContext(WorkOrderContext) as WorkOrderContextProps;
}
