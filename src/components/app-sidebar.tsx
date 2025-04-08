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
import { useAuth } from "@/context/auth-context";
import { Badge } from "./ui/badge";

interface SidebarMenu {
  title: string;
  items: SidebarMenuItem[];
}

interface SidebarMenuItem {
  title: string;
  url: string;
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
        icon: Home,
      },
      {
        title: "Laporan",
        url: "/laporan",
        icon: Calendar,
      },
      {
        title: "Informasi Pembayaran",
        url: "/informasi-pembayaran",
        icon: Info,
      },
      {
        title: "Kirim Pesan",
        url: "/kirim-pesan",
        icon: MessageCircleIcon,
      },
    ],
  },
  {
    title: "Master Data",
    items: [
      {
        title: "Produk",
        url: "/produk",
        icon: Box,
      },
      {
        title: "Pemasok",
        url: "/pemasok",
        icon: Factory,
      },
      {
        title: "Pengguna",
        url: "/pengguna",
        icon: User,
      },
      {
        title: "Pelanggan",
        url: "/pelanggan",
        icon: Users,
      },
    ],
  },
  {
    title: "Transaksi",
    items: [
      {
        title: "Riwayat Pesanan",
        url: "/pesanan",
        icon: History,
      },
      {
        title: "Pembelian",
        url: "/pembelian-produk",
        icon: ShoppingBag,
      },
      {
        title: "Cacat Produk",
        url: "/cacat-produk",
        icon: ShieldAlert,
      },
      {
        title: "Kasir",
        url: "/kasir",
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
        icon: CircleUserRound,
      },
      {
        title: "Log Aktivitas",
        url: "/log-aktivitas",
        icon: HistoryIcon,
      },
      {
        title: "Privasi",
        url: "/privasi",
        icon: Lock,
      },
      {
        title: "Logout",
        url: "/logout",
        icon: LogOut,
      },
    ],
  },
];

export function AppSidebar() {
  const { user } = useAuth();
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
              {user?.peran}
            </Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {SIDEBAR_MENU.map((item, index) => (
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
