import { z } from "zod";

export const SktmSchema = z.object({
  sktm_id: z.number().optional(),
  sktm_nama: z.string().min(5),
  sktm_tgl_lahir: z.date(),
  sktm_tempat_lahir: z.string().min(3),
  sktm_suku: z.string({
    required_error: "Suku is required",
  }),
  sktm_agama: z.coerce.number({
    required_error: "Agama is required",
  }),
  sktm_jk: z.coerce.number({
    required_error: "Jenis Kelamin is required",
  }),
  sktm_noKtp: z
    .string({
      required_error: "NIK is required",
    })
    .length(16, { message: "16 character" }),
  sktm_pekerjaan: z.string({
    required_error: "Pekerjaan is required",
  }),
  sktm_alamat: z.string({
    required_error: "Alamat is required",
  }),
  sktm_dusun: z.string({
    required_error: "Dusun is required",
  }),
  sktm_kepentingan: z.string({
    required_error: "Kepentingan is required",
  }),
});

export const SktmEditSchema = z.object({
  sktm_id: z.number().optional(),
  sktm_nama: z.string().min(5),
  sktm_tgl_lahir: z.date(),
  sktm_tempat_lahir: z.string().min(3),
  sktm_suku: z.string({
    required_error: "Suku is required",
  }),
  sktm_agama: z.coerce.number({
    required_error: "Agama is required",
  }),
  sktm_jk: z.string({
    required_error: "Jenis Kelamin is required",
  }),
  sktm_noKtp: z
    .string({
      required_error: "NIK is required",
    })
    .length(16, { message: "16 character" }),
  sktm_pekerjaan: z.string({
    required_error: "Pekerjaan is required",
  }),
  sktm_alamat: z.string({
    required_error: "Alamat is required",
  }),
  sktm_dusun: z.string({
    required_error: "Dusun is required",
  }),
  sktm_kepentingan: z.string({
    required_error: "Kepentingan is required",
  }),
});
