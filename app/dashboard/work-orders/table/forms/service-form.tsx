"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

interface IServiceForm extends React.HTMLAttributes<HTMLDivElement> {
  row: any;
  refetchData: any;
  isInService?: boolean;
}

export function ServiceForm({
  className,
  row,
  isInService,
  refetchData,
  ...props
}: IServiceForm) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      licensePlate: row?.licensePlate || "",
      make: row?.equipmentMake?.description || null,
      model: row?.equipmentModel?.description || null,
      serviceReleaseKM: row?.currentKM || null,
      serviceExitKm: row?.serviceReleaseKM || null,
      startingDate: row?.startingDate || null,
      endingDate: row?.endingDate || null,
      serviceId: row?.service || { id: null },
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: any) {
    const url = "/api/work-orders/create-or-edit";
    setIsLoading(true);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        serviceId: data.serviceId?.id,
        serviceReleaseKM: data.serviceReleaseKM,
        serviceExitKm: data.serviceExitKm,
        startingDate: data.startingDate,
        endingDate: data.endingDate,
      }),
    });

    if (response.ok) {
      toast({
        title: "Başarılı",
        variant: "default",
        style: { color: "white", backgroundColor: "#1ABA92" },
      });
    } else {
      toast({
        title: "Başarısız",
        variant: "destructive",
      });
    }
    refetchData?.();
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-x-4 gap-y-6">
        <div className="col-span-3 max-xs:col-span-6">
          <Controller
            name="serviceId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Combobox
                label="Servis Bilgisi"
                value={value}
                items={[]}
                onChange={(value: any) => {
                  onChange(value);
                }}
                error={""}
                displayValue={(item) =>
                  (item?.name as string) || (item.label as string)
                }
                className="w-full"
                asyncItemsUrl="/api/lookups/supplier-business-partners"
                type="businessPartner"
                additionalParams={`businessPartnerStatus=true&businessPartnerRole=2`}
              />
            )}
          />
        </div>

        <div className="col-span-3 max-xs:col-span-6 mt-1">
          <Input
            label="Plaka"
            disabled
            type="text"
            id="licensePlate"
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("licensePlate")}
          />
        </div>
        <div className="col-span-3 max-xs:col-span-6 mt-1">
          <Input
            label="Marka"
            disabled
            type="text"
            id="make"
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("make")}
          />
        </div>
        <div className="col-span-3 max-xs:col-span-6 mt-1">
          <Input
            label="Model"
            disabled
            type="text"
            id="model"
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("model")}
          />
        </div>
        <div className="col-span-3 max-xs:col-span-6">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-black"
          >
            Servis Giriş Tarihi
          </label>

          <Controller
            name="startingDate"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <DatePicker
                value={value}
                maxDate={new Date()}
                onChange={(date) => {
                  onChange(date);
                }}
              />
            )}
          />
        </div>
        {isInService && (
          <div className="col-span-3 max-xs:col-span-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Servis Çıkış Tarihi
            </label>
            <Controller
              name="endingDate"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <DatePicker
                  value={value}
                  onChange={(date) => {
                    onChange(date);
                  }}
                />
              )}
            />
          </div>
        )}

        <div className="col-span-3 max-xs:col-span-6 mt-1">
          <Input
            label="Güncel KM"
            type="number"
            min={0}
            id="serviceReleaseKM"
            autoComplete="given-name"
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("serviceReleaseKM")}
          />
        </div>
        {isInService && (
          <div className="col-span-3 max-xs:col-span-6 mt-1">
            <Input
              label="Servis Çıkış KM"
              type="number"
              id="serviceExitKm"
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("serviceExitKm")}
            />
          </div>
        )}

        <div className="col-span-12 mt-6 flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-[#1249BD] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0B2F7B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Kaydet
          </Button>
        </div>
      </div>
    </form>
  );
}
