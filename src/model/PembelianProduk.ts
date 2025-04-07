import { Pemasok } from "./Pemasok";
import { Produk } from "./Produk";

export interface PembelianProduk {
  id: string;
  jumlah: number;
  harga: number;
  total: number;
  deskripsi: string;
  produk_id: string;
  pemasok_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  produk: Produk;
  pemasok: Pemasok;
}
