import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/ui/layout/dashboard-layout";
import { api } from "@/config/api";
import { makeToast } from "@/helper/makeToast";
import { Save } from "lucide-react";
import { useState } from "react";

const PrivasiPage = () => {
  const { onChange, handleSubmit, form } = usePrivasi();
  return (
    <DashboardLayout
      title="Privasi"
      childredHeader={
        <Button onClick={handleSubmit}>
          <Save />
          Simpan
        </Button>
      }
    >
      <p className="text-neutral-500 mb-2">
        Segera perbarui kata sandi Anda untuk meningkatkan keamanan akun Anda.
      </p>
      <div className="w-full flex flex-col justify-start md:flex-row md:justify-between gap-4 relative">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex flex-col gap-2 w-full ">
            <Label>Password Lama</Label>
            <Input
              value={form.password_lama}
              placeholder="********"
              onChange={(e) => onChange(e, "password_lama")}
              type="password"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Password Baru</Label>
            <Input
              value={form.password_baru}
              placeholder="********"
              onChange={(e) => onChange(e, "password_baru")}
              type="password"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Konfirmasi Password</Label>
            <Input
              value={form.password_konfirmasi}
              placeholder="********"
              onChange={(e) => onChange(e, "password_konfirmasi")}
              type="password"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface ChangePassDTO {
  password_lama: string;
  password_baru: string;
  password_konfirmasi: string;
}

const initChangePass: ChangePassDTO = {
  password_lama: "",
  password_baru: "",
  password_konfirmasi: "",
};

const usePrivasi = () => {
  const [form, setForm] = useState<ChangePassDTO>(initChangePass);
  const [pending, setPending] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ChangePassDTO
  ) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      Object.values(form).forEach((value) => {
        if (!value) {
          throw new Error("Semua kolom harus diisi");
        }
      });
      if (form.password_baru !== form.password_konfirmasi) {
        throw new Error("Password baru dan konfirmasi harus sama");
      }
      if (form.password_baru.length < 8) {
        throw new Error("Password minimal 8 karakter");
      }
      if (pending) return;
      setPending(true);
      makeToast("info");
      await api.patch("/akun", form);
      setForm(initChangePass);
      makeToast("success", "Berhasil mengubah password");
    } catch (error) {
      makeToast("error", error);
    } finally {
      setPending(false);
    }
  };

  return {
    onChange,
    handleSubmit,
    form,
  };
};

export default PrivasiPage;
