import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "🏠 Home" },
    { path: "/movies", label: "🎬 Film" },
    { path: "/about", label: "ℹ️ Tentang" },
  ];

  const s = {
    nav: {
      backgroundColor: "#0f0f1a",
      padding: "0 2rem",
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "1px solid #1f1f3a",
    },
    inner: {
      maxWidth: "1100px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
    },
    logo: {
      color: "#e2b714",
      fontWeight: "800",
      fontSize: "1.3rem",
      textDecoration: "none",
    },
    ul: {
      display: "flex",
      gap: "0.5rem",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    link: (active) => ({
      color: active ? "#e2b714" : "#a0a0b0",
      textDecoration: "none",
      padding: "0.4rem 1rem",
      borderRadius: "8px",
      backgroundColor: active ? "rgba(226,183,20,0.1)" : "transparent",
      fontWeight: active ? "700" : "400",
      fontSize: "0.9rem",
      transition: "all 0.2s",
    }),
  };

  return (
    <nav style={s.nav}>
      <div style={s.inner}>
        <Link to="/" style={s.logo}>
          🎬 CineLog
        </Link>
        <ul style={s.ul}>
          {links.map((l) => (
            <li key={l.path}>
              <Link to={l.path} style={s.link(location.pathname === l.path)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
