import { z } from "zod";

export const PenghasilanSchema = z.object({
hasil_id: z.number().optional(),
hasil_nomor: z.string().optional(),
hasil_nama: z.string({
    required_error: "Nama is required"
}),
hasil_umur: z.number({
    required_error: "Umur is required"
}),
hasil_pekerjaan: z.string({
    required_error: "Pekerjaan is Required"
}),
hasil_alamat: z.string({
    required_error: "Alamat is required"
}),
hasil_penghasilan: z.string({
    required_error: "Penghasilan is required"
}),
});

export const PenghasilanEditSchema = z.object({
    hasil_id: z.number().optional(),
    hasil_nomor: z.string().optional(),
    hasil_nama: z.string({
        required_error: "Nama is required"
    }),
    hasil_umur: z.number({
        required_error: "Umur is required"
    }),
    hasil_pekerjaan: z.string({
        required_error: "Pekerjaan is Required"
    }),
    hasil_alamat: z.string({
        required_error: "Alamat is required"
    }),
    hasil_penghasilan: z.string({
        required_error: "Penghasilan is required"
    }),
});
