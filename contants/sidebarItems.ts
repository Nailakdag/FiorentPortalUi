import {
  AlertTriangle,
  BarChart3,
  Car,
  FileText,
  Home,
  Settings,
  Wrench,
} from "lucide-react";
import {
  WORK_ORDER,
  MAINTENANCE,
  DAMAGE,
  FAULT,
  TIRE,
  INSPECTION,
  VEHICLE_LASHING_AND_RESCUE,
  COMPLAINT,
  REPLACEMENT,
} from "./routes";

export const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: WORK_ORDER },

  { id: "bakim", label: "Bakım", icon: Wrench, href: MAINTENANCE },
  {
    id: "hasar",
    label: "Hasar",
    icon: AlertTriangle,
    href: DAMAGE,
  },
  { id: "ariza", label: "Arıza", icon: Settings, href: FAULT },
  { id: "ikame", label: "İkame", icon: Settings, href: REPLACEMENT },
  { id: "lastik", label: "Lastik", icon: Car, href: TIRE },
  {
    id: "muayene",
    label: "Muayene",
    icon: BarChart3,
    href: INSPECTION,
  },
  {
    id: "arac-baglama",
    label: "Araç Bağlama ve Kurtarma",
    icon: Car,
    href: VEHICLE_LASHING_AND_RESCUE,
  },
  {
    id: "sikayetler",
    label: "Şikayetler",
    icon: FileText,
    href: COMPLAINT,
  },
];
