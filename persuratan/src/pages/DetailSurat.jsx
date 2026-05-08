import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Send,
  Tag,
  Paperclip,
  AlertCircle,
  Archive,
  Trash2,
} from "lucide-react";
import useSupratStore from "../store/suratStore";

const DetailSurat = () => {
  const { id } = useParams(); // 🔥 Dynamic Route Parameter
  const navigate = useNavigate();
  const getSuratById = useSupratStore((state) => state.getSuratById);
  const arsipkanSurat = useSupratStore((state) => state.arsipkanSurat);
  const deleteSurat = useSupratStore((state) => state.deleteSurat);

  const surat = getSuratById(id);

  if (!surat) {
    return (
      <div className="page">
        <div className="empty-state">
          <FileText size={60} color="#d1d5db" />
          <h3>Surat Tidak Ditemukan</h3>
          <p>
            Surat dengan ID <strong>{id}</strong> tidak ditemukan
          </p>
          <Link
            to="/"
            className="btn-primary"
            style={{ display: "inline-flex", marginTop: "1rem" }}
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleArsip = () => {
    arsipkanSurat(surat.id);
    navigate("/arsip");
  };

  const handleDelete = () => {
    if (confirm("Yakin ingin menghapus surat ini?")) {
      deleteSurat(surat.id);
      navigate(surat.jenis === "masuk" ? "/surat-masuk" : "/surat-keluar");
    }
  };

  const infoItems = [
    {
      icon: <FileText size={18} />,
      label: "Nomor Surat",
      value: surat.nomor,
    },
    {
      icon: <Calendar size={18} />,
      label: "Tanggal",
      value: new Date(surat.tanggal).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      icon: surat.jenis === "masuk" ? <User size={18} /> : <Send size={18} />,
      label: surat.jenis === "masuk" ? "Pengirim" : "Tujuan",
      value: surat.jenis === "masuk" ? surat.pengirim : surat.tujuan,
    },
    {
      icon: <Tag size={18} />,
      label: "Prioritas",
      value: surat.prioritas,
      badge: true,
      badgeClass: `prioritas-badge ${surat.prioritas.toLowerCase()}`,
    },
    {
      icon: <AlertCircle size={18} />,
      label: "Status",
      value: surat.status,
      badge: true,
      badgeClass: `status-badge ${surat.status.toLowerCase().replace(/ /g, "-")}`,
    },
    {
      icon: <Paperclip size={18} />,
      label: "Lampiran",
      value: surat.lampiran,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="page-title">Detail Surat</h1>
            <p className="page-subtitle">
              <span className={`badge-jenis ${surat.jenis}`}>
                {surat.jenis === "masuk" ? "Surat Masuk" : "Surat Keluar"}
              </span>
            </p>
          </div>
        </div>
        <div className="header-actions">
          {surat.status !== "Diarsipkan" && (
            <button className="btn-secondary" onClick={handleArsip}>
              <Archive size={16} /> Arsipkan
            </button>
          )}
          <button className="btn-danger" onClick={handleDelete}>
            <Trash2 size={16} /> Hapus
          </button>
        </div>
      </div>

      <div className="detail-grid">
        {/* Info Card */}
        <div className="card detail-info">
          <div className="card-header">
            <h3 className="card-title">Informasi Surat</h3>
          </div>
          <div className="detail-info-list">
            {infoItems.map((item, i) => (
              <div key={i} className="detail-info-item">
                <div className="detail-info-icon">{item.icon}</div>
                <div className="detail-info-content">
                  <p className="detail-info-label">{item.label}</p>
                  {item.badge ? (
                    <span className={item.badgeClass}>{item.value}</span>
                  ) : (
                    <p className="detail-info-value">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="card detail-content">
          <div className="card-header">
            <h3 className="card-title">Perihal</h3>
          </div>
          <h2 className="perihal-text">{surat.perihal}</h2>

          <div className="card-header" style={{ marginTop: "1.5rem" }}>
            <h3 className="card-title">Isi Surat</h3>
          </div>
          <div className="surat-body">
            <p>Dengan hormat,</p>
            <p>{surat.isi}</p>
            <p>
              Demikian surat ini disampaikan, atas perhatian dan kerjasama yang
              baik kami ucapkan terima kasih.
            </p>
            <div className="surat-ttd">
              <p>Hormat kami,</p>
              <br />
              <br />
              <p>
                <strong>
                  {surat.jenis === "masuk" ? surat.pengirim : "Kepala Dinas"}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSurat;
