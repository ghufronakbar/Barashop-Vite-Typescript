import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { api } from "@/config/api";
import { API_URL } from "@/constant";
import { Api } from "@/model/Api";
import { initLaporan, Laporan } from "@/model/Laporan";
import { useEffect, useState } from "react";
import {
  AiOutlineAlert,
  AiOutlineProduct,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdApartment, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
const LaporanPage = () => {
  const { data, end, setEnd, setStart, start, loading } = useLaporan();
  return (
    <DashboardLayout title="Laporan">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full items-stretch">
        <div className="border border-gray-300 bg-white rounded-xl flex flex-col gap-4 px-4 py-4 h-fit">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Transaksi Produk</h2>
            <div className="flex flex-row items-center gap-4 flex-wrap">
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Tanggal Mulai</Label>
                <Input
                  type="date"
                  className="w-fit"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Tanggal Selesai</Label>
                <Input
                  type="date"
                  className="w-fit"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Label>Total Penjualan</Label>
                <AiOutlineShopping className="text-lg" />
              </div>
              <p className="text-6xl font-medium">{data.penjualan}</p>
              {loading ? (
                <Button className="w-full cursor-not-allowed">Loading</Button>
              ) : (
                <Link
                  to={`${API_URL}/resource/laporan/penjualan?start=${start}&end=${end}`}
                  target="_blank"
                >
                  <Button className="w-full">Unduh Laporan</Button>
                </Link>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Label>Total Pembelian</Label>
                <AiOutlineShoppingCart className="text-lg" />
              </div>
              <p className="text-6xl font-medium">{data.pembelian}</p>
              {loading ? (
                <Button className="w-full cursor-not-allowed">Loading</Button>
              ) : (
                <Link
                  to={`${API_URL}/resource/laporan/pembelian?start=${start}&end=${end}`}
                  target="_blank"
                >
                  <Button className="w-full">Unduh Laporan</Button>
                </Link>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Label>Total Kerusakan Produk</Label>
                <AiOutlineAlert className="text-lg" />
              </div>
              <p className="text-6xl font-medium">{data.kerusakan}</p>
              {loading ? (
                <Button className="w-full cursor-not-allowed">Loading</Button>
              ) : (
                <Link
                  to={`${API_URL}/resource/laporan/kerusakan?start=${start}&end=${end}`}
                  target="_blank"
                >
                  <Button className="w-full">Unduh Laporan</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="border border-gray-300 bg-white rounded-xl flex flex-col gap-4 px-4 py-4">
          <h2 className="text-2xl font-semibold">Master Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Label>Produk Terdaftar</Label>
                <AiOutlineProduct className="text-lg" />
              </div>
              <p className="text-6xl font-medium">{data.produk}</p>
              <Link to={`${API_URL}/resource/laporan/produk`} target="_blank">
                <Button className="w-full">Unduh Laporan</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Label>Pemasok Terdaftar</Label>
                <MdApartment className="text-lg" />
              </div>
              <p className="text-6xl font-medium">{data.pemasok}</p>
              <Link to={`${API_URL}/resource/laporan/pemasok`} target="_blank">
                <Button className="w-full">Unduh Laporan</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Label>Pelanggan Terdaftar</Label>
                <MdPerson className="text-lg" />
              </div>
              <p className="text-6xl font-medium">{data.pelanggan}</p>
              <Link
                to={`${API_URL}/resource/laporan/pelanggan`}
                target="_blank"
              >
                <Button className="w-full">Unduh Laporan</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const useLaporan = () => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [data, setData] = useState<Laporan>(initLaporan);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get<Api<Laporan>>(`/laporan`, {
        params: { start, end },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [start, end]);

  return { data, loading, start, setStart, end, setEnd };
};

export default LaporanPage;
