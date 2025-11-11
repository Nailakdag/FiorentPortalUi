import { z } from "zod";

export const inspecitonSchema = z.object({
  documentNumber: z
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
  inspectionTypeId: z
    .object({
      id: z.any().nullable(),
    })
    .nullable()
    .optional(),

  businessPartnerId: z.any().nullable().optional(),

  inspectionPartnerId: z
    .object({
      id: z.any().nullable(),
    })
    .nullable()
    .optional(),
  inspectionResponsible: z
    .object({
      id: z.any().nullable(),
    })
    .nullable()
    .optional(),
  generalStatus: z
    .object({
      id: z.any().nullable(),
    })
    .nullable()
    .optional(),
  inspectionKM: z.any().nullable().optional(),
  penaltyAmount: z.number().nullable().optional(),
  paidAmount: z.number().nullable().optional(),
  paymentDate: z.string().nullable().optional(),
  inspectionExpirationDate: z.string().nullable().optional(),
  transactionDate: z.string().nullable().optional(),
  isReflected: z.boolean().nullable().optional(),
  description: z.string().nullable().optional(),
  salesDocumentId: z
    .object({
      id: z.any().nullable(),
    })
    .nullable()
    .optional(),
  salesDocumentRentalPeriodId: z
    .object({
      id: z.any().nullable(),
    })
    .nullable()
    .optional(),
  equipmentId: z
    .object({
      id: z.any().nullable(),
    })
    .nullable()
    .optional(),
});
