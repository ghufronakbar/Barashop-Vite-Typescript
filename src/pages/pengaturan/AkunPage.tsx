import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { UploadImage } from "@/components/upload-image";
import { api } from "@/config/api";
import { Decoded, Role, useAuth } from "@/context/auth-context";
import formatDate from "@/helper/formatDate";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { LogAksi } from "@/model/LogAksi";
import { Pengguna } from "@/model/Pengguna";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";

const AkunPage = () => {
  const { data, onChange, handleSubmit, logs, onClickItem, selected, setData } =
    useAkun();
  return (
    <DashboardLayout
      title="Akun"
      childredHeader={
        <Button onClick={handleSubmit}>
          <Save />
          Simpan
        </Button>
      }
    >
      <div className="w-full flex flex-col justify-start md:flex-row md:justify-between gap-4 relative">
        <div className="flex flex-col gap-4 w-full sticky top-0">
          <UploadImage
            isProfile
            className="mx-auto"
            image={data?.gambar}
            onChangeImage={(val) => {
              if (data) {
                setData({ ...data, gambar: val });
              }
            }}
          />
          {data?.gambar && (
            <Button
              className="w-fit mx-auto text-xs"
              variant="destructive"
              onClick={() => {
                const isConfirm = window.confirm(
                  "Apakah anda yakin ingin menghapus foto?"
                );
                if (isConfirm && data) {
                  setData({ ...data, gambar: null });
                }
              }}
            >
              Hapus Foto
            </Button>
          )}
          <div className="flex flex-col gap-2 w-full">
            <Label>Nama</Label>
            <Input
              value={data?.nama}
              placeholder="Loading.."
              onChange={(e) => onChange(e, "nama")}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Email</Label>
            <Input
              value={data?.email}
              placeholder="Loading.."
              onChange={(e) => onChange(e, "email")}
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Jabatan / Peran</Label>
            <Input
              value={data?.peran?.nama_peran}
              placeholder="Loading.."
              disabled
            />
          </div>
        </div>
        <div className="border-input w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none flex flex-col gap-4 max-h-[80vh] overflow-auto">
          <h4 className="text-lg font-semibold">Log Aksi</h4>
          <div className="flex flex-col gap-2">
            {logs.map((log) => (
              <div
                key={log.log_aksi_id}
                className="flex flex-col gap-2 border-b border-gray-200 py-2"
              >
                <p className="text-sm">{log.deskripsi_aksi}</p>
                <div className="flex items-end justify-between">
                  <p className="text-sm text-gray-500">
                    {formatDate(log.created_at, true, true)}
                  </p>
                  <Button variant="secondary" onClick={() => onClickItem(log)}>
                    Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={!!selected} onOpenChange={() => onClickItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Log Aksi</DialogTitle>
            <DialogDescription>{selected?.deskripsi_aksi}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 overflow-scroll">
            <div className="flex flex-col gap-2">
              <h4>Log Aksi</h4>
              <Table className="text-sm">
                <TableRow>
                  <TableCell className="font-medium">Pelaku</TableCell>
                  <TableCell className="text-right">
                    {selected?.user?.nama_pengguna}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Data</TableCell>
                  <TableCell className="text-right">
                    {selected?.model_referensi}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Aksi</TableCell>
                  <TableCell className="text-right">
                    {selected?.jenis_aksi === "Create"
                      ? "Tambah"
                      : selected?.jenis_aksi === "Delete"
                      ? "Hapus"
                      : "Ubah"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Waktu</TableCell>
                  <TableCell className="text-right">
                    {formatDate(selected?.created_at, true, true)}
                  </TableCell>
                </TableRow>
              </Table>
            </div>
            <div className="flex flex-col gap-2 overflow-auto">
              <h4>Detail</h4>
              <JSONPretty data={selected?.detail_aksi} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => onClickItem(null)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

AkunPage.auth = true;

interface AkunDTO {
  user_id: string;
  nama: string;
  email: string;
  gambar: string | null;
  peran: Role;
}

const useAkun = () => {
  const [data, setData] = useState<AkunDTO>();
  const [pending, setPending] = useState(false);
  const [l, setLogs] = useState<LogAksi[]>([]);
  const [selected, setSelected] = useState<LogAksi | null>(null);

  const logs = l.filter((log) => log.user_id === data?.user_id);

  const { updateProfile } = useAuth();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "nama" | "email"
  ) => {
    if (data) {
      setData({
        ...data,
        [key]: e.target.value,
      });
    }
  };

  const fetchData = async () => {
    try {
      const res = await api.get<Api<Pengguna>>("/akun");
      setData({
        email: res.data.data.email,
        gambar: res.data.data.foto_profil,
        nama: res.data.data.nama_pengguna,
        user_id: res.data.data.user_id,
        peran: res.data.data.peran,
      });
    } catch (error) {
      makeToast("error", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await api.get<Api<LogAksi[]>>("/log-aksi");
      res.data.data.filter((log) => log.user_id === data?.user_id);
      setLogs(res.data.data);
    } catch (error) {
      makeToast("error", error);
    }
  };

  const onClickItem = (item: LogAksi | null) => {
    setSelected(item);
  };

  useEffect(() => {
    fetchData().then(() => fetchLogs());
  }, []);

  const handleSubmit = async () => {
    try {
      if (pending || !data) return;
      setPending(true);
      makeToast("info");
      const res = await api.put<Api<Pengguna>>("/akun", data);
      updateProfile({
        email: res.data.data.email,
        foto_profil: res.data.data.foto_profil,
        nama_pengguna: res.data.data.nama_pengguna,
        peran: res.data.data.peran,
        user_id: res.data.data.user_id,
      } as Decoded);
      await fetchData();
      makeToast("success", "Berhasil mengedit akun");
    } catch (error) {
      makeToast("error", error);
    } finally {
      setPending(false);
    }
  };

  return {
    data,
    onChange,
    handleSubmit,
    logs,
    onClickItem,
    selected,
    setData,
  };
};

export default AkunPage;
