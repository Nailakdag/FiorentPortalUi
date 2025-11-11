import { subDays, startOfWeek, addDays } from "date-fns";

const notificationTypes = [
  { id: 1, label: "Yeni Şikayet", color: "bg-red-100 text-red-800" },
  { id: 2, label: "İş Emri Güncellemesi", color: "bg-blue-100 text-blue-800" },
  {
    id: 3,
    label: "Randevu Hatırlatıcı",
    color: "bg-yellow-100 text-yellow-800",
  },
  { id: 4, label: "Sistem Bildirimi", color: "bg-green-100 text-green-800" },
  { id: 5, label: "Onay Bekliyor", color: "bg-purple-100 text-purple-800" },
];

const notificationTitles = [
  "Yeni şikayet kaydı oluşturuldu",
  "İş emri durumu güncellendi",
  "Yarın randevunuz var",
  "Sistem bakımı tamamlandı",
  "Onayınız gerekiyor",
  "Araç servise alındı",
  "Fatura hazır",
  "Parça siparişi geldi",
  "Muayene randevusu oluşturuldu",
  "Hasar raporu onaylandı",
];

const notificationMessages = [
  "34 ABC 123 plakalı araç için yeni bir şikayet kaydı oluşturuldu.",
  "İş emri #1234 durumu 'Devam Ediyor' olarak güncellendi.",
  "Yarın saat 14:00'te araç servis randevunuz bulunmaktadır.",
  "Sistem bakımı başarıyla tamamlandı. Tüm özellikler kullanılabilir.",
  "İş emri #5678 için onayınız gerekmektedir.",
  "35 XYZ 456 plakalı araç servise alınmıştır.",
  "Fatura #9012 hazır ve görüntülenebilir.",
  "Sipariş edilen parça depoya ulaşmıştır.",
  "06 DEF 789 plakalı araç için muayene randevusu oluşturuldu.",
  "Hasar raporu #3456 onaylanmıştır.",
];

const generateDate = (index: number): Date => {
  const now = new Date();
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
  const lastWeekStart = startOfWeek(subDays(now, 7), { weekStartsOn: 1 });

  const isThisWeek = Math.random() < 0.6;

  const randomDays = Math.floor(Math.random() * (isThisWeek ? 5 : 7));
  const baseDate = isThisWeek ? thisWeekStart : lastWeekStart;

  return addDays(baseDate, randomDays);
};

export const mockNotificationData: any[] = Array.from(
  { length: 10 },
  (_, i) => {
    const notificationType = notificationTypes[i % notificationTypes.length];
    const title = notificationTitles[i % notificationTitles.length];
    const message = notificationMessages[i % notificationMessages.length];
    const date = generateDate(i);
    const isRead = Math.random() > 0.3; // %70 okunmuş

    return {
      id: i + 1,
      type: notificationType,
      title: title,
      message: message,
      date: date,
      isRead: isRead,
    };
  },
);
