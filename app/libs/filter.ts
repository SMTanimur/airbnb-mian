import { z } from "zod";

export const filterSchema = z.object({
  minPrice: z.number().min(0).max(1000000),
  maxPrice: z.number().min(0).max(1000000),
  bedCount: z.number().min(0).max(10),
  bathroomCount: z.number().min(0).max(10),


}
  )