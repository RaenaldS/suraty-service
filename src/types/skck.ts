import User_Type from "./users";

export default interface Skck_Type {
  skck_id?: number;
  skck_nomor?: string | null;
  skck_nama: string;
  skck_jk: number;
  skck_tanggal_lahir: Date;
  skck_tempat_lahir: string;
  skck_agama: number;
  skck_statusKawin: number;
  skck_pekerjaan: string;
  skck_suku: string;
  skck_nik: string;
  skck_alamat: string;
  skck_pendidikan_terakhir: number;
  skck_kepentingan: string;
  skck_created?: Date;
  skck_updated?: Date;
  skck_deleted?: Date;
  ttd_skck?: User_Type;
  createdBy?: User_Type;
}