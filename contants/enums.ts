export const WorkOrderReasonCode = {
  WorkOrderReasonCode_Maintenance: 1, // Bakım
  WorkOrderReasonCode_Fault: 2, // Arıza
  WorkOrderReasonCode_Damage: 3, // Hasar
  WorkOrderReasonCode_InternalReplacementEquipment: 4, // İkame
  WorkOrderReasonCode_ExternalReplacementEquipment: 5, // Dış Kaynak Yedek Ekipman
  WorkOrderReasonCode_Tire: 6, // Lastik
  WorkOrderReasonCode_PreBackup: 7, // Ön Yedekleme
};

export const EquipmentStatus = {
  EquipmentStatus_Active: 1,
  EquipmentStatus_Template: 2,
  EquipmentStatus_Passive: 3,
};

export const EquipmentType = {
  EquipmentType_Product: 1,
  EquipmentType_NonProduct: 2,
  EquipmentType_Service: 3,
  EquipmentType_SparePart: 4,
  EquipmentType_Workmanship: 5,
  EquipmentType_MaintenancePackage: 6,
  EquipmentType_Campaign: 7,
};

export const ReflectedTo = {
  ReflectedTo_Customer: 1,
  ReflectedTo_Service: 2,
};

export const UsedMaterialClass = {
  UsedMaterialClass_None: 1,
  UsedMaterialClass_Accessory: 2,
  UsedMaterialClass_Fault: 3,
  UsedMaterialClass_Maintenance: 4,
};

export const GeneralStatus = {
  GeneralStatus_New: 1,
  GeneralStatus_InProgress: 2,
  GeneralStatus_Approved: 3,
  GeneralStatus_Reject: 4,
  GeneralStatus_Cancelled: 5,
  GeneralStatus_Completed: 6,
  GeneralStatus_Dispute: 7,
  GeneralStatus_MissingDocuments: 8,
};

export const MaterialType = {
  MaterialType_Original: 1,
  MaterialType_Equivalent: 2,
  MaterialType_Dislocated: 3,
};
