import User_Type from "./users";

export default interface Skck_Type {
  hasil_id?: number;
  hasil_nomor?: string;
  hasil_nama: string;
  hasil_umur: number;
  hasil_pekerjaan: string;
  hasil_alamat: string;
  hasil_penghasilan: string;
  hasil_created?: Date | null;
  hasil_updated?: Date | null;
  hasil_deleted?: Date | null;
  ttd_hasil?: User_Type;
  createdBy?: User_Type;
}