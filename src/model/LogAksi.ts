import { Pengguna } from "./Pengguna";

export interface LogAksi {
  id: string;
  deskripsi: string;
  referensi_id: string;
  model_referensi: string;
  aksi: "Create" | "Update" | "Delete";
  user_id: string;
  is_deleted: boolean;
  detail: JSONValue;
  created_at: Date;
  updated_at: Date;
  user: Pengguna;
}

export interface JSONValue {
  [key: string]: unknown;
}
