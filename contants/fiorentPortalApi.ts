export const FIORENT_PORTAL_API_BASE_URL =
  process.env.NEXT_PUBLIC_FIORENT_API_BASE_URL ||
  "https://analystapi-fleet.fiorent.com";
export const AUTHENTICATE: string = `${FIORENT_PORTAL_API_BASE_URL}/api/TokenAuth/Authenticate`;

export const GET_COUNTRY_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetCountryForTableDropdown`;
export const GET_CHANNELS_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetChannelForTableDropdown`;
export const GET_PRIORITY_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetPriorityForTableDropdown`;
export const GET_SUB_REASON_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetSubReasonForTableDropdown`;
export const GET_DISTRICT_FOR_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetDistrictForTableDropdown`;
export const GET_CITY_CODE_TR_FORTABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetCityCodeTrForTableDropdown`;

export const GET_EQUIPMENT_SERIAL_NUMBERS_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetEquipmentSerialNumberForTableDropdown`;
export const GET_MAKE_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetMakeForTableDropdown`;
export const GET_MODEL_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetModelForTableDropdown`;
export const GET_BUSINESS_PARTNER_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetBusinessPartnerForTableDropdown`;
export const GET_SUPPLIER_BUSINESS_PARTNER_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetSupplierBusinessPartnerForTableDropdown`;
export const GET_GENERAL_STATUS_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetGeneralStatusForTableDropdown`;

export const GET_WORK_ORDER_FOR_EDIT = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/FleetWorkOrders/GetFleetWorkOrderForEdit`;
export const POST_WORK_ORDERS_CREATE_OR_EDIT = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/FleetWorkOrders/CreateOrEdit`;
export const DELETE_WORK_ORDERS_DELETE = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/FleetWorkOrders/Delete`;

export const GET_VEHICLE_INFORMATION_BY_EQUIPMENT_SERIAL_NUMBER = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/SalesOrders/GetVehicleInformationByEquipmentSerialNumberId`;

export const GET_WORK_ORDERS_GET_ALL = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/FleetWorkOrders/GetAll`;

export const GET_INSPECTION_GET_ALL = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/Inspections/GetAll`;

export const GET_FLEET_WORK_ORDER_SPARE_PARTS_GET_ALL = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/FleetWorkOrderSpareParts/GetAll`;
export const GET_UNIT_OF_MEASURE_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetUnitOfMeasureForTableDropdown`;
export const GET_MATERIAL_TYPE_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetMaterialTypeForTableDropdown`;
export const GET_MATERIAL_CLASS_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetMaterialClassForTableDropdown`;
export const GET_TAX_RATE_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetTaxRateForTableDropdown`;
export const GET_REFLECTED_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetReflectedToForTableDropdown`;
export const GET_EQUIPMENT_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetEquipmentForTableDropdown`;

export const GET_FILES = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/FileRecords/GetAllFileRecords`;
export const UPLOAD_FILES = `${FIORENT_PORTAL_API_BASE_URL}/File/UploadFiles`;
export const DELETE_FILE_RECORDS = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/FileRecords/Delete`;

export const DOWNLOAD_FILE = `${FIORENT_PORTAL_API_BASE_URL}/File/DownloadFile`;

export const GET_INSPECTION_RESPONSIBLES_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetInspectionResponsibleForTableDropdown`;
export const GET_INSPECTION_TYPES_FOR_TABLE_DROPDOWN = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/CommonLookup/GetInspectionTypeForTableDropdown`;

export const GET_INSPECTION_FOR_EDIT = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/Inspections/GetInspectionForEdit`;
export const POST_INSPECTION_CREATE_OR_EDIT = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/Inspections/CreateOrEdit`;
export const DELETE_INSPECTION_DELETE = `${FIORENT_PORTAL_API_BASE_URL}/api/services/app/Inspections/Delete`;
