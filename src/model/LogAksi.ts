import { Pengguna } from "./Pengguna";

export interface LogAksi {
  log_aksi_id: string;
  deskripsi_aksi: string;  
  model_referensi: string;
  jenis_aksi: "Create" | "Update" | "Delete";
  user_id: string;
  is_deleted: boolean;
  detail_aksi: JSONValue;
  created_at: Date;
  updated_at: Date;
  user: Pengguna;
}

export interface JSONValue {
  [key: string]: unknown;
}
