import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, Eye, Trash2, X, Archive } from "lucide-react";
import useSupratStore from "../store/suratStore";

const Arsip = () => {
  const arsip = useSupratStore((state) => state.arsip);
  const deleteSurat = useSupratStore((state) => state.deleteSurat);
  const notification = useSupratStore((state) => state.notification);
  const clearNotification = useSupratStore((state) => state.clearNotification);
  const [search, setSearch] = useState("");

  const filtered = arsip.filter(
    (s) =>
      s.perihal.toLowerCase().includes(search.toLowerCase()) ||
      s.nomor.toLowerCase().includes(search.toLowerCase()),
  );

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
          <h1 className="page-title">Arsip Surat</h1>
          <p className="page-subtitle">Total {arsip.length} surat diarsipkan</p>
        </div>
      </div>

      {arsip.length === 0 ? (
        <div className="empty-state">
          <Archive size={60} color="#d1d5db" />
          <h3>Belum Ada Arsip</h3>
          <p>Surat yang diarsipkan akan muncul di sini</p>
        </div>
      ) : (
        <>
          <div className="filter-bar">
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Cari arsip..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
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
                    <th>Jenis</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((surat, index) => (
                    <tr key={surat.id}>
                      <td>{index + 1}</td>
                      <td className="font-mono">{surat.nomor}</td>
                      <td>{surat.perihal}</td>
                      <td>
                        <span className={`badge-jenis ${surat.jenis}`}>
                          {surat.jenis === "masuk" ? "Masuk" : "Keluar"}
                        </span>
                      </td>
                      <td>
                        {new Date(surat.tanggal).toLocaleDateString("id-ID")}
                      </td>
                      <td>
                        <div className="action-btns">
                          <Link
                            to={`/surat/${surat.id}`}
                            className="btn-action view"
                          >
                            <Eye size={15} />
                          </Link>
                          <button
                            className="btn-action delete"
                            onClick={() => {
                              if (confirm("Hapus arsip ini?")) {
                                deleteSurat(surat.id);
                                setTimeout(clearNotification, 3000);
                              }
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Arsip;
