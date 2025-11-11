import { getGeneralStatus } from "@/lib/lookupsFunction";
import MainForm from "./main-form";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [generalStatuses] = await Promise.all([getGeneralStatus()]);

  return (
    <MainForm
      lookups={{
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

