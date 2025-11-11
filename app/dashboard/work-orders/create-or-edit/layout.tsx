import {
  getGeneralStatus,
  getSubReasons,
  getUnitOfMeasures,
  getMaterialTypes,
  getMaterialClasses,
  getReflected,
  getTaxRates,
} from "@/lib/lookupsFunction";
import MainForm from "./main-form";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    subReasons,
    generalStatus,
    unitOfMeasures,
    materialTypes,
    materialClasses,
    reflected,
    taxRates,
  ] = await Promise.all([
    getSubReasons(),
    getGeneralStatus(),
    getUnitOfMeasures(),
    getMaterialTypes(),
    getMaterialClasses(),
    getReflected(),
    getTaxRates(),
  ]);

  console.log({
    subReasons,
    generalStatus,
    unitOfMeasures,
    materialTypes,
    materialClasses,
    reflected,
    taxRates,
  });

  return (
    <MainForm
      lookups={{
        subReasons,
        generalStatus,
        equipmentSerialNumbers: [],
        businessPartners: [],
        unitOfMeasures,
        materialTypes,
        materialClasses,
        reflected,
        taxRates,
      }}
    >
      {children}
    </MainForm>
  );
}
