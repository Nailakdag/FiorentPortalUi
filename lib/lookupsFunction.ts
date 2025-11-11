import {
  GET_CHANNELS_FOR_TABLE_DROPDOWN,
  GET_CITY_CODE_TR_FORTABLE_DROPDOWN,
  GET_COUNTRY_FOR_TABLE_DROPDOWN,
  GET_DISTRICT_FOR_DROPDOWN,
  GET_GENERAL_STATUS_FOR_TABLE_DROPDOWN,
  GET_INSPECTION_RESPONSIBLES_FOR_TABLE_DROPDOWN,
  GET_INSPECTION_TYPES_FOR_TABLE_DROPDOWN,
  GET_MAKE_FOR_TABLE_DROPDOWN,
  GET_MATERIAL_CLASS_FOR_TABLE_DROPDOWN,
  GET_MATERIAL_TYPE_FOR_TABLE_DROPDOWN,
  GET_MODEL_FOR_TABLE_DROPDOWN,
  GET_PRIORITY_FOR_TABLE_DROPDOWN,
  GET_REFLECTED_FOR_TABLE_DROPDOWN,
  GET_SUB_REASON_FOR_TABLE_DROPDOWN,
  GET_TAX_RATE_FOR_TABLE_DROPDOWN,
  GET_UNIT_OF_MEASURE_FOR_TABLE_DROPDOWN,
} from "@/contants/fiorentPortalApi";
import { fetchFromFiorentApi } from "./fiorentPortalApi";

export async function getCountries() {
  const { data } = await fetchFromFiorentApi(GET_COUNTRY_FOR_TABLE_DROPDOWN);
  return data?.items;
}

export async function getCities() {
  const { data } = await fetchFromFiorentApi(
    GET_CITY_CODE_TR_FORTABLE_DROPDOWN,
  );
  return data?.items;
}

export async function getChannels() {
  const { data } = await fetchFromFiorentApi(GET_CHANNELS_FOR_TABLE_DROPDOWN);
  return data?.items;
}

export async function getPriorities() {
  const { data } = await fetchFromFiorentApi(GET_PRIORITY_FOR_TABLE_DROPDOWN);
  return data?.items;
}

export async function getSubReasons() {
  const { data } = await fetchFromFiorentApi(GET_SUB_REASON_FOR_TABLE_DROPDOWN);
  return data?.items;
}

export async function getDistricts() {
  const { data } = await fetchFromFiorentApi(GET_DISTRICT_FOR_DROPDOWN);
  return data?.items;
}

export async function getMakes() {
  const { data } = await fetchFromFiorentApi(GET_MAKE_FOR_TABLE_DROPDOWN);
  return data?.items;
}

export async function getModels() {
  const { data } = await fetchFromFiorentApi(GET_MODEL_FOR_TABLE_DROPDOWN);
  return data?.items;
}

export async function getGeneralStatus() {
  const { data } = await fetchFromFiorentApi(
    GET_GENERAL_STATUS_FOR_TABLE_DROPDOWN,
  );
  return data?.items;
}

export async function getUnitOfMeasures() {
  const { data } = await fetchFromFiorentApi(
    GET_UNIT_OF_MEASURE_FOR_TABLE_DROPDOWN,
  );
  return data?.items;
}

export async function getMaterialTypes() {
  const { data } = await fetchFromFiorentApi(
    GET_MATERIAL_TYPE_FOR_TABLE_DROPDOWN,
  );
  return data?.items;
}

export async function getMaterialClasses() {
  const { data } = await fetchFromFiorentApi(
    GET_MATERIAL_CLASS_FOR_TABLE_DROPDOWN,
  );
  return data?.items;
}

export async function getReflected() {
  const { data } = await fetchFromFiorentApi(GET_REFLECTED_FOR_TABLE_DROPDOWN);
  return data?.items;
}

export async function getTaxRates() {
  const { data } = await fetchFromFiorentApi(GET_TAX_RATE_FOR_TABLE_DROPDOWN);
  return data?.items;
}

export async function getInspectionResponsibles() {
  const { data } = await fetchFromFiorentApi(
    GET_INSPECTION_RESPONSIBLES_FOR_TABLE_DROPDOWN,
  );
  return data?.items;
}

export async function getInspectionTypes() {
  const { data } = await fetchFromFiorentApi(
    GET_INSPECTION_TYPES_FOR_TABLE_DROPDOWN,
  );
  return data?.items;
}
