"use client";
import React from "react";
import { DataTable, Column } from "../../../components/data-table/data-table";
import useGlobalFilter from "@/lib/hooks/use-global-filter";
import { usePagination } from "@/lib/hooks/use-pagination";

const tableData = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  plaka: `34ABC${100 + i}`,
  marka: `${
    i % 5 === 0
      ? "Ford"
      : i % 4 === 0
      ? "BMW"
      : i % 3 === 0
      ? "Toyota"
      : "Renault"
  }`,
  durum: i % 3 === 0 ? "Hazır" : i % 2 === 0 ? "Hazırlanıyor" : "Beklemede",
  model: `Model ${2020 + (i % 5)}`,
  servis: `Servis ${i % 4}`,
  tarih: `2025-06-${String((i % 30) + 1).padStart(2, "0")}`,
  yakitTipi: i % 2 === 0 ? "Benzin" : "Dizel",
  km: 10000 + i * 500,
  renk: i % 3 === 0 ? "Beyaz" : i % 2 === 0 ? "Siyah" : "Gri",
  sasiNo: `SASI-${100000 + i}`,
  ruhsatNo: `RUHSAT-${200000 + i}`,
  sigortaDurumu: i % 4 === 0 ? "Aktif" : "Pasif",
}));

export default function ReportPage() {
  const { limit, onPaginationChange, skip } = usePagination();
  const { globalFilter, setGlobalFilter } = useGlobalFilter(onPaginationChange);

  const handleAddClick = () => {
    console.log("Yeni rapor ekleme butonu tıklandı");
  };

  const columns: Column[] = [
    {
      key: "id",
      header: "ID",
      className: "font-medium",
    },
    {
      key: "plaka",
      header: "Plaka",
      className: "font-semibold",
    },
    {
      key: "marka",
      header: "Marka",
    },
    {
      key: "durum",
      header: "Durum",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Hazır"
              ? "bg-green-100 text-green-800"
              : value === "Hazırlanıyor"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "model",
      header: "Model",
    },
    {
      key: "servis",
      header: "Servis",
    },
    {
      key: "tarih",
      header: "Rapor Tarihi",
    },
    {
      key: "actions",
      header: "İşlemler",
      className: "text-right",
      render: (_, row) => (
        <button
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors"
          onClick={() => console.log("Detay clicked for:", row.id)}
        >
          Detay
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={tableData}
        totalCount={tableData.length}
        emptyMessage="Henüz rapor bulunamadı"
        showSearch={true}
        searchPlaceholder="Plaka, marka, model veya duruma göre ara..."
        showAddButton={true}
        addButtonText="Yeni Rapor Ekle"
        onAddClick={handleAddClick}
        limit={limit}
        skip={skip}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        onPaginationChange={onPaginationChange}
        externalPagination={false}
      />
    </div>
  );
}
