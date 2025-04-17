import {
  Calendar,
  Home,
  LucideProps,
  Box,
  Info,
  User,
  Users,
  History,
  ShoppingBag,
  ShieldAlert,
  ShoppingCart,
  CircleUserRound,
  LogOut,
  Factory,
  Lock,
  HistoryIcon,
  MessageCircleIcon,
  Subtitles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { APP_NAME } from "@/constant";
import { Link } from "react-router-dom";
import { PROFILE } from "@/constant/image";
import { Role, useAuth } from "@/context/auth-context";
import { Badge } from "./ui/badge";

export type AuthPageType =
  | "ringkasan"
  | "laporan"
  | "informasi"
  | "kirim_pesan"
  | "pengguna"
  | "peran"
  | "pelanggan"
  | "produk"
  | "pemasok"
  | "riwayat_pesanan"
  | "pembelian"
  | "cacat_produk"
  | "kasir"
  | "all";

interface SidebarMenu {
  title: string;
  items: SidebarMenuItem[];
}

interface SidebarMenuItem {
  title: string;
  url: string;
  auth: AuthPageType;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const SIDEBAR_MENU: SidebarMenu[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Ringkasan",
        url: "/ringkasan",
        auth: "ringkasan",
        icon: Home,
      },
      {
        title: "Laporan",
        url: "/laporan",
        auth: "laporan",
        icon: Calendar,
      },
      {
        title: "Informasi Pembayaran",
        url: "/informasi-pembayaran",
        auth: "informasi",
        icon: Info,
      },
      {
        title: "Kirim Pesan",
        url: "/kirim-pesan",
        auth: "kirim_pesan",
        icon: MessageCircleIcon,
      },
    ],
  },
  {
    title: "Sistem",
    items: [
      {
        title: "Pengguna",
        url: "/pengguna",
        auth: "pengguna",
        icon: User,
      },
      {
        title: "Peran / Role",
        url: "/peran",
        auth: "peran",
        icon: Subtitles,
      },
      {
        title: "Pelanggan",
        url: "/pelanggan",
        auth: "pelanggan",
        icon: Users,
      },
    ],
  },
  {
    title: "Master Data",
    items: [
      {
        title: "Produk",
        url: "/produk",
        auth: "produk",
        icon: Box,
      },
      {
        title: "Pemasok",
        url: "/pemasok",
        auth: "pemasok",
        icon: Factory,
      },
    ],
  },
  {
    title: "Transaksi",
    items: [
      {
        title: "Riwayat Pesanan",
        url: "/pesanan",
        auth: "riwayat_pesanan",
        icon: History,
      },
      {
        title: "Pembelian",
        url: "/pembelian-produk",
        auth: "pembelian",
        icon: ShoppingBag,
      },
      {
        title: "Cacat Produk",
        url: "/cacat-produk",
        auth: "cacat_produk",
        icon: ShieldAlert,
      },
      {
        title: "Kasir",
        url: "/kasir",
        auth: "kasir",
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      {
        title: "Akun",
        url: "/akun",
        auth: "all",
        icon: CircleUserRound,
      },
      {
        title: "Log Aktivitas",
        url: "/log-aktivitas",
        auth: "all",
        icon: HistoryIcon,
      },
      {
        title: "Privasi",
        url: "/privasi",
        auth: "all",
        icon: Lock,
      },
      {
        title: "Logout",
        url: "/logout",
        auth: "all",
        icon: LogOut,
      },
    ],
  },
];

export function AppSidebar() {
  const { user } = useAuth();

  const filteredSidebarMenu = SIDEBAR_MENU.map((menu) => ({
    ...menu,
    items: menu.items.filter((item) => {
      if (item.auth === "all") return true;
      return user?.peran[item.auth as keyof Role];
    }),
  })).filter((menu) => menu.items.length > 0);
  return (
    <Sidebar>
      <SidebarHeader className="">
        <div className="font-bold flex flex-row items-center text-lg gap-2 my-2 mx-auto overflow-hidden w-full">
          <img
            src={user?.gambar || PROFILE}
            alt=""
            width={80}
            height={80}
            className="min-w-10 min-h-10 w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <div className="font-medium text-sm line-clamp-1">{user?.nama}</div>
            <div className="font-normal text-xs line-clamp-1">
              {user?.email}
            </div>
            <Badge className="font-normal text-2xs line-clamp-1 mt-1">
              {user?.peran?.nama}
            </Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {filteredSidebarMenu.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="font-semibold">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {item.items.map((itemChild, indexChild) => (
                <SidebarMenu key={indexChild}>
                  <SidebarMenuItem key={itemChild.title}>
                    <SidebarMenuButton asChild>
                      <Link to={itemChild.url}>
                        <itemChild.icon />
                        <span>{itemChild.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <span className="text-xs text-gray-400 text-center mb-4">
          &copy; {APP_NAME} 2025
        </span>
      </SidebarContent>
    </Sidebar>
  );
}
