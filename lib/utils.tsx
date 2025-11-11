import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setSearchParams = (params: any) => {
  const searchParams = new URLSearchParams();

  for (const key of Object.keys(params)) {
    searchParams.set(key, params[key]);
  }

  return searchParams;
};

export const getParsedDate = (date: any) => {
  const possibleFormats = [
    "DD.MM.YYYY",
    "YYYY-MM-DD",
    "MM/DD/YYYY",
    "DD/MM/YYYY",
  ];

  let parsedDate: any;
  for (const format of possibleFormats) {
    parsedDate = dayjs(date, format);
    if (parsedDate.isValid()) {
      break;
    }
  }

  if (parsedDate?.isValid()) {
    const formattedDate = parsedDate.tz("Europe/Istanbul").format();
    return formattedDate;
  } else {
    return "Invalid Date";
  }
};

export const getFormattedDate = (date: any) => {
  if (!date) return "";

  const parsedDate = dayjs(date);
  if (parsedDate.isValid()) {
    return parsedDate.format("DD.MM.YYYY");
  }
  return "";
};
