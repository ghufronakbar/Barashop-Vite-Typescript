import { Pelanggan } from "./Pelanggan";
import { Produk } from "./Produk";

export interface Pesanan {
  pesanan_id: string;
  total_akhir: number;
  total_harga_barang: number;
  diskon_dikenakan: number;
  pajak_dikenakan: number;
  deskripsi_pesanan: string | null;
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
  item_pesanan_id: string;
  jumlah_barang: number;
  harga_per_barang: number;
  total_harga: number;
  pesanan_id: string;
  produk_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  produk: Produk;
}

export interface Transaksi {
  transaksi_id: string;
  jumlah_pembayaran: number;
  metode_pembayaran: "VirtualAccountOrBank" | "Cash";
  status_pembayaran: "Success" | "Pending";
  midtrans_snap_token: string | null;
  midtrans_url_redirect: string | null;
  pesanan_id: string;
  is_deleted: boolean;
  detail_transaksi: unknown;
  created_at: Date;
  updated_at: Date;
}
