import User_Type from "./users";

export default interface Belumnikah_Type {
    nikah_id?: number;
    nikah_nomor?: string | null;
    nikah_nama: string;
    nikah_jk: number;
    nikah_tempat_lahir: string;
    nikah_tgl_lahir: Date;
    nikah_suku: string;
    nikah_agama: number;
    nikah_nik: string;
    nikah_alamat: string;
    nikah_kepentingan: string;
    nikah_created?: Date;
    nikah_updated?: Date;
    nikah_deleted?: Date | null;
    ttd_nikah?: User_Type | null;
    created_by?: User_Type | null;
}