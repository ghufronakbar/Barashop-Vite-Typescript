import { Pelanggan } from "./Pelanggan";
import { Produk } from "./Produk";

export interface Pesanan {
  id: string;
  total_akhir: number;
  total_sementara: number;
  diskon: number;
  pajak: number;
  deskripsi: string | null;
  pelanggan_id: string | null;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  persentase_diskon: number;
  persentase_pajak: number;
  item_pesanan: ItemPesanan[];
  transaksi: Transaksi;
  pelanggan: Pelanggan | null;
}

export interface ItemPesanan {
  id: string;
  jumlah: number;
  harga: number;
  total: number;
  pesanan_id: string;
  produk_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  produk: Produk;
}

export interface Transaksi {
  id: string;
  jumlah: number;
  metode: "VirtualAccountOrBank" | "Cash";
  status: "Success" | "Pending";
  snap_token: string | null;
  url_redirect: string | null;
  pesanan_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
