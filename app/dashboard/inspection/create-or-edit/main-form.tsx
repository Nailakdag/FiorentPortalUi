"use client";
import { FormProvider, useForm } from "react-hook-form";

import { useEffect, useMemo, useState } from "react";
import CreateEditPageHeader from "@/components/create-or-edit/create-edit-page-header";
import { getParsedDate } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  InspectionProvider,
  useInspectionContext,
} from "./context/inspectionContext";
import {
  InspectionLookupsContextProps,
  InspectionLookupsProvider,
  useInspectionLookupsContext,
} from "./context/inspectionLookupsContext";
import { inspecitonSchema } from "@/lib/validations/inspection";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ComplaintMainFormProps {
  children: React.ReactNode;
}

type FormData = z.infer<typeof inspecitonSchema>;

const InspectionWrapper = ({
  children,
  lookups,
}: {
  children: React.ReactNode;
  lookups: InspectionLookupsContextProps;
}) => {
  return (
    <InspectionLookupsProvider value={lookups}>
      <InspectionProvider>
        <InspectionMainForm>{children}</InspectionMainForm>
      </InspectionProvider>
    </InspectionLookupsProvider>
  );
};

function InspectionMainForm({ children }: ComplaintMainFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const id = currentQueryParams.get("id");
  const { inspection, refetch } = useInspectionContext();
  const { generalStatuses, inspectionTypes, inspectionResponsibles } =
    useInspectionLookupsContext();

  const initialValues = useMemo(() => {
    return {
      inspectionKM: null,
      paidAmount: null,
      penaltyAmount: null,
      paymentDate: null,
      inspectionExpirationDate: null,
      transactionDate: null,
      inspectionResponsible: { id: null },
      documentNumber: null,
      isReflected: false,
      generalStatus: generalStatuses[0],
      description: null,
      inspectionTypeId: inspectionTypes?.find((x: any) => x.isDefault === true),
      salesDocumentId: { id: null },
      salesDocumentRentalPeriodId: { id: null },
      businessPartnerId: { id: null },
      inspectionPartnerId: { id: null },
      equipmentId: { id: null },
      equipmentSerialNumberId: { id: null },
    };
  }, [generalStatuses, inspectionTypes]);

  const [isLoading, setIsLoading] = useState(false);

  const method = useForm<FormData>({
    defaultValues: initialValues,
    resolver: zodResolver(inspecitonSchema),
  });

  useEffect(() => {
    if (inspection) {
      method.reset({
        inspectionKM: inspection?.inspection?.inspectionKM,
        paidAmount: inspection?.inspection?.paidAmount,
        penaltyAmount: inspection?.inspection?.penaltyAmount,
        paymentDate: inspection?.inspection?.paymentDate,
        inspectionExpirationDate:
          inspection?.inspection?.inspectionExpirationDate,
        transactionDate: inspection?.inspection?.transactionDate,
        inspectionResponsible: inspectionResponsibles?.find(
          (x: any) => x.id === inspection?.inspection?.inspectionResponsible,
        ),
        documentNumber: inspection?.inspection?.documentNumber,
        isReflected: inspection?.inspection?.isReflected,
        generalStatus: generalStatuses.find(
          (x: any) => x.id === inspection?.inspection?.generalStatus,
        ),
        description: inspection?.inspection?.description,
        inspectionTypeId: inspectionTypes?.find(
          (x: any) => x.id === inspection?.inspection?.inspectionTypeId,
        ),
        salesDocumentId: inspection?.inspection?.salesDocumentId, // Don't display
        salesDocumentRentalPeriodId:
          inspection?.inspection?.salesDocumentRentalPeriod, // Don't display
        businessPartnerId: inspection?.businessPartner || { id: null },
        inspectionPartnerId: inspection?.inspectionPartner || { id: null },
        equipmentId: inspection?.equipment || { id: null },
        equipmentSerialNumberId: inspection?.equipmentSerialNumber || {
          id: null,
        },
      });
    }
  }, [
    method,
    generalStatuses,
    inspection,
    inspectionResponsibles,
    inspectionTypes,
  ]);

  async function onSubmit(data: FormData) {
    console.log(data);
    setSaveButtonLoading(true);
    const url = "/api/inspection/create-or-edit";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...inspection,
        inspectionKM: data?.inspectionKM,
        paidAmount: data?.paidAmount,
        penaltyAmount: data?.penaltyAmount,
        paymentDate: data?.paymentDate,
        inspectionExpirationDate: data?.inspectionExpirationDate,
        transactionDate: data?.transactionDate,
        inspectionResponsible: data?.inspectionResponsible?.id,
        documentNumber: data?.documentNumber,
        isReflected: data?.isReflected,
        generalStatus: id ? data?.generalStatus?.id : generalStatuses[0].id,
        description: data?.description,
        inspectionTypeId: data?.inspectionTypeId?.id,
        salesDocumentId: inspection?.inspection?.salesDocumentId,
        salesDocumentRentalPeriodId:
          inspection?.inspection?.salesDocumentRentalPeriodId,
        businessPartnerId: data?.businessPartnerId?.id,
        inspectionPartnerId: data?.inspectionPartnerId?.id,
        equipmentId: data?.equipmentId?.id,
        equipmentSerialNumberId: data?.equipmentSerialNumberId?.id,
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
                breadcrumb="İş Emirleri"
                backUrl="/dashboard/inspection"
                subTitle={"Muayene"}
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

export default InspectionWrapper;
