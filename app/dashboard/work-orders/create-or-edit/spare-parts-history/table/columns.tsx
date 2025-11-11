import { Check, X } from "lucide-react";
import { usedMaterialClassMap, materialTypeMap } from "./data/schema";
import { generalStatusMap } from "@/contants/maps";

export const columns: any[] = [
  {
    key: "equipmentName",
    header: "Ekipman",
    sortable: true,
    pinnable: true,
    render: (value: any) => (
      <span className="font-medium text-gray-900">{value}</span>
    ),
  },
  {
    key: "usedMaterialClassName",
    header: "Kullanılacak Malzeme",
    sortable: true,
    pinnable: true,
    render: (value: any) => (
      <span className="font-medium">{usedMaterialClassMap[value]}</span>
    ),
  },
  {
    key: "materialTypeName",
    header: "Malzeme Türü",
    sortable: true,
    render: (value: any) => (
      <span className="font-medium">{materialTypeMap[value]}</span>
    ),
  },
  {
    key: "quantity",
    header: "Miktar",
    sortable: true,
    render: (value: any) => <span>{value}</span>,
  },
  {
    key: "unitOfMeasureName",
    header: "Ölçü Birimi",
    sortable: true,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
  {
    key: "unitPrice",
    header: "Birim Fiyat",
    sortable: true,
    render: (value: any) => <span className="font-medium">₺{value}</span>,
  },
  {
    key: "discountRate",
    header: "İndirim Oranı",
    sortable: true,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
  {
    key: "taxRate",
    header: "KDV Oranı",
    sortable: true,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
  {
    key: "vatAmount",
    header: "KDV Tutarı",
    sortable: true,
    render: (value: any) => <span className="font-medium">₺{value}</span>,
  },
  {
    key: "totalAmount",
    header: "Toplam Tutar",
    sortable: true,
    render: (value: any) => <span className="font-medium">₺{value}</span>,
  },
  {
    key: "status",
    header: "Statü",
    sortable: true,
    render: (value: any) => (
      <span className="font-medium">{generalStatusMap[value]}</span>
    ),
  },
  {
    key: "isGuarantee",
    header: "Garanti",
    sortable: true,
    render: (value: any) =>
      value ? (
        <Check className="text-green-600 w-8 h-8" />
      ) : (
        <X className="text-red-500 w-8 h-8" />
      ),
  },
];
