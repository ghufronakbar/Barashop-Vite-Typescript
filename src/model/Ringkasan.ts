export interface Ringkasan {
  chart: ChartDataParent;
  master: Master;
  sold: Sold[];
  ratio: Ratio[];
}

export interface ChartDataParent {
  [key: string]: ChartData;
}

export interface ChartData {
  omzet: string;
  pengeluaran: number;
  total_terjual: number;
  total_pembelian: number;
  profit: number;
}

export interface Master {
  omzet: number;
  pengeluaran: number;
  profit: number;
  total_produk_terjual: number;
  total_pembelian_produk: number;
}

export interface Sold {
  produk_id: string;
  nama: string;
  gambar: string | null;
  total_terjual: number;
}

export interface Ratio {
  produk_id: string;
  nama: string;
  total_terjual: number;
  rasio: number;
}
