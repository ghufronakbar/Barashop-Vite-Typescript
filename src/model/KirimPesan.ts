import { Pengguna } from "./Pengguna";

export interface KirimPesan {
  id: string;
  subjek: string;
  pesan: string;
  user_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  pelanggan_count: number;
  user: Pengguna;
}
