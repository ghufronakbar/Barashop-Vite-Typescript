export interface Produk {
  produk_id: string;
  nama_produk: string;
  harga_produk: number;
  jumlah_stok: number;
  hpp: number;
  kategori_produk: string;
  deskripsi_produk: string | null;
  foto_produk: string | null;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  total_terjual: number;
}
