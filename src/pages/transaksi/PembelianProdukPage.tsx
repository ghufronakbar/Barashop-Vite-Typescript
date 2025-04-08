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
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AlertConfirmation } from "@/components/modal-confirmation";
import { PembelianProduk } from "@/model/PembelianProduk";
import { PLACEHOLDER } from "@/constant/image";
import formatRupiah from "@/helper/formatRupiah";
import { Pemasok } from "@/model/Pemasok";
import { Produk } from "@/model/Produk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PembelianProdukPage = () => {
  const {
    filteredData,
    search,
    setSearch,
    onClickItem,
    setIsOpen,
    form,
    onChange,
    isOpen,
    onClickAdd,
    handleSubmit,
    handleDelete,
    onSelect,
  } = usePembelianProduks();
  const { pemasoks, produks } = useSelect();
  const TABLE_HEADERS = [
    "No",
    "",
    "Barang",
    "Pemasok",
    "Jumlah",
    "Harga",
    "Total",
    "Terakhir Diubah",
    "",
  ];
  return (
    <DashboardLayout
      title="Pembelian Produk"
      childredHeader={
        <Button variant="default" onClick={onClickAdd}>
          <Plus />
          Tambah
        </Button>
      }
    >
      <div className="relative w-full md:w-fit min-w-[300px]">
        <Input
          className="w-full"
          placeholder="Cari pembelian produk..."
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
                    src={item?.produk?.gambar || PLACEHOLDER}
                    alt=""
                    width={200}
                    height={200}
                    className="min-w-12 min-h-12 w-12 h-12 object-cover rounded-xl"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {item?.produk?.nama}
                </TableCell>
                <TableCell className="font-medium">
                  {item?.pemasok?.nama}
                </TableCell>
                <TableCell>{item?.jumlah}</TableCell>
                <TableCell>{formatRupiah(item?.harga)}</TableCell>
                <TableCell>{formatRupiah(item?.total)}</TableCell>
                <TableCell>{formatDate(item.updated_at, true, true)}</TableCell>
                <TableCell className="flex flex-row gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => onClickItem(item, true)}
                  >
                    Edit
                  </Button>
                  <AlertConfirmation
                    trigger={
                      <Button
                        variant="destructive"
                        onClick={() => onClickItem(item)}
                      >
                        Hapus
                      </Button>
                    }
                    onConfirm={handleDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <DialogHeader>
              <DialogTitle>{form.id ? "Edit Data" : "Tambah Data"}</DialogTitle>
              <DialogDescription>
                Isi form dibawah ini untuk{" "}
                {form.id ? "mengedit" : "menambahkan"} data pembelian produk
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Produk</Label>
                <Select
                  onValueChange={(val) => onSelect(val, "produk_id")}
                  value={form.produk_id}
                  disabled={!!form.id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Produk" />
                  </SelectTrigger>
                  <SelectContent>
                    {produks.map((item) => (
                      <SelectItem value={item.id}>{item.nama}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Pemasok</Label>
                <Select
                  onValueChange={(val) => onSelect(val, "pemasok_id")}
                  value={form.pemasok_id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Pemasok Produk" />
                  </SelectTrigger>
                  <SelectContent>
                    {pemasoks.map((item) => (
                      <SelectItem value={item.id}>{item.nama}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Jumlah Produk</Label>
                <Input
                  placeholder="10"
                  value={form.jumlah}
                  onChange={(e) => onChange(e, "jumlah")}
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Total Pengeluaran</Label>
                <Input
                  placeholder="250000"
                  value={form.total}
                  onChange={(e) => onChange(e, "total")}
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Harga Per Produk</Label>
                <Input
                  placeholder="0"
                  value={form.total / form.jumlah}
                  type="number"
                  disabled
                />
                <span className="text-xs text-neutral-500">
                  *Harga per produk akan otomatis terhitung
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={form.deskripsi}
                  onChange={(e) => onChange(e, "deskripsi")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

interface PembelianProdukDTO {
  id: string;
  total: number;
  jumlah: number;
  deskripsi: string;
  produk_id: string;
  pemasok_id: string;
}

const initPembelianProdukDTO: PembelianProdukDTO = {
  id: "",
  total: 0,
  jumlah: 0,
  deskripsi: "",
  produk_id: "",
  pemasok_id: "",
};

const usePembelianProduks = () => {
  const [data, setData] = useState<PembelianProduk[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<PembelianProdukDTO>(initPembelianProdukDTO);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const onClickItem = (item: PembelianProduk, isEdit?: boolean) => {
    setForm({
      id: item.id,
      deskripsi: item.deskripsi,
      jumlah: item.jumlah,
      pemasok_id: item.pemasok_id,
      produk_id: item.produk_id,
      total: item.total,
    });
    if (isEdit) setIsOpen(true);
  };

  const onClickAdd = () => {
    setForm(initPembelianProdukDTO);
    setIsOpen(true);
  };

  const onSelect = (value: string, key: keyof PembelianProdukDTO) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof PembelianProdukDTO
  ) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const filteredData = data.filter(
    (item) =>
      item.produk.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.pemasok.nama.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await api.get<Api<PembelianProduk[]>>("/pembelian-produk");
      setData(res.data.data);
    } catch (error) {
      makeToast("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      Object.entries(form).forEach(([key, value]) => {
        if (!value && key !== "id" && key !== "deskripsi") {
          console.log(key, value);
          throw new Error("Semua kolom harus diisi");
        }
        if (key === "total" && isNaN(Number(value))) {
          throw new Error("Total harus berupa angka");
        }
        if (key === "jumlah" && isNaN(Number(value))) {
          throw new Error("Jumlah harus berupa angka");
        }
      });
      if (pending) return;
      setPending(true);
      makeToast("info");
      if (form.id) {
        await api.put(`/pembelian-produk/${form.id}`, form);
        await fetchData();
        makeToast("success", "Berhasil mengedit data pembelian produk");
      } else {
        await api.post("/pembelian-produk", form);
        await fetchData();
        makeToast("success", "Berhasil menambahkan data pembelian produk");
      }
      setIsOpen(false);
      setForm(initPembelianProdukDTO);
    } catch (error) {
      makeToast("error", error);
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!form.id) return;
      if (pending) return;
      setPending(true);
      makeToast("info");
      await api.delete(`/pembelian-produk/${form.id}`);
      await fetchData();
      makeToast("success", "Berhasil menghapus data pembelian produk");
    } catch (error) {
      makeToast("error", error);
    } finally {
      setPending(false);
    }
  };

  return {
    filteredData,
    search,
    setSearch,
    onClickItem,
    setIsOpen,
    form,
    onChange,
    isOpen,
    onClickAdd,
    setForm,
    handleSubmit,
    handleDelete,
    onSelect,
  };
};

const useSelect = () => {
  const [pemasoks, setPemasoks] = useState<Pemasok[]>([]);
  const [produks, setProduks] = useState<Produk[]>([]);

  const fetchData = async () => {
    try {
      const [res, res2] = await Promise.all([
        api.get<Api<Pemasok[]>>("/pemasok"),
        api.get<Api<Produk[]>>("/produk"),
      ]);
      setPemasoks(res.data.data);
      setProduks(res2.data.data);
    } catch (error) {
      makeToast("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    pemasoks,
    produks,
  };
};

export default PembelianProdukPage;
