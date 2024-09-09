import { z } from "zod";

export const BelumNikahSchema = z.object({
    nikah_id: z.number().optional(),
    nikah_nama: z.string().min(5),
    nikah_tgl_lahir: z.date(),
    nikah_tempat_lahir: z.string().min(3),
    nikah_suku: z.string({
        required_error: "Suku is required",
    }),
    nikah_agama: z.coerce.number({
        required_error: "Agama is required",
    }),
    nikah_jk: z.coerce.number({
        required_error: "Jenis Kelamin is required",
    }),
    nikah_nik: z
        .string({
            required_error: "NIK is required",
        })
        .length(16, { message: "16 character" }),
    nikah_alamat: z.string({
        required_error: "Alamat is required",
    }),
    nikah_kepentingan: z.string({
        required_error: "Kepentingan is required",
    }),
});

export const BelumNikahEditSchema = z.object({
    nikah_id: z.number().optional(),
    nikah_nama: z.string().min(5),
    nikah_tgl_lahir: z.date(),
    nikah_tempat_lahir: z.string().min(3),
    nikah_suku: z.string({
        required_error: "Suku is required",
    }),
    nikah_agama: z.coerce.number({
        required_error: "Agama is required",
    }),
    nikah_jk: z.coerce.number({
        required_error: "Jenis Kelamin is required",
    }),
    nikah_nik: z
        .string({
            required_error: "NIK is required",
        })
        .length(16, { message: "16 character" }),
    nikah_alamat: z.string({
        required_error: "Alamat is required",
    }),
    nikah_kepentingan: z.string({
        required_error: "Kepentingan is required",
    }),
});
