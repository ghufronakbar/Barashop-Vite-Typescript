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
import PenggunaPage from "./pages/master/PenggunaPage";
import PelangganPage from "./pages/master/PelangganPage";
import PembelianProdukPage from "./pages/transaksi/PembelianProdukPage";
import CacatProdukPage from "./pages/transaksi/CacatProdukPage";
import PesananPage from "./pages/transaksi/PesananPage";

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

            <Route path="/produk" element={<ProdukPage />} />
            <Route path="/pemasok" element={<PemasokPage />} />
            <Route path="/pengguna" element={<PenggunaPage />} />
            <Route path="/pelanggan" element={<PelangganPage />} />

            <Route path="/pembelian-produk" element={<PembelianProdukPage />} />
            <Route path="/cacat-produk" element={<CacatProdukPage />} />
            <Route path="/pesanan" element={<PesananPage />} />
          </Routes>
        </SidebarProvider>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
