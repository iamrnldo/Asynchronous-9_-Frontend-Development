import { Bell, Menu, Mail, User } from "lucide-react";
import useSupratStore from "../store/suratStore";

const Navbar = ({ toggleSidebar }) => {
  const suratMasuk = useSupratStore((state) => state.suratMasuk);
  const belumDibaca = suratMasuk.filter(
    (s) => s.status === "Belum Dibaca",
  ).length;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="btn-menu" onClick={toggleSidebar}>
          <Menu size={22} />
        </button>
        <div className="navbar-brand">
          <Mail size={24} color="#4f46e5" />
          <span>SiPersuratan</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="notification-bell">
          <Bell size={20} />
          {belumDibaca > 0 && <span className="badge">{belumDibaca}</span>}
        </div>
        <div className="user-info">
          <User size={20} />
          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
