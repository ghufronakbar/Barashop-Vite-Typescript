import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RingkasanPage from "./pages/dashboard/RingkasanPage";
import DetailProductPage from "./pages/DetailProductPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/ringkasan" element={<RingkasanPage />} />
          <Route path="/product/:id" element={<DetailProductPage />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;
