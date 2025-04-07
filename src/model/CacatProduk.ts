import { Produk } from "./Produk";

export interface CacatProduk {
  id: string;
  jumlah: number;
  alasan: string;
  produk_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  produk: Produk;
}
