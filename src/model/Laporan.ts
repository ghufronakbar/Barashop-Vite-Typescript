export interface Laporan {
  penjualan: number;
  pembelian: number;
  kerusakan: number;
  produk: number;
  pemasok: number;
  pelanggan: number;
}

export const initLaporan: Laporan = {
  penjualan: 0,
  pembelian: 0,
  kerusakan: 0,
  produk: 0,
  pemasok: 0,
  pelanggan: 0,
};
