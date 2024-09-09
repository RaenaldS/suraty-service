import User_Type from "./users";

export default interface Sktm_Type {
    sktm_id?: number;
    sktm_noSurat?: string | null;
    sktm_nama: string;
    sktm_tgl_lahir: Date;
    sktm_tempat_lahir: string;
    sktm_suku: string;
    sktm_agama: number;
    sktm_jk: number;
    sktm_noKtp: string;
    sktm_pekerjaan: string;
    sktm_alamat: string;
    sktm_dusun: string;
    sktm_kepentingan: string;
    sktm_created?: Date;
    sktm_updated?: Date;
    sktm_deleted?: Date | null;
    ttd_sktm?: User_Type | null;
    created_by?: User_Type | null;
}