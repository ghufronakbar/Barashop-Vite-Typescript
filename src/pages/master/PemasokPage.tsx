import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { api } from "@/config/api";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { Pemasok } from "@/model/Pemasok";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PLACEHOLDER } from "@/constant/image";
import formatDate from "@/helper/formatDate";
import { Input } from "@/components/ui/input";
import { ExternalLink, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PemasokPage = () => {
  const { filteredData, search, setSearch } = usePemasoks();
  const TABLE_HEADERS = [
    "No",
    "",
    "Nama",
    "Alamat",
    "Telepon",
    "Terakhir Diubah",
    "",
  ];
  return (
    <DashboardLayout
      title="Pemasok"
      childredHeader={
        <Link to={`/pemasok/tambah`}>
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
          placeholder="Cari pemasok..."
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
                    src={item.gambar || PLACEHOLDER}
                    alt=""
                    width={200}
                    height={200}
                    className="min-w-12 min-h-12 w-12 h-12 object-cover rounded-xl"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.nama}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell className="flex flex-row gap-2 items-center">
                  {item.telepon}
                  <Link to={`https://wa.me/${item.telepon}`} target="_blank">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </TableCell>
                <TableCell>{formatDate(item.updated_at, true, true)}</TableCell>
                <TableCell className="flex flex-row gap-2">
                  <Link to={`/pemasok/${item.id}`}>
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

const usePemasoks = () => {
  const [data, setData] = useState<Pemasok[]>([]);
  const [search, setSearch] = useState("");
  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await api.get<Api<Pemasok[]>>("/pemasok");
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

export default PemasokPage;
