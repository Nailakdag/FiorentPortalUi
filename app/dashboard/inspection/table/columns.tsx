// columns.tsx
import { generalStatusMap } from "@/contants/maps";
import { getFormattedDate } from "@/lib/utils";
import { Check, X } from "lucide-react";

export const columns: any[] = [
  {
    key: "id",
    header: "Id",
    sortable: true,
    render: (value: any) => (
      <span className="font-medium text-gray-900">{value}</span>
    ),
  },
  {
    key: "licensePlate",
    header: "Plaka",
    sortable: true,
    render: (value: any) => (
      <span className="font-medium text-gray-900">{value}</span>
    ),
  },
  {
    key: "equipmentName",
    header: "Araç",
    sortable: true,
    render: (value: any) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "documentNumber",
    header: "Belge Numarası",
    sortable: true,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
  {
    key: "inspectionType",
    header: "Muayene Türü",
    sortable: true,
    render: (value: any) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "businessPartnerName",
    header: "İş ortağı",
    sortable: true,
    render: (value: any) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "inspectionPartnerName",
    header: "İşlem Yapan Firma",
    sortable: true,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
  {
    key: "inspectionResponsible",
    header: "Muayene Sorumlusu",
    sortable: true,
    render: (value: any) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "inspectionKM",
    header: "Muayene Km",
    sortable: true,
    render: (value: any) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "penaltyAmount",
    header: "Ceza Tutarı",
    sortable: false,
    render: (value: any) => (
      <span className="text-gray-700 line-clamp-2">{value}</span>
    ),
  },
  {
    key: "paidAmount",
    header: "Ödenen Tutar",
    sortable: false,
    render: (value: any) => (
      <span className="text-gray-700 line-clamp-2">{value}</span>
    ),
  },
  {
    key: "paymentDate",
    header: "Vade Tarihi",
    sortable: false,
    render: (value: any) => (
      <span className="text-gray-700 line-clamp-2">
        {getFormattedDate(value)}
      </span>
    ),
  },
  {
    key: "inspectionExpirationDate",
    header: "Muayene Geçerlilik Tarihi",
    sortable: false,
    render: (value: any) => (
      <span className="text-gray-700 line-clamp-2">
        {getFormattedDate(value)}
      </span>
    ),
  },
  {
    key: "transactionDate",
    header: "İşlem Tarihi",
    sortable: false,
    render: (value: any) => (
      <span className="text-gray-700 line-clamp-2">
        {getFormattedDate(value)}
      </span>
    ),
  },
  {
    key: "isReflected",
    header: "Yansıtılsın mı?",
    sortable: false,
    render: (value: any) => {
      return (
        <span className={value ? "text-green-500" : "text-red-500"}>
          {value ? <Check /> : <X />}
        </span>
      );
    },
  },
  {
    key: "description",
    header: "Açıklama",
    sortable: false,
    render: (value: any) => (
      <span className="text-gray-700 line-clamp-2">{value}</span>
    ),
  },
  {
    key: "generalStatus",
    header: "Statü",
    sortable: false,
    render: (value: any) => (
      <span className="text-gray-700 line-clamp-2">
        {generalStatusMap[value]}
      </span>
    ),
  },
];
