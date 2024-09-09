import User_Type from "./users";

export default interface Tani_Type {
  tani_id?: number;
  tani_nomor?: string;
  tani_nama: string;
  tani_jabatan: string;
  tani_sekretariat: string;
  tani_alamat: string;
  tani_keperluan: string;
  tani_tujuanBantuan: string;
  tani_created?: Date | null;
  
}