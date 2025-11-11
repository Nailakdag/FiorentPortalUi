"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import CreateEditPageHeader from "@/components/create-or-edit/create-edit-page-header";
import { getParsedDate } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  VehicleLashAndRescueProvider,
  useVehicleLashAndRescueContext,
} from "./context/vehicleLashAndRescueContext";
import {
  VehicleLashAndRescueLookupsContextProps,
  VehicleLashAndRescueLookupsProvider,
  useVehicleLashAndRescueLookupsContext,
} from "./context/vehicleLashAndRescueLookupsContext";

interface VehicleLashAndRescueMainFormProps {
  children: React.ReactNode;
}

const VehicleLashAndRescueWrapper = ({
  children,
  lookups,
}: {
  children: React.ReactNode;
  lookups: VehicleLashAndRescueLookupsContextProps;
}) => {
  return (
    <VehicleLashAndRescueLookupsProvider value={lookups}>
      <VehicleLashAndRescueProvider>
        <VehicleLashAndRescueMainForm>{children}</VehicleLashAndRescueMainForm>
      </VehicleLashAndRescueProvider>
    </VehicleLashAndRescueLookupsProvider>
  );
};

function VehicleLashAndRescueMainForm({
  children,
}: VehicleLashAndRescueMainFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const id = currentQueryParams.get("id");
  const { vehicleLashAndRescue, refetch } = useVehicleLashAndRescueContext();
  const { generalStatuses } = useVehicleLashAndRescueLookupsContext();

  const initialValues = useMemo(() => {
    return {
      generalStatus:
        generalStatuses && generalStatuses.length > 0
          ? generalStatuses[0]
          : { id: null },
      description: null,
      equipmentId: { id: null },
      equipmentSerialNumberId: { id: null },
      transactionDate: null,
    };
  }, [generalStatuses]);

  const [isLoading, setIsLoading] = useState(false);

  const method = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (vehicleLashAndRescue && generalStatuses && generalStatuses.length > 0) {
      method.reset({
        generalStatus:
          generalStatuses.find(
            (x: any) =>
              x.id ===
              vehicleLashAndRescue?.vehicleLashAndRescue?.generalStatus,
          ) || generalStatuses[0],
        description:
          vehicleLashAndRescue?.vehicleLashAndRescue?.description || null,
        equipmentId: vehicleLashAndRescue?.equipment || { id: null },
        equipmentSerialNumberId:
          vehicleLashAndRescue?.equipmentSerialNumber || {
            id: null,
          },
        transactionDate:
          vehicleLashAndRescue?.vehicleLashAndRescue?.transactionDate || null,
      });
    }
  }, [method, generalStatuses, vehicleLashAndRescue]);

  async function onSubmit(data: any) {
    setSaveButtonLoading(true);
    const url = "/api/vehicle-lash-and-rescue/create-or-edit";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        generalStatus: id
          ? data?.generalStatus?.id
          : generalStatuses && generalStatuses.length > 0
          ? generalStatuses[0]?.id
          : null,
        description: data?.description || null,
        equipmentId: data?.equipmentId?.id || null,
        equipmentSerialNumberId: data?.equipmentSerialNumberId?.id || null,
        transactionDate: data?.transactionDate
          ? getParsedDate(data?.transactionDate)
          : null,
        id: id || null,
      }),
    });
    if (response.ok) {
      if (!id) {
        const createdId = await response.json();
        if (createdId) router.replace(`${pathname}?id=${createdId}`);
      }
      toast({
        title: "Başarılı",
        variant: "success",
      });
      refetch();
      router.refresh();
    } else {
      toast({
        title: "Başarısız",
        variant: "destructive",
      });
    }
    setSaveButtonLoading(false);
  }

  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#F8FAFC]">
      <FormProvider {...method}>
        <form
          className="flex flex-1 flex-col gap-8"
          onSubmit={method.handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-1 flex-col">
            <div className="mb-36">
              <CreateEditPageHeader
                breadcrumb="Araç Bağlama ve Kurtarma"
                backUrl="/dashboard/vehicle-lash-and-rescue"
                subTitle={id ? "Düzenle" : "Yeni Araç Bağlama ve Kurtarma"}
                isLoading={saveButtonLoading}
                status={method.getValues("generalStatus")}
              />
            </div>
            {children}
          </div>
        </form>
      </FormProvider>
    </section>
  );
}

export default VehicleLashAndRescueWrapper;
