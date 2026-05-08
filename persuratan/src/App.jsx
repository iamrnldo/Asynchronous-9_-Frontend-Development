import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SuratMasuk from "./pages/SuratMasuk";
import SuratKeluar from "./pages/SuratKeluar";
import Arsip from "./pages/Arsip";
import DetailSurat from "./pages/DetailSurat";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="app-body">
          <Sidebar isOpen={sidebarOpen} />
          <main
            className={`main-content ${sidebarOpen ? "with-sidebar" : "full"}`}
          >
            <Routes>
              {/* 4 Static Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/surat-masuk" element={<SuratMasuk />} />
              <Route path="/surat-keluar" element={<SuratKeluar />} />
              <Route path="/arsip" element={<Arsip />} />

              {/* 1 Dynamic Route */}
              <Route path="/surat/:id" element={<DetailSurat />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
