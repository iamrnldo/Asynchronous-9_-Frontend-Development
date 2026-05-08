import { useState } from "react";
import useMovieStore from "../store/useMovieStore";
import MovieCard from "../components/MovieCard";
import MovieForm from "../components/MovieForm";

function Movies() {
  const { movies } = useMovieStore();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const handleEdit = (movie) => {
    setEditData(movie);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditData(null);
  };

  let filtered = movies.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.director.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "watched" && m.isWatched) ||
      (filter === "unwatched" && !m.isWatched);
    return matchSearch && matchFilter;
  });

  if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "year") {
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  } else if (sortBy === "title") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }

  const s = {
    page: {
      minHeight: "calc(100vh - 64px)",
      backgroundColor: "#0f0f1a",
      padding: "2rem",
    },
    inner: { maxWidth: "1100px", margin: "0 auto" },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    h1: { fontSize: "1.8rem", fontWeight: "800", color: "#ffffff", margin: 0 },
    btnAdd: {
      padding: "0.65rem 1.5rem",
      backgroundColor: "#e2b714",
      color: "#0f0f1a",
      border: "none",
      borderRadius: "10px",
      fontWeight: "800",
      cursor: "pointer",
      fontSize: "0.9rem",
    },
    controls: {
      display: "flex",
      gap: "0.75rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
    },
    searchInput: {
      flex: 1,
      minWidth: "180px",
      padding: "0.6rem 1rem",
      borderRadius: "10px",
      border: "1.5px solid #2a2a4a",
      backgroundColor: "#16162a",
      color: "white",
      fontSize: "0.9rem",
      outline: "none",
    },
    select: {
      padding: "0.6rem 1rem",
      borderRadius: "10px",
      border: "1.5px solid #2a2a4a",
      backgroundColor: "#16162a",
      color: "#a0a0b0",
      fontSize: "0.9rem",
      outline: "none",
      cursor: "pointer",
    },
    filterGroup: { display: "flex", gap: "0.4rem", flexWrap: "wrap" },
    filterBtn: (active) => ({
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: active ? "700" : "500",
      fontSize: "0.82rem",
      backgroundColor: active ? "#e2b714" : "#16162a",
      color: active ? "#0f0f1a" : "#6b6b8a",
      transition: "all 0.2s",
    }),
    info: { color: "#4a4a6a", fontSize: "0.82rem", marginBottom: "1rem" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "1.5rem",
    },
    empty: {
      textAlign: "center",
      padding: "4rem",
      color: "#4a4a6a",
    },
    emptyIcon: { fontSize: "4rem", display: "block", marginBottom: "1rem" },
  };

  return (
    <div style={s.page}>
      <div style={s.inner}>
        {/* Header */}
        <div style={s.header}>
          <h1 style={s.h1}>🎬 Katalog Film</h1>
          <button style={s.btnAdd} onClick={() => setShowForm(true)}>
            ➕ Tambah Film
          </button>
        </div>

        {/* Controls */}
        <div style={s.controls}>
          <input
            style={s.searchInput}
            type="text"
            placeholder="🔍 Cari film atau sutradara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            style={s.select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Urutkan...</option>
            <option value="rating">⭐ Rating Tertinggi</option>
            <option value="year">📅 Tahun Terbaru</option>
            <option value="title">🔤 Judul A-Z</option>
          </select>
        </div>

        {/* Filter */}
        <div style={{ ...s.filterGroup, marginBottom: "1rem" }}>
          {[
            { key: "all", label: "📋 Semua" },
            { key: "watched", label: "✅ Ditonton" },
            { key: "unwatched", label: "📌 Belum Ditonton" },
          ].map((f) => (
            <button
              key={f.key}
              style={s.filterBtn(filter === f.key)}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p style={s.info}>
          Menampilkan {filtered.length} dari {movies.length} film
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={s.empty}>
            <span style={s.emptyIcon}>🎞️</span>
            <p style={{ color: "#6b6b8a", fontWeight: "600" }}>
              Tidak ada film ditemukan
            </p>
          </div>
        ) : (
          <div style={s.grid}>
            {filtered.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>

      {showForm && <MovieForm editData={editData} onClose={handleClose} />}
    </div>
  );
}

export default Movies;
