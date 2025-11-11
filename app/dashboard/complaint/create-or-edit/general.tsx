"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CardContainer from "@/components/ui/card-container";
import { Combobox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { BookText } from "lucide-react";

export default function Service() {
  const { control, register, getValues } = useFormContext();

  return (
    <CardContainer title="Şikayet Form" icon={<BookText />} colorScheme="red">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-2">
        <div className="md:col-span-4 col-span-12">
          <Input
            label="Şikayet Başlığı"
            type="text"
            id="title"
            required
            className="w-full"
            {...register("title")}
          />
        </div>
        <div className="md:col-span-4 col-span-12">
          <Controller
            name="complaintType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Combobox
                label="Şikayet Türü"
                value={value}
                items={[]}
                onChange={onChange}
                required
                displayValue={(item) => item?.label as string}
                className="w-full"
              />
            )}
          />
        </div>
        <div className="md:col-span-4 col-span-12">
          <Input
            label="Detay"
            type="text"
            id="otherTypeDescription"
            className="w-full"
            {...register("otherTypeDescription")}
          />
        </div>
        <div className="md:col-span-4 col-span-12">
          <label className="block text-sm font-medium leading-6 text-black">
            Şikayet Tarihi
          </label>
          <Controller
            name="complaintDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker value={value} onChange={onChange} />
            )}
          />
        </div>
        <div className="md:col-span-4 col-span-12">
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange } }) => (
              <Combobox
                label="Durum"
                value={getValues("status")}
                items={[]}
                onChange={onChange}
                displayValue={(item) => item?.label as string}
                className="w-full"
              />
            )}
          />
        </div>
      </div>

      <div className="border-t-2 border-dashed border-gray-300 py-4 mt-6" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 col-span-12">
          <Controller
            name="complainant"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Combobox
                label="Kayıt Yapan Kullanıcı"
                value={value}
                items={[]}
                onChange={onChange}
                displayValue={(item) => item?.label as string}
                className="w-full"
              />
            )}
          />
        </div>

        <div className="md:col-span-4 col-span-12">
          <Controller
            name="equipmentSerialNumberId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Combobox
                label="Plaka"
                value={value}
                items={[]}
                onChange={onChange}
                displayValue={(item) => item?.label as string}
                className="w-full"
                asyncItemsUrl="/api/lookups/equipment-serial-numbers"
                type="equipmentSerialNumber"
              />
            )}
          />
        </div>
      </div>

      <div className="border-t-2 border-dashed border-gray-300 py-4 mt-6" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 col-span-12">
          <Input
            label="Müşterinin Adı Soyadı"
            type="text"
            id="customerName"
            className="w-full"
            {...register("customerName")}
          />
        </div>
        <div className="md:col-span-4 col-span-12">
          <Input
            label="Müşteri Telefonu"
            type="phone"
            id="customerPhoneNo"
            className="w-full"
            {...register("customerPhoneNo")}
          />
        </div>
        <div className="md:col-span-4 col-span-12">
          <Input
            label="Müşteri E-Posta Adresi"
            type="text"
            id="customerEmail"
            className="w-full"
            {...register("customerEmail")}
          />
        </div>
      </div>

      <div className="border-t-2 border-dashed border-gray-300 py-4 mt-6" />

      <div className="col-span-12">
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-black"
        >
          Şikayet Açıklaması
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="description"
          placeholder="Açıklama"
          {...register("description")}
          className="w-full mt-2 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[120px] bg-white text-sm"
          rows={4}
        />
      </div>
    </CardContainer>
  );
}
