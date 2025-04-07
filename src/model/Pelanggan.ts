export interface Pelanggan {
  id: string;
  nama: string;
  kode: string;
  jenis_kode: "Email" | "Phone";
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
