import User_Type from "./users";

export default interface Hilang_Type {
    hilang_id?: number;
    hilang_nomor?: string;
    hilang_nama: string;
    hilang_jk: number;
    hilang_umur: number;
    hilang_pekerjaan: string;
    hilang_alamat: string;
    hilang_hari: string;
    hilang_barang: string;
    hilang_dari: string;
    hilang_ke: string;
    hilang_createdBy?: Date | null;
    hilang_created?: Date | null;
    hilang_updated?: Date | null;
    ttd_hilang?: User_Type;
    createdBy?: User_Type;
}