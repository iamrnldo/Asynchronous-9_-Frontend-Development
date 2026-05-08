import { useParams, useNavigate } from "react-router-dom";
import useMovieStore from "../store/useMovieStore";

function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { getMovieById, toggleWatched, deleteMovie } = useMovieStore();

  const movie = getMovieById(movieId);

  const s = {
    page: {
      minHeight: "calc(100vh - 64px)",
      backgroundColor: "#0f0f1a",
      padding: "2rem",
    },
    inner: { maxWidth: "800px", margin: "0 auto" },
    backBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#e2b714",
      background: "rgba(226,183,20,0.1)",
      border: "none",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "600",
      marginBottom: "1.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
    },
    notFound: {
      textAlign: "center",
      padding: "5rem 2rem",
      color: "#6b6b8a",
    },
    nfIcon: { fontSize: "5rem", display: "block", marginBottom: "1rem" },
    nfTitle: { fontSize: "1.5rem", fontWeight: "700", color: "#ffffff" },
    nfBtn: {
      marginTop: "1.5rem",
      padding: "0.7rem 1.5rem",
      backgroundColor: "#e2b714",
      color: "#0f0f1a",
      border: "none",
      borderRadius: "10px",
      fontWeight: "800",
      cursor: "pointer",
      display: "inline-block",
    },
    card: {
      backgroundColor: "#16162a",
      borderRadius: "20px",
      overflow: "hidden",
      border: "1px solid #1f1f3a",
    },
    topSection: {
      display: "flex",
      gap: "2rem",
      padding: "2rem",
      flexWrap: "wrap",
    },
    poster: {
      width: "180px",
      height: "260px",
      objectFit: "cover",
      borderRadius: "12px",
      flexShrink: 0,
      boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    },
    info: { flex: 1, minWidth: "200px" },
    badgeRow: {
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap",
      marginBottom: "0.75rem",
    },
    watchedBadge: (isWatched) => ({
      backgroundColor: isWatched ? "#064e3b" : "#292524",
      color: isWatched ? "#34d399" : "#78716c",
      fontSize: "0.75rem",
      fontWeight: "700",
      padding: "4px 12px",
      borderRadius: "20px",
    }),
    genreBadge: {
      backgroundColor: "#1a1a4e",
      color: "#818cf8",
      fontSize: "0.75rem",
      fontWeight: "700",
      padding: "4px 12px",
      borderRadius: "20px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "900",
      color: "#ffffff",
      margin: "0 0 0.5rem",
      lineHeight: 1.2,
    },
    director: { color: "#6b6b8a", fontSize: "1rem", margin: "0 0 0.5rem" },
    metaRow: {
      display: "flex",
      gap: "1.5rem",
      margin: "1rem 0",
      flexWrap: "wrap",
    },
    metaItem: { textAlign: "center" },
    metaVal: {
      fontSize: "1.5rem",
      fontWeight: "800",
      color: "#e2b714",
      display: "block",
    },
    metaLabel: { fontSize: "0.75rem", color: "#4a4a6a" },
    idTag: {
      fontFamily: "monospace",
      fontSize: "0.75rem",
      color: "#4a4a6a",
      backgroundColor: "#0f0f1a",
      padding: "3px 10px",
      borderRadius: "6px",
      border: "1px solid #1f1f3a",
      display: "inline-block",
    },
    descSection: {
      padding: "1.5rem 2rem",
      borderTop: "1px solid #1f1f3a",
    },
    descTitle: {
      fontSize: "0.9rem",
      fontWeight: "700",
      color: "#a0a0b0",
      marginBottom: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    desc: {
      color: "#6b6b8a",
      lineHeight: 1.8,
      fontSize: "0.95rem",
    },
    actionSection: {
      padding: "1.5rem 2rem",
      borderTop: "1px solid #1f1f3a",
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
    },
    btnWatch: (isWatched) => ({
      flex: 1,
      minWidth: "140px",
      padding: "0.75rem",
      backgroundColor: isWatched ? "#1f1f3a" : "#064e3b",
      color: isWatched ? "#6b6b8a" : "#34d399",
      border: "none",
      borderRadius: "10px",
      fontWeight: "700",
      cursor: "pointer",
    }),
    btnDelete: {
      flex: 1,
      minWidth: "140px",
      padding: "0.75rem",
      backgroundColor: "#2a0000",
      color: "#f87171",
      border: "none",
      borderRadius: "10px",
      fontWeight: "700",
      cursor: "pointer",
    },
    btnBack: {
      flex: 1,
      minWidth: "140px",
      padding: "0.75rem",
      backgroundColor: "#1f1f3a",
      color: "#a0a0b0",
      border: "none",
      borderRadius: "10px",
      fontWeight: "700",
      cursor: "pointer",
    },
  };

  if (!movie) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <div style={s.notFound}>
            <span style={s.nfIcon}>🎞️</span>
            <h2 style={s.nfTitle}>Film Tidak Ditemukan</h2>
            <p>Film dengan ID "{movieId}" tidak ada dalam katalog.</p>
            <button style={s.nfBtn} onClick={() => navigate("/movies")}>
              ← Kembali ke Katalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Hapus film "${movie.title}"?`)) {
      deleteMovie(movie.id);
      navigate("/movies");
    }
  };

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <button style={s.backBtn} onClick={() => navigate("/movies")}>
          ← Kembali ke Katalog
        </button>

        <div style={s.card}>
          {/* Top */}
          <div style={s.topSection}>
            <img src={movie.poster} alt={movie.title} style={s.poster} />
            <div style={s.info}>
              <div style={s.badgeRow}>
                <span style={s.watchedBadge(movie.isWatched)}>
                  {movie.isWatched ? "✅ Sudah Ditonton" : "📌 Belum Ditonton"}
                </span>
                <span style={s.genreBadge}>{movie.genre}</span>
              </div>
              <h1 style={s.title}>{movie.title}</h1>
              <p style={s.director}>🎥 {movie.director}</p>

              <div style={s.metaRow}>
                <div style={s.metaItem}>
                  <span style={s.metaVal}>⭐ {movie.rating}</span>
                  <span style={s.metaLabel}>Rating</span>
                </div>
                <div style={s.metaItem}>
                  <span style={s.metaVal}>{movie.year}</span>
                  <span style={s.metaLabel}>Tahun</span>
                </div>
              </div>

              <span style={s.idTag}>ID: {movie.id}</span>
            </div>
          </div>

          {/* Deskripsi */}
          <div style={s.descSection}>
            <p style={s.descTitle}>📝 Sinopsis</p>
            <p style={s.desc}>{movie.description}</p>
          </div>

          {/* Actions */}
          <div style={s.actionSection}>
            <button
              style={s.btnWatch(movie.isWatched)}
              onClick={() => toggleWatched(movie.id)}
            >
              {movie.isWatched ? "↩ Belum Ditonton" : "✅ Tandai Ditonton"}
            </button>
            <button style={s.btnDelete} onClick={handleDelete}>
              🗑️ Hapus Film
            </button>
            <button style={s.btnBack} onClick={() => navigate("/movies")}>
              🎬 Ke Katalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
