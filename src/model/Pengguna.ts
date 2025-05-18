import { Role } from "@/context/auth-context";

export interface Pengguna {
  user_id: string;
  nama_pengguna: string;
  email: string;
  peran: Role;
  is_deleted: boolean;
  is_confirmed: boolean;
  created_at: Date;
  updated_at: Date;
  foto_profil: string | null;
  token: string;
}