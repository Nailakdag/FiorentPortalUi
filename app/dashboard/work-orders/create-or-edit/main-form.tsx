"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  WorkOrderLookupsContextProps,
  WorkOrderLookupsProvider,
  useWorkOrderLookupsContext,
} from "./context/workOrderLookupsContext";
import {
  WorkOrderProvider,
  useWorkOrderContext,
} from "./context/workOrderContext";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import CreateEditPageHeader from "@/components/create-or-edit/create-edit-page-header";
import CreateOrEditTabs from "@/components/create-or-edit/create-or-edit-tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { getParsedDate } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { X, ArrowRight, ArrowLeft, Copy } from "lucide-react";
import { FinishServiceForm } from "./form/finish-service-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StartServiceForm } from "./form/start-service-form";
import { CloseWorkOrderForm } from "./form/close-work-order-form";
import { z } from "zod";
import { workOrderSchema } from "@/lib/validations/work-order";
import { zodResolver } from "@hookform/resolvers/zod";

interface WorkOrderMainFormProps {
  children: React.ReactNode;
}

type FormData = z.infer<typeof workOrderSchema>;

const WorkOrderWrapper = ({
  children,
  lookups,
}: {
  children: React.ReactNode;
  lookups: WorkOrderLookupsContextProps;
}) => {
  return (
    <WorkOrderLookupsProvider value={lookups}>
      <WorkOrderProvider>
        <WorkOrderMainForm>{children}</WorkOrderMainForm>
      </WorkOrderProvider>
    </WorkOrderLookupsProvider>
  );
};

function WorkOrderMainForm({ children }: WorkOrderMainFormProps) {
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const id = currentQueryParams.get("id");
  const tabs = [
    { id: "general", label: "Genel Bilgiler", key: "general" },
    {
      id: "spare-parts",
      label: "Yedek Parça & İşçilik",
      key: "spare-parts",
    },
    {
      id: "spare-parts-history",
      label: "Yedek Parça & İşçilik Geçmişi",
      key: "spare-parts-history",
    },
  ];

  const shouldShowAllTabs = !!id; // id varsa true, yoksa false

  const visibleTabs = shouldShowAllTabs
    ? tabs
    : tabs.filter((tab) => tab.id === "general");

  const [isLoading, setIsLoading] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isExistFromServiceModalOpen, setIsExistFromServiceModalOpen] =
    useState(false);
  const [isCloseWorkOrderModalOpen, setIsCloseWorkOrderModalOpen] =
    useState(false);

  const router = useRouter();

  const { workOrder, refetch } = useWorkOrderContext();

  const { countries, priorities, channels, subReasons, generalStatus } =
    useWorkOrderLookupsContext();

  let initialValues = useMemo(() => {
    return {
      code: null,
      phoneNo: "",
      email: "",
      requestDate: dayjs().toString(),
      make: null,
      model: null,
      equipmentSerialNumberId: { id: null, code: "" },
      businessPartnerId: { id: null, code: "" },
      serviceId: { id: null, code: "" },
      startingDate: dayjs().toString(),
      planningEndingDate: dayjs().toString(),
      endingDate: dayjs().toString(),
      serviceReleaseKM: null,
      subReasonId: subReasons?.find((x: any) => x.isDefault == true),
      status: generalStatus?.[0],
      note: null,
    };
  }, [generalStatus, channels, priorities, countries, subReasons]);

  const method = useForm<FormData>({
    defaultValues: initialValues,
    resolver: zodResolver(workOrderSchema),
  });

  const actionButtonItems = [
    ...(workOrder?.fleetWorkOrder?.endingDate
      ? [
          {
            label: "Servisten Çıkar",
            icon: <ArrowLeft className="w-5 h-5 text-green-500" />,
            onClick: () => {
              setIsExistFromServiceModalOpen(true);
            },
          },
        ]
      : [
          {
            label: "Servise Al",
            icon: <ArrowRight className="w-5 h-5 text-green-500" />,
            onClick: () => {
              setIsAddServiceModalOpen(true);
            },
          },
        ]),
    {
      label: "Talebi Kopyala",
      icon: <Copy className="w-5 h-5 text-green-500" />,
      onClick: () => {
        handleCopyWorkOrder();
      },
    },
    {
      label: "Talebi Kapat",
      icon: <X className="w-5 h-5 text-red-500" />,
      onClick: () => {
        setIsCloseWorkOrderModalOpen(true);
      },
    },
  ];

  const handleCopyWorkOrder = () => {
    toast({
      title: "Talep Kopyalandı",
      variant: "success",
    });
  };

  const closeWorkOrder = () => {
    toast({
      title: "Talep Kapatıldı",
      variant: "success",
    });
  };

  const addService = () => {
    toast({
      title: "Servise Alındı",
      variant: "success",
    });
  };

  const finishService = () => {
    toast({
      title: "Servisten Çıkarıldı",
      variant: "success",
    });
  };

  useEffect(() => {
    if (workOrder && workOrder.fleetWorkOrder && generalStatus) {
      method.reset({
        phoneNo: workOrder?.fleetWorkOrder?.phoneNo,
        email: workOrder?.fleetWorkOrder?.email,
        requestDate: workOrder?.fleetWorkOrder?.requestDate,
        status: generalStatus.find(
          (x: any) => x.id == workOrder?.fleetWorkOrder?.status,
        ),
        startingDate: workOrder?.fleetWorkOrder?.startingDate,
        endingDate: workOrder?.fleetWorkOrder?.endingDate,
        planningEndingDate: workOrder?.fleetWorkOrder?.planningEndingDate,
        serviceReleaseKM: workOrder?.fleetWorkOrder?.serviceReleaseKM,
        serviceId: workOrder?.service || { id: null },
        subReasonId: subReasons.find(
          (x: any) => x.id == workOrder?.fleetWorkOrder?.subReasonId,
        ),
        equipmentSerialNumberId: workOrder?.equipmentSerialNumber || {
          id: null,
        },
      });
    }
  }, [generalStatus, method, subReasons, workOrder]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const url = "/api/work-orders/create-or-edit";

    const formFields = {
      requestDate: getParsedDate(data?.requestDate),
      equipmentSerialNumberId: data?.equipmentSerialNumberId?.id,
      phoneNo: data?.phoneNo,
      email: data?.email,
      serviceId: data?.serviceId?.id,
      // requestedBy: data?.requestedBy,
      startingDate: data?.startingDate
        ? getParsedDate(data?.startingDate)
        : null,
      endingDate: data?.endingDate ? getParsedDate(data?.endingDate) : null,
      planningEndingDate: data?.planningEndingDate
        ? getParsedDate(data?.planningEndingDate)
        : null,
      serviceReleaseKM: data?.serviceReleaseKM,
      subReasonId: data?.subReasonId?.id,
      status: data?.status?.id,
      note: data?.note,
      id: id || null,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      });

      const result = await response.json();

      if (response.ok) {
        if (id == null) {
          await router.replace(`${""}?id=${result}`);
        }
        refetch();
        toast({
          title: "Başarılı",
          variant: "success",
        });
      } else {
        toast({
          title: result?.message || "Başarısız",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Bir hata oluştu",
        description: (error as any)?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#F8FAFC]">
      <FormProvider {...method}>
        <form
          className="flex flex-1 flex-col gap-8"
          onSubmit={method.handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-1 flex-col">
            <div className="mb-40">
              <CreateEditPageHeader
                isLoading={isLoading}
                status={method.getValues("status")}
                subReason={method.getValues("subReasonId")}
                isActionButtonExist={true}
                actionButtonItems={actionButtonItems}
              />
              <CreateOrEditTabs tabs={visibleTabs} />
            </div>

            {children}
          </div>
        </form>
      </FormProvider>
      <Dialog
        open={isAddServiceModalOpen}
        onOpenChange={setIsAddServiceModalOpen}
      >
        <DialogContent className="min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Servise Al</DialogTitle>
          </DialogHeader>
          <StartServiceForm
            isOpen={isAddServiceModalOpen}
            setIsOpen={setIsAddServiceModalOpen}
            row={workOrder?.fleetWorkOrder}
            handleEvent={addService}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isExistFromServiceModalOpen}
        onOpenChange={setIsExistFromServiceModalOpen}
      >
        <DialogContent className="min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Servisten Çıkar</DialogTitle>
          </DialogHeader>
          <FinishServiceForm
            isOpen={isExistFromServiceModalOpen}
            setIsOpen={setIsExistFromServiceModalOpen}
            row={workOrder?.fleetWorkOrder}
            handleEvent={finishService}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isCloseWorkOrderModalOpen}
        onOpenChange={setIsCloseWorkOrderModalOpen}
      >
        <DialogContent className="min-w-[600px]">
          <CloseWorkOrderForm
            isOpen={isCloseWorkOrderModalOpen}
            setIsOpen={setIsCloseWorkOrderModalOpen}
            row={workOrder?.fleetWorkOrder}
            handleEvent={closeWorkOrder}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default WorkOrderWrapper;
