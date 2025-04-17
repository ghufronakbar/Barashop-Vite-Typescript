import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { api } from "@/config/api";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { Produk } from "@/model/Produk";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PLACEHOLDER } from "@/constant/image";
import formatDate from "@/helper/formatDate";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import formatRupiah from "@/helper/formatRupiah";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadImage } from "@/components/upload-image";
import { AlertConfirmation } from "@/components/modal-confirmation";
import { makeConfirm } from "@/helper/makeConfirm";

const ProdukPage = () => {
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
    setForm,
    handleSubmit,
    handleDelete,
  } = useProduks();
  const TABLE_HEADERS = [
    "No",
    "",
    "Nama",
    "Kategori",
    "Harga",
    "HPP*",
    "Stok",
    "Terjual",
    "Terakhir Diubah",
    "",
  ];
  return (
    <DashboardLayout
      title="Produk"
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
          placeholder="Cari produk..."
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
                <TableCell>{item.kategori}</TableCell>
                <TableCell>{formatRupiah(item.harga)}</TableCell>
                <TableCell>{formatRupiah(item.hpp)}</TableCell>
                <TableCell>{item.jumlah}</TableCell>
                <TableCell>{item.total_terjual}</TableCell>
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
          <TableCaption>
            *HPP dihitung dari rata rata harga pembelian
          </TableCaption>
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
              <DialogTitle>
                {form.id ? "Edit Produk" : "Tambah Produk"}
              </DialogTitle>
              <DialogDescription>
                Isi form dibawah ini untuk{" "}
                {form.id ? "mengedit" : "menambahkan"} produk
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <UploadImage
                image={form.gambar}
                onChangeImage={(val) => setForm({ ...form, gambar: val })}
              />
              <div className="flex flex-col gap-2">
                <Label>Nama Produk</Label>
                <Input
                  placeholder="Bunga Matahari"
                  value={form.nama}
                  onChange={(e) => onChange(e, "nama")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Kategori Produk</Label>
                <Input
                  placeholder="Bunga"
                  value={form.kategori}
                  onChange={(e) => onChange(e, "kategori")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Harga Jual (Rp)</Label>
                <Input
                  placeholder="20000"
                  value={form.harga}
                  onChange={(e) => onChange(e, "harga")}
                  type="number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={form.deskripsi || ""}
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

interface ProdukDTO {
  id: string;
  nama: string;
  kategori: string;
  harga: number;
  deskripsi: string | null;
  gambar: string | null;
}

const initProdukDTO: ProdukDTO = {
  id: "",
  nama: "",
  kategori: "",
  harga: 0,
  deskripsi: null,
  gambar: null,
};

const useProduks = () => {
  const [data, setData] = useState<Produk[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<ProdukDTO>(initProdukDTO);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const onClickItem = (item: Produk, isEdit?: boolean) => {
    setForm({
      id: item.id,
      harga: item.harga,
      kategori: item.kategori,
      nama: item.nama,
      deskripsi: item.deskripsi,
      gambar: item.gambar,
    });
    if (isEdit) setIsOpen(true);
  };

  const onClickAdd = () => {
    setForm(initProdukDTO);
    setIsOpen(true);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof ProdukDTO
  ) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await api.get<Api<Produk[]>>("/produk");
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
        if (!value && key !== "id" && key !== "gambar" && key !== "deskripsi") {
          throw new Error("Semua kolom harus diisi");
        }
      });
      if (pending) return;
      setPending(true);
      makeToast("info");
      if (form.id) {
        setIsOpen(false);
        await makeConfirm(async () => await api.put(`/produk/${form.id}`, form));        
        await fetchData();
        makeToast("success", "Berhasil mengedit produk");
      } else {
        setIsOpen(false);
        await makeConfirm(async () => await api.post("/produk", form));
        await fetchData();
        makeToast("success", "Berhasil menambahkan produk");
      }      
      setForm(initProdukDTO);
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
      await makeConfirm(async () => await api.delete(`/produk/${form.id}`));      
      await fetchData();
      makeToast("success", "Berhasil menghapus produk");
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
  };
};

export default ProdukPage;
