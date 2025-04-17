import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { api } from "@/config/api";
import { makeConfirm } from "@/helper/makeConfirm";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { InformasiPembayaran } from "@/model/Informasi";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";

const InformasiPembayaranPage = () => {
  const { data, onChange, handleSubmit } = useInformasi();
  return (
    <DashboardLayout
      title="Informasi Pembayaran"
      childredHeader={
        <Button onClick={handleSubmit}>
          <Save />
          Simpan
        </Button>
      }
    >
      <div className="w-full flex flex-col justify-start md:flex-row md:justify-between gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label>Persentase Diskon*</Label>
            <div className="relative w-full">
              <Input
                value={data?.diskon}
                placeholder="Loading.."
                onChange={(e) => onChange(e, "diskon")}
                type="number"
                className="appearance-none -moz-appearance-none -webkit-appearance-none"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 h-full px-4 flex items-center justify-center rounded-r-md font-medium">
                %
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Persentase Pajak**</Label>
            <div className="relative w-full">
              <Input
                value={data?.pajak}
                placeholder="Loading.."
                onChange={(e) => onChange(e, "pajak")}
                type="number"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 h-full px-4 flex items-center justify-center rounded-r-md font-medium">
                %
              </div>
            </div>
          </div>
        </div>
        <div className="border-input w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Catatan</h4>
          <div className="flex flex-col text-sm">
            <p className="text-neutral-500">
              *Diskon akan dikenakan untuk pelanggan yang merupakan pelanggan /
              member
            </p>
            <p className="text-neutral-500">
              **Pajak akan dikenakan setelah harga diskon
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

InformasiPembayaranPage.auth = true;

const useInformasi = () => {
  const [data, setData] = useState<InformasiPembayaran>();
  const [pending, setPending] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "diskon" | "pajak"
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
      const res = await api.get<Api<InformasiPembayaran>>("/informasi");
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
      if (pending || !data) return;
      setPending(true);
      await makeConfirm(async () => await api.put("/informasi", data));      
      makeToast("success", "Berhasil mengedit informasi pembayaran");
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
  };
};

export default InformasiPembayaranPage;
