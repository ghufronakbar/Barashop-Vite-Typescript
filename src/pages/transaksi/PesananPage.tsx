import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { api } from "@/config/api";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/helper/formatDate";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pesanan } from "@/model/Pesanan";
import { PLACEHOLDER } from "@/constant/image";
import formatRupiah from "@/helper/formatRupiah";

const PesananPage = () => {
  const {
    filteredData,
    search,
    setSearch,
    onClickItem,
    selected,
    setSelected,
    sendNota,
  } = usePesanans();
  const TABLE_HEADERS = [
    "No",
    "",
    "Produk",
    "Pelanggan (Member)",
    "Sub Total",
    "Total",
    "Tanggal",
    "",
  ];
  return (
    <DashboardLayout title="Riwayat Pesanan">
      <div className="relative w-full md:w-fit min-w-[300px]">
        <Input
          className="w-full"
          placeholder="Cari pesanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
      <div className="relative overflow-x-auto w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header, index) => (
                <TableHead key={index} className="">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={item?.item_pesanan?.[0]?.produk?.gambar || PLACEHOLDER}
                    alt=""
                    width={200}
                    height={200}
                    className="min-w-12 min-h-12 w-12 h-12 object-cover rounded-xl"
                  />
                </TableCell>
                <TableCell className="font-medium max-w-[300px] overflow-hidden">
                  {item?.item_pesanan
                    ?.map(
                      (item) => item.produk?.nama + " x" + item.jumlah + " "
                    )
                    ?.join(", ")}
                  {item?.item_pesanan
                    ?.map(
                      (item) => item.produk?.nama + " x" + item.jumlah + " "
                    )
                    ?.join(", ")}
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {item?.pelanggan?.nama || "-"}
                  </div>
                  <div className="text-sm">{item.pelanggan?.kode}</div>
                </TableCell>
                <TableCell>{formatRupiah(item?.total_sementara)}</TableCell>
                <TableCell>{formatRupiah(item?.total_akhir)}</TableCell>
                <TableCell>{formatDate(item.created_at, true, true)}</TableCell>
                <TableCell>
                  <Button variant="secondary" onClick={() => onClickItem(item)}>
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="overflow-hidden">
          <DialogHeader>
            <DialogTitle>Detail Pesanan</DialogTitle>
            <DialogDescription>ID: #{selected?.id}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 overflow-scroll">
            <div className="flex flex-col gap-2">
              <h4>Detail Transaksi</h4>
              <Table className="text-sm">
                <TableRow>
                  <TableCell className="font-medium">Pelanggan</TableCell>
                  <TableCell className="text-right">
                    {selected?.pelanggan?.nama || "Non Member"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tanggal</TableCell>
                  <TableCell className="text-right">
                    {formatDate(selected?.created_at, true, true)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Metode Pembayaran
                  </TableCell>
                  <TableCell className="text-right">
                    {selected?.transaksi?.metode}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Status
                  </TableCell>
                  <TableCell className="text-right">
                    {selected?.transaksi?.status}
                  </TableCell>
                </TableRow>
              </Table>
            </div>
            <div className="flex flex-col gap-2">
              <h4>Rincian Pembayaran</h4>
              <Table className="text-sm">
                <TableRow>
                  <TableCell className="font-medium">Subtotal</TableCell>
                  <TableCell className="text-right">
                    {formatRupiah(selected?.total_sementara)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Diskon</TableCell>
                  <TableCell className="text-right">
                    {formatRupiah(selected?.diskon)} (
                    {selected?.persentase_diskon}%)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pajak</TableCell>
                  <TableCell className="text-right">
                    {formatRupiah(selected?.pajak)} (
                    {selected?.persentase_pajak}%)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Akhir</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatRupiah(selected?.total_akhir)}
                  </TableCell>
                </TableRow>
              </Table>
            </div>
            <div className="flex flex-col gap-2">
              <h4>Rincian Pesanan</h4>
              <Table className="text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Produk</TableHead>
                    <TableHead className="font-medium">Jumlah</TableHead>
                    <TableHead className="font-medium">Harga</TableHead>
                    <TableHead className="font-medium">Total</TableHead>
                  </TableRow>
                </TableHeader>
                {selected?.item_pesanan.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item?.produk?.nama}
                    </TableCell>
                    <TableCell>{item?.jumlah}</TableCell>
                    <TableCell>{formatRupiah(item?.harga)}</TableCell>
                    <TableCell>{formatRupiah(item?.total)}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={sendNota} variant="secondary">
              Kirim Nota
            </Button>
            <Button onClick={() => setSelected(null)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

const usePesanans = () => {
  const [data, setData] = useState<Pesanan[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Pesanan | null>(null);

  const onClickItem = (item: Pesanan) => {
    setSelected(item);
  };

  const filteredData = data.filter(
    (item) =>
      item.pelanggan?.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi?.toLowerCase().includes(search.toLowerCase()) ||
      item.item_pesanan.some((item) =>
        item.produk?.nama.toLowerCase().includes(search.toLowerCase())
      )
  );

  const fetchData = async () => {
    try {
      const res = await api.get<Api<Pesanan[]>>("/pesanan");
      setData(res.data.data);
    } catch (error) {
      makeToast("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendNota = async () => {
    try {
      if (!selected) return;
      makeToast("info", "Mengirim nota...");
      const res = await api.post<Api<Pesanan>>("/pesanan/nota", {
        id: selected?.id,
      });
      makeToast("success", res?.data?.message);
    } catch (error) {
      makeToast("error", error);
    }
  };

  return {
    filteredData,
    search,
    setSearch,
    onClickItem,
    selected,
    setSelected,
    sendNota,
  };
};

export default PesananPage;
