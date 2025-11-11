"use client";
import { Combobox } from "@/components/ui/combo-box";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { useInspectionLookupsContext } from "./context/inspectionLookupsContext";
import { EquipmentStatus, EquipmentType } from "@/contants/enums";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useInspectionContext } from "./context/inspectionContext";
import ErrorMessage from "@/components/ui/error-message";
import { DatePicker } from "@/components/ui/date-picker";
import CardContainer from "@/components/ui/card-container";
import { File } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const InspectionGeneral = () => {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, dirtyFields },
    watch,
  } = useFormContext();

  const { isLoading } = useInspectionContext();

  const {
    equipments,
    equipmentSerialNumbers,
    inspectionTypes,
    inspectionResponsibles,
    businessPartners,
  } = useInspectionLookupsContext();

  const watchedEquipmentSerialNumberId = watch("equipmentSerialNumberId");
  const watchedTransactionDate = watch("transactionDate");

  useEffect(() => {
    if (
      watchedEquipmentSerialNumberId?.id &&
      watchedTransactionDate &&
      isDirty &&
      (dirtyFields?.equipmentSerialNumberId || dirtyFields?.transactionDate)
    ) {
      const fetchData = async () => {
        const url = "/api/general/get-business-partner-id";
        const formattedDate = dayjs(watchedTransactionDate)
          .tz("Europe/Istanbul")
          .format("YYYY-MM-DDTHH:mm:ss");

        const query = `?equipmentSerialNumberId=${watchedEquipmentSerialNumberId?.id}&date=${formattedDate}`;
        const response = await fetch(`${url}${query}`);
        const result = await response.json();
        if (response.ok) {
          setValue("businessPartnerId", {
            id: result?.businessPartnerId,
            label: result?.businessPartnerName,
          });
          setValue("salesDocumentId", result?.salesDocumentId);
          setValue(
            "salesDocumentRentalPeriodId",
            result?.salesDocumentRentalPeriodId,
          );
        }
      };
      fetchData();
    }
  }, [
    watchedEquipmentSerialNumberId,
    watchedTransactionDate,
    isDirty,
    setValue,
    dirtyFields,
  ]);

  const handleEquipmentSerialNumberChange = (serialNumber: any) => {
    if (serialNumber) {
      setValue("equipmentId", {
        id: serialNumber?.equipmentId,
        label: serialNumber?.equipmentName,
      });
    }
  };

  return (
    <CardContainer
      icon={<File />}
      title="Genel"
      className="flex w-full flex-col gap-2"
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-8 gap-x-6 gap-y-4">
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="equipmentSerialNumberId"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Combobox
                  label="Plaka"
                  value={value}
                  items={equipmentSerialNumbers}
                  required
                  onChange={(selectedItem: any) => {
                    onChange(selectedItem);
                    handleEquipmentSerialNumberChange(selectedItem);
                    if (!selectedItem) {
                      setValue("make", null);
                      setValue("model", null);
                    } else {
                      setValue("make", selectedItem.make);
                      setValue("model", selectedItem.model);
                    }
                  }}
                  error={""}
                  displayValue={(item) => item?.label as string}
                  asyncItemsUrl="/api/lookups/equipment-serial-numbers"
                  type="equipmentSerialNumber"
                />
              )}
            />
            <ErrorMessage errors={errors.equipmentSerialNumberId} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="equipmentId"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Combobox
                  label="Araç"
                  value={value}
                  items={equipments}
                  disabled
                  onChange={onChange}
                  error={""}
                  displayValue={(item) => item?.label as string}
                  asyncItemsUrl="/api/lookups/equipment"
                  type="equipment"
                  additionalParams={`status=${EquipmentStatus.EquipmentStatus_Active}&type=${EquipmentType.EquipmentType_Product}`}
                />
              )}
            />
            <ErrorMessage errors={errors.equipmentId} />
          </div>
          <div className="col-span-2 max-xs:col-span-8 mt-1">
            <Input
              type="text"
              id="documentNumber"
              label="Belge Numarası"
              required={true}
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("documentNumber")}
            />
            <ErrorMessage errors={errors.documentNumber} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="inspectionTypeId"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Combobox
                  label="Muayene Türü"
                  value={value}
                  items={inspectionTypes}
                  onChange={onChange}
                  error={""}
                  displayValue={(item) => item?.label as string}
                />
              )}
            />
            <ErrorMessage errors={errors.inspectionTypeId} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="businessPartnerId"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Combobox
                  label="İş Ortağı"
                  value={value}
                  items={businessPartners}
                  onChange={onChange}
                  error={""}
                  displayValue={(item) => item?.label as string}
                  asyncItemsUrl="/api/lookups/business-partners"
                  type="businessPartner"
                />
              )}
            />
            <ErrorMessage errors={errors.businessPartnerId} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="inspectionPartnerId"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Combobox
                  label="İşlem Yapan Firma"
                  value={value}
                  items={businessPartners}
                  onChange={onChange}
                  error={""}
                  displayValue={(item) => item?.label as string}
                  asyncItemsUrl="/api/lookups/business-partners"
                  type="businessPartner"
                />
              )}
            />
            <ErrorMessage errors={errors.inspectionPartnerId} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="inspectionResponsible"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Combobox
                  label="Muayene Sorumlusu"
                  value={value}
                  items={inspectionResponsibles}
                  onChange={onChange}
                  error={""}
                  displayValue={(item) => item?.label as string}
                />
              )}
            />
            <ErrorMessage errors={errors.inspectionResponsible} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <Input
              type="text"
              id="inspectionKM"
              label="Muayene KM"
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("inspectionKM")}
            />
            <ErrorMessage errors={errors.inspectionKM} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="penaltyAmount"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <CurrencyInput
                    id="penaltyAmount"
                    label="Ceza Tutarı"
                    // @ts-ignore
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                );
              }}
            />
            <ErrorMessage errors={errors.penaltyAmount} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="paidAmount"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <CurrencyInput
                    id="paidAmount"
                    label="Ödenen Tutar"
                    // @ts-ignore
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                );
              }}
            />
            <ErrorMessage errors={errors.paidAmount} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Vade Tarihi
            </label>

            <Controller
              name="paymentDate"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <DatePicker value={value} onChange={onChange} />
              )}
            />
            <ErrorMessage errors={errors.paymentDate} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Muayene Geçerlilik Tarihi
            </label>
            <Controller
              name="inspectionExpirationDate"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <DatePicker value={value} onChange={onChange} />
              )}
            />
            <ErrorMessage errors={errors.inspectionExpirationDate} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              İşlem Tarihi
            </label>

            <Controller
              name="transactionDate"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <DatePicker value={value} onChange={onChange} />
              )}
            />
            <ErrorMessage errors={errors.transactionDate} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Yansıtılsın Mı?
            </label>

            <input
              className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
              type="checkbox"
              id="isReflected"
              {...register(`isReflected`)}
            />
            <ErrorMessage errors={errors.isReflected} />
          </div>

          <div className="col-span-8">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Açıklama
            </label>
            <div className="mt-2">
              <textarea
                rows={4}
                id="description"
                {...register(`description`)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              <ErrorMessage errors={errors.description} />
            </div>
          </div>
        </div>
      )}
    </CardContainer>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-8 gap-x-6 gap-y-4">
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-2 h-16 max-xs:col-span-8" />
      <Skeleton className="col-span-8 h-36" />
    </div>
  );
};
