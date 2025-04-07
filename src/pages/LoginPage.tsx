import { Input } from "@/components/ui/input";
import { APP_NAME } from "../constant/index";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="border border-gray-300 px-4  py-4 w-[90%] md:w-2/3 lg:w-1/3 xl:w-1/4 rounded-xl drop-shadow-md flex flex-col gap-4 bg-white">
        <div>
          <h1 className="text-2xl text-black font-medium">Selamat Datang</h1>
          <p className="text-sm">Silahkan login untuk melanjutkan</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder={`example@${APP_NAME?.toLowerCase()}.com`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input type="password" placeholder="********" />
        </div>
        <Button className="mt-2">Login</Button>
        <div className="flex flex-row items-center">
          <div className="w-full h-[1px] bg-gray-300" />
          <p className="px-2 text-xs flex-nowrap whitespace-nowrap text-center flex-1">
            Lupa password?
          </p>
          <div className="w-full h-[1px] bg-gray-300" />
        </div>
        <Link to={"/reset-password"} className="w-full">
          <Button variant="outline" className="w-full">Reset Password</Button>
        </Link>
        <span className="text-xs text-gray-400 text-center">
          &copy; {APP_NAME} 2025
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
