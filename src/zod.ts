import { z } from "zod";

export const OffenceType = z.enum([
  "Murder",
  "Rape",
  "Robbery",
  "Burglary",
  "Kidnapping",
  "Dowry_Death",
  "Culpable_Homicide",
  "Grievous_Hurt",
  "Assault",
  "Extortion",
  "Theft",
  "Arson",
  "Corruption",
  "Fraudulent_Cheque_Issuance",
  "Human_Trafficking",
  "Unlawful_Assembly",
  "Criminal_Breach_of_Trust",
  "Cheating",
]);

export const zone = z.enum(['North', 'South', 'East', 'West'])


export const Suspect = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  reason: z.string().min(1),
});

export const Document = z.object({
  voterIdNumber: z
      .string({ required_error: 'voterIdNumber is required' }).nullable(),
      // .regex(/^([A-Z]{3})\d{7}$/, 'Invalid Voter ID Number'),
  voterIdPhoto: z.string({ required_error: 'voterIdPhoto is required' }).nullable(),
  aadharCardNumber: z
      .string({
          required_error: 'aadharCardNumber is required',
      }).nullable(),
      // .regex(/^\d{4}\s\d{4}\s\d{4}$/, 'Invalid Aadhar Card Number'),
  aadharCardPhoto: z.string({
      required_error: 'aadharCardPhoto is required',
  }).nullable(),
  panCardNumber: z
      .string({ required_error: 'panCardNumber is required' }).nullable(),
      // .regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, 'Invalid Pan Card Number'),
  panCardPhoto: z.string({ required_error: 'panCardPhoto is required' }).nullable(),
  passportNumber: z
      .string()
      // .regex(/^[A-Z]{1}\d{7}$/, 'Invalid Passport Number')
      .nullable(),
  passportPhoto: z.string().nullable(),
  drivingLicenceNumber: z
      .string()
      // .regex(/^[A-Z]{2}\d{13}$/, 'Invalid Driving License Number')
      .nullable(),
  drivingLicencePhoto: z.string().nullable(),
})

// export const Required

export const Address = z.object({
  type: z.enum(["CurrentAddress", "PermanentAddress"]).default("CurrentAddress"),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "state is required" }),
  country: z.string({ required_error: "country is required" }),
  street: z.string({ required_error: "street is required" }),
  houseNumber: z.string({ required_error: "houseNumber is required" }),
  postalCode: z.string({ required_error: "pinCode is required" }),
  landmark: z.string().optional(),
});
