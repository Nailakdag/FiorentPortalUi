import { MaterialType, ReflectedTo, UsedMaterialClass } from "@/contants/enums";

export const usedMaterialClassMap: {
  [x: number]: string;
} = {
  [UsedMaterialClass.UsedMaterialClass_None]: "Yok",
  [UsedMaterialClass.UsedMaterialClass_Accessory]: "Aksesuar",
  [UsedMaterialClass.UsedMaterialClass_Fault]: "Arıza",
  [UsedMaterialClass.UsedMaterialClass_Maintenance]: "Bakım-Onarım",
};

export const materialTypeMap: {
  [x: number]: string;
} = {
  [MaterialType.MaterialType_Dislocated]: "Çıkma",
  [MaterialType.MaterialType_Equivalent]: "Muadil",
  [MaterialType.MaterialType_Original]: "Orjinal",
};
