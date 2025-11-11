"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combo-box";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  EquipmentStatus,
  EquipmentType,
  ReflectedTo,
  UsedMaterialClass,
} from "@/contants/enums";
import * as React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useWorkOrderContext } from "../../context/workOrderContext";

interface IAddItemFormProps extends React.HTMLAttributes<HTMLDivElement> {
  openAddItem: any;
  row: any;
  unitOfMeasures: any;
  materialTypes: any;
  materialClasses: any;
  statuses: any;
  reflected: any;
  taxRates: any;
  refetchData?: any;
}

type FormData = {
  quantity: null;
  unitPrice: any;
  proformaAmount: null;
  discountRate: any;
  totalAmount: any;
  taxRateId: { id: null; code: null };
  vatAmount: any;
  amountIncludingVAT: null;
  reflectedAmount: null;
  generalStatus: { id: null };
  materialType: { id: null };
  usedMaterialClass: { id: null };
  isReflected: null;
  reflectedTo: { id: null };
  reflectedBusinessPartnerId: { id: null };
  unitOfMeasureId: { id: null };
  equipmentId: { id: null };
  isGuarantee: null;
  fleetWorkOrderId: null;
  id: null;
};

export function AddItemForm({
  openAddItem,
  row,
  unitOfMeasures,
  materialTypes,
  materialClasses,
  statuses,
  reflected,
  taxRates,
  refetchData,
}: IAddItemFormProps) {
  const rowOriginal = row;

  console.log(row);

  const { workOrder } = useWorkOrderContext();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      quantity: rowOriginal?.fleetWorkOrderSparePart?.quantity || 1,
      unitPrice: rowOriginal?.fleetWorkOrderSparePart?.unitPrice || null,
      proformaAmount:
        rowOriginal?.fleetWorkOrderSparePart?.proformaAmount || null,
      discountRate: rowOriginal?.fleetWorkOrderSparePart?.discountRate || 0,
      totalAmount: rowOriginal?.fleetWorkOrderSparePart?.totalAmount || null,
      taxRateId:
        taxRates?.find(
          (x: any) =>
            x.id === rowOriginal?.fleetWorkOrderSparePart?.taxRateId ||
            x?.isDefault == true,
        ) || taxRates?.[0],
      vatAmount: rowOriginal?.fleetWorkOrderSparePart?.vatAmount || null,
      amountIncludingVAT:
        rowOriginal?.fleetWorkOrderSparePart?.amountIncludingVAT || null,
      reflectedAmount:
        rowOriginal?.fleetWorkOrderSparePart?.reflectedAmount || null,
      generalStatus:
        statuses?.find(
          (x: any) =>
            x.id === rowOriginal?.fleetWorkOrderSparePart?.generalStatus,
        ) || statuses[0],
      materialType:
        materialTypes?.find(
          (x: any) =>
            x.id === rowOriginal?.fleetWorkOrderSparePart?.materialType ||
            x?.isDefault == true,
        ) || materialTypes?.[0],
      usedMaterialClass: materialClasses?.find(
        (x: any) =>
          x.id === rowOriginal?.fleetWorkOrderSparePart?.usedMaterialClass ||
          x?.isDefault == true ||
          x.id === UsedMaterialClass.UsedMaterialClass_Maintenance,
      ),
      isReflected: rowOriginal?.fleetWorkOrderSparePart?.isReflected,
      reflectedTo: reflected?.find(
        (x: any) => x.id === rowOriginal?.fleetWorkOrderSparePart?.reflectedTo,
      ),
      reflectedBusinessPartnerId: rowOriginal?.reflectedBusinessPartner || {
        id: null,
      },
      fleetWorkOrderId: workOrder?.fleetWorkOrder?.id || null,
      unitOfMeasureId:
        unitOfMeasures?.find(
          (x: any) =>
            x.id === rowOriginal?.fleetWorkOrderSparePart?.unitOfMeasureId ||
            x?.isDefault == true,
        ) || unitOfMeasures?.[0],
      equipmentId: rowOriginal?.equipment
        ? { ...rowOriginal.equipment, label: rowOriginal.equipment.name }
        : { id: null },

      isGuarantee: rowOriginal?.fleetWorkOrderSparePart?.isGuarantee || false,
      id: null,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    if (data?.equipmentId?.id) {
      setIsLoading(true);
      const url = "/api/services/work-order/spare-parts/create-or-edit";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          ...rowOriginal._apiItem.invoiceItem,
          quantity: data?.quantity,
          unitPrice: data?.unitPrice,
          proformaAmount: data?.proformaAmount,
          discountRate: data?.discountRate,
          totalAmount: data?.totalAmount,
          taxRateId: data?.taxRateId?.id,
          vatAmount: data?.vatAmount,
          amountIncludingVAT: data?.amountIncludingVAT,
          reflectedAmount: isReflected ? data?.reflectedAmount : null,
          generalStatus: data?.generalStatus?.id,
          materialType: data?.materialType?.id,
          usedMaterialClass: data.usedMaterialClass?.id,
          isReflected: data?.isReflected,
          reflectedTo: isReflected ? data?.reflectedTo?.id : null,
          reflectedBusinessPartnerId: isReflected
            ? reflectedToBusinessPartner
              ? workOrder?.fleetWorkOrder?.businessPartnerId
              : workOrder?.fleetWorkOrder?.serviceId
            : null,
          fleetWorkOrderId: data?.fleetWorkOrderId,
          unitOfMeasureId: data?.unitOfMeasureId?.id,
          equipmentId: data?.equipmentId?.id,
          equipmentSerialNumberId:
            workOrder?.fleetWorkOrder?.equipmentSerialNumberId,
          isGuarantee: data?.isGuarantee || false,
          id: rowOriginal?.id || null,
        }),
      });
      if (response.ok) {
        openAddItem(false);
        toast({
          title: "Başarılı",
          variant: "success",
        });
        refetchData?.();
      } else {
        toast({
          title: "Başarısız",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } else {
      toast({
        title: "Lütfen zorunlu alanları doldurunuz",
        variant: "destructive",
      });
    }
  }

  const [isReflected, setIsReflected] = useState<boolean>();
  const [reflectedToBusinessPartner, setReflectedToBusinessParter] =
    useState<boolean>();

  const onReflectedToChange = (value: any, onChange: any) => {
    if (value?.id == ReflectedTo.ReflectedTo_Customer) {
      setReflectedToBusinessParter(true);
    } else {
      setReflectedToBusinessParter(false);
    }
    onChange(value);
  };

  const onReflectedChange = (value: any, onChange: any) => {
    setIsReflected(value);
    onChange(value);
  };

  useEffect(() => {
    if (getValues("isReflected")) {
      setIsReflected(true);
    } else {
      setIsReflected(false);
    }

    if (getValues("reflectedTo")?.id == ReflectedTo.ReflectedTo_Customer) {
      setReflectedToBusinessParter(true);
    } else {
      setReflectedToBusinessParter(false);
    }
  }, [getValues]);

  const watchedUnitPrice = watch("unitPrice") || null;
  const watchedDiscountRate = watch("discountRate") || 0;

  React.useEffect(() => {
    let vatRate = getValues("taxRateId");
    let unitPrice = parseFloat(getValues("unitPrice"));
    let discountRate = parseFloat(getValues("discountRate"));
    if (
      vatRate !== null &&
      unitPrice !== null &&
      watchedUnitPrice !== null &&
      vatRate.code !== null &&
      discountRate !== null &&
      watchedDiscountRate !== null
    ) {
      let discountedPrice = unitPrice - (unitPrice * discountRate) / 100;

      let vatAmount = ((discountedPrice * vatRate.code) / 100).toFixed(2);
      let totalAmount = (unitPrice + parseFloat(vatAmount)).toFixed(2);

      setValue("vatAmount", vatAmount);
      setValue("totalAmount", totalAmount);
    }
  }, [getValues, setValue, watchedUnitPrice, watchedDiscountRate]);

  return (
    <div className="relative overflow-y-auto pl-4 pr-4">
      <form>
        <div className="grid grid-cols-6 gap-x-6 gap-y-4">
          <div className="col-span-6">
            <div className="mt-2">
              <Controller
                name="equipmentId"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Combobox
                    label="Yedek Parça"
                    value={value}
                    required
                    items={[]}
                    onChange={onChange}
                    error={""}
                    displayValue={(item) => item?.label as string}
                    asyncItemsUrl="/api/lookups/equipment"
                    type="equipment"
                    additionalParams={`typeList=${EquipmentType.EquipmentType_SparePart}&typeList=${EquipmentType.EquipmentType_Workmanship}&status=${EquipmentStatus.EquipmentStatus_Active}`}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-3 max-xs:col-span-6">
            <div className="">
              <Controller
                name="usedMaterialClass"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Combobox
                    label="Kullanılacak Malzeme"
                    value={value}
                    items={materialClasses}
                    onChange={onChange}
                    error={""}
                    displayValue={(item) => item?.label as string}
                  />
                )}
              />
            </div>
          </div>

          <div className="col-span-3 max-xs:col-span-6">
            <div className="">
              <Controller
                name="materialType"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Combobox
                    label="Malzeme Türü"
                    value={value}
                    items={materialTypes}
                    onChange={onChange}
                    error={""}
                    displayValue={(item) => item?.label as string}
                  />
                )}
              />
            </div>
          </div>

          <div className="col-span-3 mt-1 max-xs:col-span-6">
            <div className="">
              <Input
                label="Miktar"
                type="number"
                autoComplete="given-name"
                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("quantity")}
              />
            </div>
          </div>
          <div className="col-span-3 max-xs:col-span-6">
            <div className="">
              <Controller
                name="unitOfMeasureId"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Combobox
                    label="Ölçü Birimi"
                    value={value}
                    items={unitOfMeasures}
                    onChange={onChange}
                    error={""}
                    displayValue={(item) => item?.label as string}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-3 mt-1 max-xs:col-span-6">
            <div className="">
              <Controller
                name="unitPrice"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <CurrencyInput
                      id="unitPrice"
                      label="Birim Fiyat"
                      // @ts-ignore
                      value={value}
                      onChange={onChange}
                      className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="col-span-3 mt-1 max-xs:col-span-6">
            <div className="">
              <Input
                label="İndirim Oranı"
                type="number"
                min={0}
                max={100}
                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("discountRate")}
              />
            </div>
          </div>
          <div className="col-span-3 mt-1 max-xs:col-span-6">
            <div className="">
              <Controller
                name="taxRateId"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Combobox
                    label="KDV Oranı"
                    value={value}
                    items={taxRates}
                    onChange={onChange}
                    error={""}
                    displayValue={(item) => item?.label as string}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-3 mt-1 max-xs:col-span-6">
            <div className="">
              <Controller
                name="vatAmount"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <CurrencyInput
                      id="vatAmount"
                      label="KDV Tutarı"
                      // @ts-ignore
                      value={value}
                      onChange={onChange}
                      className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="col-span-3 mt-1 max-xs:col-span-6">
            <div className="">
              <Controller
                name="totalAmount"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <CurrencyInput
                      id="totalAmount"
                      label="Toplam Tutar"
                      // @ts-ignore
                      value={value}
                      onChange={onChange}
                      className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  );
                }}
              />
            </div>
          </div>

          <div className="col-span-3 mt-1 max-xs:col-span-6">
            <div className="">
              <Controller
                name="generalStatus"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Combobox
                    label="Statü"
                    value={value}
                    items={statuses}
                    onChange={onChange}
                    error={""}
                    displayValue={(item) => item?.label as string}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-3 mt-1 max-xs:col-span-6 max-xs:mt-4">
            <div className="flex items-center gap-4">
              <Controller
                name="isGuarantee"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <input
                    onChange={onChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
                    type="checkbox"
                    checked={value ? value : false}
                    id="default"
                  />
                )}
              />
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-black"
              >
                Garanti
              </label>
            </div>
          </div>
          <div className="col-span-3 mt-1 max-xs:col-span-6 max-xs:mt-4">
            <div className="flex items-center gap-4">
              <Controller
                name="isReflected"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <input
                    onChange={(e) => {
                      onReflectedChange(e.target.checked, onChange);
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
                    type="checkbox"
                    checked={value ? value : false}
                    id="default"
                  />
                )}
              />
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-black"
              >
                Yansıtılacak mı?
              </label>
            </div>
          </div>
          {isReflected && (
            <div className="col-span-6 grid grid-cols-6 gap-x-6 gap-y-4">
              <div className="col-span-3 mt-1 max-xs:col-span-6">
                <div className="">
                  <Controller
                    name="reflectedTo"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Combobox
                        label="Kime Yansıtılacak?"
                        value={value}
                        items={reflected}
                        onChange={(value) =>
                          onReflectedToChange(value, onChange)
                        }
                        error={""}
                        displayValue={(item) => item?.label as string}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-span-3 mt-1 max-xs:col-span-6">
                <div className="mt-1">
                  <Controller
                    name="reflectedAmount"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => {
                      return (
                        <CurrencyInput
                          id="reflectedAmount"
                          label="Yansıtılacak Tutar"
                          // @ts-ignore
                          value={value}
                          onChange={onChange}
                          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="col-span-6 mt-8 flex justify-end">
            <Button
              type="button"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              disabled={isLoading}
              onClick={() => {
                const submit = handleSubmit(onSubmit);
                submit();
              }}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Kaydet
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
