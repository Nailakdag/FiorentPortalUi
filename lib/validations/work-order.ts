import { z } from "zod";

export const workOrderSchema = z.object({
  phoneNo: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  requestDate: z
    .string()
    .min(1, { message: "Lütfen bu alanı doldurunuz" })
    .nullable()
    .refine((val) => !!val, { message: "Lütfen bu alanı doldurunuz" }),
  equipmentSerialNumberId: z
    .object({
      id: z.coerce.number().nullable(),
    })
    .nullable()
    .refine((data) => data !== null && data.id !== null, {
      message: "Lütfen bu alanı doldurunuz",
    }),
  serviceId: z
    .object({
      id: z.any().nullable(),
    })
    .optional(),
  startingDate: z.string().nullable().optional(),
  planningEndingDate: z.string().nullable().optional(),
  endingDate: z.string().nullable().optional(),
  serviceReleaseKM: z.string().nullable(),
  subReasonId: z.object({
    id: z.any().nullable(),
  }),
  status: z.object({
    id: z.any().nullable(),
  }),
  note: z.any().nullable(),
});
