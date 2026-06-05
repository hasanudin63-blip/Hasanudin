import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please add your Gemini API Key in the Settings > Secrets panel of Google AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.post("/api/generate", async (req, res) => {
  try {
    const { 
      documentType, 
      mataPelajaran, 
      kelas, 
      topik, 
      detailMateri,
      jenjang,
      kelasAngka,
      fase,
      semester,
      alokasiWaktu,
      modelPembelajaran,
      tujuanPembelajaran,
      gayaBahasa,
      orientasiHalaman,
      selectedProfil,
      namaSekolah,
      namaGuru,
      nipGuru,
      namaKepsek,
      nipKepsek,
      tempatTeks,
      tanggalTeks,
      // Custom specialized document states for higher fidelity and exact matching
      asesmenTipe,
      asesmenBentukSoal,
      asesmenJumlahSoal,
      asesmenLevelKognitif,
      jurnalTanggal,
      jurnalJumlahSiswa,
      jurnalKejadianPenting,
      jurnalTindakLanjut,
      analisisElemen,
      analisisAtpSasaran,
      analisisTargetKkm,
      lkpdModelGame,
      lkpdKelompok,
      lkpdMedia,
      artikelGaya,
      artikelTarget,
      artikelFokus
    } = req.body;
    
    if (!documentType || !mataPelajaran || !topik) {
      res.status(400).json({ error: "Parameter required: documentType, mataPelajaran, topik" });
      return;
    }

    const ai = getAiClient();
    
    // Construct rich metadata headers to force Gemini to follow and reuse it
    const metadataIntro = `IDENTITAS ADMINISTRASI PELAKSANAAN PEMBELAJARAN:
- Instansi/Sekolah: ${namaSekolah || '[Nama Sekolah]'}
- Mata Pelajaran: ${mataPelajaran}
- Jenjang Pendidikan: ${jenjang || 'Sekolah Terkait'}
- Kelas: ${kelasAngka || '7'} / ${fase || 'Fase D'}
- Semester: ${semester || 'Satu (1)'}
- Alokasi Waktu: ${alokasiWaktu || '2 x 40 Menit'}
- Topik / Materi Pembelajaran: ${topik}
- Model Pembelajaran Utama: ${modelPembelajaran || 'Problem-Based Learning (PBL)'}
- Profil Pelajar Pancasila: ${selectedProfil && selectedProfil.length > 0 ? selectedProfil.join(", ") : "Mandiri, Bernalar Kritis, Gotong Royong"}
- Tujuan Pembelajaran (Fokus utama): ${tujuanPembelajaran || 'Memahami konsep dasar materi sesuai kompetensi CP.'}
- Gaya Bahasa Dokumen: ${gayaBahasa || 'Sederhana, lugas dan mudah diserap'}
- Orientasi Dokumen: ${orientasiHalaman || 'Portrait'}

INFORMASI PENGESAHAN DOKUMEN:
- Disahkan di: ${tempatTeks || 'Jakarta'}, Tanggal ${tanggalTeks || '02 Juli 2026'}
- Kepala Sekolah: ${namaKepsek || '[Nama Kepala Sekolah]'} (NIP. ${nipKepsek || '-'})
- Guru Mata Pelajaran: ${namaGuru || '[Nama Guru]'} (NIP. ${nipGuru || '-'})
`;

    let docPrompt = "";
    if (documentType === "RPP Kemendikdasmen") {
      docPrompt = `${metadataIntro}
Buatkan modul ajar / Rencana Pelaksanaan Pembelajaran (RPP) Kurikulum Merdeka yang lengkap, mendalam, dan profesional menggunakan kerangka tabel terstruktur tepat sesuai acuan dokumen "RENCANA PELAKSANAAN PEMBELAJARAN MENDALAM" yang diunggah pengguna.

CRITICAL INSTRUCTION / PERINGATAN KERAS:
- Anda hanya meniru KERANGKA STRUKTUR TABEL dari dokumen yang diunggah.
- JANGAN PERNAH menyalin atau memasukkan materi "Fakta vs Opini", "Mitos", atau contoh apersepsi "Gunung Rinjani" milik contoh Bahasa Indonesia jika Mata Pelajaran yang sedang diminta saat ini adalah BUKAN Bahasa Indonesia.
- Anda harus mengimplementasikan konten pembelajaran secara keseluruhan yang 100% relevan dengan Mata Pelajaran: **${mataPelajaran}**, Topik: **${topik}**, dan Kelas: **${kelasAngka || '6'}**. Misalnya jika Matematika, buatlah materi tentang Matematika, integrasi lintas disiplin matematika, dan apersepsi matematika (seperti suhu atau maju-mundur langkah).

Format keluaran WAJIB mengikuti kaidah berikut secara tertib:
1. Di bagian paling atas, tulis judul utama: "# RENCANA PELAKSANAAN PEMBELAJARAN MENDALAM"
2. Tulis informasi dasar / metadata dengan list bullet yang jelas:
   - **Nama Sekolah:** ${namaSekolah || '[Nama Sekolah]'}
   - **Kelas/Semester:** ${kelasAngka || '6'} / ${semester || '1'}
   - **Mata Pelajaran:** ${mataPelajaran}
   - **Alokasi Waktu:** ${alokasiWaktu || '3 JP (3 x 45 menit)'}

Kemudian bagi isi dokumen RPP dalam 4 bagian besar menggunakan format tabel Markdown dua kolom:

**A. IDENTIFIKASI**
Buat tabel markdown 2 kolom dengan baris sebagai berikut:
| Komponen | Penjelasan & Detail Identifikasi |
| :--- | :--- |
| **Peserta Didik** | [Detail tentang karakteristik belajar siswa, prasyarat, pengecekan kemampuan awal, gaya belajar, motivasi, kesulitan belajar, dll. sesuai kelas ${kelasAngka || '6'} dan pelajaran ${mataPelajaran}. Tambahkan catatan informatif di paragraf baru: *(Analisis kebutuhan belajar, meliputi pengecekan kemampuan awal, gaya belajar belajar, kesulitan siswa, kemampuan motorik, emosional serta sejauh mana siswa memahami materi sebelum pembelajaran dimulai, yang sering kali menggunakan angket, wawancara atau pengamatan langsung)*] |
| **Materi Pelajaran** | [Penjelasan singkat dan padat mengenai esensi materi utama yang diajarkan, misalnya jika Matematika bahas tentang rumus/operasi, jika IPA bahas materi IPA. Tambahkan di bawahnya: *(Penjelasan singkat materi yang akan diajarkan)*] |
| **Dimensi Profil Lulusan** | [Sebutkan Profil Pelajar Pancasila yang ditargetkan (misalnya: Bernalar Kritis, Kreatif, Kolaborasi, Kemandirian). Tuliskan rincian penerapan dan detail terintegrasi dalam Modul Ajar] |

**B. DESAIN PEMBELAJARAN**
Buat tabel markdown 2 kolom dengan baris sebagai berikut:
| Komponen Desain | Penjelasan & Rincian Desain Pembelajaran |
| :--- | :--- |
| **Capaian Pembelajaran** | [Pemaparan kutipan Capaian Pembelajaran (CP) kurikulum Merdeka yang disasar sesuai ${mataPelajaran} ${kelasAngka || '6'}] |
| **Lintas Disiplin Ilmu** | [Integrasi mata pelajaran yang relevan dengan pembelajaran ini, sesuaikan dengan ${mataPelajaran}] |
| **Topik Pembelajaran** | ${topik} |
| **Tujuan Pembelajaran** | [Peserta didik mampu: sebutkan minimal 3 butir tujuan pembelajaran spesifik dan terukur sesuai topik ${topik}] |
| **Kerangka Pembelajaran** | **• Praktik Pedagogis:** (guru merancang, melaksanakan, dan mengevaluasi proses pembelajaran nyata)<br>**• Model:** ${modelPembelajaran || 'Problem-Based Learning'}<br>**• Metode:** (Sebutkan metode interaktif pilihan)<br>**• Kemitraan & Lingkungan Pembelajaran:** (Kondisi ruang kelas yang interaktif dengan media)<br>**• Pemanfaatan Digital:** (Video edukasi online, kuis digital, dll) |

**C. PENGALAMAN BELAJAR**
Buat tabel markdown 2 kolom dengan baris sebagai berikut (Langkah-Langkah Pembelajaran yang terbagi secara horizontal ke bawah di dalam sel agar terhindar dari penyempitan kolom):
| Tahapan Pembelajaran | Deskripsi Langkah-Langkah Pembelajaran |
| :--- | :--- |
| **Awal (Berkesan, Bermakna, Menggembirakan)** | • **Orientasi:** (Sapa hangat, doa bersama, cek kehadiran)<br>• **Apersepsi:** (Tuliskan secara eksplisit 2 contoh pemicu inovatif menarik sesuai ${mataPelajaran} di papan tulis/slide, lakukan tanya jawab interaktif singkat)<br>• **Motivasi:** (Kaitkan relevansi ${topik} dengan kehidupan nyata)<br>• **Penyampaian Tujuan:** (Sampaikan tujuan yang akan dicapai)<br>• **Asesmen Awal:** (Tugas lisan/praktik instan untuk menguji prasyarat murid sesuai topik) |
| **Kegiatan Inti (Berkesadaran, Bermakna, Menggembirakan)** | **Memahami (Berkesadaran, Bermakna)**<br>• (Rincian aksi guru/murid: Guru menayangkan konten video/visual interaktif, tanya jawab penalaran kritis, kerja kelompok kecil mengamati stimulus masalah, dsb.)<br><br>**Mengaplikasi (Bermakna, Menggembirakan)**<br>• (Rincian aksi: pengerjaan berkelompok atas Lembar Kerja Peserta Didik (LKPD), selipan Ice Breaking edukatif yang humoris/segar bertema topik ini, membaca nyaring hasil analisis, menuliskan rangkuman di papan tulis.)<br><br>**Merefleksi (Berkesadaran, Bermakna)**<br>• (Rincian aksi: siswa saling mengomentari presentasi batur murid secara positif, penguatan miskonsepsi oleh guru, menanyakan perasaan murid bertualang ilmu, penugasan mandiri kecil, assement proses kelas.) |
| **Penutup (Berkesadaran)** | • Guru bersama murid merumuskan simpulan akhir bersama.<br>• Penugasan tindak lanjut / Pekerjaan Rumah (PR) mandiri.<br>• Menyanyikan lagu nasional / daerah untuk menanamkan nasionalisme.<br>• Doa penutup dan salam hangat. |

**D. ASESMEN**
Buat tabel markdown 2 kolom dengan baris sebagai berikut:
| Jenis Asesmen | Metode & Bentuk Instrumen Penilaian |
| :--- | :--- |
| **Asesmen Awal Pembelajaran** | • **Metode:** Tanya jawab lisan, pengamatan sekilas.<br>• **Bentuk:** Guru mengajukan pertanyaan singkat diawal untuk memetakan pemahaman dan kesiapan awal murid di topik ${topik}. |
| **Asesmen pada Proses Pembelajaran (Formatif)** | • **Metode:** Observasi keikutsertaan kelompok, penilaian kinerja presentasi kelompok, penilaian produk.<br>• **Bentuk:** Lembar observasi partisipasi aktif, penilaian lembar kerja (LKPD), rubrik penilaian produk. |
| **Asesmen pada Akhir Pembelajaran (Sumatif)** | • **Metode:** Tes tertulis/tes objektif mandiri berkaitan dengan ${topik}.<br>• **Bentuk:** Lembar evaluasi mandiri berupa soal pilihan ganda atau uraian singkat. |

Data identitas administrasi tambahan:
- Mata Pelajaran: ${mataPelajaran}
- Detail materi: ${detailMateri ? detailMateri : "Rancang secara terpadu dan mendalam"}

CRITICAL COMPONENT ADDITION:
Sesuai dengan instruksi pengguna terbaru, Anda wajib melampirkan bab tambahan terpadu berikut secara lengkap di bagian akhir RPP ini:
---
## 🗒️ E. LAMPIRAN 1: LEMBAR KERJA PESERTA DIDIK (LKPD) INTERAKTIF
(Buatkan LKPD interaktif lengkap penunjang rpp dengan sapaan hangat "Halo, Sobat Pembelajar!", mencakup judul LKPD, identitas kelompok, tujuan pembelajaran, petunjuk pengerjaan, teks stimulus berkesan, dan minimal 3 aktivitas penugasan kreatif).

## 📊 F. LAMPIRAN 2: INSTRUMEN ASESMEN & RUBRIK PENILAIAN LENGKAP
(Buatkan kisi-kisi instrumen, 3-5 soal evaluasi sumatif pilihan ganda lengkap dengan opsi A, B, C, D dan 1-2 soal esai diskusi penalaran kritis, kunci jawaban terperinci, deskripsi pembahasannya, serta rubrik penilaian performa kualitatif berskala).

## 📰 G. LAMPIRAN 3: ARTIKEL REFERENSI BAHAN BACAAN GURU & SISWA
(Buatkan artikel referensi atau rangkuman bacaan teoretis pendukung yang mencerdaskan berbasis sains populer untuk menunjang stimulus literasi membaca guru dan siswa mengenai topik ${topik}).
---

Gunakan format Markdown yang sangat rapi dan formal. Jangan kurangi detail akademis dari modul belajar ini.`;
    } else if (documentType === "RPP Cinta Kemenag") {
      docPrompt = `${metadataIntro}
Buatkan Rencana Pelaksanaan Pembelajaran (RPP) berbasis Cinta Kemenag (Kurikulum Merdeka di lingkungan Madrasah/Keagamaan yang mengintegrasikan nilai spiritual, Akhlakul Karimah, moderasi beragama, dan kasih sayang) dengan menggunakan kerangka tabel terstruktur tepat sesuai acuan dokumen "RENCANA PELAKSANAAN PEMBELAJARAN MENDALAM" yang diunggah pengguna.

CRITICAL INSTRUCTION / PERINGATAN KERAS:
- Anda hanya meniru KERANGKA STRUKTUR TABEL dari dokumen yang diunggah.
- JANGAN PERNAH menyalin atau memasukkan materi "Fakta vs Opini", "Mitos", atau contoh apersepsi "Gunung Rinjani" milik contoh Bahasa Indonesia jika Mata Pelajaran yang sedang diminta saat ini adalah BUKAN Bahasa Indonesia.
- Anda harus mengimplementasikan konten pembelajaran secara keseluruhan yang 100% relevan dengan Mata Pelajaran: **${mataPelajaran}**, Topik: **${topik}**, dan Kelas: **${kelasAngka || '6'}** dengan mengaitkannya ke hikmah atau kebajikan spiritual/keagamaan. Misalnya jika Matematika, cantumkan tentang konsep matematika religius, keadilan hitung, dsb.

Format keluaran WAJIB mengikuti kaidah berikut secara tertib:
1. Di bagian paling atas, tulis judul utama: "# RENCANA PELAKSANAAN PEMBELAJARAN MENDALAM (CINTA KEMENAG)"
2. Tulis informasi dasar / metadata dengan list bullet yang jelas:
   - **Nama Madrasah/Sekolah:** ${namaSekolah || '[Nama Madrasah]'}
   - **Kelas/Semester:** ${kelasAngka || '6'} / ${semester || '1'}
   - **Mata Pelajaran:** ${mataPelajaran}
   - **Alokasi Waktu:** ${alokasiWaktu || '3 JP (3 x 45 menit)'}

Kemudian bagi isi dokumen RPP dalam 4 bagian besar menggunakan format tabel Markdown dua kolom:

**A. IDENTIFIKASI**
Buat tabel markdown 2 kolom dengan baris sebagai berikut:
| Komponen | Penjelasan & Detail Identifikasi |
| :--- | :--- |
| **Peserta Didik** | [Karakteristik peserta didik madrasah/sekolah, prasyarat, potensi kebaikan, empati awal, rasa ingin tahu sesuai kelas ${kelasAngka || '6'} dan pelajaran ${mataPelajaran}. Tambahkan catatan: *(Analisis kebutuhan belajar, meliputi pengecekan kemampuan awal, gaya belajar, kesulitan, kemampuan motorik, emosional murid)*] |
| **Materi Pelajaran** | [Esensi materi ${mataPelajaran} dikaitkan dengan perspektif hikmah atau nilai kebajikan spiritual sesuai topik ${topik}. Tambahkan: *(Penjelasan singkat materi kebaikan yang diajarkan)*] |
| **Dimensi Profil Lulusan** | [Profil Pelajar Pancasila Rahmatan Lil Alamin (P2RA) yang relevan (seperti Berkeadaban/Ta'addub, Keteladanan/Qudwah, Kesetaraan/Musawah, Toleransi/Tasamuh, dll) beserta detail terintegrasi dalam Modul] |

**B. DESAIN PEMBELAJARAN**
Buat tabel markdown 2 kolom dengan baris sebagai berikut:
| Komponen Desain | Penjelasan & Rincian Desain Pembelajaran |
| :--- | :--- |
| **Capaian Pembelajaran** | [Pemaparan Capaian Pembelajaran (CP) ${mataPelajaran} kelas ${kelasAngka || '6'} yang mengintegrasikan aspek pengetahuan umum dan spiritual/ahlak] |
| **Lintas Disiplin Ilmu** | [Integrasi keilmuan umum dengan keagamaan/nilai moral Al-Qur'an dan Hadis yang sesuai] |
| **Topik Pembelajaran** | ${topik} |
| **Tujuan Pembelajaran** | [Minimal 3 butir tujuan pembelajaran spesifik untuk topik ${topik} bernuansa cinta kasih, ahlak, dan pencapaian akademis] |
| **Kerangka Pembelajaran** | **• Praktik Pedagogis:** (guru merancang, melaksanakan, dan mengevaluasi proses dengan cinta kasih)<br>**• Model:** ${modelPembelajaran || 'Problem-Based Learning'}<br>**• Metode:** (Metode dialogis, bergotong royong, dll)<br>**• Kemitraan & Lingkungan Pembelajaran:** (Mengkondisikan kelas interaktif penuh rasa hormat dan kasih sayang)<br>**• Pemanfaatan Digital:** (Video keteladanan/moral, kuis digital interaktif, dll) |

**C. PENGALAMAN BELAJAR**
Buat tabel markdown 2 kolom dengan baris sebagai berikut (Langkah Pembelajaran Cinta Kasih yang terbagi secara horizontal ke bawah di dalam sel agar terhindar dari penyempitan kolom):
| Tahapan Pembelajaran | Deskripsi Langkah-Langkah Pembelajaran |
| :--- | :--- |
| **Awal (Berkesan, Bermakna, Menggembirakan)** | • **Orientasi:** (Salam penuh doa kesalamatan, doa belajar bersama, mengecek kehadiran dengan ramah)<br>• **Apersepsi:** (Tuliskan secara eksplisit 2 pemicu/kalimat moral atau logika penuh makna di papan tulis sesuai ${mataPelajaran}, lakukan tanya jawab spiritual)<br>• **Motivasi:** (Mengaitkan materi ${topik} sebagai wujud rasa syukur atas ilmu)<br>• **Penyampaian Tujuan:** (Menyampaikan tujuan berazas kebaikan)<br>• **Asesmen Awal:** (Tebak hikmah lisan singkat untuk menguji prasyarat sesuai topik) |
| **Kegiatan Inti (Berkesadaran, Bermakna, Menggembirakan)** | **Memahami (Berkesadaran, Bermakna)**<br>• (Rincian aksi bernafas kebaikan: Penayangan konten materi hikmah, tanya jawab interaktif penuh hikmah, diskusi berpasangan mengamati masalah nyata, bimbingan penuh kasih sayang guru.)<br><br>**Mengaplikasi (Bermakna, Menggembirakan)**<br>• (Rincian aksi: Kerja kelompok kecil bergotong-royong menyelesaikan masalah LKPD secara ikhlas, Ice breaking bertema persaudaraan/ukhuwah, penyelesaian tugas bersama, mempresentasikan hasil di papan tulis.)<br><br>**Merefleksi (Berkesadaran, Bermakna)**<br>• (Rincian aksi akhlak mulia: Siswa saling mendoakan dan mengapresiasi kelebihan temannya, guru memberi penguatan ahlakul karimah, asesmen proses, bimbingan remedial penuh kelembutan.) |
| **Penutup (Berkesadaran)** | • Simpulan pembelajaran bersama murid bernilai hikmah.<br>• Tugas PR penuh kebaikan mandiri.<br>• Doa penutup majelis mengucapkan syukur dan salam damai. |

**D. ASESMEN**
| Jenis Asesmen | Metode & Bentuk Instrumen Penilaian |
| :--- | :--- |
| **Asesmen Awal Pembelajaran** | • **Metode:** Tanya jawab lisan, empati awal.<br>• **Bentuk:** Guru menguji kesiapan awal murid secara dialogis mengenai ${topik}. |
| **Asesmen pada Proses Pembelajaran (Formatif)** | • **Metode:** Observasi sikap empati, gotong-royong, penilaian kinerja ahlak mulia.<br>• **Bentuk:** Lembar penilaian sikap akhlakul karimah dan keaktifan kelompok. |
| **Asesmen pada Akhir Pembelajaran (Sumatif)** | • **Metode:** Tes tertulis/tes pengetahuan berpadu studi kasus moral atau aplikasi nyata ${topik}.<br>• **Bentuk:** Lembar kuis evaluasi mandiri. |

Detail tambahan materi: ${detailMateri ? detailMateri : "Rancang secara terpadu dan bermakna"}

CRITICAL COMPONENT ADDITION:
Sesuai dengan instruksi pengguna terbaru, Anda wajib melampirkan bab tambahan terpadu berikut secara lengkap di bagian akhir RPP ini:
---
## 🗒️ E. LAMPIRAN 1: LEMBAR KERJA PESERTA DIDIK (LKPD) INTERAKTIF
(Buatkan LKPD interaktif lengkap penunjang rpp dengan sapaan hangat "Halo, Sobat Pembelajar!", mencakup judul LKPD, identitas kelompok, tujuan pembelajaran, petunjuk pengerjaan, teks stimulus berkesan, dan minimal 3 aktivitas penugasan kreatif yang mengaitkan hikmah spiritual/akhlakul karimah).

## 📊 F. LAMPIRAN 2: INSTRUMEN ASESMEN & RUBRIK PENILAIAN LENGKAP
(Buatkan kisi-kisi instrumen, 3-5 soal evaluasi sumatif pilihan ganda lengkap dengan opsi A, B, C, D dan 1-2 soal esai diskusi penalaran kritis bernilai karakter, kunci jawaban terperinci, deskripsi pembahasannya, serta rubrik penilaian performa kualitatif berskala).

## 📰 G. LAMPIRAN 3: ARTIKEL REFERENSI BAHAN BACAAN GURU & SISWA
(Buatkan artikel referensi atau rangkuman bacaan teoretis pendukung yang mencerdaskan berbasis sains populer untuk menunjang stimulus literasi membaca guru dan siswa mengenai topik ${topik} serta mengaitkannya dengan moralitas akhlak mulia).
---

Format dalam Markdown yang sangat rapi, mendalam, lengkap, dan menggunakan pendekatan dialogis-humanis cinta kasih.`;
    } else if (documentType === "Asesmen Lengkap") {
      docPrompt = `${metadataIntro}
Buatkan dokumen Asesmen Pembelajaran Lengkap berbasis Kurikulum Merdeka yang mandiri (bukan modul ajar / RPP), melainkan instrumen evaluasi terpadu sesuai standar Asosiasi Evaluasi Pendidikan Indonesia dan Kemendikdasmen RI terbaru.

SPESIFIKASI ASESMEN YANG WAJIB DIIKUTI:
- Tipe Asesmen: ${asesmenTipe || 'Sumatif Akhir Lingkup Materi'}
- Bentuk / Format Soal Utama: ${asesmenBentukSoal || 'Pilihan Ganda & Esai'}
- Jumlah Soal Pilihan Ganda & Esai: ${asesmenJumlahSoal || '5 Pilihan Ganda & 2 Esai'}
- Target Tingkat Berpikir (Level Kognitif): ${asesmenLevelKognitif || 'Campuran (HOTS, MOTS, LOTS)'}
Mata Pelajaran: ${mataPelajaran}
Topik Materi Pokok: ${topik}
${detailMateri ? `Tambahan detail materi: ${detailMateri}` : ''}

Dokumen evaluasi mandiri ini wajib disusun dalam 5 bab berikut secara tertib dan lengkap:

### I. KOP SOAL UJIAN RESMI SEKOLAH
(Tampilkan KOP administrasi formal sekolah di bagian atas mencakup: Nama Sekolah, Mata Pembelajaran, Kelas, Semester, Hari/Tanggal Ujian, Alokasi Waktu, Nama Guru, dan kolom pengerjaan: Nama Siswa, Nomor Absen, Nilai Akhir).

### II. KISI-KISI INSTRUMEN EVALUASI (TABEL MARKDOWN)
(Buat tabel berkolom: No | Tujuan Pembelajaran (TP) | Indikator Materi Soal | Level Kognitif | Bentuk Soal | Nomor Soal | Bobot Nilai. Penuhi seluruh baris sesuai dengan spesifikasi jumlah soal di atas ${asesmenJumlahSoal}).

### III. KOS DEKLARASI KARTU SOAL & BADAN SOAL UTAMA
(Rancang naskah ujian tertulis asli di mana soal-soal dibuat secara bertahap dan mendalam:
1. Pilihan Ganda (A, B, C, D) dengan stimulasi kontekstual sains/sosial murni relevan ${topik}, melatih kesadaran literasi numerasi.
2. Soal Esai Uraian terbuka yang memicu penalaran kritis, analisis data empiris, maupun pembuktian konsep).

### IV. KUNCI JAWABAN & PEMBAHASAN MENDALAM
(Tuliskan kunci jawaban sahih lengkap dengan pembahasan ilmiah logis-rasional, langkah penyelesaian matematis atau argumentatif dari setiap butir soal di atas).

### V. PEDOMAN PENSKORAN & RUBRIK PENILAIAN KARAKTER BERSKALA
(Buat pedoman penilaian dan kriteria skala interval nilai (e.g. 0-60 perlu bimbingan, 61-80 tuntas, 81-100 mahir) yang siap digunakan guru untuk melakukan verifikasi nilai siswa).

Sajikan dalam Markdown yang sangat rapi, mendalam, dan meniru layout ujian nasional asli.`;
    } else if (documentType === "Jurnal Harian") {
      docPrompt = `${metadataIntro}
Buatkan Jurnal Mengajar Harian dan Laporan Evaluasi Guru Kurikulum Merdeka yang komprehensif, siap pakai, dan interaktif.

SPESIFIKASI JURNAL HARIAN GURU:
- Tanggal Pembelajaran: ${jurnalTanggal || 'Kamis, 04 Juni 2026'}
- Kehadiran & Ketertiban Kelas: ${jurnalJumlahSiswa || 'Lengkap (Semua Siswa Hadir & Aktif)'}
- Kejadian Penting / Hambatan Kelas: ${jurnalKejadianPenting || 'Siswa sangat aktif berdiskusi namun ada beberapa yang belum tuntas memahami konsep.'}
- Rencana Tindak Lanjut (Solusi Reflektif): ${jurnalTindakLanjut || 'Memberikan bimbingan scaffolding individual serta tugas tambahan.'}
Mata Pelajaran: ${mataPelajaran}
Topik Pembahasan: ${topik}

Sajikan dokumen ini dalam 3 komponen administrasi utama:

### I. TEMPLATE JURNAL MENGAJAR HARIAN GURU (TABEL MARKDOWN)
Buat tabel administrasi mengajar guru secara profesional dengan kolom:
No | Hari/Tanggal | Jam Ke | Pertemuan Ke | Capaian Pembelajaran (CP) / Elemen | Indikator Pencapaian (TP) | Ketuntasan Kelas (%) | Catatan Kejadian Penting | Solusi / Tindak Lanjut Guru.

*PETUNJUK PENGISIAN:* Isilah tabel di atas dengan 3 baris entry realistis berbasis topik ${topik}, kelas ${kelasAngka || '6'}, di mana salah satu baris mencerminkan kejadian kendala kelas: "${jurnalKejadianPenting}" beserta solusinya: "${jurnalTindakLanjut}".

### II. LAPORAN EVALUASI PELAKSANAAN PEMBELAJARAN (NARASI ANALITIS)
Susunlah analisis evaluasi pasca-mengajar yang mencakup:
1. Hasil Pengamatan Sikap dan Partisipasi Siswa (Refleksi karakter kemandirian dan kolaborasi).
2. Analisis Efektivitas Metode & Model Pembelajaran (${modelPembelajaran || 'PBL'}): Hambatan implementasi dan faktor pendukung keberhasilan.
3. Rekapitulasi Ketuntasan Belajar Klasikal Kelas.

### III. ACTION PLAN: RENCANA TINDAK LUNTAS (RTL) MANDIRI GURU
Rumuskan rencana aksi nyata guru sebagai bukti refleksi pengajaran untuk peyempurnaan pertemuan berikutnya:
- Rencana Remedial / Scaffolding Terarah (Fokus penanganan kendala: "${jurnalKejadianPenting}").
- Rencana Pengayaan Berdaya Cipta Tinggi (HOTS) bagi siswa mahir.
- Pengembangan Media Digital / Kreatif lanjutan.

Format dalam Markdown yang sangat rapi, reflektif, bermakna, dan mudah diarsipkan guru atau kepala sekolah.`;
    } else if (documentType === "Analisis CP") {
      docPrompt = `${metadataIntro}
Buatkan Analisis Capaian Pembelajaran (CP) dan Pemetaan Alur Tujuan Pembelajaran (ATP) Kurikulum Merdeka secara sistematis dan analitis.

SPESIFIKASI ANALISIS KURIKULUM:
- Elemen Pembahasan Utama: ${analisisElemen || 'Otomatis / Sesuai Elemen Bidang Studi Utama'}
- Fokus Pemetaan Alur Sasaran (ATP): ${analisisAtpSasaran || 'Menyusun ATP berjenjang secara logis dan runtut.'}
- Target Kriteria Ketercapaian (KKTP): ${analisisTargetKkm || '75 - Kategori Baik (Tuntas)'}
Mata Pelajaran: ${mataPelajaran}
Topik Materi: ${topik}

Rancang dokumen pemetaan kurikulum ini ke dalam 4 komponen esensial berikut:

### I. DEKONTRAMASI CAPAIAN PEMBELAJARAN (CP) ELEMEN
(Uraikan bunyi CP Elemen "${analisisElemen}" yang berlaku berdasarkan Salinan Keputusan Kepala BSKAP Kemendikdasmen nomor 032/H/KR/2024 atau regulasi terbaru terkait materi ${topik} di fase ${fase || 'Fase D'}).

### II. ANALISIS KOMPETENSI & RUANG LINGKUP MATERI POKOK
(Lakukan pemisahan taksonomi untuk membedakan antara:
1. **Kompetensi Utama (Verba Tindakan Berpikir):** Apa saja keterampilan motorik/mental siswa yang ingin dicapai.
2. **Ruang Lingkup Konten Esensial:** Konsep-konsep inti ${topik} yang wajib dikuasai secara mendalam).

### III. PERUMUSAN TUJUAN PEMBELAJARAN (TP) DYNAMIC
(Rumuskan minimal 3 Tujuan Pembelajaran yang diturunkan secara runtut dari hasil analisis CP di atas, mengaitkan Aspek Kompetensi + Variasi Konten + Penguatan Sikap Profil Pelajar Pancasila).

### IV. TABEL ALUR TUJUAN PEMBELAJARAN (ATP) KURIKULUM MERDEKA
Sajikan rancangan ATP alur implementasi dalam bentuk tabel detail berkolom:
Langkah Alur | Tujuan Pembelajaran (TP) | Ruang Lingkup Materi Pokok | Aktivitas Pembelajaran Alternatif | Alokasi Waktu (JP) | Kriteria Ketuntasan (KKTP: ${analisisTargetKkm}) | Sumber Belajar Unggulan.

### V. GLOSARIUM SAKU ISTILAH KURIKULUM MERDEKA
(Sediakan glosarium mini berisi minimal 4 terminologi ilmiah dari materi ${topik} beserta penjelasan konseptual definisinya).

Format dalam Markdown yang berciri formal, penuh analisis akademik, mendalam, dan terstruktur logis.`;
    } else if (documentType === "LKPD Interaktif") {
      docPrompt = `${metadataIntro}
Buatkan Lembar Kerja Peserta Didik (LKPD) Interaktif Kurikulum Merdeka yang dirancang khusus untuk pembelajaran aktif, menyenangkan, dan kolaboratif.

SPESIFIKASI DESAIN LKPD INTERAKTIF:
- Model Game / Pembelajaran Aktif: ${lkpdModelGame || 'Misi Detektif Pintar'}
- Format Pembagian Kelompok Kerja: ${lkpdKelompok || 'Berpasangan / Teman Sebangku'}
- Media & Alat Bantu Belajar: ${lkpdMedia || 'Alat Peraga Konkret, Proyektor LCD & Papan Tulis'}
Mata Pelajaran: ${mataPelajaran}
Topik Pembahasan: ${topik}

Susun naskah LKPD siswa ini dengan sapaan hangat yang bersahabat "Halo, Sobat Pembelajar!" memakai struktur berikut secara lengkap:

### I. JUDUL LKPD KREATIF & PANEL IDENTITAS BELAJAR
(Tampilkan judul LKPD yang mencerminkan nuansa game "${lkpdModelGame}" serta sediakan placeholder isian identitas kelompok/mandiri lengkap: Anggota Kelompok, Kelas/Fase, Hari/Tanggal Kegiatan).

### II. PETUNJUK KERJA & TARGET PEMBELAJARAN (KONTRAK BELAJAR)
(Sajikan target kompetensi yang dicapai siswa dengan gaya visual menarik, serta instruksi kerja pengerjaan LKPD yang memanfaatkan media: "${lkpdMedia}").

### III. STIMULUS: CERITA ATAU FENOMENA KONTEKSTUAL MENANTANG
(Tuliskan teks stimulus berupa cerita pendek pemantik pemikiran, masalah kehidupan nyata di lingkungan sekitar murni tentang ${topik}, memicu imajinasi kognitif siswa).

### IV. BADAN PENUGASAN AKTIF (3 TANTANGAN BELAJAR BERVARIASI):
- **Tantangan 1: Eksplorasi Konseptual (Menalar Kritis):** Serangkaian pertanyaan penuntun mengaitkan konsep inti stimulus.
- **Tantangan 2: Kasus Kolaboratif Game (Bergotong Royong):** Penugasan/studi kasus kreatif yang wajib dikerjakan bersama kelompok: "${lkpdKelompok}" berdasarkan game "${lkpdModelGame}".
- **Tantangan 3: Konstruksi Kesimpulan Mandiri (Refleksi):** Lembar isian mandiri menyusun simpulan materi.

### V. LEMBAR REFLEKSI DIRI (SELF-ASSESSMENT) JANGAN DISINCOR
(Buat tabel checklist kepuasan emosi dan tingkat pemahaman diri siswa terhadap materi ${topik} menggunakan simbol emotikon 😊 atau skala kepuasan).

Format dalam Markdown yang ramah anak, interaktif, menarik, dan berlimpah instruksi eksplorasi konkret. No "Catatan Panduan" prefix!`;
    } else if (documentType === "Artikel Referensi") {
      docPrompt = `${metadataIntro}
Buatkan Artikel Referensi / Bahan Bacaan Penunjang Literasi Guru dan Siswa Berbasis Kurikulum Merdeka.

SPESIFIKASI PENULISAN ARTIKEL:
- Gaya Bahasa Penulisan: ${artikelGaya || 'Sains Populer & Edukatif Menyenangkan'}
- Target Pembaca Utama: ${artikelTarget || 'Keduanya (Guru & Siswa)'}
- Fokus Literasi Pembahasan: ${artikelFokus || 'Aplikasi Praktis Kehidupan Nyata & Miskonsepsi'}
Mata Pelajaran: ${mataPelajaran}
Fase/Kelas: ${kelas}
Topik Pembahasan: ${topik}

Sajikan naskah bahan bacaan literasi bermuara sains populer ini dalam komposisi 4 bagian pokok berikut:

### I. JUDUL ARTIKEL PERSUASIF & ATRAKTIF
(Susunlah judul artikel referensi yang menggugah keinginan tahu, relevan dengan materi ${topik} serta target pembaca: "${artikelTarget}").

### II. BAB I: PENDAHULUAN & DIALEKTIKA KONTEKSTUAL (THE HOOK)
(Ulas latar belakang pembacaan mengapa konsep ${topik} sangat penting dipelajari di abad ke-21, dikaitkan dengan fenomena empiris kehidupan sehari-hari).

### III. BAB II: EKSPLORASI DAN KAJIAN INTISARI TEORITIS (THE CORE KNOWLEDGE)
(Sajikan pemaparan konsep esensial yang mendalam menggunakan gaya "${artikelGaya}" dan fokus pada "${artikelFokus}". Berikan analogi konkret yang membekas, studi kasus bebas prasangka, dan penjelasan komprehensif, tidak disingkat-singkat).

### IV. BAB III: BEDAH MISKONSEPSI & FAQ TANYA JAWAB KRITIS
(Sediakan minimal 3 pertanyaan tingkat tinggi (HOTS) beserta kupasan jawabannya mengenai miskonsepsi yang sering dialami oleh siswa/guru tentang materi ${topik}).

### V. BAB IV: LEMBAR INDEKS KATA KUNCI (GLOSARIUM SAKU)
(Tampilkan glosarium saku berisi minimal 4 terminologi kosakata keilmuan penting dari artikel tersebut beserta definisinya secara gamblang).

Format dalam Markdown dengan hierarki yang indah, mendalam, kaya muatan literasi, dan mencerdaskan.`;
    } else {
      docPrompt = `${metadataIntro}
Buatkan dokumen administrasi Kurikulum Merdeka untuk:
Mata Pelajaran: ${mataPelajaran}
Kelas: ${kelas}
Topik: ${topik}
Tipe Dokumen: ${documentType}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: docPrompt,
      config: {
        systemInstruction: "Anda adalah pakar kurikulum pendidikan di Indonesia khususnya Kurikulum Merdeka Kemendikdasmen dan Kemenag RI. Anda selalu menyusun dokumen administrasi guru dengan akurasi akademis yang tinggi, praktis untuk dibaca, detail, tidak disingkat-singkat, dan sesuai dengan standar administrasi guru profesional terbaru (permendikdasmen). Gunakan format Markdown yang sangat rapi. JANGAN PERNAH menggunakan baris baru (newline / \\n) di dalam satu sel tabel markdown karena akan merusak format parsing tabel kami. Selalu gunakan tag `<br>` atau `<br><br>` untuk membuat baris baru di dalam sel tabel markdown. JANGAN pernah menyertakan bagian kolom/baris tanda tangan (seperti [Mengetahui, Kepala Sekolah] atau garis bawah nama) di akhir dokumen, karena sistem kami akan mendeteksinya secara otomatis dan menyusun lembar pengesahan tanda tangan tersendiri yang sangat rapi di bagian paling akhir halaman.",
        temperature: 0.7,
      },
    });

    const markdownText = response.text || "Gagal menghasilkan dokumen.";
    res.json({ success: true, text: markdownText });
  } catch (err: any) {
    console.error("Gemini Generation Error:", err);
    res.status(500).json({ error: err.message || "Gagal menghasilkan dokumen pembelajaran." });
  }
});

// Configure Vite middleware in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
