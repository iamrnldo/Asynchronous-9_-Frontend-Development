import { useNavigate } from "react-router-dom";
import useMovieStore from "../store/useMovieStore";

function MovieCard({ movie, onEdit }) {
  const { deleteMovie, toggleWatched } = useMovieStore();
  const navigate = useNavigate();

  const genreColors = {
    "Sci-Fi": { bg: "#1a1a4e", color: "#818cf8" },
    Thriller: { bg: "#1a2e1a", color: "#4ade80" },
    Action: { bg: "#2e1a1a", color: "#f87171" },
    Drama: { bg: "#2e2a1a", color: "#fbbf24" },
    Horror: { bg: "#1f1a2e", color: "#c084fc" },
    Comedy: { bg: "#1a2e2e", color: "#34d399" },
    Romance: { bg: "#2e1a2e", color: "#f472b6" },
  };

  const genreStyle = genreColors[movie.genre] || {
    bg: "#1f1f2e",
    color: "#a0a0b0",
  };

  const s = {
    card: {
      backgroundColor: "#16162a",
      borderRadius: "14px",
      overflow: "hidden",
      border: "1px solid #1f1f3a",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    },
    posterWrap: {
      position: "relative",
      cursor: "pointer",
    },
    poster: {
      width: "100%",
      height: "260px",
      objectFit: "cover",
      display: "block",
    },
    watchedBadge: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: movie.isWatched ? "#059669" : "#374151",
      color: "white",
      fontSize: "0.7rem",
      fontWeight: "700",
      padding: "3px 10px",
      borderRadius: "20px",
    },
    ratingBadge: {
      position: "absolute",
      top: "10px",
      left: "10px",
      backgroundColor: "#e2b714",
      color: "#0f0f1a",
      fontSize: "0.75rem",
      fontWeight: "800",
      padding: "3px 8px",
      borderRadius: "8px",
    },
    body: {
      padding: "1rem",
    },
    genre: {
      display: "inline-block",
      backgroundColor: genreStyle.bg,
      color: genreStyle.color,
      fontSize: "0.72rem",
      fontWeight: "700",
      padding: "3px 10px",
      borderRadius: "20px",
      marginBottom: "0.5rem",
    },
    title: {
      fontSize: "1rem",
      fontWeight: "700",
      color: "#ffffff",
      margin: "0 0 0.25rem",
      cursor: "pointer",
    },
    director: {
      fontSize: "0.82rem",
      color: "#6b6b8a",
      margin: "0 0 0.25rem",
    },
    year: {
      fontSize: "0.78rem",
      color: "#4a4a6a",
      margin: "0 0 1rem",
    },
    actions: {
      display: "flex",
      gap: "0.4rem",
    },
    btn: (bg, color) => ({
      flex: 1,
      padding: "0.4rem 0.3rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.75rem",
      fontWeight: "700",
      backgroundColor: bg,
      color: color,
    }),
  };

  const handleDelete = () => {
    if (window.confirm(`Hapus film "${movie.title}"?`)) {
      deleteMovie(movie.id);
    }
  };

  return (
    <div style={s.card}>
      <div style={s.posterWrap} onClick={() => navigate(`/movies/${movie.id}`)}>
        <img src={movie.poster} alt={movie.title} style={s.poster} />
        <span style={s.ratingBadge}>⭐ {movie.rating}</span>
        <span style={s.watchedBadge}>
          {movie.isWatched ? "✓ Ditonton" : "Belum"}
        </span>
      </div>
      <div style={s.body}>
        <span style={s.genre}>{movie.genre}</span>
        <p style={s.title} onClick={() => navigate(`/movies/${movie.id}`)}>
          {movie.title}
        </p>
        <p style={s.director}>🎥 {movie.director}</p>
        <p style={s.year}>📅 {movie.year}</p>
        <div style={s.actions}>
          <button
            style={s.btn(
              movie.isWatched ? "#1f1f3a" : "#064e3b",
              movie.isWatched ? "#6b6b8a" : "#34d399",
            )}
            onClick={() => toggleWatched(movie.id)}
          >
            {movie.isWatched ? "↩ Batal" : "✓ Tonton"}
          </button>
          <button
            style={s.btn("#2a2000", "#fbbf24")}
            onClick={() => onEdit(movie)}
          >
            ✏️ Edit
          </button>
          <button style={s.btn("#2a0000", "#f87171")} onClick={handleDelete}>
            🗑️ Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
