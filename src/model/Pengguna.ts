import { Role } from "@/context/auth-context";

export interface Pengguna {
  id: string;
  nama: string;
  email: string;
  peran: Role;
  is_deleted: boolean;
  is_confirmed: boolean;
  created_at: Date;
  updated_at: Date;
  gambar: string | null;
}
