import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RingkasanPage from "./pages/dashboard/RingkasanPage";
import DetailProductPage from "./pages/DetailProductPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { SidebarProvider } from "./components/ui/sidebar";
import { AuthProvider } from "./context/auth-context";
import { ToastContainer } from "react-toastify";
import ProdukPage from "./pages/master/ProdukPage";

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
            <Route path="/produk/:id" element={<DetailProductPage />} />
          </Routes>
        </SidebarProvider>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
