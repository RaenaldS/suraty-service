import { z } from "zod";

export const HilangSchema = z.object({
  hilang_id: z.number().optional(),
  hilang_nomor: z.string().optional(),
  hilang_nama: z.string().min(5),
  hilang_jk: z.coerce.number({
    required_error: "Jenis Kelamin is required",
  }),
  hilang_umur: z.coerce.number({
    required_error: "Umur is required",
  }),
  hilang_pekerjaan: z.string({
    required_error: "Pekerjaan is required",
  }),
  hilang_alamat: z.string({
    required_error: "Alamat is required",
  }),
  hilang_hari: z.string({
    required_error: "Hari Kehilangan is required",
  }),
  hilang_barang: z.string({
    required_error: "Barang Hilang is required"
  }),
  hilang_dari: z.string({
    required_error: "This field is required"
  }),
  hilang_ke: z.string({
    required_error: "This Field is required"
  }),
});

export const HilangEditSchema = z.object({
  hilang_id: z.number().optional(),
  hilang_nama: z.string().min(5),
  hilang_jk: z.coerce.number({
    required_error: "Jenis Kelamin is required",
  }),
  hilang_umur: z.number({
    required_error: "Umur is required",
  }),
  hilang_pekerjaan: z.string({
    required_error: "Pekerjaan is required",
  }),
  hilang_alamat: z.string({
    required_error: "Alamat is required",
  }),
  hilang_hari: z.string({
    required_error: "Hari Kehilangan is required",
  }),
  hilang_barang: z.string({
    required_error: "Barang Hilang is required"
  }),
  hilang_dari: z.string({
    required_error: "This field is required"
  }),
  hilang_ke: z.string({
    required_error: "This Field is required"
  }),
});
