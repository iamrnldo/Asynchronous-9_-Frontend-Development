import { Link } from "react-router-dom";
import {
  MailOpen,
  Send,
  Archive,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import useSupratStore from "../store/suratStore";

const Dashboard = () => {
  const suratMasuk = useSupratStore((state) => state.suratMasuk);
  const suratKeluar = useSupratStore((state) => state.suratKeluar);
  const arsip = useSupratStore((state) => state.arsip);

  const belumDibaca = suratMasuk.filter(
    (s) => s.status === "Belum Dibaca",
  ).length;
  const suratTinggi = [...suratMasuk, ...suratKeluar].filter(
    (s) => s.prioritas === "Tinggi",
  ).length;

  const recentSurat = [...suratMasuk, ...suratKeluar]
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .slice(0, 5);

  const stats = [
    {
      label: "Total Surat Masuk",
      value: suratMasuk.length,
      icon: <MailOpen size={28} />,
      color: "#4f46e5",
      bg: "#eef2ff",
      link: "/surat-masuk",
    },
    {
      label: "Total Surat Keluar",
      value: suratKeluar.length,
      icon: <Send size={28} />,
      color: "#0891b2",
      bg: "#ecfeff",
      link: "/surat-keluar",
    },
    {
      label: "Belum Dibaca",
      value: belumDibaca,
      icon: <AlertCircle size={28} />,
      color: "#ef4444",
      bg: "#fef2f2",
      link: "/surat-masuk",
    },
    {
      label: "Total Arsip",
      value: arsip.length,
      icon: <Archive size={28} />,
      color: "#6b7280",
      bg: "#f9fafb",
      link: "/arsip",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Selamat datang di Sistem Persuratan —{" "}
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <Link
            to={stat.link}
            key={i}
            className="stat-card"
            style={{ textDecoration: "none" }}
          >
            <div className="stat-card-inner">
              <div
                className="stat-icon"
                style={{ background: stat.bg, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <h2 className="stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </h2>
              </div>
            </div>
            <div className="stat-footer">
              <TrendingUp size={14} />
              <span>Lihat detail</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Recent Surat */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Surat Terbaru</h3>
            <Clock size={18} color="#6b7280" />
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nomor Surat</th>
                  <th>Perihal</th>
                  <th>Jenis</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {recentSurat.map((surat) => (
                  <tr key={surat.id}>
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
                      <span
                        className={`status-badge ${surat.status.toLowerCase().replace(" ", "-")}`}
                      >
                        {surat.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/surat/${surat.id}`} className="btn-link">
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Panel */}
        <div className="card info-panel">
          <div className="card-header">
            <h3 className="card-title">Ringkasan</h3>
            <CheckCircle size={18} color="#10b981" />
          </div>
          <div className="info-list">
            <div className="info-item urgent">
              <AlertCircle size={16} />
              <div>
                <p className="info-title">Prioritas Tinggi</p>
                <p className="info-value">{suratTinggi} surat</p>
              </div>
            </div>
            <div className="info-item">
              <MailOpen size={16} />
              <div>
                <p className="info-title">Belum Dibaca</p>
                <p className="info-value">{belumDibaca} surat masuk</p>
              </div>
            </div>
            <div className="info-item">
              <Send size={16} />
              <div>
                <p className="info-title">Draft</p>
                <p className="info-value">
                  {suratKeluar.filter((s) => s.status === "Draft").length} surat
                  keluar
                </p>
              </div>
            </div>
            <div className="info-item">
              <Archive size={16} />
              <div>
                <p className="info-title">Diarsipkan</p>
                <p className="info-value">{arsip.length} surat</p>
              </div>
            </div>
          </div>

          <div className="quick-links">
            <p className="quick-title">Akses Cepat</p>
            <Link to="/surat-masuk" className="quick-btn masuk">
              + Tambah Surat Masuk
            </Link>
            <Link to="/surat-keluar" className="quick-btn keluar">
              + Tambah Surat Keluar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
