import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CardContainer from "@/components/ui/card-container";
import { Combobox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { WrenchIcon } from "@heroicons/react/24/outline";

export default function Service() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <CardContainer title="Servis" icon={<WrenchIcon />} colorScheme="orange">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 max-xs:col-span-6">
          <Controller
            name="serviceId"
            control={control}
            render={({
              field: { onChange, value, onBlur },
            }: {
              field: { onChange: any; value: any; onBlur: any };
            }) => (
              <Combobox
                label="Servis Bilgisi"
                value={value}
                items={[]}
                onChange={(value: any) => {
                  onChange(value);
                  // if (
                  //   watchSubReasonId &&
                  //   watchSubReasonId.workOrderReasonCode ===
                  //     WorkOrderReasonCode.WorkOrderReasonCode_InternalReplacementEquipment
                  // ) {
                  //   if (!value?.value) {
                  //     setValue("replacementClassId", null);
                  //   }
                  //   changeReplacementClass({ serviceId: value?.id });
                  // }
                }}
                error={""}
                displayValue={(item) => item?.label as string}
                className="w-full"
                asyncItemsUrl="/api/lookups/supplier-business-partners"
                type="businessPartner"
                additionalParams={`businessPartnerStatus=true&businessPartnerRole=2`}
              />
            )}
          />
        </div>

        <div className="col-span-6 max-xs:col-span-6">
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
        <div className="col-span-6 max-xs:col-span-6">
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
                onChange={(date) => {
                  onChange(date);
                }}
              />
            )}
          />
        </div>
        <div className="col-span-6 max-xs:col-span-6">
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
                  // if (
                  //   watchSubReasonId?.id &&
                  //   watchSubReasonId.workOrderReasonCode ===
                  //     WorkOrderReasonCode.WorkOrderReasonCode_InternalReplacementEquipment
                  // ) {
                  //   setValue(
                  //     "estimatedAmount",
                  //     calculateEstimatedAmount(
                  //       watchStartingDate,
                  //       date,
                  //       watchReplacementPrice,
                  //     ),
                  //   );
                  //   changeReplacementClass({ endDate: date });
                  // }
                }}
              />
            )}
          />
        </div>
        <div className="col-span-6 max-xs:col-span-6 mt-1">
          <Input
            label="Güncel KM"
            type="number"
            id="serviceReleaseKM"
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("serviceReleaseKM")}
          />
        </div>
        <div className="col-span-6 max-xs:col-span-6 mt-1">
          <Input
            label="Servis Çıkış KM"
            type="number"
            id="serviceReleaseKM"
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("serviceReleaseKM")}
          />
        </div>
      </div>
    </CardContainer>
  );
}
