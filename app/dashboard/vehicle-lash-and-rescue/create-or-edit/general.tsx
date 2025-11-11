"use client";
import { Combobox } from "@/components/ui/combo-box";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { useVehicleLashAndRescueLookupsContext } from "./context/vehicleLashAndRescueLookupsContext";
import { useEffect } from "react";
import { useVehicleLashAndRescueContext } from "./context/vehicleLashAndRescueContext";
import ErrorMessage from "@/components/ui/error-message";
import { DatePicker } from "@/components/ui/date-picker";
import CardContainer from "@/components/ui/card-container";
import { Car } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EquipmentStatus, EquipmentType } from "@/contants/enums";

export const VehicleLashAndRescueGeneral = () => {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useFormContext();

  const { isLoading } = useVehicleLashAndRescueContext();

  const {
    equipments = [],
    equipmentSerialNumbers = [],
    generalStatuses = [],
    businessPartners = [],
  } = useVehicleLashAndRescueLookupsContext();

  const watchedEquipmentSerialNumberId = watch("equipmentSerialNumberId");

  useEffect(() => {
    if (watchedEquipmentSerialNumberId) {
      setValue("equipmentId", {
        id: watchedEquipmentSerialNumberId?.equipmentId,
        label: watchedEquipmentSerialNumberId?.equipmentName,
      });
    }
  }, [watchedEquipmentSerialNumberId, setValue]);

  const handleEquipmentSerialNumberChange = (serialNumber: any) => {
    if (serialNumber) {
      setValue("equipmentId", {
        id: serialNumber?.equipmentId,
        label: serialNumber?.equipmentName,
      });
    } else {
      setValue("equipmentId", { id: null });
    }
  };

  return (
    <CardContainer
      icon={<Car />}
      title="Genel Bilgiler"
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
              render={({ field: { onChange, value } }) => (
                <Combobox
                  label="Plaka"
                  value={value}
                  items={equipmentSerialNumbers || []}
                  required
                  onChange={(selectedItem: any) => {
                    onChange(selectedItem);
                    handleEquipmentSerialNumberChange(selectedItem);
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
              render={({ field: { onChange, value } }) => (
                <Combobox
                  label="Araç"
                  value={value}
                  items={equipments || []}
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
          <div className="col-span-2 max-xs:col-span-8">
            <Controller
              name="generalStatus"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Combobox
                  label="Durum"
                  value={value}
                  items={generalStatuses || []}
                  onChange={onChange}
                  error={""}
                  displayValue={(item) => item?.label as string}
                />
              )}
            />
            <ErrorMessage errors={errors.generalStatus} />
          </div>
          <div className="col-span-2 max-xs:col-span-8">
            <label
              htmlFor="transactionDate"
              className="block text-sm font-medium leading-6 text-black"
            >
              İşlem Tarihi
            </label>
            <Controller
              name="transactionDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker value={value} onChange={onChange} />
              )}
            />
            <ErrorMessage errors={errors.transactionDate} />
          </div>
          <div className="col-span-8">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-black"
            >
              Açıklama
            </label>
            <div className="mt-2">
              <textarea
                rows={4}
                id="description"
                {...register("description")}
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
      <Skeleton className="col-span-8 h-36" />
    </div>
  );
};
