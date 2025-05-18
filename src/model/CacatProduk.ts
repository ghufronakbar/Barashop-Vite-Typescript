import { Produk } from "./Produk";

export interface CacatProduk {
  cacat_produk_id: string;
  jumlah_produk: number;
  alasan_kerusakan: string;
  produk_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  produk: Produk;
}
