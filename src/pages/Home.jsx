import { useNavigate } from "react-router-dom";
import useMovieStore from "../store/useMovieStore";

function Home() {
  const navigate = useNavigate();
  const { movies } = useMovieStore();

  const total = movies.length;
  const watched = movies.filter((m) => m.isWatched).length;
  const avgRating =
    total > 0
      ? (movies.reduce((a, m) => a + m.rating, 0) / total).toFixed(1)
      : "0.0";

  const s = {
    page: {
      minHeight: "calc(100vh - 64px)",
      backgroundColor: "#0f0f1a",
    },
    hero: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "5rem 2rem 3rem",
      textAlign: "center",
    },
    emoji: {
      fontSize: "5rem",
      display: "block",
      marginBottom: "1rem",
    },
    h1: {
      fontSize: "3rem",
      fontWeight: "900",
      color: "#ffffff",
      margin: "0 0 0.5rem",
    },
    highlight: { color: "#e2b714" },
    sub: {
      color: "#6b6b8a",
      fontSize: "1.1rem",
      maxWidth: "480px",
      margin: "1rem auto 2.5rem",
      lineHeight: 1.7,
    },
    btnRow: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    btnPrimary: {
      padding: "0.9rem 2.5rem",
      backgroundColor: "#e2b714",
      color: "#0f0f1a",
      border: "none",
      borderRadius: "12px",
      fontWeight: "800",
      fontSize: "1rem",
      cursor: "pointer",
    },
    btnSecondary: {
      padding: "0.9rem 2.5rem",
      backgroundColor: "transparent",
      color: "#a0a0b0",
      border: "2px solid #2a2a4a",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "1rem",
      cursor: "pointer",
    },
    statsSection: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "0 2rem 5rem",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1.5rem",
    },
    statCard: {
      backgroundColor: "#16162a",
      borderRadius: "16px",
      padding: "2rem",
      textAlign: "center",
      border: "1px solid #1f1f3a",
    },
    statNum: {
      fontSize: "3rem",
      fontWeight: "900",
      color: "#e2b714",
      display: "block",
      lineHeight: 1,
      marginBottom: "0.5rem",
    },
    statLabel: {
      color: "#6b6b8a",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <span style={s.emoji}>🎬</span>
        <h1 style={s.h1}>
          Selamat Datang di <span style={s.highlight}>CineLog</span>
        </h1>
        <p style={s.sub}>
          Catat, kelola, dan lacak film favoritmu. Tandai film yang sudah
          ditonton dan temukan film baru untuk ditonton.
        </p>
        <div style={s.btnRow}>
          <button style={s.btnPrimary} onClick={() => navigate("/movies")}>
            🎥 Lihat Katalog Film
          </button>
          <button style={s.btnSecondary} onClick={() => navigate("/about")}>
            ℹ️ Tentang CineLog
          </button>
        </div>
      </div>

      <div style={s.statsSection}>
        <div style={s.statsGrid}>
          {[
            { num: total, label: "🎬 Total Film" },
            { num: watched, label: "✅ Sudah Ditonton" },
            { num: avgRating, label: "⭐ Rata-rata Rating" },
          ].map((stat, i) => (
            <div key={i} style={s.statCard}>
              <span style={s.statNum}>{stat.num}</span>
              <span style={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
