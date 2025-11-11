import {
  getGeneralStatus,
  getInspectionResponsibles,
  getInspectionTypes,
} from "@/lib/lookupsFunction";
import MainForm from "./main-form";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inspectionResponsibles, inspectionTypes, generalStatuses] =
    await Promise.all([
      getInspectionResponsibles(),
      getInspectionTypes(),
      getGeneralStatus(),
    ]);

  return (
    <MainForm
      lookups={{
        inspectionResponsibles,
        inspectionTypes,
        equipments: [],
        equipmentSerialNumbers: [],
        generalStatuses,
        businessPartners: [],
      }}
    >
      {children}
    </MainForm>
  );
}
