import { z } from "zod";

export const TaniSchema = z.object({
    tani_id: z.number().optional(),
    tani_nomor: z.string().optional(),
    tani_nama: z.string({
        required_error: "Nama is required"
    }),
    tani_jabatan: z.string({
        required_error: "Jabatan is Required"
    }),
    tani_sekretariat: z.string({
        required_error: "Sekretariat is required"
    }),
    tani_alamat: z.string({
        required_error: "Alamat is required"
    }),
    tani_keperluan: z.string({
        required_error: "Keperluan is required"
    }),
    tani_tujuanBantuan: z.string({
        required_error: "Tujuan Bantuan is required"
    })

});

export const TaniEditSchema = z.object({
    tani_id: z.number().optional(),
    tani_nomor: z.string().optional(),
    tani_nama: z.string({
        required_error: "Nama is required"
    }),
    tani_jabatan: z.string({
        required_error: "Jabatan is Required"
    }),
    tani_sekretariat: z.string({
        required_error: "Sekretariat is required"
    }),
    tani_alamat: z.string({
        required_error: "Alamat is required"
    }),
    tani_keperluan: z.string({
        required_error: "Keperluan is required"
    }),
    tani_tujuanBantuan: z.string({
        required_error: "Tujuan Bantuan is required"
    })
});
