import { DocumentFeature, ComparisonRow } from "./types";

export const SUBJECTS = [
  "Matematika",
  "Bahasa Indonesia",
  "Ilmu Pengetahuan Alam (IPA)",
  "Ilmu Pengetahuan Sosial (IPS)",
  "Pendidikan Pancasila",
  "Bahasa Inggris",
  "Pendidikan Agama Islam & Budi Pekerti",
  "Seni Budaya",
  "Pendidikan Jasmani, Olahraga & Kesehatan (PJOK)",
  "Muatan Lokal (Bahasa Sasak)"
];

export const GRADES = [
  "Kelas 1 - Fase A",
  "Kelas 2 - Fase A",
  "Kelas 3 - Fase B",
  "Kelas 4 - Fase B",
  "Kelas 5 - Fase C",
  "Kelas 6 - Fase C",
  "Kelas 7 - Fase D",
  "Kelas 8 - Fase D",
  "Kelas 9 - Fase D",
  "Kelas 10 - Fase E",
  "Kelas 11 - Fase F",
  "Kelas 12 - Fase F"
];

export const FEATURES: DocumentFeature[] = [
  {
    type: "RPP Kemendikdasmen",
    title: "RPP Kemendikdasmen",
    desc: "Rencana Pembelajaran Mendalam sesuai standar Kurikulum Merdeka terbaru dari Kemendikbud.",
    badge: "Populer",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    iconName: "book"
  },
  {
    type: "RPP Cinta Kemenag",
    title: "RPP Cinta Kemenag",
    desc: "RPP Kurikulum Merdeka untuk madrasah dengan integrasi nilai moderasi beragama & Akhlakul Karimah.",
    iconName: "heart"
  },
  {
    type: "Asesmen Lengkap",
    title: "Asesmen Lengkap",
    desc: "Kisi-Kisi + Kartu Soal + Soal Sumatif pilihan ganda dan esai yang langsung digenerate sekali klik.",
    badge: "Hemat",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    iconName: "check-square"
  },
  {
    type: "Jurnal Harian",
    title: "Jurnal Harian",
    desc: "Jurnal mengajar harian, mingguan, evaluasi pengajaran, serta hambatan kelas yang terdokumentasi rapi.",
    iconName: "calendar"
  },
  {
    type: "Analisis CP",
    title: "Analisis CP & ATP",
    desc: "Analisis Capaian Pembelajaran secara otomatis menjadi Tujuan Pembelajaran (TP) dan Alur Tujuan Pembelajaran (ATP).",
    iconName: "bar-chart"
  },
  {
    type: "LKPD Interaktif",
    title: "LKPD Interaktif",
    desc: "Lembar Kerja Peserta Didik interaktif dengan pendekatan active learning dan stimulasi kontekstual.",
    badge: "Baru",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    iconName: "users"
  },
  {
    type: "Artikel Referensi",
    title: "Artikel Referensi",
    desc: "Artikel referensi materi atau bahan bacaan pendukung berkualitas tinggi untuk Guru dan Peserta Didik.",
    badge: "Eksklusif",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    iconName: "book-open"
  }
];

export const COMPARISONS: ComparisonRow[] = [
  {
    aspect: "Waktu pembuatan 1 dokumen",
    manual: "3 - 6 jam lamanya",
    siapGuru: "< 2 menit instan"
  },
  {
    aspect: "Kesesuaian Kurikulum Merdeka",
    manual: "Perlu riset manual mendalam",
    siapGuru: "Otomatis & terverifikasi"
  },
  {
    aspect: "Format & lembar pengesahan",
    manual: "Susun & rapikan layout sendiri",
    siapGuru: "Siap pakai & sesuai regulasi"
  },
  {
    aspect: "Ekspor PDF & Word",
    manual: "Atur layout Word manual yang sering berantakan",
    siapGuru: "1 klik download / cetak rapi"
  },
  {
    aspect: "Konsistensi antar dokumen",
    manual: "Sulit dijaga jika materi berubah",
    siapGuru: "Terjamin presisi"
  },
  {
    aspect: "Biaya per bulan",
    manual: "Waktu & energi besar terkuras",
    siapGuru: "Hemat waktu (Mulai Rp 25 ribu)"
  }
];

export const FAQS = [
  {
    q: "Apa itu MERDEKA GURU?",
    a: "MERDEKA GURU adalah platform asisten administrasi pembelajaran berbasis kecerdasan buatan (AI) yang dirancang khusus untuk guru-guru di Indonesia. Platform ini membantu Anda menyusun RPP (Modul Ajar), Asesmen, Jurnal Harian, Analisis CP, dan LKPD secara instan yang disesuaikan dengan Kurikulum Merdeka."
  },
  {
    q: "Apakah modul ajar yang dihasilkan sesuai Kurikulum Merdeka?",
    a: "Ya! AI kami telah dilatih dengan standar Kurikulum Merdeka dari Kemendikdasmen versi terbaru serta panduan Kemenag untuk RPP Rahmatan Lil Alamin. Dokumen yang dihasilkan mencakup komponen utama lengkap seperti Profil Pelajar Pancasila, Pertanyaan Pemantik, hingga Rubrik Asesmen."
  },
  {
    q: "Dapatkah dokumen hasil generate diedit kembali?",
    a: "Sangat bisa! Dokumen hasil cetakan AI disajikan dalam format visual yang interaktif. Anda dapat menyalin teks tersebut ke Microsoft Word/Google Docs, atau langsung mencetak/ekspor ke PDF menggunakan fitur cetak di halaman."
  },
  {
    q: "Apakah layanan generator ini gratis?",
    a: "Kami menyediakan demo generate langsung secara instan sehingga Anda bisa mencoba kualitas AI kami secara gratis. Untuk pembuatan dokumen tak terbatas dengan fitur ekspor murni, kami menawarkan paket berlangganan yang sangat terjangkau bagi guru mulai dari Rp 25.000,- (hemat waktu & tenaga Anda)."
  }
];
