import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RingkasanPage from "./pages/dashboard/RingkasanPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./context/auth-context";
import { ToastContainer } from "react-toastify";
import ProdukPage from "./pages/master/ProdukPage";
import PemasokPage from "./pages/master/PemasokPage";
import PenggunaPage from "./pages/sistem/PenggunaPage";
import PelangganPage from "./pages/sistem/PelangganPage";
import PembelianProdukPage from "./pages/transaksi/PembelianProdukPage";
import CacatProdukPage from "./pages/transaksi/CacatProdukPage";
import PesananPage from "./pages/transaksi/PesananPage";
import KirimPesanPage from "./pages/dashboard/KirimPesanPage";
import InformasiPembayaranPage from "./pages/dashboard/InformasiPembayaranPage";
import AkunPage from "./pages/pengaturan/AkunPage";
import PrivasiPage from "./pages/pengaturan/PrivasiPage";
import LogAktivitasPage from "./pages/pengaturan/LogAktivitasPage";
import LogoutPage from "./pages/pengaturan/LogoutPage";
import KasirPage from "./pages/transaksi/KasirPage";
import PaymentPage from "./pages/transaksi/PaymentPage";
import PeranPage from "./pages/sistem/PeranPage";
import AuthPage from "./hoc/AuthPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            <Route path="/ringkasan" element={<AuthPage component={RingkasanPage} auth="ringkasan" />} />
            <Route path="/kirim-pesan" element={<AuthPage component={KirimPesanPage} auth="kirim_pesan" />} />
            <Route path="/informasi-pembayaran" element={<AuthPage component={InformasiPembayaranPage} auth="informasi" />} />

            <Route path="/pengguna" element={<AuthPage component={PenggunaPage} auth="pengguna" />} />
            <Route path="/pelanggan" element={<AuthPage component={PelangganPage} auth="pelanggan" />} />
            <Route path="/peran" element={<AuthPage component={PeranPage} auth="peran" />} />

            <Route path="/produk" element={<AuthPage component={ProdukPage} auth="produk" />} />
            <Route path="/pemasok" element={<AuthPage component={PemasokPage} auth="pemasok" />} />

            <Route path="/pembelian-produk" element={<AuthPage component={PembelianProdukPage} auth="pembelian" />} />
            <Route path="/cacat-produk" element={<AuthPage component={CacatProdukPage} auth="cacat_produk" />} />
            <Route path="/pesanan" element={<AuthPage component={PesananPage} auth="riwayat_pesanan" />} />
            <Route path="/kasir" element={<AuthPage component={KasirPage} auth="kasir" />} />
            <Route path="/payment/:id" element={<AuthPage component={PaymentPage} auth="all" />} />

            <Route path="/akun" element={<AuthPage component={AkunPage} auth="all" />} />
            <Route path="/privasi" element={<AuthPage component={PrivasiPage} auth="all" />} />
            <Route path="/log-aktivitas" element={<AuthPage component={LogAktivitasPage} auth="all" />} />
            <Route path="/logout" element={<AuthPage component={LogoutPage} auth="all" />} />
          </Routes>
        </SidebarProvider>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;

