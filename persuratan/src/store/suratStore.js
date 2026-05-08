import { create } from "zustand";

const initialSuratMasuk = [
  {
    id: 1,
    nomor: "SM/2024/001",
    perihal: "Undangan Rapat Koordinasi",
    pengirim: "Kementerian Dalam Negeri",
    tanggal: "2024-01-15",
    status: "Belum Dibaca",
    prioritas: "Tinggi",
    isi: "Mengundang untuk hadir dalam rapat koordinasi nasional yang akan dilaksanakan pada tanggal 20 Januari 2024 di Jakarta.",
    lampiran: "undangan_rapat.pdf",
    jenis: "masuk",
  },
  {
    id: 2,
    nomor: "SM/2024/002",
    perihal: "Permohonan Data Statistik",
    pengirim: "BPS Pusat",
    tanggal: "2024-01-18",
    status: "Sudah Dibaca",
    prioritas: "Normal",
    isi: "Memohon kesediaan untuk memberikan data statistik tahunan sesuai format yang telah disediakan.",
    lampiran: "format_data.xlsx",
    jenis: "masuk",
  },
  {
    id: 3,
    nomor: "SM/2024/003",
    perihal: "Laporan Keuangan Triwulan",
    pengirim: "Dinas Keuangan",
    tanggal: "2024-01-20",
    status: "Belum Dibaca",
    prioritas: "Tinggi",
    isi: "Menyampaikan laporan keuangan triwulan pertama tahun 2024 untuk diperiksa dan ditandatangani.",
    lampiran: "laporan_keuangan.pdf",
    jenis: "masuk",
  },
  {
    id: 4,
    nomor: "SM/2024/004",
    perihal: "Surat Pernyataan Kerjasama",
    pengirim: "PT Maju Bersama",
    tanggal: "2024-01-22",
    status: "Sudah Dibaca",
    prioritas: "Normal",
    isi: "Menyampaikan surat pernyataan kerjasama dalam bidang pengembangan teknologi informasi.",
    lampiran: "pernyataan_kerjasama.pdf",
    jenis: "masuk",
  },
];

const initialSuratKeluar = [
  {
    id: 5,
    nomor: "SK/2024/001",
    perihal: "Balasan Undangan Rapat",
    tujuan: "Kementerian Dalam Negeri",
    tanggal: "2024-01-16",
    status: "Terkirim",
    prioritas: "Tinggi",
    isi: "Menyatakan kesanggupan hadir dalam rapat koordinasi nasional yang akan dilaksanakan pada tanggal 20 Januari 2024.",
    lampiran: "-",
    jenis: "keluar",
  },
  {
    id: 6,
    nomor: "SK/2024/002",
    perihal: "Permohonan Anggaran Tambahan",
    tujuan: "Biro Keuangan",
    tanggal: "2024-01-19",
    status: "Terkirim",
    prioritas: "Normal",
    isi: "Mengajukan permohonan anggaran tambahan untuk kegiatan operasional bulan Februari 2024.",
    lampiran: "proposal_anggaran.pdf",
    jenis: "keluar",
  },
  {
    id: 7,
    nomor: "SK/2024/003",
    perihal: "Surat Tugas Perjalanan Dinas",
    tujuan: "Internal",
    tanggal: "2024-01-21",
    status: "Draft",
    prioritas: "Normal",
    isi: "Menugaskan kepada yang bersangkutan untuk melakukan perjalanan dinas ke Surabaya dalam rangka monitoring program kerja.",
    lampiran: "surat_tugas.docx",
    jenis: "keluar",
  },
];

const useSupratStore = create((set, get) => ({
  suratMasuk: initialSuratMasuk,
  suratKeluar: initialSuratKeluar,
  arsip: [],
  searchQuery: "",
  filterStatus: "Semua",
  notification: null,

  // Get all surat
  getAllSurat: () => {
    const { suratMasuk, suratKeluar } = get();
    return [...suratMasuk, ...suratKeluar];
  },

  // Get surat by ID
  getSuratById: (id) => {
    const { suratMasuk, suratKeluar, arsip } = get();
    const allSurat = [...suratMasuk, ...suratKeluar, ...arsip];
    return allSurat.find((s) => s.id === parseInt(id));
  },

  // Set search query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Set filter status
  setFilterStatus: (status) => set({ filterStatus: status }),

  // Add Surat Masuk
  addSuratMasuk: (surat) =>
    set((state) => ({
      suratMasuk: [
        ...state.suratMasuk,
        {
          ...surat,
          id: Date.now(),
          jenis: "masuk",
          status: "Belum Dibaca",
        },
      ],
      notification: {
        type: "success",
        message: "Surat masuk berhasil ditambahkan!",
      },
    })),

  // Add Surat Keluar
  addSuratKeluar: (surat) =>
    set((state) => ({
      suratKeluar: [
        ...state.suratKeluar,
        {
          ...surat,
          id: Date.now(),
          jenis: "keluar",
          status: "Draft",
        },
      ],
      notification: {
        type: "success",
        message: "Surat keluar berhasil ditambahkan!",
      },
    })),

  // Update status surat masuk
  updateStatusSurat: (id, status) =>
    set((state) => ({
      suratMasuk: state.suratMasuk.map((s) =>
        s.id === id ? { ...s, status } : s,
      ),
    })),

  // Arsipkan surat
  arsipkanSurat: (id) =>
    set((state) => {
      const allSurat = [...state.suratMasuk, ...state.suratKeluar];
      const surat = allSurat.find((s) => s.id === id);
      if (!surat) return state;

      return {
        suratMasuk: state.suratMasuk.filter((s) => s.id !== id),
        suratKeluar: state.suratKeluar.filter((s) => s.id !== id),
        arsip: [...state.arsip, { ...surat, status: "Diarsipkan" }],
        notification: {
          type: "success",
          message: "Surat berhasil diarsipkan!",
        },
      };
    }),

  // Delete surat
  deleteSurat: (id) =>
    set((state) => ({
      suratMasuk: state.suratMasuk.filter((s) => s.id !== id),
      suratKeluar: state.suratKeluar.filter((s) => s.id !== id),
      arsip: state.arsip.filter((s) => s.id !== id),
      notification: { type: "error", message: "Surat berhasil dihapus!" },
    })),

  // Clear notification
  clearNotification: () => set({ notification: null }),
}));

export default useSupratStore;
