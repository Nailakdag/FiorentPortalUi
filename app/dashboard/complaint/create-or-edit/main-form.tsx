"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  ComplaintProvider,
  useComplaintContext,
} from "./context/complaintContext";
import {
  ComplaintLookupsContextProps,
  ComplaintLookupsProvider,
} from "./context/complaintLookupsContext";
import { useEffect, useState, Suspense } from "react";
import CreateEditPageHeader from "@/components/create-or-edit/create-edit-page-header";
import { getParsedDate } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface ComplaintMainFormProps {
  children: React.ReactNode;
}

const ComplaintWrapper = ({
  children,
  lookups,
}: {
  children: React.ReactNode;
  lookups: ComplaintLookupsContextProps;
}) => {
  return (
    <ComplaintLookupsProvider value={lookups}>
      <ComplaintProvider>
        <ComplaintMainForm>{children}</ComplaintMainForm>
      </ComplaintProvider>
    </ComplaintLookupsProvider>
  );
};

function ComplaintMainFormContent({ children }: ComplaintMainFormProps) {
  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const id = currentQueryParams.get("id");

  const initialValues = {
    title: null,
    description: null,
    customerName: null,
    customerEmail: null,
    customerPhoneNo: null,
    licensePlate: { id: null },
    complaintDate: null,
    complaintType: { id: null },
    complainant: { id: null },
    otherTypeDescription: null,
    status: { id: null },
  };
  const { complaint, refetch } = useComplaintContext();

  const [isLoading, setIsLoading] = useState(false);

  const method = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (complaint) {
      method.reset({
        title: complaint?.complaint?.title,
        description: complaint?.complaint?.description,
        customerName: complaint?.complaint?.customerName,
        customerEmail: complaint?.complaint?.customerEmail,
        licensePlate: complaint?.licensePlate || { id: null },
        customerPhoneNo: complaint?.complaint?.customerPhoneNo,
        status: complaint?.complaint?.customerPhoneNo, //!Değişecek
        complaintDate: complaint?.complaint?.complaintDate,
        complaintType: complaint?.complaint?.complaintType || { id: null },
        complainant: complaint?.complaint?.complainant || { id: null },
        otherTypeDescription:
          complaint?.complaint?.otherTypeDescription || null,
      });
    }
  }, [complaint, method]);

  const onSubmit = async (data: any) => {
    if (!data?.title || !data.complaintType?.id || !data?.description) {
      return toast({
        title: "Lütfen zorunlu alanları doldurun",
        variant: "destructive",
      });
    }

    const formFields = {
      complaintDate: getParsedDate(data?.complaintDate),
      title: data?.title,
      customerName: data?.customerName,
      description: data?.description,
      customerPhoneNo: data?.customerPhoneNo,
      complaintType: data?.complaintType?.id,
      complainant: data?.complainant?.id,
      otherTypeDescription: data?.otherTypeDescription,
      customerEmail: data?.customerEmail,
      licensePlate: data?.licensePlate?.id,
      status: data?.status?.id,
      id: id || null,
    };
    setIsLoading(true);
    try {
      const response = await fetch("/api/complaint/create-or-edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      refetch();
    } catch (error) {
      console.error("Error submitting form:", error);
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
            <div className="mb-36">
              <CreateEditPageHeader
                breadcrumb="Şikayetler"
                backUrl="/dashboard/complaint"
                subTitle={id ? "Düzenle" : "Şikayet Oluştur"}
                isLoading={isLoading}
              />
            </div>
            {children}
          </div>
        </form>
      </FormProvider>
    </section>
  );
}

function ComplaintMainForm({ children }: ComplaintMainFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComplaintMainFormContent>{children}</ComplaintMainFormContent>
    </Suspense>
  );
}

export default ComplaintWrapper;
