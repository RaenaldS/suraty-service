import { z } from "zod";

export const JabatanSchema = z.object({
  jabatan_id: z.number().optional(),
  jabatan_nama: z.string().min(3),
});
