import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { api } from "@/config/api";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { AxiosError } from "axios";
import { APP_NAME } from "@/constant";
import { useLocation, useNavigate } from "react-router-dom";

export type Role = "Admin" | "Owner" | "ManagerOperational" | "Cashier";

export interface Decoded {
  id: string;
  nama: string;
  email: string;
  peran: Role;
  gambar: string | null;
  token: string;
  iat: number;
  exp: number;
}

interface AuthContextProps {
  user: Decoded | null;
  updateProfile: (userData: Decoded) => void;
  signOut: () => void;
  fetchAuth: () => Promise<Decoded | null>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Decoded | null>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const fetchAuth = async (): Promise<Decoded | null> => {
    try {      
      const res = await api.get<Api<Decoded>>("/auth/check");
      setUser(res.data.data);
      Cookies.set(APP_NAME, JSON.stringify(res.data.data), { expires: 0.5 });
      return res.data.data;
    } catch (error) {
      console.log(error);
      makeToast("error", error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        navigate("/login");
      }
      return null;
    }
  };

  const ALLOWED_PATHS = ["/login", "/reset-password", "/"];

  useEffect(() => {
    if (ALLOWED_PATHS.includes(pathname)) {
      return;
    }
    const userCookie = Cookies.get(APP_NAME);
    const decoded: Decoded | null = userCookie ? JSON.parse(userCookie) : null;
    if (decoded && decoded.exp * 1000 > Date.now()) {
      setUser(decoded);
    } else {
      fetchAuth();
    }
  }, [pathname]);

  const updateProfile = (userData: Decoded) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 0.5 });
  };

  const signOut = () => {
    setUser(null);
    Cookies.remove("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, updateProfile, signOut, fetchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
