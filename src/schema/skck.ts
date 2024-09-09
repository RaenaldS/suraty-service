import { z } from "zod";

export const SkckSchema = z.object({
    skck_id: z.number().optional(),
    skck_nomor: z.string().optional(),
    skck_nama: z.string().min(5),
    skck_tanggal_lahir: z.date(),
    skck_tempat_lahir: z.string().min(3),
    skck_suku: z.string({
        required_error: "Suku is required",
    }),
    skck_agama: z.coerce.number({
        required_error: "Agama is required",
    }),
    skck_jk: z.coerce.number({
        required_error: "Jenis Kelamin is required",
    }),
    skck_nik: z
        .string({
            required_error: "NIK is required",
        })
        .length(16, { message: "16 character" }),
        skck_alamat: z.string({
        required_error: "Alamat is required",
    }),
    skck_pendidikan_terakhir: z.coerce.number({
        required_error: "Pendidikan Terakhir is required",
    }),
    skck_kepentingan: z.string({
        required_error: "Kepentingan is required",
    }),
    skck_pekerjaan: z.string({
        required_error: "Pekerjaan is required",
    }),
    skck_statusKawin: z.coerce.number({
        required_error: "Status Kawin Terakhir is required",
    }),
});

export const SkckEditSchema = z.object({
    skck_id: z.number().optional(),
    skck_nama: z.string().min(5),
    skck_tgl_lahir: z.date(),
    skck_tempat_lahir: z.string().min(3),
    skck_suku: z.string({
        required_error: "Suku is required",
    }),
    skck_agama: z.coerce.number({
        required_error: "Agama is required",
    }),
    skck_jk: z.coerce.number({
        required_error: "Jenis Kelamin is required",
    }),
    skck_nik: z
        .string({
            required_error: "NIK is required",
        })
        .length(16, { message: "16 character" }),
        skck_alamat: z.string({
        required_error: "Alamat is required",
    }),
    skck_pendidikan_terakhir: z.coerce.number({
        required_error: "Pendidikan Terakhir is required",
    }),
    skck_kepentingan: z.string({
        required_error: "Kepentingan is required",
    }),
    skck_pekerjaan: z.string({
        required_error: "Pekerjaan is required",
    }),
    skck_statusKawin: z.coerce.number({
        required_error: "Status Kawin Terakhir is required",
    }),
});
