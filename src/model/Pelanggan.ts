export interface Pelanggan {
  pelanggan_id: string;
  nama_pelanggan: string;
  kode_pelanggan: string;
  jenis_kode: "Email" | "Phone";
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
