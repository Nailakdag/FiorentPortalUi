import { GeneralStatus } from "./enums";

export const generalStatusMap: {
  [x: number]: string;
} = {
  [GeneralStatus.GeneralStatus_New]: "Yeni",
  [GeneralStatus.GeneralStatus_InProgress]: "Devam Ediyor",
  [GeneralStatus.GeneralStatus_Approved]: "Onaylandı",
  [GeneralStatus.GeneralStatus_Reject]: "Reddedildi",
  [GeneralStatus.GeneralStatus_Cancelled]: "İptal edildi",
  [GeneralStatus.GeneralStatus_Completed]: "Tamamlandı",
  [GeneralStatus.GeneralStatus_Dispute]: "Onaylandı İtiraz Edildi",
  [GeneralStatus.GeneralStatus_MissingDocuments]: "Eksik Evrak",
};
