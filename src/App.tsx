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

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            <Route path="/ringkasan" element={<RingkasanPage />} />
            <Route path="/kirim-pesan" element={<KirimPesanPage />} />
            <Route
              path="/informasi-pembayaran"
              element={<InformasiPembayaranPage />}
            />

            <Route path="/pengguna" element={<PenggunaPage />} />
            <Route path="/pelanggan" element={<PelangganPage />} />
            <Route path="/peran" element={<PeranPage />} />

            <Route path="/produk" element={<ProdukPage />} />
            <Route path="/pemasok" element={<PemasokPage />} />

            <Route path="/pembelian-produk" element={<PembelianProdukPage />} />
            <Route path="/cacat-produk" element={<CacatProdukPage />} />
            <Route path="/pesanan" element={<PesananPage />} />
            <Route path="/kasir" element={<KasirPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />

            <Route path="/akun" element={<AkunPage />} />
            <Route path="/privasi" element={<PrivasiPage />} />
            <Route path="/log-aktivitas" element={<LogAktivitasPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </SidebarProvider>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
