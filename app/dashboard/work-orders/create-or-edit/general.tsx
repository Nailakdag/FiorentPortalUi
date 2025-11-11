import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CardContainer from "@/components/ui/card-container";
import { Combobox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { useWorkOrderLookupsContext } from "./context/workOrderLookupsContext";
import { useSearchParams } from "next/navigation";
import ErrorMessage from "@/components/ui/error-message";

export default function General() {
  const {
    control,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const equipmentSerialNumber = watch("equipmentSerialNumberId");

  useEffect(() => {
    if (equipmentSerialNumber) {
      setValue("make", equipmentSerialNumber.make ?? null);
      setValue("model", equipmentSerialNumber.model ?? null);
    }
  }, [equipmentSerialNumber, setValue]);

  const { subReasons } = useWorkOrderLookupsContext();

  const searchParams = useSearchParams();
  const currentQueryParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );
  const id = currentQueryParams.get("id");

  return (
    <CardContainer title="Genel" className="h-full" icon={<DocumentIcon />}>
      <div className="grid grid-cols-12 gap-8">
        {!id && (
          <>
            <div className="col-span-4 max-xs:col-span-6">
              <Controller
                name="subReasonId"
                control={control}
                render={({
                  field: { onChange, value },
                }: {
                  field: { onChange: any; value: any };
                }) => (
                  <Combobox
                    label="Geliş Sebebi"
                    value={value}
                    items={subReasons}
                    onChange={(selectedItem) => {
                      onChange(selectedItem);
                    }}
                    required={true}
                    displayValue={(item) => item?.label as string}
                    className="w-full"
                  />
                )}
              />
            </div>
            <div className="col-span-4 max-xs:col-span-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium  text-black"
              >
                Talep Tarihi
                <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <Controller
                  name="requestDate"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => {
                    return <DatePicker value={value} onChange={onChange} />;
                  }}
                />
                <ErrorMessage errors={errors.requestDate} />
              </div>
            </div>
          </>
        )}
      </div>
      {!id && (
        <div className="border-t-2 border-dashed border-gray-300 py-2 mt-6"></div>
      )}
      <div className="grid grid-cols-12 gap-6">
        {id && (
          <div className="col-span-4 max-xs:col-span-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium  text-black"
            >
              Talep Tarihi
              <span className="text-red-600">*</span>
            </label>
            <div className="mt-1">
              <Controller
                name="requestDate"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => {
                  return <DatePicker value={value} onChange={onChange} />;
                }}
              />
              <ErrorMessage errors={errors.requestDate} />
            </div>
          </div>
        )}
        <div className="col-span-4 md:col-span-4">
          <Controller
            name="equipmentSerialNumberId"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Combobox
                label="Plaka"
                value={value}
                items={[]}
                onChange={(selectedItem: any) => {
                  onChange(selectedItem);
                  if (!selectedItem) {
                    setValue("make", null);
                    setValue("model", null);
                  } else {
                    setValue("make", selectedItem.make);
                    setValue("model", selectedItem.model);
                  }
                }}
                required={true}
                displayValue={(item) => item?.label as string}
                className="w-full"
                asyncItemsUrl="/api/lookups/equipment-serial-numbers"
                type="equipmentSerialNumber"
              />
            )}
          />
          <ErrorMessage errors={errors.equipmentSerialNumberId} />
        </div>
        <div className="col-span-4 max-xs:col-span-6 mt-1">
          <Input
            label="Marka"
            disabled
            type="text"
            id="make"
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("make")}
          />
        </div>
        <div className="col-span-4 max-xs:col-span-6">
          <Input
            label="Model"
            disabled
            type="text"
            id="model"
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("model")}
          />
        </div>
      </div>
      <div className="border-t-2 border-dashed border-gray-300 py-2 mt-6"></div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <label
            htmlFor="requestedBy"
            className="text-sm font-medium text-gray-700"
          >
            Talep Eden
          </label>
          <Input
            id="requestedBy"
            type="text"
            placeholder="Talep Eden"
            {...register("requestedBy")}
            className="w-full mt-1"
          />
        </div>

        <div className="col-span-12 md:col-span-4">
          <label
            htmlFor="phoneNo"
            className="text-sm font-medium text-gray-700"
          >
            Telefon
          </label>
          <Input
            id="phoneNo"
            type="tel"
            placeholder="(555) 123-4567"
            {...register("phoneNo")}
            className="w-full mt-1"
          />
        </div>

        <div className="col-span-12 md:col-span-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail
          </label>
          <Input
            id="email"
            type="text"
            placeholder="E-mail"
            {...register("email")}
            className="w-full mt-1"
          />
        </div>

        <div className="col-span-12 border-t-2 border-dashed border-gray-300 py-2 mt-6"></div>

        <div className="col-span-12">
          <textarea
            id="note"
            placeholder="Notunuzu buraya girebilirsiniz..."
            {...register("note")}
            className="w-full mt-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[120px] bg-white text-sm"
            rows={4}
          />
        </div>
      </div>
    </CardContainer>
  );
}
