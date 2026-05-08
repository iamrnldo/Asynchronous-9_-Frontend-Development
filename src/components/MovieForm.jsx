/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import useMovieStore from "../store/useMovieStore";

function MovieForm({ editData, onClose }) {
  const { addMovie, editMovie } = useMovieStore();
  const isEditing = !!editData;

  const [form, setForm] = useState({
    title: "",
    director: "",
    genre: "",
    year: new Date().getFullYear(),
    rating: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        director: editData.director,
        genre: editData.genre,
        year: editData.year,
        rating: editData.rating,
        description: editData.description,
      });
    }
  }, [editData]);

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Thriller",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Animasi",
  ];

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Judul wajib diisi";
    if (!form.director.trim()) e.director = "Sutradara wajib diisi";
    if (!form.genre) e.genre = "Genre wajib dipilih";
    if (!form.year || form.year < 1888 || form.year > 2100)
      e.year = "Tahun tidak valid";
    if (!form.rating || form.rating < 0 || form.rating > 10)
      e.rating = "Rating harus antara 0-10";
    if (!form.description.trim()) e.description = "Deskripsi wajib diisi";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (isEditing) {
      editMovie(editData.id, { ...form, rating: parseFloat(form.rating) });
    } else {
      addMovie({ ...form, rating: parseFloat(form.rating) });
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const s = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200,
      padding: "1rem",
    },
    modal: {
      backgroundColor: "#16162a",
      border: "1px solid #1f1f3a",
      borderRadius: "16px",
      padding: "2rem",
      width: "100%",
      maxWidth: "480px",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "1.5rem",
    },
    group: { marginBottom: "1rem" },
    label: {
      display: "block",
      fontSize: "0.82rem",
      fontWeight: "600",
      color: "#a0a0b0",
      marginBottom: "0.4rem",
    },
    input: (err) => ({
      width: "100%",
      padding: "0.6rem 0.8rem",
      borderRadius: "8px",
      border: `1.5px solid ${err ? "#ef4444" : "#2a2a4a"}`,
      backgroundColor: "#0f0f1a",
      color: "white",
      fontSize: "0.9rem",
      outline: "none",
      boxSizing: "border-box",
    }),
    error: { color: "#ef4444", fontSize: "0.78rem", marginTop: "0.3rem" },
    btnRow: { display: "flex", gap: "0.75rem", marginTop: "1.5rem" },
    btnSubmit: {
      flex: 1,
      padding: "0.7rem",
      backgroundColor: "#e2b714",
      color: "#0f0f1a",
      border: "none",
      borderRadius: "8px",
      fontWeight: "800",
      cursor: "pointer",
    },
    btnCancel: {
      flex: 1,
      padding: "0.7rem",
      backgroundColor: "#1f1f3a",
      color: "#a0a0b0",
      border: "none",
      borderRadius: "8px",
      fontWeight: "700",
      cursor: "pointer",
    },
  };

  const fields = [
    {
      name: "title",
      label: "Judul Film",
      type: "text",
      placeholder: "Judul film...",
    },
    {
      name: "director",
      label: "Sutradara",
      type: "text",
      placeholder: "Nama sutradara...",
    },
    { name: "year", label: "Tahun Rilis", type: "number", placeholder: "2024" },
    {
      name: "rating",
      label: "Rating (0-10)",
      type: "number",
      placeholder: "8.5",
    },
  ];

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={s.title}>
          {isEditing ? "✏️ Edit Film" : "➕ Tambah Film Baru"}
        </h2>
        <form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <div key={f.name} style={s.group}>
              <label style={s.label}>{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                value={form[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                style={s.input(!!errors[f.name])}
                step={f.name === "rating" ? "0.1" : undefined}
              />
              {errors[f.name] && <p style={s.error}>{errors[f.name]}</p>}
            </div>
          ))}

          {/* Genre */}
          <div style={s.group}>
            <label style={s.label}>Genre</label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              style={{ ...s.input(!!errors.genre), backgroundColor: "#0f0f1a" }}
            >
              <option value="">Pilih genre...</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.genre && <p style={s.error}>{errors.genre}</p>}
          </div>

          {/* Deskripsi */}
          <div style={s.group}>
            <label style={s.label}>Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Sinopsis singkat film..."
              rows={3}
              style={{
                ...s.input(!!errors.description),
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
            {errors.description && <p style={s.error}>{errors.description}</p>}
          </div>

          <div style={s.btnRow}>
            <button type="button" style={s.btnCancel} onClick={onClose}>
              Batal
            </button>
            <button type="submit" style={s.btnSubmit}>
              {isEditing ? "Simpan" : "Tambah Film"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieForm;
