import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { api } from "@/config/api";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { Pelanggan } from "@/model/Pelanggan";
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
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PelangganPage = () => {
  const { filteredData, search, setSearch } = usePelanggans();
  const TABLE_HEADERS = [
    "No",
    "Nama",
    "Email / No Telepon",
    "Terakhir Diubah",
    "",
  ];
  return (
    <DashboardLayout
      title="Pelanggan"
      childredHeader={
        <Link to={`/pelanggan/tambah`}>
          <Button variant="default">
            <Plus />
            Tambah
          </Button>
        </Link>
      }
    >
      <div className="relative w-full md:w-fit min-w-[300px]">
        <Input
          className="w-full"
          placeholder="Cari pelanggan..."
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
                <TableCell className="font-medium">{item.nama}</TableCell>
                <TableCell>{item.kode}</TableCell>
                <TableCell>{formatDate(item.updated_at, true, true)}</TableCell>
                <TableCell className="flex flex-row gap-2">
                  <Link to={`/pelanggan/${item.id}`}>
                    <Button variant="secondary">Edit</Button>
                  </Link>
                  <Button variant="destructive">Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

const usePelanggans = () => {
  const [data, setData] = useState<Pelanggan[]>([]);
  const [search, setSearch] = useState("");
  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kode.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await api.get<Api<Pelanggan[]>>("/pelanggan");
      setData(res.data.data);
    } catch (error) {
      makeToast("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { filteredData, search, setSearch };
};

export default PelangganPage;
