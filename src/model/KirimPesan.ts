import { Pengguna } from "./Pengguna";

export interface KirimPesan {
  pesan_terkirim_id: string;
  subjek_pesan: string;
  isi_pesan: string;
  user_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  pelanggan_count: number;
  user: Pengguna;
}
