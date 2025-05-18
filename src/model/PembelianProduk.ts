import { Pemasok } from "./Pemasok";
import { Produk } from "./Produk";

export interface PembelianProduk {
  pembelian_produk_id: string;
  jumlah_pembelian: number;
  harga_per_barang: number;
  total_harga: number;
  deskripsi_pembelian: string;
  produk_id: string;
  pemasok_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  produk: Produk;
  pemasok: Pemasok;
}
