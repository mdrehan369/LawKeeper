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

export const Address = z.object({
  type: z.enum(["CurrentAddress", "PermanentAddress"]).default("CurrentAddress"),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "state is required" }),
  country: z.string({ required_error: "country is required" }),
  street: z.string({ required_error: "street is required" }),
  houseNumber: z.string({ required_error: "houseNumber is required" }),
  postalCode: z.string({ required_error: "pinCode is required" }),
  landmark: z.string().optional(),
  zone: zone.default("North"),
});
