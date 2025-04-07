import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";

interface Props {
  children: React.ReactNode;
  title?: string;
  childredHeader?: React.ReactNode;
}

export const DashboardLayout = ({ children, childredHeader, title }: Props) => {
  useAuth();
  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex flex-col gap-4 w-full min-h-screen px-4 md:px-8 py-8">
        <SidebarTrigger />
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div>{childredHeader}</div>
        </div>
        {children}
      </div>
    </div>
  );
};
