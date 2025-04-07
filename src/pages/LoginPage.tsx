import { Input } from "@/components/ui/input";
import { APP_NAME } from "../constant/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeToast } from "@/helper/makeToast";
import { api } from "@/config/api";
import { Api } from "@/model/Api";
import { Decoded, useAuth } from "@/context/auth-context";
import Cookies from "js-cookie";

const LoginPage = () => {
  const { form, handleSubmit, onChange } = useLogin();
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form
        className="border border-gray-300 px-4  py-4 w-[90%] md:w-2/3 lg:w-1/3 xl:w-1/4 rounded-xl drop-shadow-md flex flex-col gap-4 bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <h1 className="text-2xl text-black font-medium">Selamat Datang</h1>
          <p className="text-sm">Silahkan login untuk melanjutkan</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder={`example@${APP_NAME?.toLowerCase()}.com`}
            value={form.email}
            onChange={(e) => onChange(e, "email")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="********"
            value={form.password}
            onChange={(e) => onChange(e, "password")}
          />
        </div>
        <Button className="mt-2" type="submit">
          Login
        </Button>
        <div className="flex flex-row items-center">
          <div className="w-full h-[1px] bg-gray-300" />
          <p className="px-2 text-xs flex-nowrap whitespace-nowrap text-center flex-1">
            Lupa password?
          </p>
          <div className="w-full h-[1px] bg-gray-300" />
        </div>
        <Link to={"/reset-password"} className="w-full">
          <Button variant="outline" className="w-full">
            Reset Password
          </Button>
        </Link>
        <span className="text-xs text-gray-400 text-center">
          &copy; {APP_NAME} 2025
        </span>
      </form>
    </div>
  );
};

interface LoginDTO {
  email: string;
  password: string;
}

const initLoginDTO: LoginDTO = {
  email: "",
  password: "",
};

const useLogin = () => {
  const [form, setForm] = useState(initLoginDTO);
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof LoginDTO
  ) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (loading) return;
      Object.values(form).forEach((value) => {
        if (!value) {
          throw new Error("Semua kolom harus diisi");
        }
      });
      setLoading(true);
      makeToast("info");
      const res = await api.post<Api<Decoded>>("/auth/login", form);
      makeToast("success", res?.data?.message);
      Cookies.set("ACCESS_TOKEN", res.data.data.token);
      updateProfile(res.data.data);
      navigate("/ringkasan");
    } catch (error) {
      makeToast("error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onChange,
    handleSubmit,
  };
};

export default LoginPage;
