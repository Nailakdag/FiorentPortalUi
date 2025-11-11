"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useWorkOrderContext } from "../context/workOrderContext";
import { DatePicker } from "@/components/ui/date-picker";

interface IAddItemFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: any;
  setIsOpen: any;
  row: any;
  handleEvent?: any;
}

type FormData = {
  startingDate: null;
  endingDate: null;
  planningEndingDate: null;
};

export function StartServiceForm({
  isOpen,
  setIsOpen,
  row,
  handleEvent,
}: IAddItemFormProps) {
  const rowOriginal = row;

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
      startingDate: rowOriginal?.fleetWorkOrderSparePart?.startingDate || null,
      endingDate: rowOriginal?.fleetWorkOrderSparePart?.endingDate || null,
      planningEndingDate:
        rowOriginal?.fleetWorkOrderSparePart?.planningEndingDate || null,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    if (data?.startingDate) {
      setIsLoading(true);
      const url = "/api/services/work-order/spare-parts/create-or-edit";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({}),
      });
      if (response.ok) {
        setIsOpen(false);
        toast({
          title: "Başarılı",
          variant: "success",
        });
        handleEvent?.();
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

  return (
    <div className="relative overflow-y-auto">
      <form>
        <div className="grid grid-cols-6 gap-x-6 gap-y-4">
          <div className="col-span-2 max-xs:col-span-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Servise Gidiş Tarihi
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
                    //   if (
                    //     watchSubReasonId &&
                    //     watchSubReasonId.workOrderReasonCode ===
                    //     WorkOrderReasonCode.WorkOrderReasonCode_InternalReplacementEquipment
                    //   ) {
                    //     setValue(
                    //       "estimatedAmount",
                    //       calculateEstimatedAmount(
                    //         date,
                    //         watchEndingDate,
                    //         watchReplacementPrice,
                    //       ),
                    //     );
                    //     changeReplacementClass({ startDate: date });
                    //   }
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-2 max-xs:col-span-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Servisten Çıkış Tarihi
            </label>

            <Controller
              name="endingDate"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <DatePicker
                  value={value}
                  maxDate={new Date()}
                  onChange={(date) => {
                    onChange(date);
                    //   if (
                    //     watchSubReasonId &&
                    //     watchSubReasonId.workOrderReasonCode ===
                    //     WorkOrderReasonCode.WorkOrderReasonCode_InternalReplacementEquipment
                    //   ) {
                    //     setValue(
                    //       "estimatedAmount",
                    //       calculateEstimatedAmount(
                    //         date,
                    //         watchEndingDate,
                    //         watchReplacementPrice,
                    //       ),
                    //     );
                    //     changeReplacementClass({ startDate: date });
                    //   }
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-2 max-xs:col-span-6">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-black"
            >
              Tahmini Çıkış Tarihi
            </label>

            <Controller
              name="planningEndingDate"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <DatePicker
                  value={value}
                  maxDate={new Date()}
                  onChange={(date) => {
                    onChange(date);
                    //   if (
                    //     watchSubReasonId &&
                    //     watchSubReasonId.workOrderReasonCode ===
                    //     WorkOrderReasonCode.WorkOrderReasonCode_InternalReplacementEquipment
                    //   ) {
                    //     setValue(
                    //       "estimatedAmount",
                    //       calculateEstimatedAmount(
                    //         date,
                    //         watchEndingDate,
                    //         watchReplacementPrice,
                    //       ),
                    //     );
                    //     changeReplacementClass({ startDate: date });
                    //   }
                  }}
                />
              )}
            />
          </div>
        </div>

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
      </form>
    </div>
  );
}
