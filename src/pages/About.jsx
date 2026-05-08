import { useNavigate } from "react-router-dom";
import useMovieStore from "../store/useMovieStore";

function About() {
  const navigate = useNavigate();
  const { movies } = useMovieStore();

  const features = [
    {
      icon: "➕",
      title: "Tambah Film",
      desc: "Tambahkan film baru ke katalogmu",
    },
    {
      icon: "✏️",
      title: "Edit Film",
      desc: "Perbarui informasi film kapan saja",
    },
    { icon: "🗑️", title: "Hapus Film", desc: "Hapus film dari katalog" },
    {
      icon: "✅",
      title: "Tandai Ditonton",
      desc: "Catat film yang sudah ditonton",
    },
    {
      icon: "🔍",
      title: "Cari Film",
      desc: "Temukan film berdasarkan judul/sutradara",
    },
    {
      icon: "⭐",
      title: "Rating Film",
      desc: "Lihat dan urutkan berdasarkan rating",
    },
  ];

  const s = {
    page: {
      minHeight: "calc(100vh - 64px)",
      backgroundColor: "#0f0f1a",
      padding: "2rem",
    },
    inner: { maxWidth: "900px", margin: "0 auto" },
    hero: {
      background: "linear-gradient(135deg, #1a1a2e, #16213e)",
      borderRadius: "20px",
      padding: "3rem 2rem",
      textAlign: "center",
      marginBottom: "3rem",
      border: "1px solid #1f1f3a",
    },
    heroIcon: { fontSize: "4rem", display: "block", marginBottom: "1rem" },
    heroTitle: {
      fontSize: "2rem",
      fontWeight: "900",
      color: "#ffffff",
      margin: "0 0 1rem",
    },
    heroSub: {
      color: "#6b6b8a",
      maxWidth: "480px",
      margin: "0 auto",
      lineHeight: 1.7,
      fontSize: "0.95rem",
    },
    sectionTitle: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#e2b714",
      marginBottom: "1.5rem",
      paddingBottom: "0.5rem",
      borderBottom: "1px solid #1f1f3a",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "1rem",
      marginBottom: "3rem",
    },
    featureCard: {
      backgroundColor: "#16162a",
      borderRadius: "12px",
      padding: "1.25rem",
      border: "1px solid #1f1f3a",
      display: "flex",
      gap: "1rem",
      alignItems: "flex-start",
    },
    featureIcon: { fontSize: "1.75rem", flexShrink: 0 },
    featureTitle: {
      fontWeight: "700",
      fontSize: "0.9rem",
      color: "#ffffff",
      margin: "0 0 0.3rem",
    },
    featureDesc: { fontSize: "0.82rem", color: "#6b6b8a", margin: 0 },
    techGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1rem",
      marginBottom: "3rem",
    },
    techCard: {
      backgroundColor: "#16162a",
      borderRadius: "12px",
      padding: "1.25rem",
      textAlign: "center",
      border: "1px solid #1f1f3a",
    },
    techIcon: { fontSize: "2rem", display: "block", marginBottom: "0.5rem" },
    techName: {
      fontWeight: "700",
      color: "#e2b714",
      fontSize: "0.9rem",
      display: "block",
    },
    techDesc: { fontSize: "0.78rem", color: "#4a4a6a" },
    cta: {
      backgroundColor: "#16162a",
      borderRadius: "16px",
      padding: "2rem",
      textAlign: "center",
      border: "1px solid #e2b714",
    },
    ctaTitle: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "0.5rem",
    },
    ctaSub: { color: "#6b6b8a", marginBottom: "1.5rem", fontSize: "0.9rem" },
    ctaBtn: {
      padding: "0.8rem 2rem",
      backgroundColor: "#e2b714",
      color: "#0f0f1a",
      border: "none",
      borderRadius: "10px",
      fontWeight: "800",
      cursor: "pointer",
    },
  };

  const techStack = [
    { icon: "⚛️", name: "React", desc: "UI Library" },
    { icon: "🛣️", name: "React Router", desc: "Routing" },
    { icon: "🐻", name: "Zustand", desc: "State Management" },
    { icon: "⚡", name: "Vite", desc: "Build Tool" },
  ];

  return (
    <div style={s.page}>
      <div style={s.inner}>
        {/* Hero */}
        <div style={s.hero}>
          <span style={s.heroIcon}>🎬</span>
          <h1 style={s.heroTitle}>Tentang CineLog</h1>
          <p style={s.heroSub}>
            CineLog adalah aplikasi katalog film pribadi yang membantu kamu
            mencatat, mengelola, dan melacak film-film yang ingin atau sudah
            kamu tonton.
          </p>
        </div>

        {/* Fitur */}
        <h2 style={s.sectionTitle}>✨ Fitur Aplikasi</h2>
        <div style={s.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} style={s.featureCard}>
              <span style={s.featureIcon}>{f.icon}</span>
              <div>
                <p style={s.featureTitle}>{f.title}</p>
                <p style={s.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech */}
        <h2 style={s.sectionTitle}>🛠️ Teknologi</h2>
        <div style={s.techGrid}>
          {techStack.map((t, i) => (
            <div key={i} style={s.techCard}>
              <span style={s.techIcon}>{t.icon}</span>
              <span style={s.techName}>{t.name}</span>
              <span style={s.techDesc}>{t.desc}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={s.cta}>
          <p style={s.ctaTitle}>{movies.length} Film dalam katalog 🎉</p>
          <p style={s.ctaSub}>
            Sudah {movies.filter((m) => m.isWatched).length} film ditonton!
          </p>
          <button style={s.ctaBtn} onClick={() => navigate("/movies")}>
            🎬 Lihat Katalog
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
