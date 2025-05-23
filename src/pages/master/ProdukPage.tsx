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
import { Edit, Plus, SaveAll, Search } from "lucide-react";
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
    isEditMode,
    onChangeOnTable,
    someEdited,
    onToggleEditMode,
    handleSaveAll,
    findData,
    loadingEditAll,
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
        <div className="flex flex-row gap-2 items-center">
          {isEditMode && (
            <Button
              variant="default"
              className={
                someEdited
                  ? "bg-teal-500 text-white"
                  : "bg-gray-600 cursor-not-allowed"
              }
              onClick={handleSaveAll}
              disabled={!someEdited}
            >
              {loadingEditAll ? (
                <div className="animate-spin w-4 h-4 border-2 border-t-transparent rounded-full "></div>
              ) : (
                <SaveAll />
              )}
              Simpan
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onToggleEditMode}
            className={
              isEditMode ? "bg-red-600 text-white" : "bg-blue-600 text-white"
            }
          >
            <Edit />
            {isEditMode ? "Batal" : "Edit"}
          </Button>
          <Button variant="default" onClick={onClickAdd}>
            <Plus />
            Tambah
          </Button>
        </div>
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
              <TableRow key={item.produk_id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={item.foto_produk || PLACEHOLDER}
                    alt=""
                    width={200}
                    height={200}
                    className="min-w-12 min-h-12 w-12 h-12 object-cover rounded-xl"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {isEditMode ? (
                    <Input
                      value={findData(item.produk_id)?.nama_produk || ""}
                      onChange={(e) =>
                        onChangeOnTable(e, "nama_produk", item.produk_id)
                      }
                    />
                  ) : (
                    item.nama_produk
                  )}
                </TableCell>
                <TableCell>
                  {isEditMode ? (
                    <Input
                      value={findData(item.produk_id)?.kategori_produk || ""}
                      onChange={(e) =>
                        onChangeOnTable(e, "kategori_produk", item.produk_id)
                      }
                    />
                  ) : (
                    item.kategori_produk
                  )}
                </TableCell>
                <TableCell>
                  {isEditMode ? (
                    <Input
                      value={findData(item.produk_id)?.harga_produk || ""}
                      onChange={(e) =>
                        onChangeOnTable(e, "harga_produk", item.produk_id)
                      }
                    />
                  ) : (
                    formatRupiah(item.harga_produk)
                  )}
                </TableCell>
                <TableCell>{formatRupiah(item.hpp)}</TableCell>
                <TableCell>{item.jumlah_stok}</TableCell>
                <TableCell>{item.total_terjual}</TableCell>
                <TableCell>{formatDate(item.updated_at, true, true)}</TableCell>
                <TableCell className="flex flex-row gap-2">
                  {/* <div>
                    DEBUG{" "}
                    {findData(item.produk_id)?.edited ? "edited" : "not edited"}
                  </div> */}
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
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-"].includes(evt.key) &&
                    evt.preventDefault()
                  }
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

interface ProdukWithEdit extends Produk {
  edited: boolean;
}

const useProduks = () => {
  const [data, setData] = useState<Produk[]>([]);
  const [dataWithEdit, setDataWithEdit] = useState<ProdukWithEdit[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<ProdukDTO>(initProdukDTO);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingEditAll, setLoadingEditAll] = useState(false);

  const onClickItem = (item: Produk, isEdit?: boolean) => {
    setForm({
      id: item.produk_id,
      harga: item.harga_produk,
      kategori: item.kategori_produk,
      nama: item.nama_produk,
      deskripsi: item.deskripsi_produk,
      gambar: item.foto_produk,
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

  const onChangeOnTable = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ProdukWithEdit,
    id: string
  ) => {
    const newData: ProdukWithEdit[] = dataWithEdit.map((item) => {
      if (item.produk_id === id) {
        return {
          ...item,
          [key]: e.target.value,
          edited: true,
        };
      }
      return {
        ...item,
      };
    });
    setDataWithEdit(newData);
  };

  const filteredData = data.filter((item) =>
    item.nama_produk.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await api.get<Api<Produk[]>>("/produk");
      setData(
        res.data.data.map((item) => ({
          ...item,
          edited: false,
        }))
      );
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
      if (form.id) {
        setIsOpen(false);
        await makeConfirm(
          async () => await api.put(`/produk/${form.id}`, form)
        );
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

  const onToggleEditMode = () => {
    setDataWithEdit(
      data.map((item) => ({
        ...item,
        edited: false,
      }))
    );
    setIsEditMode(!isEditMode);
  };

  const someEdited = dataWithEdit.some((item) => item.edited);

  const findData = (id: string) => {
    const data: ProdukWithEdit | undefined = dataWithEdit.find(
      (item) => item.produk_id === id
    );
    if (data) {
      return {
        ...data,
      };
    }
    return null;
  };

  const handleSaveAll = async () => {
    if (loadingEditAll) return;
    if (!dataWithEdit) return;
    await makeConfirm(async () => await promiseSaveAll());
  };

  const promiseSaveAll = async () => {
    try {      
      setLoadingEditAll(true);
      const promises: Promise<void>[] = [];
      for (let i = 0; i < dataWithEdit.length; i += 5) {
        const edited = dataWithEdit
          .slice(i, i + 5)
          .filter((item) => item.edited);
        console.log(`Saving ${edited.length} items`);
        promises.push(
          (async () => {
            for (const item of edited) {
              try {
                console.log(item.nama_produk, item.edited);
                const dto: ProdukDTO = {
                  id: item.produk_id,
                  nama: item.nama_produk,
                  kategori: item.kategori_produk,
                  harga: item.harga_produk,
                  deskripsi: item.deskripsi_produk,
                  gambar: item.foto_produk,
                };
                await api.put(`/produk/${item.produk_id}`, dto);
              } catch (error) {
                console.log(error);
                makeToast("error", error);
              }
            }
          })()
        );
      }
      await Promise.all(promises);
      await fetchData();
      makeToast("success", "Berhasil menyimpan semua perubahan");
    } catch (error) {
      console.log(error);
      makeToast("error", error);
    } finally {
      onToggleEditMode();
      setLoadingEditAll(false);
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
    onChangeOnTable,
    isEditMode,
    onToggleEditMode,
    someEdited,
    handleSaveAll,
    findData,
    loadingEditAll,
  };
};

export default ProdukPage;
