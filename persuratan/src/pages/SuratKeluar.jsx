import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Archive, Trash2, X, Send } from "lucide-react";
import useSupratStore from "../store/suratStore";

const SuratKeluar = () => {
  const suratKeluar = useSupratStore((state) => state.suratKeluar);
  const addSuratKeluar = useSupratStore((state) => state.addSuratKeluar);
  const arsipkanSurat = useSupratStore((state) => state.arsipkanSurat);
  const deleteSurat = useSupratStore((state) => state.deleteSurat);
  const notification = useSupratStore((state) => state.notification);
  const clearNotification = useSupratStore((state) => state.clearNotification);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [form, setForm] = useState({
    nomor: "",
    perihal: "",
    tujuan: "",
    tanggal: "",
    prioritas: "Normal",
    isi: "",
    lampiran: "-",
  });

  const filtered = suratKeluar.filter((s) => {
    const matchSearch =
      s.perihal.toLowerCase().includes(search.toLowerCase()) ||
      s.nomor.toLowerCase().includes(search.toLowerCase()) ||
      s.tujuan.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterStatus === "Semua" || s.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addSuratKeluar(form);
    setForm({
      nomor: "",
      perihal: "",
      tujuan: "",
      tanggal: "",
      prioritas: "Normal",
      isi: "",
      lampiran: "-",
    });
    setShowModal(false);
    setTimeout(clearNotification, 3000);
  };

  return (
    <div className="page">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button onClick={clearNotification}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">Surat Keluar</h1>
          <p className="page-subtitle">
            Total {suratKeluar.length} surat keluar
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Tambah Surat
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Cari surat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          {["Semua", "Draft", "Terkirim"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filterStatus === f ? "active" : ""}`}
              onClick={() => setFilterStatus(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nomor Surat</th>
                <th>Perihal</th>
                <th>Tujuan</th>
                <th>Tanggal</th>
                <th>Prioritas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#6b7280",
                    }}
                  >
                    Tidak ada data surat
                  </td>
                </tr>
              ) : (
                filtered.map((surat, index) => (
                  <tr key={surat.id}>
                    <td>{index + 1}</td>
                    <td className="font-mono">{surat.nomor}</td>
                    <td>{surat.perihal}</td>
                    <td>{surat.tujuan}</td>
                    <td>
                      {new Date(surat.tanggal).toLocaleDateString("id-ID")}
                    </td>
                    <td>
                      <span
                        className={`prioritas-badge ${surat.prioritas.toLowerCase()}`}
                      >
                        {surat.prioritas}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${surat.status === "Draft" ? "draft" : "terkirim"}`}
                      >
                        {surat.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <Link
                          to={`/surat/${surat.id}`}
                          className="btn-action view"
                          title="Lihat"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          className="btn-action archive"
                          onClick={() => {
                            arsipkanSurat(surat.id);
                            setTimeout(clearNotification, 3000);
                          }}
                          title="Arsipkan"
                        >
                          <Archive size={15} />
                        </button>
                        <button
                          className="btn-action delete"
                          onClick={() => {
                            if (confirm("Hapus surat ini?")) {
                              deleteSurat(surat.id);
                              setTimeout(clearNotification, 3000);
                            }
                          }}
                          title="Hapus"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah Surat Keluar</h3>
              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nomor Surat *</label>
                  <input
                    required
                    value={form.nomor}
                    onChange={(e) =>
                      setForm({ ...form, nomor: e.target.value })
                    }
                    placeholder="SK/2024/XXX"
                  />
                </div>
                <div className="form-group">
                  <label>Tanggal *</label>
                  <input
                    type="date"
                    required
                    value={form.tanggal}
                    onChange={(e) =>
                      setForm({ ...form, tanggal: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Perihal *</label>
                <input
                  required
                  value={form.perihal}
                  onChange={(e) =>
                    setForm({ ...form, perihal: e.target.value })
                  }
                  placeholder="Perihal surat"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tujuan *</label>
                  <input
                    required
                    value={form.tujuan}
                    onChange={(e) =>
                      setForm({ ...form, tujuan: e.target.value })
                    }
                    placeholder="Nama tujuan"
                  />
                </div>
                <div className="form-group">
                  <label>Prioritas</label>
                  <select
                    value={form.prioritas}
                    onChange={(e) =>
                      setForm({ ...form, prioritas: e.target.value })
                    }
                  >
                    <option>Normal</option>
                    <option>Tinggi</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Isi Surat *</label>
                <textarea
                  required
                  rows={3}
                  value={form.isi}
                  onChange={(e) => setForm({ ...form, isi: e.target.value })}
                  placeholder="Isi ringkas surat..."
                />
              </div>
              <div className="form-group">
                <label>Lampiran</label>
                <input
                  value={form.lampiran}
                  onChange={(e) =>
                    setForm({ ...form, lampiran: e.target.value })
                  }
                  placeholder="nama_file.pdf"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={16} /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuratKeluar;
