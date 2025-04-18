import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { api } from "@/config/api";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { Peran } from "@/model/Peran";
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
import { makeConfirm } from "@/helper/makeConfirm";
import { Decoded, useAuth } from "@/context/auth-context";
import { Pengguna } from "@/model/Pengguna";

const PeranPage = () => {
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
    onChangeName,
  } = usePerans();
  const TABLE_HEADERS = ["No", "Nama", "Total Pengguna", "Terakhir Diubah", ""];
  return (
    <DashboardLayout
      title="Peran"
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
          placeholder="Cari peran..."
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
                <TableCell>{item.users.length}</TableCell>
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
        <DialogContent className="">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <DialogHeader>
              <DialogTitle>
                {form.id ? "Edit Peran" : "Tambah Peran"}
              </DialogTitle>
              <DialogDescription>
                Isi form dibawah ini untuk{" "}
                {form.id ? "mengedit" : "menambahkan"} peran
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Nama Peran</Label>
                <Input
                  placeholder="Manager"
                  value={form.nama}
                  onChange={(e) => onChangeName(e, "nama")}
                />
              </div>
              <Label className="mt-2">Hak Akses</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Ringkasan</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.ringkasan}
                    onChange={(e) => onChange(e, "ringkasan")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Laporan</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.laporan}
                    onChange={(e) => onChange(e, "laporan")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Informasi</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.informasi}
                    onChange={(e) => onChange(e, "informasi")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Kirim Pesan</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.kirim_pesan}
                    onChange={(e) => onChange(e, "kirim_pesan")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Pengguna</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.pengguna}
                    onChange={(e) => onChange(e, "pengguna")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Peran</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.peran}
                    onChange={(e) => onChange(e, "peran")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Pelanggan</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.pelanggan}
                    onChange={(e) => onChange(e, "pelanggan")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Produk</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.produk}
                    onChange={(e) => onChange(e, "produk")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Pemasok</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.pemasok}
                    onChange={(e) => onChange(e, "pemasok")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Riwayat Pesanan</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.riwayat_pesanan}
                    onChange={(e) => onChange(e, "riwayat_pesanan")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Pembelian</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.pembelian}
                    onChange={(e) => onChange(e, "pembelian")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Cacat Produk</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.cacat_produk}
                    onChange={(e) => onChange(e, "cacat_produk")}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                  <Label>Kasir</Label>
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={form.kasir}
                    onChange={(e) => onChange(e, "kasir")}
                  />
                </div>
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

interface PeranDTO {
  id: string;
  nama: string;
  ringkasan: boolean;
  laporan: boolean;
  informasi: boolean;
  kirim_pesan: boolean;
  pengguna: boolean;
  peran: boolean;
  pelanggan: boolean;
  produk: boolean;
  pemasok: boolean;
  riwayat_pesanan: boolean;
  pembelian: boolean;
  cacat_produk: boolean;
  kasir: boolean;
}

const initPeranDTO: PeranDTO = {
  id: "",
  nama: "",
  ringkasan: false,
  laporan: false,
  informasi: false,
  kirim_pesan: false,
  pengguna: false,
  peran: false,
  pelanggan: false,
  produk: false,
  pemasok: false,
  riwayat_pesanan: false,
  pembelian: false,
  cacat_produk: false,
  kasir: false,
};

const usePerans = () => {
  const [data, setData] = useState<Peran[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<PeranDTO>(initPeranDTO);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const { updateProfile } = useAuth();

  const onClickItem = (item: Peran, isEdit?: boolean) => {
    setForm({
      id: item.id,
      cacat_produk: item.cacat_produk,
      kasir: item.kasir,
      kirim_pesan: item.kirim_pesan,
      laporan: item.laporan,
      pelanggan: item.pelanggan,
      pengguna: item.pengguna,
      peran: item.peran,
      produk: item.produk,
      pemasok: item.pemasok,
      riwayat_pesanan: item.riwayat_pesanan,
      pembelian: item.pembelian,
      ringkasan: item.ringkasan,
      informasi: item.informasi,
      nama: item.nama,
    });
    if (isEdit) setIsOpen(true);
  };

  const onClickAdd = () => {
    setForm(initPeranDTO);
    setIsOpen(true);
  };

  const onChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof PeranDTO
  ) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof PeranDTO
  ) => {
    setForm({
      ...form,
      [key]: e.target.checked,
    });
  };

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await api.get<Api<Peran[]>>("/peran");
      setData(res.data.data);
    } catch (error) {
      makeToast("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get<Api<Pengguna>>("/akun");
      updateProfile({
        email: res.data.data.email,
        gambar: res.data.data.gambar,
        nama: res.data.data.nama,
        peran: res.data.data.peran,
        id: res.data.data.id,
      } as Decoded);
    } catch (error) {
      makeToast("error", error);
    }
  };

  const handleSubmit = async () => {
    try {
      let booleanTrue = 0;
      Object.entries(form).forEach(([key, value]) => {
        if (!value && key !== "id" && typeof value !== "boolean") {
          throw new Error("Semua kolom harus diisi");
        }
        if (value && typeof value === "boolean") {
          booleanTrue++;
        }
      });
      if (booleanTrue === 0)
        throw new Error("Peran harus memiliki minimal 1 hak akses");
      if (pending) return;
      setPending(true);
      if (form.id) {
        setIsOpen(false);
        await makeConfirm(async () => await api.put(`/peran/${form.id}`, form));
        await Promise.all([fetchData(), fetchUser()]);
        makeToast("success", "Berhasil mengedit peran");
      } else {
        setIsOpen(false);
        await makeConfirm(async () => await api.post("/peran", form));
        await Promise.all([fetchData(), fetchUser()]);
        makeToast("success", "Berhasil menambahkan peran");
      }
      setForm(initPeranDTO);
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
      await makeConfirm(async () => await api.delete(`/peran/${form.id}`));
      await fetchData();
      makeToast("success", "Berhasil menghapus peran");
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
    onChangeName,
  };
};

export default PeranPage;
