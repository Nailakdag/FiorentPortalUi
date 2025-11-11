import { subDays, startOfWeek, addDays } from "date-fns";
import { GeneralStatus } from "@/contants/enums";

const complaintTypes = [
  { id: 1, label: "Servis Kalitesi" },
  { id: 2, label: "Gecikme" },
  { id: 3, label: "Hasar" },
  { id: 4, label: "Fiyat" },
  { id: 5, label: "Diğer" },
];

const complainants = [
  { id: 1, label: "Ahmet Yılmaz" },
  { id: 2, label: "Mehmet Demir" },
  { id: 3, label: "Ayşe Korkmaz" },
  { id: 4, label: "Fatma Çelik" },
  { id: 5, label: "Ali Öztürk" },
];

const licensePlates = [
  "34 ABC 123",
  "35 XYZ 456",
  "06 DEF 789",
  "16 GHJ 234",
  "07 KLM 567",
  "34 ABC 124",
  "35 XYZ 457",
  "06 DEF 790",
  "16 GHJ 235",
  "07 KLM 568",
];

const customerNames = [
  "Mehmet Yıldız",
  "Ayşe Kaya",
  "Ali Demir",
  "Fatma Şahin",
  "Mustafa Öz",
  "Zeynep Arslan",
  "Hasan Yılmaz",
  "Elif Çelik",
  "Burak Korkmaz",
  "Selin Aydın",
];

const complaintTitles = [
  "Servis süresi çok uzun",
  "Araçta hasar tespit edildi",
  "Fiyat beklentileri aşıyor",
  "Randevu saatinde gelinmedi",
  "Yapılan işlem yetersiz",
  "Müşteri hizmeti kötü",
  "Araç temiz değildi",
  "Parça değişimi gecikti",
  "Fatura hatası",
  "Garanti kapsamı dışında",
];

const descriptions = [
  "Araç servise bırakıldıktan sonra 3 gün geçmesine rağmen işlem tamamlanmadı. Müşteri memnuniyetsiz.",
  "Servis sonrası araçta yeni çizikler ve hasarlar tespit edildi. Bu durumun açıklanması gerekiyor.",
  "Yapılan işlemler için fiyat çok yüksek. Önceden belirtilen fiyatla uyuşmuyor.",
  "Randevu saatinde servise gidildi ancak araç hazır değildi. 2 saat bekletildi.",
  "Yapılan bakım işlemi yetersiz. Aynı sorun tekrar ortaya çıktı.",
  "Müşteri hizmetleri personeli yeterince ilgili değildi. Sorulara yanıt verilmedi.",
  "Araç servisten alındığında iç ve dış temizliği yapılmamıştı.",
  "Sipariş edilen parça 1 hafta gecikmeyle geldi. Müşteri mağdur oldu.",
  "Faturada yanlış işlemler gösteriliyor. Düzeltilmesi gerekiyor.",
  "Yapılan işlem garanti kapsamında olmasına rağmen ücret talep edildi.",
];

const statusDistribution = [
  { status: GeneralStatus.GeneralStatus_New, ratio: 0.2 },
  { status: GeneralStatus.GeneralStatus_InProgress, ratio: 0.3 },
  { status: GeneralStatus.GeneralStatus_Approved, ratio: 0.15 },
  { status: GeneralStatus.GeneralStatus_Completed, ratio: 0.25 },
  { status: GeneralStatus.GeneralStatus_Reject, ratio: 0.1 },
];

const generateDate = (index: number): string => {
  const now = new Date();
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
  const lastWeekStart = startOfWeek(subDays(now, 7), { weekStartsOn: 1 });

  const isThisWeek = Math.random() < 0.6;

  const randomDays = Math.floor(Math.random() * (isThisWeek ? 5 : 7));
  const baseDate = isThisWeek ? thisWeekStart : lastWeekStart;

  return addDays(baseDate, randomDays).toISOString();
};

const selectStatus = (index: number): number => {
  const random = Math.random();
  let cumulative = 0;

  for (const item of statusDistribution) {
    cumulative += item.ratio;
    if (random <= cumulative) return item.status;
  }

  return GeneralStatus.GeneralStatus_New;
};

const generatePhoneNumber = (): string => {
  const areaCodes = ["532", "533", "534", "535", "536", "505", "506", "507"];
  const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
  const number = Math.floor(1000000 + Math.random() * 9000000);
  return `0${areaCode}${number}`;
};

const generateEmail = (name: string): string => {
  const domains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const namePart = name.toLowerCase().replace(/\s+/g, ".");
  return `${namePart}@${domain}`;
};

export const mockComplaintData: any[] = Array.from({ length: 100 }, (_, i) => {
  const complaintType = complaintTypes[i % complaintTypes.length];
  const complainant = complainants[i % complainants.length];
  const licensePlate = licensePlates[i % licensePlates.length];
  const customerName = customerNames[i % customerNames.length];
  const title = complaintTitles[i % complaintTitles.length];
  const description = descriptions[i % descriptions.length];
  const status = selectStatus(i);
  const complaintDate = generateDate(i);

  return {
    id: i + 1,
    title: title,
    complaintType: {
      id: complaintType.id,
      label: complaintType.label,
    },
    otherTypeDescription:
      Math.random() > 0.5
        ? `Ek detay bilgisi ${i + 1} - ${new Date().getFullYear()}`
        : null,
    complaintDate: complaintDate,
    status: status,
    complainant: {
      id: complainant.id,
      label: complainant.label,
    },
    equipmentSerialNumberId: {
      id: i + 1,
      label: licensePlate,
    },
    customerName: customerName,
    customerPhoneNo: generatePhoneNumber(),
    customerEmail: generateEmail(customerName),
    description: description,
  };
});
