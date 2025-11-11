// columns.tsx
import { generalStatusMap } from "@/contants/maps";

export const columns: any[] = [
  {
    key: "title",
    header: "Şikayet Başlığı",
    sortable: true,
    render: (value: any) => (
      <span className="font-medium text-gray-900">{value}</span>
    ),
  },
  {
    key: "complaintType",
    header: "Şikayet Türü",
    sortable: true,
    render: (value: any) => (
      <span className="font-medium text-gray-900">{value?.label ?? ""}</span>
    ),
  },
  {
    key: "otherTypeDescription",
    header: "Detay",
    sortable: true,
    render: (value: any) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "complaintDate",
    header: "Şikayet Tarihi",
    sortable: true,
    render: (value: any) =>
      value ? new Date(value).toLocaleDateString("tr-TR") : "",
  },
  {
    key: "status",
    header: "Durum",
    sortable: true,
    render: (value: any) => (
      <span className="font-medium">{generalStatusMap[value]}</span>
    ),
  },
  {
    key: "complainant",
    header: "Kayıt Yapan Kullanıcı",
    sortable: true,
    render: (value: any) => (
      <span className="text-gray-900">{value?.label ?? ""}</span>
    ),
  },
  {
    key: "equipmentSerialNumberId",
    header: "Plaka",
    sortable: true,
    pinnable: true,
    render: (value: any) => (
      <span className="text-gray-900">{value?.label ?? ""}</span>
    ),
  },
  {
    key: "customerName",
    header: "Müşteri Adı Soyadı",
    sortable: true,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
  {
    key: "customerPhoneNo",
    header: "Müşteri Telefonu",
    sortable: true,
    render: (value: any) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "customerEmail",
    header: "Müşteri E-Posta Adresi",
    sortable: true,
    render: (value: any) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "description",
    header: "Şikayet Açıklaması",
    sortable: false,
    render: (value: any) => (
      <span className="text-gray-700 line-clamp-2">{value}</span>
    ),
  },
];
