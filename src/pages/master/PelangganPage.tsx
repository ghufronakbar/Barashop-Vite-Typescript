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
import { ExternalLink, Plus, Search } from "lucide-react";
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
import { Link } from "react-router-dom";

const PelangganPage = () => {
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
  } = usePelanggans();
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
        <Button variant="default" onClick={onClickAdd}>
          <Plus />
          Tambah
        </Button>
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
                <TableCell className="flex flex-row items-center gap-2">
                  {item.kode}
                  <Link
                    to={
                      item.jenis_kode === "Email"
                        ? `mailto:${item.kode}`
                        : `https://wa.me/${item.kode}`
                    }
                    target="_blank"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </TableCell>
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
              <DialogTitle>
                {form.id ? "Edit Pelanggan" : "Tambah Pelanggan"}
              </DialogTitle>
              <DialogDescription>
                Isi form dibawah ini untuk{" "}
                {form.id ? "mengedit" : "menambahkan"} pelanggan
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Nama Pelanggan</Label>
                <Input
                  placeholder="Eren Yeager"
                  value={form.nama}
                  onChange={(e) => onChange(e, "nama")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email / No Telepon</Label>
                <Input
                  placeholder="pelanggan@example.com"
                  value={form.kode}
                  onChange={(e) => onChange(e, "kode")}
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

interface PelangganDTO {
  id: string;
  nama: string;
  kode: string;
}

const initPelangganDTO: PelangganDTO = {
  id: "",
  nama: "",
  kode: "",
};

const usePelanggans = () => {
  const [data, setData] = useState<Pelanggan[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<PelangganDTO>(initPelangganDTO);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const onClickItem = (item: Pelanggan, isEdit?: boolean) => {
    setForm({
      id: item.id,
      kode: item.kode,
      nama: item.nama,
    });
    if (isEdit) setIsOpen(true);
  };

  const onClickAdd = () => {
    setForm(initPelangganDTO);
    setIsOpen(true);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof PelangganDTO
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
      const res = await api.get<Api<Pelanggan[]>>("/pelanggan");
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
        if (!value && key !== "id") {
          throw new Error("Semua kolom harus diisi");
        }
        if (
          key === "kode" &&
          !/^(62\d{8,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
            value
          )
        ) {
          throw new Error(
            "Harus berupa nomor telepon berawalan 62 atau email yang valid"
          );
        }
      });
      if (pending) return;
      setPending(true);
      makeToast("info");
      if (form.id) {
        await api.put(`/pelanggan/${form.id}`, form);
        await fetchData();
        makeToast("success", "Berhasil mengedit pelanggan");
      } else {
        await api.post("/pelanggan", form);
        await fetchData();
        makeToast("success", "Berhasil menambahkan pelanggan");
      }
      setIsOpen(false);
      setForm(initPelangganDTO);
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
      await api.delete(`/pelanggan/${form.id}`);
      await fetchData();
      makeToast("success", "Berhasil menghapus pelanggan");
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

export default PelangganPage;
