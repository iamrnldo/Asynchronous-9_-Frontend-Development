import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MailOpen,
  Send,
  Archive,
  ChevronRight,
} from "lucide-react";
import useSupratStore from "../store/suratStore";

const Sidebar = ({ isOpen }) => {
  const suratMasuk = useSupratStore((state) => state.suratMasuk);
  const suratKeluar = useSupratStore((state) => state.suratKeluar);
  const arsip = useSupratStore((state) => state.arsip);
  const belumDibaca = suratMasuk.filter(
    (s) => s.status === "Belum Dibaca",
  ).length;

  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      count: null,
    },
    {
      path: "/surat-masuk",
      label: "Surat Masuk",
      icon: <MailOpen size={20} />,
      count: belumDibaca > 0 ? belumDibaca : null,
      countColor: "#ef4444",
    },
    {
      path: "/surat-keluar",
      label: "Surat Keluar",
      icon: <Send size={20} />,
      count: suratKeluar.length,
      countColor: "#4f46e5",
    },
    {
      path: "/arsip",
      label: "Arsip",
      icon: <Archive size={20} />,
      count: arsip.length > 0 ? arsip.length : null,
      countColor: "#6b7280",
    },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <p className="sidebar-subtitle">Sistem Persuratan</p>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">MENU UTAMA</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && (
              <>
                <span className="nav-text">{item.label}</span>
                <span className="nav-right">
                  {item.count && (
                    <span
                      className="nav-badge"
                      style={{ backgroundColor: item.countColor }}
                    >
                      {item.count}
                    </span>
                  )}
                  <ChevronRight size={14} className="nav-arrow" />
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {isOpen && (
        <div className="sidebar-footer">
          <div className="stats-mini">
            <div className="stat-mini-item">
              <span className="stat-mini-number">{suratMasuk.length}</span>
              <span className="stat-mini-label">Surat Masuk</span>
            </div>
            <div className="stat-mini-item">
              <span className="stat-mini-number">{suratKeluar.length}</span>
              <span className="stat-mini-label">Surat Keluar</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
