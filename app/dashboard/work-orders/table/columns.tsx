import { generalStatusMap } from "@/contants/maps";

export const columns: any[] = [
  {
    key: "id",
    header: "ID",
    sortable: true,
    render: (value: any) => (
      <span className="font-medium text-gray-900">{value}</span>
    ),
  },
  {
    key: "subReasonName",
    header: "Geliş Sebebi",
    sortable: true,
    sortingId: "SubReasonFK.Description",
    pinnable: true,
    render: (value: any) => (
      <span className="font-medium text-gray-900">{value}</span>
    ),
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
    key: "licensePlate",
    header: "Plaka",
    sortable: true,
    sortingId: "EquipmentSerialNumberFK.LicensePlate",
    pinnable: true,
    render: (value: any) => (
      <span className="font-medium text-gray-900">{value}</span>
    ),
  },
  {
    key: "make",
    header: "Marka",
    sortable: false,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
  {
    key: "model",
    header: "Model",
    sortable: false,
    render: (value: any, row: any) => <span>{value}</span>,
  },
  {
    key: "serviceName",
    header: "Servis",
    sortable: true,
    sortingId: "ServiceFK.Name",
    pinnable: true,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
  {
    key: "startingDate",
    header: "Servis Giriş Tarihi",
    sortable: true,
    render: (value: any) =>
      value ? new Date(value).toLocaleDateString("tr-TR") : "",
  },
  {
    key: "endingDate",
    header: "Servis Gidiş Tarihi",
    sortable: true,
    render: (value: any) =>
      value ? new Date(value).toLocaleDateString("tr-TR") : "",
  },
  {
    key: "serviceReleaseKM",
    header: "Servis Çıkış KM",
    sortable: true,
    render: (value: any) => <span className="font-medium">{value}</span>,
  },
];
