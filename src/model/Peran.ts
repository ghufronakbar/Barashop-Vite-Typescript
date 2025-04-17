import { Role } from "@/context/auth-context";
import { Pengguna } from "./Pengguna";

export interface Peran extends Role {
  users: Pengguna[];  
}
