export interface Produk {
  id: string;
  nama: string;
  harga: number;
  jumlah: number;
  hpp: number;
  kategori: string;
  deskripsi: string | null;
  gambar: string | null;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  total_terjual: number;
}
