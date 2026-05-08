import { useNavigate, useLocation } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const suggestions = [
    { path: "/", label: "🏠 Home" },
    { path: "/movies", label: "🎬 Katalog Film" },
    { path: "/about", label: "ℹ️ Tentang CineLog" },
  ];

  const s = {
    page: {
      minHeight: "calc(100vh - 64px)",
      backgroundColor: "#0f0f1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    },
    container: {
      textAlign: "center",
      maxWidth: "480px",
      width: "100%",
    },
    code: {
      fontSize: "8rem",
      fontWeight: "900",
      color: "#1f1f3a",
      lineHeight: 1,
      display: "block",
    },
    icon: {
      fontSize: "3.5rem",
      display: "block",
      marginBottom: "1rem",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "800",
      color: "#ffffff",
      marginBottom: "0.75rem",
    },
    sub: {
      color: "#6b6b8a",
      fontSize: "0.9rem",
      marginBottom: "0.5rem",
    },
    pathTag: {
      display: "inline-block",
      backgroundColor: "#2a0000",
      color: "#f87171",
      fontFamily: "monospace",
      fontSize: "0.85rem",
      padding: "4px 12px",
      borderRadius: "8px",
      marginBottom: "2rem",
      border: "1px solid #3a0000",
    },
    divider: { borderTop: "1px solid #1f1f3a", margin: "1.5rem 0" },
    suggLabel: {
      fontSize: "0.78rem",
      color: "#4a4a6a",
      marginBottom: "1rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    suggList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      marginBottom: "1.5rem",
    },
    suggBtn: {
      padding: "0.7rem 1rem",
      backgroundColor: "#16162a",
      color: "#a0a0b0",
      border: "1px solid #2a2a4a",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "0.9rem",
      textAlign: "left",
    },
    homeBtn: {
      width: "100%",
      padding: "0.85rem",
      backgroundColor: "#e2b714",
      color: "#0f0f1a",
      border: "none",
      borderRadius: "12px",
      fontWeight: "800",
      fontSize: "1rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={s.page}>
      <div style={s.container}>
        <span style={s.code}>404</span>
        <span style={s.icon}>🎞️</span>
        <h1 style={s.title}>Halaman Tidak Ditemukan</h1>
        <p style={s.sub}>
          Sepertinya film yang kamu cari tidak ada dalam katalog kami.
        </p>
        <span style={s.pathTag}>❌ {location.pathname}</span>

        <div style={s.divider} />

        <p style={s.suggLabel}>Mungkin kamu mencari</p>
        <div style={s.suggList}>
          {suggestions.map((sg) => (
            <button
              key={sg.path}
              style={s.suggBtn}
              onClick={() => navigate(sg.path)}
            >
              {sg.label}
            </button>
          ))}
        </div>

        <button style={s.homeBtn} onClick={() => navigate("/")}>
          🏠 Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

export default NotFound;
