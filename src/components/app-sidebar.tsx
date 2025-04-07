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
import { LOGO } from "@/constant/image";

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
        title: "Penjualan",
        url: "/penjualan",
        icon: History,
      },
      {
        title: "Pembelian",
        url: "/pembelian-produk",
        icon: ShoppingBag,
      },
      {
        title: "Kasir",
        url: "/kasir",
        icon: ShoppingCart,
      },
      {
        title: "Kerusakan Produk",
        url: "/kerusakan-produk",
        icon: ShieldAlert,
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
  return (
    <Sidebar>
      <SidebarHeader className="font-bold flex flex-row items-center text-lg gap-4 ml-2 my-2">
        <img
          src={LOGO}
          alt=""
          width={80}
          height={80}
          className="min-w-10 min-h-10 w-10 h-10 rounded-full object-cover"
        />
        {APP_NAME}
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
      </SidebarContent>
    </Sidebar>
  );
}
