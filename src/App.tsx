import React, { useState, useRef, useEffect } from "react";
import { 
  BookOpen, 
  Heart, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Users, 
  ChevronDown, 
  Check, 
  ArrowRight, 
  Play, 
  Download, 
  Copy, 
  Printer, 
  FileText, 
  Sparkles, 
  Palette,
  X, 
  Star, 
  HelpCircle, 
  Menu, 
  Clock, 
  Award, 
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
  Send,
  Shield,
  Sparkle,
  Upload,
  Image,
  Trash2
} from "lucide-react";
import { SUBJECTS, GRADES, FEATURES, COMPARISONS, FAQS } from "./data";
import { DocumentType } from "./types";
import { MarkdownRenderer, DocThemeId, DOC_THEMES } from "./components/MarkdownRenderer";
import { AccessGuard } from "./components/AccessGuard";
import { AdminPanel } from "./components/AdminPanel";

// Fallback high-quality pre-baked document for offline demo mode
// Fallback dynamic high-quality document generator for offline demo mode
function generateDynamicDemoDocument(
  selectedDoc: string,
  selectedSubject: string,
  selectedGrade: string,
  topic: string,
  detailMateri: string,
  jenjang: string,
  kelas: string,
  fase: string,
  semester: string,
  alokasiWaktu: string,
  modelPembelajaran: string,
  tujuanPembelajaran: string,
  selectedProfil: string[],
  namaSekolah: string,
  namaGuru: string,
  nipGuru: string,
  namaKepsek: string,
  nipKepsek: string,
  tempatTeks: string,
  tanggalTeks: string,
  // Custom type specific options
  asesmenTipe: string,
  asesmenBentukSoal: string,
  asesmenJumlahSoal: string,
  asesmenLevelKognitif: string,
  jurnalTanggal: string,
  jurnalJumlahSiswa: string,
  jurnalKejadianPenting: string,
  jurnalTindakLanjut: string,
  analisisElemen: string,
  analisisAtpSasaran: string,
  analisisTargetKkm: string,
  lkpdModelGame: string,
  lkpdKelompok: string,
  lkpdMedia: string,
  artikelGaya: string,
  artikelTarget: string,
  artikelFokus: string
): string {
  const subjectLower = selectedSubject.toLowerCase();
  const kelasOnly = selectedGrade.split(" - ")[0] || kelas;
  const faseOnly = selectedGrade.split(" - ")[1] || fase;
  const tps = tujuanPembelajaran.trim() 
    ? tujuanPembelajaran.split("\n").map(t => t.trim()).filter(Boolean)
    : [
        `Memahami konsep esensial dan aplikasi praktis dari materi ${topic}.`,
        `Menganalisis permasalahan kontekstual sehari-hari yang berkaitan dengan ${topic}.`,
        `Mengembangkan karakter gotong royong dan berpikir kritis melalui diskusi kelompok tentang ${topic}.`
      ];

  // Subject-specific knowledge helpers
  let apersepsiText = "";
  let kegiatanMemahami = "";
  let kegiatanMengaplikasi = "";
  let lkpdStimulus = "";
  let lkpdAktivitas1 = "";
  let lkpdAktivitas2 = "";
  let lkpdAktivitas3 = "";
  let artikelJudul = "";
  let artikelIsi = "";
  let asesmenSoal1 = "";
  let asesmenSoal2 = "";
  let asesmenSoal3 = "";
  let asesmenSoal4 = "";
  let asesmenSoal5 = "";
  let asesmenEsai1 = "";
  let asesmenEsai2 = "";
  let kunciJawabanText = "";

  if (subjectLower.includes("sasak")) {
    apersepsiText = `• **Krama & Basa Alus:** Guru mengucapkan salam khas Sasak: "Silaq batur-batur, asalamu alaikum." Guru menanyakan kosa kata santun sehari-hari seperti *padiq*, *tiang*, *meriki*, dan *lunggoq*.\n• **Diskusi:** Tanya-jawab interaktif membedakan tingkatan Basa Sasak yaitu Basa Alus (singgih, madia) dan Basa Kasar/Kepara untuk melatih sopan santun pekerti akhlak luhur.`;
    kegiatanMemahami = `Guru menjelaskan materi tingkatan bahasa Sasak dan penggunaannya di keluarga (anak ke orang tua, atau sebaliknya). Siswa membaca teks sastra/bacaan pendek berbahasa Sasak dan mengidentifikasi kosa kata alus yang terkandung di dalamnya.`;
    kegiatanMengaplikasi = `Peserta didik bermain peran (roleplay) berpasangan mempraktikkan dialog santun bertamu (*selabar*) menggunakan Basa Sasak Alus. Mengadakan kuis kelompok menebak arti pepatah atau perumpamaan Sasak (*sesenggakan*).`;
    lkpdStimulus = `Wacana Cerita Rakyat Suku Sasak: "Dewandini jaya ring gumi Lombok". Teks menceritakan tentang tata krama berkomunikasi dengan sesama batur atau orang tua menggunakan tingkatan bahasa yang tepat (*basa alus*) sesuai krama kesantunan Suku Sasak.`;
    lkpdAktivitas1 = `Artikan kosa kata berikut dari Basa Sasak Alus ke dalam Bahasa Indonesia:\n  1. Tiang\n  2. Lunggoq\n  3. Meriki\n  4. Nunas`;
    lkpdAktivitas2 = `Buatlah naskah percakapan pendek (4 baris dialog) antara seorang anak (memakai Basa Alus) dengan ayahnya saat meminta izin berangkat ke sekolah!`;
    lkpdAktivitas3 = `Tuliskan nilai luhur budi pekerti atau moral apa saja yang terkandung dalam adat kesantunan berbicara masyarakat Sasak sehari-hari!`;
    artikelJudul = `Revitalisasi Basa Sasak: Menjaga Identitas dan Krama Kesantunan Generasi Muda Lombok`;
    artikelIsi = `Bahasa Sasak bukan sekadar alat komunikasi masyarakat di Pulau Lombok, melainkan wadah penyimpan nilai etika, norma, dan krama spiritual yang luhur. Di dalam Bahasa Sasak terdapat tingkatan kebahasaan (basa alus singgih, madia, dan kepara) yang berfungsi melatih murid bersikap tawadhu', menghormati orang tua, dan menghargai sesama batur pembelajar.\n\nMempelajari Muatan Lokal Bahasa Sasak membantu memperkuat karakter Profil Pelajar Pancasila yang berkebinekaan global sekaligus mencintai kearifan lokal. Dengan melestarikan kosa kata santun sastra daerah, kita menjaga pondasi peradaban bangsa agar tetap kokoh di tengah arus modernisasi global.`;
    asesmenSoal1 = `Kata 'Tiang' dalam tingkatan Bahasa Sasak Alus memiliki arti...\n   A. Kamu\n   B. Saya\n   C. Dia\n   D. Kita`;
    asesmenSoal2 = `Tingkatan bahasa Sasak yang digunakan saat berbicara dengan orang tua atau tokoh adat yang kita hormati adalah...\n   A. Basa Alus Senggih/Singgih\n   B. Basa Kepara/Kasar\n   C. Basa Jao\n   D. Basa Gaul`;
    asesmenSoal3 = `Kata 'Silaq meriki' merupakan ungkapan santun Sasak yang berarti...\n   A. Silakan pulang\n   B. Silakan mari ke sini\n   C. Silakan makan\n   D. Silakan tidur`;
    asesmenSoal4 = `Peribahasa Sasak 'Kemos bungkut' atau krama kesantunan memiliki muatan nilai utama...\n   A. Individualisme\n   B. Keramahan dan senyum ketulusan\n   C. Kesombongan diri\n   D. Kemalasan belajar`;
    asesmenSoal5 = `Manakah penulisan kalimat di bawah ini yang menggunakan kata ganti hormat Sasak yang tepat?\n   A. Tiang nunas pamit beron jaoq\n   B. Tiang lalo kemos gumi\n   C. Silaq lunggoq dunian tiang\n   D. Lunggoq niki deket batur`;
    asesmenEsai1 = `Sebutkan dan jelaskan 3 tingkatan bahasa dalam tata krama masyarakat Suku Sasak di Lombok!`;
    asesmenEsai2 = `Mengapa melestarikan bahasa Sasak dan adat-istiadat kesantunan (*krama*) merupakan wujud nyata dari keimanan dan akhlak mulia dalam mencintai tanah air? Jelaskan pandangan kelompokmu!`;
    kunciJawabanText = `Pilihan Ganda:\n1. B (Tiang = Saya)\n2. A (Basa Alus Singgih untuk menghormati orang tua/tokoh/raja)\n3. B (Silaq meriki = Silakan mari ke sini)\n4. B (Keramahan dan kesantunan bersosialisasi)\n5. A (Tiang nunas pamit... = Saya memohon pamit...)\n\nEsai:\n1. Tingkatan bahasa Sasak meliputi:\n   a. Basa Alus Singgih (tingkatan tertinggi untuk menghormati orang tua/tokoh/raja).\n   b. Basa Alus Madia (tingkatan menengah netral santun).\n   c. Basa Kepara (tingkatan sehari-hari dengan sebaya/akrab).\n2. Melestarikan bahasa Sasak melestarikan warisan peradaban, mengajarkan nilai-nilai adab kesopanan mulia (akhlakul karimah), menghindarkan ucapan kasar, serta mempertebal jati diri kebudayaan daerah.`;
  } else if (subjectLower.includes("matematik")) {
    apersepsiText = `• **Eksplorasi Suhu & Langkah:** Guru memberikan 2 pemantik konkret di papan tulis:\n  1. "Suhu di puncak gunung Merbabu mencapai 3 derajat di bawah nol, sedangkan di lereng adalah 25 derajat."\n  2. "Seorang penyelam menyelam 10 meter di bawah permukaan laut."\n• **Diskusi:** Tanya-jawab interaktif mengenai lambang bilangan bulat negatif dan positif untuk membedakan arah berlawanan secara matematis.`;
    kegiatanMemahami = `Guru memutar media interaktif garis bilangan. Peserta didik secara berkelompok mengamati pergerakan operasi penjumlahan (maju) dan pengurangan (mundur). Guru membimbing konsep nilai mutlak dan arah hitung agar menghindari miskonsepsi dasar.`;
    kegiatanMengaplikasi = `Siswa berpasangan mengerjakan LKPD interaktif game "Lift Kota Pekanbaru" & "Kartu Warna Positif Negatif". Selipkan Ice Breaking "Fokus Matematika" (Tepuk kelipatan angka). Perwakilan mempresentasikan letak bilangan bulat di papan tulis.`;
    lkpdStimulus = `Bayangkan sebuah lift gedung berantai tinggi di pusat kota Jakarta. Jika kita berada di lantai dasar (Lobby) kemudian turun ke lahan parkir bawah tanah sedalam 3 lantai, di manakah posisi tombol lift kita sekarang berada pada sumbu tegak?`;
    lkpdAktivitas1 = `Gambarkan letak posisi lift di atas pada sumbu garis bilangan vertikal! Berikan tanda titik tebal pada posisi akhir.`;
    lkpdAktivitas2 = `Selesaikan masalah hitung berikut:\nSuhu ruangan laboratorium IPA mula-mula adalah -5°C. Karena AC dimatikan, suhu ruangan tersebut naik sebesar 12°C setiap 30 menit. Berapakah suhu ruangan tersebut setelah 1 jam AC dimatikan?`;
    lkpdAktivitas3 = `Tuliskan apa kesimpulanmu mengenai hubungan antara tanda penjumlahan (+) dengan operasi melangkah maju, serta pengurangan (-) dengan melangkah mundur!`;
    artikelJudul = `Menyingkap Rahasia Bilangan Bulat dan Negatif dalam Peradaban Manusia`;
    artikelIsi = `Bilangan bulat, khususnya konsep bilangan negatif, sempat ditolak selama berabad-abad dalam sejarah matematika karena dianggap 'tidak logis'. Bagaimana mungkin ada kuantitas yang nilainya kurang dari kosong? Pertanyaan ini akhirnya terjawab ketika kebutuhan perdagangan dan akuntansi modern berkembang. Bilangan negatif mewakili konsep hutang, penurunan suhu di bawah titik beku, ketinggian di bawah permukaan laut, atau posisi relatif dari suatu koordinat acuan.\n\nMemahami bilangan bulat sejatinya melatih kemampuan abstraksi kognitif yang sangat tinggi bagi siswa. Kita belajar bahwa matematika bukan hanya benda konkret yang bisa dihitung dengan jari, melainkan sebuah gagasan relasional terstruktur yang membantu manusia memodelkan dimensi ruang dan keteraturan alam semesta.`;
    asesmenSoal1 = `Hasil dari -12 + ( -8 ) - ( -15 ) adalah...\n   A. -5\n   B. -15\n   C. 5\n   D. -35`;
    asesmenSoal2 = `Suhu di dalam freezer adalah -18°C. Suhu di luar ruangan adalah 32°C. Selisih suhu freezer dengan suhu ruangan adalah...\n   A. 14°C\n   B. 50°C\n   C. -50°C\n   D. -14°C`;
    asesmenSoal3 = `Tono melangkah 8 langkah ke kanan dari titik nol, kemudian berbalik arah dan melangkah 15 langkah ke kiri. Posisi Tono sekarang berada di titik...\n   A. 23\n   B. 7\n   C. -7\n   D. -23`;
    asesmenSoal4 = `Pada sebuah kuis, jawaban benar diberi skor 4, jawaban salah diberi skor -2, dan tidak dijawab diberi skor -1. Dari 40 soal, Rian menjawab benar 30 soal, salah 6 soal, dan sisanya tidak dijawab. Skor total Rian adalah...\n   A. 108\n   B. 104\n   C. 100\n   D. 112`;
    asesmenSoal5 = `Pecahan desimal dari bilangan bulat rasional -3/4 adalah...\n   A. -0.75\n   B. -0.50\n   C. 0.75\n   D. -0.25`;
    asesmenEsai1 = `Seekor burung camar terbang pada ketinggian 15 meter di atas permukaan laut. Di bawahnya tepat, seekor lumba-lumba berenang pada kedalaman 8 meter di bawah permukaan laut. Gambarkan kondisi tersebut dan hitunglah selisih jarak vertikal antara burung camar dengan lumba-lumba!`;
    asesmenEsai2 = `Jelaskan mengapa hasil perkalian antara bilangan negatif dengan bilangan negatif lainnya akan menghasilkan bilangan positif! Berikan analisis logika analogi sehari-hari!`;
    kunciJawabanText = `Pilihan Ganda:\n1. A ( -12 - 8 + 15 = -20 + 15 = -5)\n2. B ( 32 - (-18) = 32 + 18 = 50°C)\n3. C ( 8 - 15 = -7)\n4. B ( (30x4) + (6x-2) + (4x-1) = 120 - 12 - 4 = 104)\n5. A ( -3/4 = -0.75)\n\nEsai:\n1. Selisih jarak = Ketinggian - Kedalaman = 15 - (-8) = 15 + 8 = 23 meter.\n2. Analogi: 'Mengingkari (-)' suatu 'kebohongan (-)' berarti kita menyetujui kebenaran (+). Atau, membatalkan hutang seorang siswa berarti memberikan pemasukan senilai hutang tersebut kepada yang bersangkutan.`;
  } else if (subjectLower.includes("indonesia") || subjectLower.includes("bahasa")) {
    apersepsiText = `• **Fakta vs Opini Sehari-Hari:** Guru menuliskan 2 kalimat di papan tulis:\n  1. "Ibu kota Provinsi Jawa Barat terletak di Kota Bandung."\n  2. "Kota Bandung adalah kota paling indah dan nyaman di Indonesia."\n• **Diskusi:** Guru meminta perwakilan siswa maju memberi tanda cek untuk kalimat yang bersifat obyektif nyata dan mana yang subyektif pendapat orang.`;
    kegiatanMemahami = `Peserta didik membaca teks berita atau ulasan sastra secara berkelompok (2 orang). Guru memberikan instruksi untuk menganalisis kalimat yang memiliki data valid pendukung (Fakta) dan kalimat yang sarat kata sifat subyektif (Opini).`;
    kegiatanMengaplikasi = `Siswa memotong kolom opini surat kabar. Selipkan Ice Breaking "Komunikator Cerdas" untuk mencairkan suasana. Perwakilan membacakan hasil temuannya ke depan kelas, sementara kelompok lain menyanggah dengan argumen logis ilmiah.`;
    lkpdStimulus = `Bacalah kutipan berita berikut tentang peluncuran rute bus listrik ramah lingkungan baru di koridor kota kita yang dinilai sangat menghemat waktu perjalanan namun dikritik oleh sebagian sopir angkot lokal.`;
    lkpdAktivitas1 = `Identifikasikan minimal 2 kalimat yang merupakan FAKTA murni berdasarkan berita tersebut! Berikan bukti penanda kalimatnya!`;
    lkpdAktivitas2 = `Temukan minimal 2 kalimat yang mengandung OPINI masyarakat atau sudut pandang sepihak dalam teks berita tersebut!`;
    lkpdAktivitas3 = `Susunlah sebuah paragraf singkat (3-4 kalimat) yang secara teratur mengabungkan unsur fakta empiris dengan opini pribadimu secara santun tentang kegunaan transportasi umum!`;
    artikelJudul = `Literasi Informasi: Menavigasi Fakta dan Opini di Belantara Media Sosial`;
    artikelIsi = `Di era limpahan informasi digital (information overload), kemampuan membedakan fakta seketika dari sekadar opini subyektif adalah keterampilan 'survival' kognitif yang mutlak dikuasai oleh generasi muda. Banyak pengguna internet terjebak dalam bias konfirmasi karena tidak mampu memisahkan opini provokatif di media sosial dengan kebenaran faktual didasarkan data sahih.\n\nFakta bersifat mutlak, obyektif, dapat diverifikasi, dan tidak bergantung pada perasaan pengamatnya. Sebaliknya, opini bersifat subyektif, mencerminkan emosi, penilaian, atau keyakinan yang bervariasi dari tiap individu. Sebagai pembelajar Bahasa Indonesia yang bijak, mempelajari materi ini membekali kita untuk menjadi pembaca yang kritis (critical reader) sekaligus produser tulisan yang jujur, santun, dan bertanggung jawab demi kelangsungan ekosistem komunikasi nasional yang sehat.`;
    asesmenSoal1 = `Manakah kalimat di bawah ini yang merupakan kalimat FAKTA obyektif?\n   A. Gunung Rinjani adalah tempat wisata terindah di Pulau Lombok\n   B. Indonesia memperingati Hari Kemerdekaan setiap tanggal 17 Agustus\n   C. Pembelajaran IPA sangat membosankan jika tidak ada praktikum\n   D. Kurikulum Merdeka dirasa terlalu menyulitkan para guru senior`;
    asesmenSoal2 = `Manakah kata kunci yang sering menjadi penanda sebuah OPINI?\n   A. Menurut data, tercatat, dilaporkan\n   B. Terletak, berukuran, tanggal\n   C. Sangat, sepertinya, terbaik, mungkin\n   D. Sesuai undang-undang, diresmikan`;
    asesmenSoal3 = `Perhatikan kalimat berikut: 'Pemerintah meresmikan rute MRT baru sepanjang 15 KM yang sangat indah.' Kalimat tersebut mengandung unsur...\n   A. Fakta saja\n   B. Opini saja\n   C. Fakta di awal, opini di akhir\n   D. Opini di awal, fakta di akhir`;
    asesmenSoal4 = `Tujuan utama dari membaca kritis sebuah teks opini di surat kabar adalah...\n   A. Untuk menghafal seluruh isi tulisan pengarang\n   B. Untuk membedakan mana kebenaran empiris dan mana sudut pandang subyektif penulis\n   C. Untuk menyetujui semua saran penulis tanpa tapi\n   D. Meningkatkan kecepatan membaca kilat`;
    asesmenSoal5 = `Kalimat berikut yang merupakan OPINI adalah...\n   A. Suhu air mendidih pada tekanan normal adalah 100°C\n   B. Matematika diajarkan di jenjang SD, SMP, hingga SMA\n   C. Membaca buku fiksi lebih bermanfaat daripada bermain video game\n   D. Borobudur merupakan candi Buddha peninggalan Dinasti Syailendra`;
    asesmenEsai1 = `Buatlah contoh satu paragraf berisi fakta murni tentang sekolahmu saat ini, kemudian buatlah pula paragraf opini subyektif tentang kegiatan ekstrakurikuler favoritmu!`;
    asesmenEsai2 = `Mengapa hoax atau berita palsu di internet sering kali menyamar dalam bentuk kalimat opini yang mengatasnamakan fakta? Bagaimana langkah taktis Anda sebagai pelajar untuk mengidentifikasinya?`;
    kunciJawabanText = `Pilihan Ganda:\n1. B (Kemerdekaan RI 17 Agustus adalah fakta sejarah mutlak)\n2. C (Sangat, sepertinya, terbaik adalah kata sifat subyektif)\n3. C ('Pemerintah meresmikan rute MRT... 15 KM' (Fakta), 'yang sangat indah' (Opini))\n4. B (Membedakan empiris dan subjektif)\n5. C (Kemanfaatan buku fiksi dibanding game adalah pendapat subyektif)\n\nEsai:\n1. Contoh Fakta: SDN 4 Sandik memiliki 12 ruang kelas dan berlokasi di Jalan Pendidikan. Contoh Opini: Kegiatan pramuka hari Sabtu adalah kegiatan paling menyenangkan dibandingkan ekskul lainnya.\n2. Hoaks menyamar sebagai opini emosional agar menarik perhatian khalayak. Langkah identifikasi: Cek keaslian sumber, bandingkan dengan portal berita tepercaya, saring bias emosi, cari data statistik pendukung.`;
  } else if (subjectLower.includes("alam") || subjectLower.includes("ipa") || subjectLower.includes("sains")) {
    apersepsiText = `• **Ekosistem & Ciri Hidup:** Guru menunjukkan 2 objek nyata di meja:\n  1. Selongsong kerikil putih mati dari halaman sekolah.\n  2. Wadah kecil berisi bibit kacang hijau yang sedang bertunas aktif.\n• **Diskusi:** Tanya-jawab mengenai apa saja komponen biotik (hidup) dan abiotik (tak hidup) yang membedakan keduanya secara ilmiah.`;
    kegiatanMemahami = `Peserta didik melakukan kualifikasi sederhana mengenai biotik dan abiotik di sekeliling wilayah taman luar sekolah. Guru memberikan penajaman teori interaksi antar-spesies dan kesatuan ekologis utuh.`;
    kegiatanMengaplikasi = `Siswa bekerjasama melengkapi pemetaan LKPD ekosistem. Selipkan Ice Breaking "Simbiosis Klasifikasi" (mencari teman sesuai rantai energi makanan ketika diteriakkan).`;
    lkpdStimulus = `Amatilah kondisi taman sekolah atau area kebun belakang rumahmu. Di sana terdapat berbagai objek seperti cacing tanah, rumput liar, semut hitam, batu kali, tanah basah, dan genangan air hujan kecil.`;
    lkpdAktivitas1 = `Kelompokkan seluruh objek yang Anda temukan ke dalam tabel komponen abiotik (benda tak hidup) dan komponen biotik (makhluk hidup)!`;
    lkpdAktivitas2 = `Pilihlah salah satu makhluk hidup yang Anda temukan, lalu jelaskan bagaimana cara makhluk hidup tersebut beradaptasi dengan lingkungan abiotik di sekitarnya untuk bertahan hidup!`;
    lkpdAktivitas3 = `Uraikan apa yang akan terjadi apabila seluruh komponen abiotik air di taman tersebut hilang atau mengalami kekeringan ekstrem terhadap populasi tumbuhan dan cacing tanah!`;
    artikelJudul = `Simbiosis Harmoni: Menjaga Keseimbangan Komponen Biotik dan Abiotik di Bumi`;
    artikelIsi = `Alam semesta bekerja dalam sebuah sistem interaksi yang sangat rumit dan indah. Komponen biotik (seluruh makhluk bernyawa seperti tumbuhan, hewan, fungi, dan mikroba) tidak akan pernah dapat bertahan hidup tanpa ditopang oleh komponen abiotik (tanah, air, udara, cahaya matahari, dan suhu ideal). Hubungan timbal balik ini membentuk apa yang kita sebut sebagai ekosistem.\n\nKerusakan satu komponen abiotik, misalnya pencemaran sumber air tawar oleh limbah kimia berbahaya, akan memicu efek domino yang menghancurkan seluruh ekosistem biotik air tawar. Mempelajari Sains IPA bukan hanya untuk menghafal istilah latin, melainkan menanamkan rasa kagum yang mendalam atas kompleksitas ciptaan Tuhan, serta memicu kesadaran ekologis murid untuk menjaga lingkungan hidup mulai dari hal terkecil sehari-hari secara berkelanjutan.`;
    asesmenSoal1 = `Manakah yang merupakan kelompok komponen ABIOTIK di dalam suatu ekosistem?\n   A. Cacing, bakteri, rumput liar\n   B. Tanah, air, kelembapan, udara\n   C. Capung, sinar matahari, semut\n   D. Tanaman padi, ulat daun, katak sawah`;
    asesmenSoal2 = `Ciri makhluk hidup yang ditunjukkan dengan tanaman putri malu menutup daunnya saat disentuh adalah...\n   A. Memerlukan makanan\n   B. Peka terhadap rangsang (Iritabilitas)\n   C. Mengeluarkan zat sisa\n   D. Berkembang biak`;
    asesmenSoal3 = `Peran produsen dalam rantai makanan darat adalah mengubah energi matahari menjadi energi kimia yang siap dikonsumsi, peran ini dipegang oleh...\n   A. Konsumen tingkat I (Ulat)\n   B. Tumbuhan hijau (Klorofil)\n   C. Bakteri pengurai tanah\n   D. Predator puncak (Elang)`;
    asesmenSoal4 = `Simbiosis komensalisme ditunjukkan oleh pola interaksi antara...\n   A. Kutu kepala pada rambut manusia\n   B. Tanaman anggrek pohon besar yang ditumpanginya\n   C. Lebah madu dengan bunga mangga\n   D. Kucing peliharaan dengan anjing liar`;
    asesmenSoal5 = `Apa dampak ekologi utama dari penggunaan pestisida kimia berlebih secara terus-menerus di sawah?\n   A. Tanah sawah menjadi semakin subur\n   B. Matinya predator alami hama dan pencemaran tanah/air\n   C. Hasil panen padi meningkat tanpa batas\n   D. Rantai makanan berjalan seimbang`;
    asesmenEsai1 = `Jelaskan apa perbedaan mendasar antara mekanisme pernapasan dada dengan pernapasan perut pada manusia berdasarkan kerja otot tulang rusuk dan diafragma!`;
    asesmenEsai2 = `Uraikan secara ilmiah bagaimana pemanasan global (global warming) akibat efek rumah kaca dapat mempengaruhi kelangsungan hidup terumbu karang di bawah laut!`;
    kunciJawabanText = `Pilihan Ganda:\n1. B (Tanah, air, udara adalah abiotik)\n2. B (Kemampuan putri malu peka rangsang)\n3. B (Tumbuhan hijau produsen utama fototsintesis)\n4. B (Anggrek diuntungkan, pohon tidak rugi dan tidak untung)\n5. B (Pestisida merusak rantai ekologis)\n\nEsai:\n1. Pernapasan dada melibatkan otot antar tulang rusuk berkontraksi sehingga dada membesar. Pernapasan perut melibatkan kontraksi otot diafragma yang memicu rongga dada beranjak datar.\n2. Suhu laut naik akibat pemanasan global membunuh alga zooxanthellae yang bersimbiosis dengan koral. Mengakibatkan pemutihan karang (coral bleaching) massal yang merusak habitat ikan.`;
  } else {
    apersepsiText = `• **Studi Kasus Kontekstual:** Guru mengarahkan perhatian peserta didik pada fenomena aktual/gambar/masalah sehari-hari yang relevan dengan topik ${topic}.\n• **Diskusi Pertanyaan Pemantik:** Guru menanyakan 2 hal menantang untuk merangsang rasa kesadaran, rasa penasaran kritis siswa terhadap topik tersebut.`;
    kegiatanMemahami = `Peserta didik membaca stimulasi teoretis. Guru menjelaskan konsep esensial materi secara lugas menggunakan diagram visual di papan tulis. Memberi penguatan kompetensi siswa.`;
    kegiatanMengaplikasi = `Siswa bekerjasama berkelompok memecahkan masalah kontekstual praktis di LKPD. Melaksanakan Ice Breaking seru untuk menyegarkan suasana belajar. Perwakilan memaparkan resume di depan kelas secara bangga.`;
    lkpdStimulus = `Perhatikan lembar stimulus kontekstual bertema ${topic} yang telah disiapkan. Pikirkan bagaimana fenomena ini terjadi di sekitarmu!`;
    lkpdAktivitas1 = `Identifikasi dan tuliskan minimal 3 temuan penting yang Anda saksikan pada stimulasi di atas berkaitan dengan materi pokok kita!`;
    lkpdAktivitas2 = `Analisis dan rumuskan solusi inovatif yang konseptual bersama rekan kelompok Anda untuk mengatasi tantangan yang dideskripsikan pada masalah tersebut!`;
    lkpdAktivitas3 = `Lakukan refleksi singkat: Hal berharga apa saja yang berhasil kelompok Anda pahami hari ini tentang materi ${topic}? Dan bagaimana cara penerapannya di masa depan?`;
    artikelJudul = `Eksplorasi Mendesak dan Pemahaman Integratif Mengenai ${topic}`;
    artikelIsi = `Mempelajari materi ${topic} sejatinya membekali kita untuk berpikir analitis, berkarakter luhur, dan sensitif terhadap dinamika kehidupan sosial serta lingkungan fisik. Pengetahuan teoritis tidaklah cukup tanpa dibarengi kecakapan praktis untuk mengaplikasikannya di dunia nyata secara adil, kreatif, dan gotong royong.\n\nMelalui pemahaman kurikulum merdeka yang berfokus pada materi esensial mendalam, siswa tidak sekadar didorong mengejar nilai angka ujian, melainkan dibimbing menumbuhkan minat belajar sepanjang hayat (lifelong learning). Kemauan untuk terus bereksplorasi, bertanya kritis, dan mengevaluasi pengalaman belajar adalah bekal utama untuk menjadi cendekiawan masa depan yang berdaya saing global dan berakhlak mulia.`;
    asesmenSoal1 = `Manakah pernyataan di bawah ini yang paling tepat menggambarkan urgensi dari materi ${topic}?\n   A. Untuk dihafal sebagai materi ujian saja\n   B. Untuk melatih pemahaman rasional, kritis, dan berfaidah sehari-hari\n   C. Untuk sekadar formalitas isi administrasi sekolah\n   D. Mengetahui nama-nama ilmuwan tanpa paham konsep`;
    asesmenSoal2 = `Bagaimana sikap yang benar saat bekerja tim menyelesaikan tugas kelompok?\n   A. Mengerjakan semuanya sendiri tanpa mau membagi peran\n   B. Membiarkan teman yang pintar bekerja sendirian\n   C. Kolaborasi secara aktif penuh semangat kekeluargaan\n   D. Meninggalkan tugas kelompok bermain di luar`;
    asesmenSoal3 = `Langkah awal yang sistematis untuk menganalisis suatu permasalahan ilmiah adalah...\n   A. Langsung menyimpulkan hasil akhir\n   B. Melakukan observasi pengamatan lapangan secara saksama\n   C. Mengabaikan data pendukung tepercaya\n   D. Menolak pandangan baru yang logis`;
    asesmenSoal4 = `Manakah yang merupakan Profil Pelajar Pancasila yang dilatih saat menyelesaikan analisis kasus?\n   A. Sikap malas\n   B. Bernalar Kritis\n   C. Sifat provokatif\n   D. Individualistis`;
    asesmenSoal5 = `Tindakan pasca pembelajaran yang menunjukkan pemahaman bermakna adalah...\n   A. Melupakan semua materi setelah kuis selesai\n   B. Mengaplikasikannya untuk kebaikan bersama sehari-hari\n   C. Menyimpan buku pelajaran tanpa berniat membacanya lagi\n   D. Berkeluh kesah atas tugas sekolah`;
    asesmenEsai1 = `Tuliskan ulasan kritis singkat Anda mengenai implikasi penting dari topik ${topic} dalam kehidupan bermasyarakat atau kelestarian ekologi di daerah sekitarmu!`;
    asesmenEsai2 = `Jabarkan bagaimana rancang rencana tindakan mandiri nyata Anda setelah menguasai konsep ${topic} demi tercapainya kebaikan bersama di sekolah atau rumah!`;
    kunciJawabanText = `Pilihan Ganda:\n1. B (Melatih rasionalitas konseptual)\n2. C (Kolaborasi aktif dan setara)\n3. B (Observasi awal adalah pintu gerbang sains)\n4. B (Bernalar kritis adalah kompetensi lulusan utama)\n5. B (Aplikasi kebajikan nyata sehari-hari)\n\nEsai:\n1. Siswa menjelaskan urgensi pemahaman materi dikaitkan dengan kelestarian sosial/fisik daerah masing-masing secara objektif.\n2. Rencana tindakan nyata mencakup aksi logis, terarah, dan mendalam yang diaplikasikan kelompok secara terarah.`;
  }

  // Standalone LKPD Handlers
  if (selectedDoc === "LKPD Interaktif") {
    return `# LEMBAR KERJA PESERTA DIDIK (LKPD) INTERAKTIF PEMBELAJARAN AKTIF

**Mata Pelajaran:** ${selectedSubject}
**Fase / Kelas:** ${faseOnly} / ${kelasOnly}
**Topik / Materi Pokok:** ${topic}
**Alokasi Waktu:** ${alokasiWaktu}
**Metode & Media:** ${lkpdModelGame} (Media: ${lkpdMedia})
**Model Pengelompokan Kelas:** ${lkpdKelompok}

---

## 🎯 TUJUAN PEMBELAJARAN
Guru memandu agar peserta didik mampu mencapai kompetensi:
${tps.map((tp, idx) => `${idx + 1}. ${tp}`).join("\n")}

---

## 📺 LEMBAR STIMULUS AKTIF
${lkpdStimulus}

---

## 🏃 AKTIVITAS BELAJAR 1: Eksplorasi Konseptual (Menalar Kritis)
*Petunjuk: Jawablah pertanyaan di bawah ini dengan menganalisis isi kasus stimulus di atas!*

${lkpdAktivitas1}

**Ruang Coretan Jawaban Peserta Didik:**
<br><br><br><br>

---

## 🤝 AKTIVITAS BELAJAR 2: Tantangan Kolaboratif (${lkpdModelGame})
*Petunjuk kelompok: Selesaikan studi kasus di bawah ini dengan berdiskusi aktif bersama teman kelompok Anda (${lkpdKelompok})!*

${lkpdAktivitas2}

**Ruang Jawaban Pemecahan Masalah Bersama:**
<br><br><br><br>

---

## ✍️ AKTIVITAS BELAJAR 3: Refleksi & Konstruksi Simpulan Mandiri
*Petunjuk: Rangkumlah hasil pembelajaran Anda hari ini secara saksama.*

${lkpdAktivitas3}

**Simpulan Hasil Belajar:**
<br><br><br><br>

---

## 📊 RUBRIK PENILAIAN MANDIRI (SELF-ASSESSMENT)
*Isilah tanda cek (✓) sesuai dengan perasaan dan tingkat pemahaman riil Anda saat ini!*

| No. | Pernyataan Refleksi Pemahaman Diri | 😊 Masih Ragu-Ragu | 😊 Cukup Paham | 😊 Sangat Menguasai |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Saya memahami konsep esensial materi **${topic}** | | | |
| 2 | Saya mampu memecahkan studi kasus aplikatif pada Aktivitas 2 secara mandiri. | | | |
| 3 | Saya berkontribusi aktif dan bergotong-royong di dalam diskusi kelompok. | | | |
| 4 | Saya berani menyampaikan gagasan orisinal di hadapan guru dan rekan sekelas. | | | |`;
  }

  // Standalone Asesmen Lengkap Handlers
  if (selectedDoc === "Asesmen Lengkap") {
    return `# DOKUMEN INSTRUMEN ASESMEN & PEMBELAJARAN UTUH
**Mata Pelajaran:** ${selectedSubject}
**Fase / Kelas:** ${faseOnly} / ${kelasOnly}
**Topik / Materi:** ${topic}
**Kategori Asesmen:** ${asesmenTipe}
**Level Kognitif Sasaran:** ${asesmenLevelKognitif}
**Bentuk & Jumlah Soal:** ${asesmenJumlahSoal} (${asesmenBentukSoal})

---

## 📋 A. KISI-KISI ASESMEN SUMATIF TERMINAL IPK
| No. | Kompetensi / Indikator Capaian | Materi Esensial | Level Kognitif | Bentuk Soal | No. Soal | Bobot % |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Mengidentifikasi teori dasar dari topik bahasan. | ${topic} | L1 (Pemahaman) | Pilihan Ganda | 1, 2 | 30% |
| 2 | Mengaplikasikan prinsip materi untuk menyelesaikan masalah kontekstual. | ${topic} | L2 (Penerapan) | Pilihan Ganda | 3, 4 | 30% |
| 3 | Menganalisis studi kasus HOTS mendalam secara rasional. | ${topic} | L3 (Analisis) | Pilihan Ganda / Esai | 5, Esai 1 | 20% |
| 4 | Merancang solusi orisinal atau argumentasi kritis luhur. | ${topic} | L3 (Kreasi) | Esai Terbuka | Esai 2 | 20% |

---

## 🗃️ B. LAYOUT SOAL UTAMA PELAJARAN
**Petunjuk Umum:** Bacalah soal-soal di bawah ini dengan teliti sebelum memberikan jawaban terbaik Anda.

### I. Lembar Soal Pilihan Ganda (PG)
${asesmenBentukSoal.includes("Esai") && !asesmenBentukSoal.includes("Pilihan Ganda") ? "*Catatan: Format yang dipilih tidak menyertakan Pilihan Ganda murni, berikut disajikan soal pemahaman kritis sebagai gantinya.*" : ""}

#### 1. Pertanyaan Pilihan Ganda No. 1
${asesmenSoal1}

#### 2. Pertanyaan Pilihan Ganda No. 2
${asesmenSoal2}

#### 3. Pertanyaan Pilihan Ganda No. 3
${asesmenSoal3}

#### 4. Pertanyaan Pilihan Ganda No. 4
${asesmenSoal4}

#### 5. Pertanyaan Pilihan Ganda No. 5
${asesmenSoal5}

### II. Lembar Soal Uraian / Esai Terbuka
#### Soal Esai Mandiri 1
${asesmenEsai1}

#### Soal Esai Mandiri 2
${asesmenEsai2}

---

## 🔑 C. KUNCI JAWABAN & PEMBAHASAN MENDALAM GURU
${kunciJawabanText}

---

## 📐 D. RUBRIK PENILAIAN & PEDOMAN PENSKORAN AKHIR
| Bentuk Soal | Bobot Tiap Soal | Kriteria Penilaian Deskriptif | Skor Maksimal |
| :--- | :--- | :--- | :--- |
| **Pilihan Ganda** | 10 | Jawaban Benar = 10, Jawaban Salah = 0 | 50 (5 Soal) |
| **Esai Terbuka** | 25 | Penjabaran runtut, logis, menyertakan hipotesis ilmiah sahih, tata bahasa sopan | 50 (2 Soal) |

$$\text{Nilai Akhir Evaluasi} = \text{Total PG} + \text{Total Esai} = 100$$`;
  }

  // Standalone Jurnal Harian & Evaluasi Guru Handlers
  if (selectedDoc === "Jurnal Harian") {
    return `# JURNAL HARIAN DAN EVALUASI PELAKSANAAN PEMBELAJARAN
**Mata Pelajaran:** ${selectedSubject}
**Fase / Kelas:** ${faseOnly} / ${kelasOnly}
**Topik Pembelajaran:** ${topic}
**Nama Sekolah / Madrasah:** ${namaSekolah}
**Nama Pendidik:** ${namaGuru}
**Periode / Tanggal Pelaksanaan:** ${jurnalTanggal}

---

## 📋 I. TABEL JURNAL MENGAJAR HARIAN GURU
| No. | Hari / Tanggal | Jam Ke | Pertemuan | Capaian Pembelajaran / Elemen | Fokus Materi Pembelajaran | Kehadiran Siswa | Catatan Kejadian Penting di Kelas | Tindak Lanjut Guru (Solusi Praktis) |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | ${jurnalTanggal} | 1 - 2 | Ke-1 | Memahami dan mengaplikasikan keilmuan ${selectedSubject} pada topik esensial. | ${topic} | ${jurnalJumlahSiswa} | ${jurnalKejadianPenting} | ${jurnalTindakLanjut} ||

---

## 📝 II. LAPORAN EVALUASI PELAKSANAAN PEMBELAJARAN
### 1. Refleksi Aktivitas Mengajar Guru
- **Kesesuaian Waktu:** Penjadwalan alokasi waktu berjalan kondusif, didukung dengan manajemen ice breaking terpadu untuk menyegarkan suasana belajar.
- **Ketercapaian Model Ajar:** Model pembelajaran aktif berjalan lancar, siswa mampu merumuskan hipotesis kelompok dengan baik.
- **Kendala Teknis Lapangan:** Beberapa media pembelajaran memerlukan pendampingan intensif agar seluruh kelompok dapat memanfaatkannya secara merata.

### 2. Refleksi Belajar Peserta Didik (Student Feedback)
- **Aspek Kognitif:** Mayoritas siswa menunjukkan peningkatan tuntas berdasarkan hasil evaluasi sumatif akhir yang terekam.
- **Aspek Afektif:** Nilai gotong-royong dan berpikir kritis menguat ketika siswa bekerjasama berpasangan meluruskan tantangan LKPD.

---

## 🎯 III. ACTION PLAN: RENCANA TINDAK LANJUT (RTL) GURU
1. **Program Remedial (Bagi Siswa Belum Tuntas):** Melaksanakan pendampingan privat atau tutor sebaya menggunakan modul materi ringkas serta LKPD mandiri yang dipermudah.
2. **Program Pengayaan (Bagi Siswa Tuntas):** Memberikan studi kasus analitis yang lebih menantang (HOTS) serta bahan bacaan referensi ilmiah tambahan.
3. **Penyempurnaan Media Belajar:** Mengintegrasikan lebih banyak simulasi digital kontekstual dalam mendukung keterbacaan materi berikutnya.

---
**Tanda Tangan Pelaksanaan Tugas:**

Guru Kelas / Bidang Studi,  
**${namaGuru}**  
NIP. ${nipGuru || "-"}  

Mengetahui, Kepala Sekolah  
**${namaKepsek}**  
NIP. ${nipKepsek || "-"}`;
  }

  // Standalone Analisis CP & TP Handlers
  if (selectedDoc === "Analisis CP") {
    return `# ANALISIS CAPAIAN PEMBELAJARAN (CP) & TUJUAN PEMBELAJARAN (TP)
**Mata Pelajaran:** ${selectedSubject}
**Fase / Kelas:** ${faseOnly} / ${kelasOnly}
**Topik / Pokok Bahasan:** ${topic}
**Nama Sekolah:** ${namaSekolah}
**Target Kriteria Ketercapaian (KKTP):** Minimal ${analisisTargetKkm}
**Fokus Alur Sasaran:** ${analisisAtpSasaran}

---

## 📜 I. DEKONSTRUKSI CAPAIAN PEMBELAJARAN (CP) ELEMEN
**Elemen Fokus:** ${analisisElemen}
**Kalimat CP Elemen:** *Peserta didik mampu menganalisis kompetensi esensial, mengevaluasi fenomena ilmiah/sosial, serta mengintegrasikan pemahaman konsep ${topic} ke dalam kehidupan nyata secara bergotong royong dan bernalar kritis.*

---

## 🔍 II. ANALISIS KOMPETENSI & RUANG LINGKUP MATERI
| Aspek Kurikulum | Deskripsi Uraian Analisis Konseptual |
| :--- | :--- |
| **Kompetensi utama yang dilatih** | 1. Menganalisis konsep esensial topik ${topic}.<br>2. Mengevaluasi studi kasus kontekstual secara kritis.<br>3. Menyelesaikan tantangan praktis secara berpasangan. |
| **Ruang lingkup materi pokok** | 1. Pengenalan prinsip dasar materi ${topic}.<br>2. Identifikasi contoh fakta empiris di sekitar siswa.<br>3. Pemecahan masalah aplikatif dan konseptual terstruktur. |

---

## 🎯 III. PERUMUSAN TUJUAN PEMBELAJARAN (TP)
Berdasarkan hasil pemetaan kompetensi dan materi, dirumuskan Tujuan Pembelajaran (TP) sebagai berikut:
- **TP 1:** Peserta didik mampu menjelaskan konsep dasar ${topic} secara logis dan ilmiah.
- **TP 2:** Peserta didik mampu mengidentifikasi fakta murni dan menyaring bias/opini terkait materi ${topic} di kehidupan sehari-hari.
- **TP 3:** Peserta didik mampu memformulasikan solusi taktis nan inovatif atas permasalahan kontekstual ${topic}.

---

## 🗺️ IV. TABEL ALUR TUJUAN PEMBELAJARAN (ATP) & ALOKASI WAKTU
| Kode TP | Tujuan Pembelajaran (TP) | Alur Kegiatan & Strategi Pembelajaran | Alokasi Waktu | Asesmen Pembelajaran |
| :--- | :--- | :--- | :--- | :--- |
| **ATP 1** | Mengidentifikasi konsep awal dan elemen dasar terkait **${topic}**. | Kajian literatur interaktif, pengamatan gambar/stimulus kontekstual, tanya jawab lisan pemantik. | 2 Jam Pelajaran (JP) | Asesmen Awal (Diagnostic lisan) |
| **ATP 2** | Memecahkan studi kasus aplikatif dalam kolaborasi kelompok kecil. | Pembelajaran berbasis proyek, pengisian LKPD interaktif berpasangan, presentasi lisan di depan kelas. | 2 Jam Pelajaran (JP) | Asesmen Formatif (Aktivitas & Kinerja) |
| **ATP 3** | Mengevaluasi dan merefleksikan hasil pemecahan masalah demi kemaslahatan bersama. | Refleksi mandiri, diskusi kelas pleno pelurusan miskonsepsi, pengerjaan tes tertulis sumatif mandiri. | 2 Jam Pelajaran (JP) | Asesmen Sumatif (Kuis PG & Esai) |

---

## 📚 V. GLOSARIUM SAKU ISTILAH KURIKULUM MERDEKA
1. **Capaian Pembelajaran (CP):** Kompetensi pembelajaran yang harus dicapai peserta didik pada setiap fase perkembangan.
2. **Alur Tujuan Pembelajaran (ATP):** Rangkaian Tujuan Pembelajaran yang disusun secara logis dan runtut di dalam fase untuk mencapai Capaian Pembelajaran.
3. **Kriteria Ketercapaian Tujuan Pembelajaran (KKTP):** Penjelasan mengenai kriteria yang mengukur apakah peserta didik telah mencapai Tujuan Pembelajaran.`;
  }

  // Standalone Artikel Referensi
  if (selectedDoc === "Artikel Referensi") {
    return `# ARTIKEL REFERENSI BAHAN BACAAN GURU & SISWA (READING RESOURCE)
**Mata Pelajaran:** ${selectedSubject}
**Fase / Kelas:** ${faseOnly} / ${kelasOnly}
**Topik Pembicaraan:** ${topic}
**Peruntukan Target:** Pembaca: ${artikelTarget}
**Gaya Penulisan:** ${artikelGaya}
**Fokus Kupasan Utama:** ${artikelFokus}

---

## 📜 Jurnal Utama: ${artikelJudul}

### 1. Landasan Konseptual dan Latar Belakang Masalah
${artikelIsi}

### 2. FAQ Ringkat Eksplorasi Teori (Aplikasi Tanya Jawab)
**Tanya:** Mengapa pemahaman mendalam tentang ${topic} menjadi sangat krusial bagi kehidupan kita?  
**Jawab:** Karena ilmu ini menanamkan cara berpikir objektif, menuntun peserta didik dalam mengambil keputusan berbasis fakta konkret, serta melatih nalar kritis (critical thinking) agar terhindar dari bias informasi yang beredar liar di masyarakat modern saat ini.

---

## 📚 Lembar Intisari Kosakata Penting (Glosarium Saku)
1. **Empiris:** Segala sesuatu didasarkan pada kejadian nyata atau pengamatan fisik yang dapat diverifikasi secara ilmiah.
2. **Kognitif:** Proses mental yang berhubungan dengan ingatan, pemahaman data, penyimpulan masalah, dan pengelolaan kosa kata penalaran kelas.
3. **Miskonsepsi:** Kesalahan pemahaman konsep awal siswa yang perlu diluruskan oleh pendidik agar tidak menghambat transfer ilmu yang benar.
4. **Literasi Terpadu:** Kemampuan menyerap informasi bacaan secara utuh untuk dirumuskan ke dalam sintesis gagasan inovatif mandiri.`;
  }

  // Other standard RPP, Jurnal Harian, Analisis CP, etc.
  const isKemenag = selectedDoc === "RPP Cinta Kemenag";
  const titleRPP = isKemenag 
    ? "# RENCANA PELAKSANAAN PEMBELAJARAN MENDALAM (CINTA KEMENAG)"
    : "# RENCANA PELAKSANAAN PEMBELAJARAN MENDALAM";

  const adminMadrasahLabel = isKemenag ? "Nama Madrasah/Sekolah:" : "Nama Sekolah:";
  const profilLabel = isKemenag ? "Dimensi Profil Lulusan P2RA" : "Dimensi Profil Lulusan";
  const profilValue = isKemenag 
    ? `${selectedProfil.join(", ")}, serta nilai Rahmatan Lil Alamin (Toleransi/Tasamuh, Berkeadaban/Ta'addub, Syura)`
    : selectedProfil.join(", ");

  return `${titleRPP}
- **${adminMadrasahLabel}** ${namaSekolah || "SD Negeri 4 Sandik"}
- **Kelas/Semester:** ${kelasOnly} / ${semester || '1 (Ganjil)'}
- **Mata Pelajaran:** ${selectedSubject}
- **Alokasi Waktu:** ${alokasiWaktu || "3 JP (3 x 45 menit)"}

**A. IDENTIFIKASI**
| Komponen | Penjelasan & Detail Identifikasi |
| :--- | :--- |
| **Peserta Didik** | Peserta didik kelas ${kelasOnly} umumnya memiliki rasa ingin tahu yang tinggi terhadap kejadian atau peristiwa di sekitar mereka. Mereka memiliki pengetahuan awal yang beragam, di mana sebagian besar menyukai kegiatan praktik aktif dan kolaboratif. |
| **Materi Pelajaran** | **${topic}**.<br>Detail Esensial: ${detailMateri ? detailMateri : "Membahas konsep dan implementasi esensial materi dengan cara mendalam."} |
| **${profilLabel}** | **Dimensi Terpilih:** ${profilValue}.<br><br>Siswa ditekankan untuk membentuk karakter mental tangguh, gotong royong, dan kemandirian nyata melalui aktivitas diskusi kontekstual.<br><br>**Lapan Dimensi Profil Lulusan:**<br>1. **Keimanan dan Ketakwaan**: Memiliki keyakinan teguh, menghayati nilai agama, berakhlak mulia.<br>2. **Kewargaan**: Cinta tanah air, tanggung jawab sosial, patuh aturan.<br>3. **Penalaran Kritis**: Mampu menganalisis, mengevaluasi, merefleksikan informasi.<br>4. **Kreativitas**: Menghasilkan ide-ide orisinal dan inovatif.<br>5. **Kolaborasi**: Bekerja sama secara efektif, gotong-royong, tanggung jawab kelompok.<br>6. **Kemandirian**: Mampu mengelola diri, inisiatif, dan reflektif.<br>7. **Kesehatan**: Menjaga kesehatan fisik dan mental.<br>8. **Komunikasi**: Menyampaikan gagasan secara efektif dan santun. |

**B. DESAIN PEMBELAJARAN**
| Komponen Desain | Penjelasan & Rincian Desain Pembelajaran |
| :--- | :--- |
| **Capaian Pembelajaran** | Mempresentasikan gagasan dari berbagai tipe teks atau memecahkan masalah kontekstual secara efektif, logis, dan santun; menyampaikan pendapat berdasarkan fakta empiris, imajinasi kreatif secara terarah, dan penggunaan kosakata kesantunan luhur yang dikembangkan dalam ${selectedSubject}. |
| **Lintas Disiplin Ilmu** | • **${selectedSubject}**: Analisis konsep inti pembelajaran.<br>• **Pancasila/Kewargaan**: Menghargai perbedaan pendapat, rasa hormat keberagaman gagasan kelompok.<br>• **Bahasa Indonesia / IPAS**: Menggunakan fakta hasil pengamatan logis dan menyusun resume lisan dan tulisan secara mendalam. |
| **Topik Pembelajaran** | **${topic}** |
| **Tujuan Pembelajaran** | Peserta didik mampu:<br>${tps.map((t, i) => `${i + 1}. ${t}`).join("<br>")} |
| **Kerangka Pembelajaran** | • **Model Pembelajaran:** ${modelPembelajaran || "Problem Based Learning (PBL)"}<br>• **Metode:** Diskusi kelompok, Tanya jawab, Analisis Teks, Studi Kasus Kontekstual.<br>• **Kemitraan Pembelajaran:** Guru kelas bertindak sebagai fasilitator penuh cinta kasih, membimbing pembelajaran dua arah setara.<br>• **Lingkungan Pembelajaran:** Ruang kelas dikondisikan interaktif menyatu with media papan tulis dan visual edukatif.<br>• **Pemanfaatan Digital:** Video pengantar interaktif YouTube, platform kuis daring interaktif untuk asessment formatif. |

**C. PENGALAMAN BELAJAR**
| Tahapan Pembelajaran | Deskripsi Langkah-Langkah Pembelajaran |
| :--- | :--- |
| **Awal (Berkesan, Bermakna, Menggembirakan)** | • **Orientasi:** Guru memberikan salam sapa hangat, memimpin doa belajar bersama secara khusyuk, dan mengecek kehadiran murid dengan penuh kepedulian.<br>• **Apersepsi:** Guru memberikan simulasi pemicu logika konkret di papan tulis:<br>${apersepsiText.replace(/\n/g, '<br>')}<br>• **Motivasi:** Guru menjelaskan bahwa materi kelangsungan konsep **${topic}** sangat dekat dengan aktivitas produktif sehari-hari.<br>• **Penyampaian Tujuan:** Guru menjelaskan tujuan pembelajaran utama yang dicapai murid hari ini.<br>• **Asesmen Awal:** Guru meminta beberapa murid secara acak menyebutkan atau memperagakan contoh dasar tentang **${topic}** untuk memetakan pemahaman awal siswa. |
| **Kegiatan Inti (Berkesadaran, Bermakna, Menggembirakan)** | **Memahami (Berkesadaran, Bermakna)**<br>1. Guru menayangkan video/media visual interaktif terkait konsep inti **${topic}** yang akurat.<br>2. Guru mengawal tanya jawab interaktif untuk melatih pemahaman rasional murid terhadap materi.<br>3. Murid secara berpasangan (teman sebangku) mengamati contoh kasus konseptual di layar atau papan tulis.<br>4. Guru membimbing murid memahami bahwa konsep **${topic}** memiliki data valid terukur.<br><br>**Mengaplikasi (Bermakna, Menggembirakan)**<br>1. Murid bekerjasama secara berpasangan mengoreksi teks lembar kerja (LKPD) yang diberikan guru secara tertib.<br>2. Guru membimbing murid menuliskan apa saja contoh nyata dari penerapan **${topic}** di kehidupan nyata.<br>3. **Ice Breaking Terpadu (Penyegar Belajar):** Mengadakan tebak sapa interaktif "Detektif Pintar" (murid berdiri dan menyebutkan kata kunci yang relevan secara beranting penuh tawa).<br>4. Murid membaca hasil temuan lembar kerja yang telah didiskusikan ke depan kelas.<br>5. Perwakilan menuliskan hasil analisisnya di papan tulis untuk dicatat oleh rekan-rekan kelas.<br>6. Beberapa murid diminta menuliskan contoh fakta yang ditemukan pada teks bacaan tersebut kemudian menuliskannya di papan tulis.<br><br>**Merefleksi (Berkesadaran, Bermakna)**<br>1. Murid saling memberikan komentar positif dan tepuk tangan apresiasi atas presentasi temannya.<br>2. Guru memberi penegasan materi (reinforcement) dan meluruskan konsep jika ada miskonsepsi.<br>3. Guru menanyakan perasaan murid mengenai pembelajaran hari ini, misalnya: *"Bagian mana yang paling seru saat kita belajar ${topic}?"*<br>4. Sebagai tindak lanjut tindak reflektif, guru memberi beberapa soal pengayaan mandiri.<br>5. Murid bersama guru menyusun intisari simpulan akhir pembelajaran.<br>6. Siswa melaksanakan pengerjaan asesmen akhir evaluatif. |
| **Penutup (Berkesadaran)** | • Guru bersama murid menyimpulkan pembelajaran pokok hari ini. Menekankan pada pentingnya adab dan kesantunan ilmu.<br>• Murid memperoleh tugas mandiri (PR) merangkum penerapan nyata **${topic}** di rumah.<br>• Guru menyampaikan pokok materi pertemuan pekan mendatang.<br>• Menyanyikan lagu nasional / daerah setempat untuk memperkuat rasa nasionalisme luhur.<br>• Guru menutup pembelajaran dengan doa penutup dan mengucapkan salam hangat. |

**D. ASESMEN**
| Kategori Asesmen | Metode & Bentuk Instrumen Penilaian |
| :--- | :--- |
| **Asesmen Awal Pembelajaran** | • **Metode:** Pertanyaan lisan dialogis interaktif, observasi sekilas.<br>• **Bentuk:** Guru mengajukan 2 pertanyaan pemantik singkat di awal pembelajaran untuk mendeteksi kesiapan mental kognitif murid tentang **${topic}**. |
| **Asesmen pada Proses Pembelajaran (Formatif)** | • **Metode:** Observasi keikutsertaan, penilaian kinerja kelompok, penilaian produk LKPD.<br>• **Bentuk:** Lembar ceklis keaktifan diskusi kelompok kecil, penilaian presentasi berpasangan, pemeriksaan lembar kerja. |
| **Asesmen pada Akhir Pembelajaran (Sumatif)** | • **Metode:** Tes tertulis mandiri berjangka.<br>• **Bentuk:** Murid menyelesaikan soal evaluasi sumatif mandiri berupa pilihan ganda dan esai penalaran kritis di akhir jam. |

---

## 🗒️ E. LAMPIRAN 1: LEMBAR KERJA PESERTA DIDIK (LKPD) INTERAKTIF

### **Halo, Sobat Pembelajar! Mari bereksplorasi dengan penuh semangat!**
**Materi Pembelajaran:** ${topic}  
**Nama Kelompok / Pasangan:** 1. ___________________ | 2. ___________________  
**Kelas / Fase / Semester:** ${kelasOnly} / ${faseOnly} / ${semester || "1"}

#### **1. Stimulus Pembelajaran Aktif (Game Detektif Berburu Fakta)**
${lkpdStimulus}

#### **2. Lembar Tantangan Detektif Pembelajar**
- **Aktivitas 1 (Eksplorasi Konseptual):**  
  ${lkpdAktivitas1}
  *Sediakan ruang coretan analisis di bawah:*
  
  \n\n
- **Aktivitas 2 (Pemecahan Masalah Praktis):**  
  ${lkpdAktivitas2}
  *Tuliskan pemecahan logis kelompok disini:*
  
  \n\n
- **Aktivitas 3 (Konsolidasi & Refleksi Kelompok):**  
  ${lkpdAktivitas3}
  *Tuliskan kesimpulan akhir diskusi kelompok disini:*
  
  \n\n

**Tabel Penilaian Diri Keberhasilan Belajar:**
| Pernyataan Penilaian Diri | 😊 Ragu-Ragu | Cukup Menguasai | Sangat Paham |
| :--- | :---: | :---: | :---: |
| Saya paham konsep esensial materi **${topic}** | | | |
| Saya aktif bergotong-royong menyelesaikan tantangan kelompok | | | |

---

## 📊 F. LAMPIRAN 2: INSTRUMEN ASESMEN & RUBRIK PENILAIAN LENGKAP

### **A. Kisi-Kisi Penilaian Sumatif**
| Indikator Soal | Level Kognitif | Bentuk Soal | No. Soal | Bobot Nilai |
| :--- | :--- | :--- | :--- | :--- |
| Mengidentifikasi konsep awal **${topic}** | L1 - Pemahaman | Pilihan Ganda | 1, 2 | 30% |
| Menganalisis studi kasus konkret | L2 - Aplikasi | Pilihan Ganda | 3, 4 | 30% |
| Memformulasikan solusi kritis kompleks | L3 - HOTS Analisis | Pilihan Ganda / Esai | 5, Esai 1, 2 | 40% |

### **B. Soal Evaluasi Mandiri**

**I. Pilihan Ganda (Pilihlah salah satu jawaban yang paling tepat!)**
1. **Soal Nomor 1:**  
   ${asesmenSoal1}
2. **Soal Nomor 2:**  
   ${asesmenSoal2}
3. **Soal Nomor 3:**  
   ${asesmenSoal3}
4. **Soal Nomor 4:**  
   ${asesmenSoal4}
5. **Soal Nomor 5:**  
   ${asesmenSoal5}

**II. Esai Penalaran Kritis (Jawablah secara terperinci!)**
1. **Soal Esai 1:** ${asesmenEsai1}
2. **Soal Esai 2:** ${asesmenEsai2}

### **C. Kunci Jawaban Lengkap & Pembahasan**
${kunciJawabanText}

### **D. Rubrik Penilaian Performa Kualitatif**
- **PG:** Tiap jawaban benar diberi skor **10** (Maksimal 50)
- **Esai:** Tiap soal dinilai dari skor **5 s.d. 25** berdasarkan kelengkapan logika, keruntutan berpikir, dan ketepatan solusi (Maksimal 50).
- **Nilai Akhir:** Total Skor PG + Total Skor Esai = **100**

---

## 📰 G. LAMPIRAN 3: ARTIKEL REFERENSI BAHAN BACAAN GURU & SISWA

### **Judul Artikel: ${artikelJudul}**
${artikelIsi}

*Disusun secara resmi untuk menunjang Pembelajaran Mendalam (Deep Learning) Kurikulum Merdeka Kemendikdasmen RI.*`;
}

export default function App() {
  // Navigation active links
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Custom Logo State with Local Storage persistence
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('merdekaguru_custom_logo') || null;
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        triggerNotification("Ukuran berkas terlalu besar. Maksimal 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setLogoUrl(result);
          localStorage.setItem('merdekaguru_custom_logo', result);
          triggerNotification("Logo berhasil diunggah dan disimpan!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setLogoUrl(null);
    localStorage.removeItem('merdekaguru_custom_logo');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    triggerNotification("Logo dikembalikan ke default.");
  };

  
  // Form States
  const [selectedDoc, setSelectedDoc] = useState<DocumentType>("RPP Kemendikdasmen");
  const [selectedSubject, setSelectedSubject] = useState<string>("Matematika");
  const [selectedGrade, setSelectedGrade] = useState<string>("Kelas 7 - Fase D");
  const [topic, setTopic] = useState<string>("Bilangan Bulat & Operasinya");
  const [detailMateri, setDetailMateri] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<DocThemeId>("emerald");

  // Step-by-step wizard parameters
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [jenjang, setJenjang] = useState<string>("SMP");
  const [kelas, setKelas] = useState<string>("Kelas 7");
  const [fase, setFase] = useState<string>("Fase D");
  const [semester, setSemester] = useState<string>("Semester 1 (Ganjil)");
  const [alokasiWaktu, setAlokasiWaktu] = useState<string>("2 x 40 Menit");
  const [modelPembelajaran, setModelPembelajaran] = useState<string>("Problem Based Learning (PBL)");
  const [tujuanPembelajaran, setTujuanPembelajaran] = useState<string>("");
  const [gayaBahasa, setGayaBahasa] = useState<string>("Sederhana");
  const [orientasiHalaman, setOrientasiHalaman] = useState<string>("Portrait (Tegak)");

  // New customized inputs for different document types
  const [asesmenTipe, setAsesmenTipe] = useState<string>("Sumatif Akhir Lingkup Materi");
  const [asesmenBentukSoal, setAsesmenBentukSoal] = useState<string>("Pilihan Ganda & Esai");
  const [asesmenJumlahSoal, setAsesmenJumlahSoal] = useState<string>("5 Pilihan Ganda & 2 Esai (Standar)");
  const [asesmenLevelKognitif, setAsesmenLevelKognitif] = useState<string>("Campuran (HOTS, MOTS, LOTS)");

  const [jurnalTanggal, setJurnalTanggal] = useState<string>("Kamis, 04 Juni 2026");
  const [jurnalJumlahSiswa, setJurnalJumlahSiswa] = useState<string>("Lengkap (Semua Siswa Hadir)");
  const [jurnalKejadianPenting, setJurnalKejadianPenting] = useState<string>("Siswa sangat antusias melakukan praktikum kelompok, namun ada beberapa siswa kesulitan mencerna materi.");
  const [jurnalTindakLanjut, setJurnalTindakLanjut] = useState<string>("Memberikan bimbingan scaffolding individu pasca-praktik serta pengayaan bagi siswa tuntas.");

  const [analisisElemen, setAnalisisElemen] = useState<string>("Sesuai Bidang Studi Utama");
  const [analisisAtpSasaran, setAnalisisAtpSasaran] = useState<string>("Menyusun Alur Pembelajaran (ATP) terperinci dari fase dasar menuju tinggi.");
  const [analisisTargetKkm, setAnalisisTargetKkm] = useState<string>("75 - Kategori Baik (Tuntas)");

  const [lkpdModelGame, setLkpdModelGame] = useState<string>("Detektif Pintar & Simulasi Konkret");
  const [lkpdKelompok, setLkpdKelompok] = useState<string>("Berpasangan / Teman Sebangku");
  const [lkpdMedia, setLkpdMedia] = useState<string>("Alat Peraga Konkret, Proyektor LCD & Papan Tulis");

  const [artikelGaya, setArtikelGaya] = useState<string>("Sains Populer & Edukatif Menyenangkan");
  const [artikelTarget, setArtikelTarget] = useState<string>("Keduanya (Guru & Siswa)");
  const [artikelFokus, setArtikelFokus] = useState<string>("Aplikasi Praktis Kehidupan Nyata & Miskonsepsi");
  const [selectedProfil, setSelectedProfil] = useState<string[]>([
    "Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia",
    "Bernalar Kritis (Penalaran Kritis)",
    "Gotong Royong (Kolaborasi)",
    "Mandiri (Kemandirian)"
  ]);

  // Custom metadata for document signatures & headers
  const [namaGuru, setNamaGuru] = useState<string>(() => {
    return localStorage.getItem('merdekaguru_metadata_nama_guru') || "Hasanudin, S.Pd.";
  });
  const [nipGuru, setNipGuru] = useState<string>(() => {
    return localStorage.getItem('merdekaguru_metadata_nip_guru') || "19850412 201101 1 002";
  });
  const [namaKepsek, setNamaKepsek] = useState<string>(() => {
    return localStorage.getItem('merdekaguru_metadata_nama_kepsek') || "Suhartono, M.Pd.";
  });
  const [nipKepsek, setNipKepsek] = useState<string>(() => {
    return localStorage.getItem('merdekaguru_metadata_nip_kepsek') || "19781023 200502 2 001";
  });
  const [namaSekolah, setNamaSekolah] = useState<string>(() => {
    return localStorage.getItem('merdekaguru_metadata_nama_sekolah') || "SD Negeri 4 Sandik";
  });
  const [schoolLogoUrl, setSchoolLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('merdekaguru_school_logo') || null;
  });
  const [tempatTeks, setTempatTeks] = useState<string>(() => {
    return localStorage.getItem('merdekaguru_metadata_tempat') || "Sandik";
  });
  const [tanggalTeks, setTanggalTeks] = useState<string>(() => {
    const today = new Date();
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return localStorage.getItem('merdekaguru_metadata_tanggal') || `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  });
  const [showMetadataForm, setShowMetadataForm] = useState<boolean>(false);
  
  // Generation & Status
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [isDemoMode, setIsDemoMode] = useState(true); // default to demo mode for initial experience
  const [hasApiKey, setHasApiKey] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<string>("");
  const [isRefined, setIsRefined] = useState(false);
  const [refineFeedback, setRefineFeedback] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Access Protection State & Session Sync
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    const stored = localStorage.getItem("merdekaguru_current_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        return !!user.isPremium;
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("merdekaguru_current_user");
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    syncUser();

    window.addEventListener("storage", syncUser);
    // Custom event dispatch for local updates inside the same tab
    window.addEventListener("local-user-update", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("local-user-update", syncUser);
    };
  }, [isUnlocked]);

  const handleKelasChange = (kelasStr: string, jenjangStr: string) => {
    setKelas(kelasStr);
    let calculatedFase = "Fase D";
    if (kelasStr === "Kelas 1" || kelasStr === "Kelas 2") {
      calculatedFase = "Fase A";
    } else if (kelasStr === "Kelas 3" || kelasStr === "Kelas 4") {
      calculatedFase = "Fase B";
    } else if (kelasStr === "Kelas 5" || kelasStr === "Kelas 6") {
      calculatedFase = "Fase C";
    } else if (kelasStr === "Kelas 7" || kelasStr === "Kelas 8" || kelasStr === "Kelas 9") {
      calculatedFase = "Fase D";
    } else if (kelasStr === "Kelas 10") {
      calculatedFase = "Fase E";
    } else if (kelasStr === "Kelas 11" || kelasStr === "Kelas 12") {
      calculatedFase = "Fase F";
    } else if (kelasStr.includes("PAUD") || kelasStr.includes("Fondasi")) {
      calculatedFase = "Fase Fondasi";
    }
    setFase(calculatedFase);
    setSelectedGrade(`${kelasStr} - ${calculatedFase}`);
  };

  const cleanDocumentContent = (text: string): string => {
    if (!text) return "";
    const lines = text.split('\n');
    const cleanedLines: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lower = line.toLowerCase();
      if (
        lower.includes("[mengetahui") ||
        lower.includes("[guru mata pelajaran") ||
        lower.includes("[guru kelas") ||
        lower.includes("[kepala sekolah") ||
        lower.includes("[nama kepala sekolah") ||
        lower.includes("[nama guru") ||
        lower.startsWith("________________") ||
        lower.startsWith("----------------") ||
        (lower.includes("mengetahui,") && (lower.includes("kepala sekolah") || lower.includes("kepsek"))) ||
        (lower.includes("tanda tangan") && (lower.includes("guru") || lower.includes("kepala")))
      ) {
        continue;
      }
      cleanedLines.push(lines[i]);
    }
    return cleanedLines.join('\n').trim();
  };

  const handleLogout = () => {
    localStorage.removeItem("merdekaguru_current_user");
    setIsUnlocked(false);
    triggerNotification("Berhasil keluar sesi dan mengunci aplikasi.");
  };

  // Reference for scrolling
  const workspaceRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const generatorCardRef = useRef<HTMLDivElement>(null);

  // Check if API key exists in .env
  useEffect(() => {
    // We can query server to see fallback or check if the app starts on full AI.
    // If we make a lightweight API call, we can check.
    setHasApiKey(true); // AI Studio injects the key at runtime for our server
  }, []);

  const triggerNotification = (message: string) => {
    setShowNotification(message);
    setTimeout(() => {
      setShowNotification(null);
    }, 4000);
  };

  // Preloading custom prompt templates based on interactive feature cards clicked
  const handleFeatureClick = (type: DocumentType) => {
    setSelectedDoc(type);
    
    // Set custom topic templates based on document clicks to feel realistic
    if (type === "RPP Cinta Kemenag") {
      setTopic("Akhlak Terhadap Orang Tua & Guru - Akidah Akhlak");
      setSelectedSubject("Pendidikan Agama Islam & Budi Pekerti");
    } else if (type === "Asesmen Lengkap") {
      setTopic("Sistem Persamaan Linear Dua Variabel (SPLDV)");
      setSelectedSubject("Matematika");
    } else if (type === "Jurnal Harian") {
      setTopic("Membaca Teks Eksplanasi Kontekstual");
      setSelectedSubject("Bahasa Indonesia");
    } else if (type === "Analisis CP") {
      setTopic("Klasifikasi Makhluk Hidup & Ekosistem");
      setSelectedSubject("Ilmu Pengetahuan Alam (IPA)");
    } else if (type === "LKPD Interaktif") {
      setTopic("Simple Present Tense dalam Daily Routine");
      setSelectedSubject("Bahasa Inggris");
    } else if (type === "Artikel Referensi") {
      setTopic("Dampak Perubahan Iklim Terhadap Ekosistem Pantai");
      setSelectedSubject("Ilmu Pengetahuan Alam (IPA)");
    } else {
      setTopic("Bilangan Bulat & Operasinya");
      setSelectedSubject("Matematika");
    }
    
    // Scroll smoothly to generator
    setCurrentStep(1);
    generatorCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    triggerNotification(`Form ditipe: "${type}" berhasil dimuat!`);
  };

  // Generate Document Action (Form Submit)
  const handleGenerate = async (e?: React.FormEvent, forceDemo = false) => {
    if (e) e.preventDefault();
    if (isGenerating) return;

    if (!isUnlocked) {
      triggerNotification("Kecerdasan Buatan Terkunci: Silakan mendaftar dan aktifkan lisensi Premium untuk memulai!");
      setAuthModalTab('register');
      setIsAuthModalOpen(true);
      return;
    }

    if (!topic.trim()) {
      triggerNotification("Ups! Silakan ketik topik materi pembelajaran terlebih dahulu.");
      return;
    }

    setIsGenerating(true);
    setProgress(5);
    setProgressMessage("Menghubungi Asisten Kurikulum AI...");
    
    // Scroll to section view
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Progress bar simulation steps
    const messages = [
      "Menganalisis Kompetensi Dasar & Capaian Pembelajaran...",
      "Penyelarasan dengan Profil Pelajar Pancasila...",
      "Menyusun langkah kegiatan pembelajaran aktif...",
      "Memformulasikan instrumen penilaian & kriteria ketuntasan (KKTP)...",
      "Merumuskan lembar observasi & rubrik evaluasi...",
      "Merapikan format administrasi Kurikulum Merdeka..."
    ];

    let currentProgress = 5;
    const interval = setInterval(() => {
      if (currentProgress < 92) {
        currentProgress += Math.floor(Math.random() * 8) + 3;
        if (currentProgress > 92) currentProgress = 92;
        setProgress(currentProgress);
        
        // Random message selector
        const msgIdx = Math.floor((currentProgress / 100) * messages.length);
        if (messages[msgIdx]) {
          setProgressMessage(messages[msgIdx]);
        }
      }
    }, 350);

    try {
      if (forceDemo || isDemoMode) {
        // Mocking/offline flow - instant awesome generation with custom headers
        await new Promise(resolve => setTimeout(resolve, 3800));
        
        // Generate high-quality personalized document using dynamic generator
        const customizedDoc = generateDynamicDemoDocument(
          selectedDoc,
          selectedSubject,
          selectedGrade,
          topic,
          detailMateri,
          jenjang,
          kelas,
          fase,
          semester,
          alokasiWaktu,
          modelPembelajaran,
          tujuanPembelajaran,
          selectedProfil,
          namaSekolah,
          namaGuru,
          nipGuru,
          namaKepsek,
          nipKepsek,
          tempatTeks,
          tanggalTeks,
          // Custom specific dynamic fields
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
        );

        clearInterval(interval);
        setProgress(100);
        setProgressMessage("Dokumen Berhasil Dibuat!");
        setGeneratedDoc(customizedDoc);
        setIsRefined(false);
      } else {
        // Actual Full-stack API Call with Gemini AI!
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documentType: selectedDoc,
            mataPelajaran: selectedSubject,
            kelas: selectedGrade,
            topik: topic,
            detailMateri: detailMateri,
            jenjang,
            kelasAngka: kelas,
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
            // Custom doc-specific parameters passed securely to the backend
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
          })
        });

        const data = await response.json();
        clearInterval(interval);

        if (!response.ok || data.error) {
          throw new Error(data.error || "Gagal menghubungi API Server");
        }

        setProgress(100);
        setProgressMessage("Yey! Dokumen Kurikulum Merdeka selesai disusun!");
        setGeneratedDoc(data.text);
        setIsRefined(false);
      }
    } catch (err: any) {
      console.error(err);
      clearInterval(interval);
      // Fallback securely to Demo mode if API key fails, notifying user cleanly
      triggerNotification(`Offline/Demo Mode: ${err.message || 'Menggunakan dokumen prakiraan berkualitas tinggi'}`);
      
      // Load fallback instantly
      setProgress(100);
      setProgressMessage("Demo Mode Aktif (Dokumen Prakiraan)");
      setGeneratedDoc(generateDynamicDemoDocument(
        selectedDoc,
        selectedSubject,
        selectedGrade,
        topic,
        detailMateri,
        jenjang,
        kelas,
        fase,
        semester,
        alokasiWaktu,
        modelPembelajaran,
        tujuanPembelajaran,
        selectedProfil,
        namaSekolah,
        namaGuru,
        nipGuru,
        namaKepsek,
        nipKepsek,
        tempatTeks,
        tanggalTeks,
        // Custom doc-specific parameters
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
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  // Refine Document Chat function to interactively tweak generating document
  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineFeedback.trim() || isRefining) return;

    setIsRefining(true);
    triggerNotification("Merangkai instruksi perbaikan dokumen...");

    try {
      if (isDemoMode) {
        // Mock refinement beautifully
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGeneratedDoc(prev => prev + `\n\n---\n\n**CATATAN PERBAIKAN AI (Berdasarkan Masukan Guru):**\n*   **Instruksi Tambahan:** "${refineFeedback}"\n*   *Perubahan Otomatis:* Kegiatan pembelajaran telah diadaptasi untuk menambahkan kegiatan ice breaking penambah antusiasme siswa di sela-sela diskusi kelompok, serta pembaruan alternatif asesmen formatif lisan yang interaktif.`);
        setIsRefined(true);
        setRefineFeedback("");
        triggerNotification("Modul ajar diperbarui berdasarkan revisi Anda!");
      } else {
        // Connect to simulated API
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            documentType: selectedDoc,
            mataPelajaran: selectedSubject,
            kelas: selectedGrade,
            topik: topic,
            detailMateri: `${detailMateri}\n\n[REVISI MASUKAN GURU]: ${refineFeedback}. Integrasikan catatan ini ke dalam draf dokumen sebelumnya:\n${generatedDoc}`
          })
        });

        const data = await response.json();
        if (!response.ok || data.error) {
          throw new Error(data.error || "Gagal memperbarui");
        }

        setGeneratedDoc(data.text);
        setIsRefined(true);
        setRefineFeedback("");
        triggerNotification("Dokumen berhasil diperbaiki asisten AI!");
      }
    } catch (err: any) {
      triggerNotification(`Gagal merevisi: ${err.message || 'Kembali menggunakan draf revisi lokal'}`);
      // Fallback
      setGeneratedDoc(prev => prev + `\n\n*Catatan Revisi Lokal (Revisi gagal dikirim): ${refineFeedback}*`);
      setIsRefined(true);
      setRefineFeedback("");
    } finally {
      setIsRefining(false);
    }
  };

  // Utility to copy document text
  const handleCopy = () => {
    if (!generatedDoc) return;
    navigator.clipboard.writeText(generatedDoc);
    triggerNotification("Dokumen disalin ke Clipboard! Siap dtempel (paste) ke Word.");
  };

  // Helper to convert Markdown structure to beautiful styled HTML for Microsoft Word
  const convertMarkdownToHtml = (markdownContent: string) => {
    const lines = markdownContent.split('\n');
    let html = "";
    let listOpen = false;
    let tableOpen = false;
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];
    let lastListItems: string[] = [];

    // Theme color dictionary mapping selectedTheme state to standard professional print hex colors
    const themeColorsForMd: Record<DocThemeId, { primary: string; secondary: string; lightBg: string }> = {
      emerald: { primary: "#043b32", secondary: "#0e7465", lightBg: "#f0faf7" },
      sapphire: { primary: "#1e3a8a", secondary: "#2563eb", lightBg: "#eff6ff" },
      crimson: { primary: "#881337", secondary: "#e11d48", lightBg: "#fff1f2" },
      amethyst: { primary: "#581c87", secondary: "#9333ea", lightBg: "#faf5ff" },
      amber: { primary: "#78350f", secondary: "#d97706", lightBg: "#fffbeb" },
      classic: { primary: "#1e293b", secondary: "#475569", lightBg: "#f8fafc" }
    };
    const activeColor = themeColorsForMd[selectedTheme] || themeColorsForMd.emerald;

    const flushList = () => {
      if (listOpen && lastListItems.length > 0) {
        html += `<ul style="margin-top: 5px; margin-bottom: 12px; padding-left: 20px; list-style-type: square; color: #333333; font-family: Arial, sans-serif; font-size: 11pt;">`;
        lastListItems.forEach(item => {
          html += `<li style="margin-bottom: 5px; line-height: 1.5;">${parseInlineHtml(item)}</li>`;
        });
        html += `</ul>`;
        listOpen = false;
        lastListItems = [];
      }
    };

    const flushTable = () => {
      if (tableOpen) {
        html += `<table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; font-family: Arial, sans-serif; font-size: 10pt; border: 1px solid #cccccc;">`;
        if (tableHeaders.length > 0) {
          html += `<thead style="background-color: ${activeColor.lightBg}; color: ${activeColor.primary}; font-weight: bold;"><tr>`;
          tableHeaders.forEach(th => {
            html += `<th style="border: 1px solid #bbbbbb; padding: 10px; font-weight: bold; text-align: left; background-color: ${activeColor.lightBg}; color: ${activeColor.primary};">${parseInlineHtml(th)}</th>`;
          });
          html += `</tr></thead>`;
        }
        html += `<tbody>`;
        tableRows.forEach((row, rIdx) => {
          const bg = rIdx % 2 === 0 ? "#ffffff" : activeColor.lightBg;
          html += `<tr style="background-color: ${bg};">`;
          row.forEach(cell => {
            html += `<td style="border: 1px solid #cccccc; padding: 10px; color: #444444;">${parseInlineHtml(cell)}</td>`;
          });
          html += `</tr>`;
        });
        html += `</tbody></table>`;
        tableOpen = false;
        tableHeaders = [];
        tableRows = [];
      }
    };

    const parseInlineHtml = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\//g, `<strong style="color: ${activeColor.primary}; font-weight: bold;">$1</strong>`)
        .replace(/\*\*(.*?)\*\*/g, `<strong style="color: ${activeColor.primary}; font-weight: bold;">$1</strong>`)
        .replace(/\*(.*?)\*/g, '<em style="color: #555555; font-style: italic;">$1</em>');
    };

    lines.forEach(rawLine => {
      const line = rawLine.trim();

      // Table line starting with |
      if (line.startsWith('|')) {
        flushList();
        const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cells.every(c => c.startsWith('-'))) {
          return; // Skip separator line
        }
        if (!tableOpen) {
          tableOpen = true;
          tableHeaders = cells;
        } else {
          tableRows.push(cells);
        }
        return;
      } else {
        flushTable();
      }

      // Bullets
      if (line.startsWith('- ') || line.startsWith('* ')) {
        flushTable();
        listOpen = true;
        lastListItems.push(line.substring(2));
        return;
      } else {
        flushList();
      }

      // Headings
      if (line.startsWith('# ')) {
        html += `<h1 style="font-family: Arial, sans-serif; font-size: 18pt; font-weight: bold; color: ${activeColor.primary}; border-bottom: 2px solid ${activeColor.primary}; padding-bottom: 6px; margin-top: 25px; margin-bottom: 12px; text-transform: uppercase; text-align: center;">${parseInlineHtml(line.substring(2))}</h1>`;
      } else if (line.startsWith('## ')) {
        html += `<h2 style="font-family: Arial, sans-serif; font-size: 14pt; font-weight: bold; color: ${activeColor.secondary}; border-left: 4px solid ${activeColor.primary}; padding-left: 10px; margin-top: 20px; margin-bottom: 10px;">${parseInlineHtml(line.substring(3))}</h2>`;
      } else if (line.startsWith('### ')) {
        html += `<h3 style="font-family: Arial, sans-serif; font-size: 12pt; font-weight: bold; color: ${activeColor.secondary}; margin-top: 15px; margin-bottom: 8px;">${parseInlineHtml(line.substring(4))}</h3>`;
      } else if (line.startsWith('#### ')) {
        html += `<h4 style="font-family: Arial, sans-serif; font-size: 11pt; font-weight: bold; color: #333333; margin-top: 10px; margin-bottom: 6px;">${parseInlineHtml(line.substring(5))}</h4>`;
      } else if (line === '') {
        html += `<div style="height: 8px;"></div>`;
      } else {
        html += `<p style="font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.6; color: #222222; margin-bottom: 12px; text-align: justify;">${parseInlineHtml(line)}</p>`;
      }
    });

    flushList();
    flushTable();

    return html;
  };

  // Create printable layout or download plain file format
  const handleDownloadWord = () => {
    if (!generatedDoc) return;
    
    const cleanedMarkdown = cleanDocumentContent(generatedDoc);
    const bodyHtml = convertMarkdownToHtml(cleanedMarkdown);
    
    // Theme color dictionary mapping selectedTheme state to standard professional print hex colors
    const themeColors: Record<DocThemeId, { primary: string; secondary: string; lightBg: string }> = {
      emerald: { primary: "#043b32", secondary: "#0e7465", lightBg: "#f0faf7" },
      sapphire: { primary: "#1e3a8a", secondary: "#2563eb", lightBg: "#eff6ff" },
      crimson: { primary: "#881337", secondary: "#e11d48", lightBg: "#fff1f2" },
      amethyst: { primary: "#581c87", secondary: "#9333ea", lightBg: "#faf5ff" },
      amber: { primary: "#78350f", secondary: "#d97706", lightBg: "#fffbeb" },
      classic: { primary: "#1e293b", secondary: "#475569", lightBg: "#f8fafc" }
    };
    
    const activeColor = themeColors[selectedTheme] || themeColors.emerald;
    
    // Explicit sizing for image tag ensures it doesn't overlap or break Word layouts
    const logoImgTag = schoolLogoUrl 
      ? `<img src="${schoolLogoUrl}" width="70" height="70" style="width: 70px; height: 70px; display: block; margin: 0 auto; object-fit: contain;" />`
      : `<span style="font-size: 26pt; font-weight: bold; color: ${activeColor.primary}; font-family: Arial, sans-serif;">🏫</span>`;

    const fullDocumentHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>${selectedDoc}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 8.27in 11.69in; /* A4 size */
            margin: 1.0in 1.0in 1.0in 1.0in;
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #222222;
          }
          /* GORGEOUS BRAND MOTIF DOUBLE BORDER FRAME (FOR COVER SAMampul ONLY) */
          .document-frame {
            border: 6px double ${activeColor.primary};
            padding: 24px 30px;
            background-color: #ffffff;
          }
          /* CLEAN ALIGNED BODY (WITHOUT OVERFLOW BORDERS REPLICATING PDF EXACTLY) */
          .document-body {
            padding: 10px 20px;
            background-color: #ffffff;
          }
          .kop-table {
            width: 100%;
            border-collapse: collapse;
            border: none;
            margin-bottom: 15px;
          }
          .kop-border-line {
            border-top: 1px solid ${activeColor.primary};
            border-bottom: 3.5px double ${activeColor.primary};
            height: 4px;
            margin-bottom: 25px;
            font-size: 1px;
            line-height: 1px;
          }
          .signature-table {
            width: 100%;
            border-collapse: collapse;
            border: none;
            margin-top: 45px;
          }
          .signature-table td {
            border: none;
            width: 50%;
            text-align: center;
            vertical-align: top;
            padding: 10px;
            font-size: 11pt;
          }
          /* Override headings inside document content to match theme color */
          h1 { color: ${activeColor.primary} !important; border-bottom: 2px solid ${activeColor.primary} !important; text-align: center; text-transform: uppercase; margin-top: 25px; margin-bottom: 12px; }
          h2 { color: ${activeColor.secondary} !important; border-left: 4px solid ${activeColor.primary} !important; padding-left: 10px; margin-top: 20px; margin-bottom: 10px; }
          h3 { color: ${activeColor.secondary} !important; margin-top: 15px; margin-bottom: 8px; }
        </style>
      </head>
      <body>
        <!-- STUNNING COVER PAGE (KAPER) -->
        <div class="document-frame" style="page-break-after: always; break-after: page; text-align: center;">
          <div style="font-size: 10pt; font-weight: bold; color: #777777; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">DOKUMEN ADMINISTRASI</div>
          <div style="font-size: 11pt; font-weight: bold; color: #555555; text-transform: uppercase; margin-top: 5px; font-family: Arial, sans-serif;">SISTEM INFORMASI GURU INDONESIA</div>
          
          <div style="margin-top: 25px; margin-bottom: 20px; text-align: center;">
            ${schoolLogoUrl 
              ? `<img src="${schoolLogoUrl}" width="100" height="100" style="width: 100px; height: 100px; display: block; margin: 0 auto; object-fit: contain;" />`
              : `<span style="font-size: 55pt; color: ${activeColor.primary};">🏫</span>`
            }
          </div>

          <div style="margin-top: 15px;">
            <h1 style="font-size: 22pt; font-family: Arial, sans-serif; font-weight: 900; color: ${activeColor.primary}; text-transform: uppercase; margin-bottom: 5px; line-height: 1.2; text-align: center; border-bottom: none !important;">
              ${selectedDoc.toUpperCase()}
            </h1>
            <div style="background-color: ${activeColor.primary}; height: 4px; width: 100px; margin: 12px auto;"></div>
            <h2 style="font-size: 15pt; font-family: Arial, sans-serif; font-weight: bold; color: ${activeColor.secondary}; text-transform: uppercase; margin-top: 5px; text-align: center; border-left: none !important;">
              MATA PELAJARAN: ${selectedSubject.toUpperCase()}
            </h2>
            <div style="margin-top: 10px; display: inline-block; background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 20px; padding: 6px 14px; font-size: 10pt; font-weight: bold; color: #4b5563; font-family: Arial, sans-serif;">
              Topik Pembelajaran: <span style="color: #111827;">${topic || "Materi Kurikulum Merdeka"}</span>
            </div>
          </div>

          <table style="width: 85%; border-collapse: collapse; border: 1px solid #dddddd; margin: 20px auto; background-color: #f9fafb; font-family: Arial, sans-serif; font-size: 11pt;">
            <tr>
              <td style="padding: 10px 15px; font-weight: bold; color: #555555; width: 35%; border: 1px solid #dddddd; text-align: left;">Kelas / Fase</td>
              <td style="padding: 10px 15px; font-weight: bold; color: #111827; border: 1px solid #dddddd; text-align: left;">: ${selectedGrade || kelas}</td>
            </tr>
            <tr>
              <td style="padding: 10px 15px; font-weight: bold; color: #555555; width: 35%; border: 1px solid #dddddd; text-align: left;">Semester</td>
              <td style="padding: 10px 15px; font-weight: bold; color: #111827; border: 1px solid #dddddd; text-align: left;">: ${semester || "Satu (1)"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 15px; font-weight: bold; color: #555555; width: 35%; border: 1px solid #dddddd; text-align: left;">Alokasi Waktu</td>
              <td style="padding: 10px 15px; font-weight: bold; color: #111827; border: 1px solid #dddddd; text-align: left;">: ${alokasiWaktu || "2 x 40 Menit"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 15px; font-weight: bold; color: #555555; width: 35%; border: 1px solid #dddddd; text-align: left;">Penyusun / Guru</td>
              <td style="padding: 10px 15px; font-weight: bold; color: #000000; border: 1px solid #dddddd; text-align: left;">: ${namaGuru || "Hasanudin, S.Pd."}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; font-family: Arial, sans-serif;">
            <div style="font-size: 12pt; font-weight: 900; color: ${activeColor.primary}; text-transform: uppercase; tracking: 1px;">
              ${namaSekolah.toUpperCase()}
            </div>
            <div style="font-size: 9pt; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 2px; margin-top: 6px;">
              TAHUN AJARAN ${new Date().getFullYear()}/${new Date().getFullYear() + 1}
            </div>
          </div>
        </div>

        <br clear="all" style="page-break-before: always; mso-break-type: section-break;" />

        <div class="document-body">
          
          <!-- BRANDED KOP SURAT / SEKOLAH HEADER -->
          <table class="kop-table" style="width: 100%; border-collapse: collapse; border: none;">
            <tr>
              <td style="width: 15%; text-align: center; padding: 5px; border: none; vertical-align: middle;">
                ${logoImgTag}
              </td>
              <td style="width: 85%; text-align: center; font-family: Arial, sans-serif; border: none; vertical-align: middle; padding-left: 15px;">
                <div style="font-size: 10pt; font-weight: bold; color: #555555; letter-spacing: 0.5px; text-transform: uppercase;">
                  PEMERINTAH DAERAH DINAS PENDIDIKAN
                </div>
                <div style="font-size: 12pt; font-weight: bold; color: ${activeColor.primary}; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 2px;">
                  SATUAN ADMINISTRASI OPERASIONAL SEKOLAH
                </div>
                <div style="font-size: 14pt; font-weight: 900; color: ${activeColor.primary}; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px;">
                  ${namaSekolah.toUpperCase()}
                </div>
                <div style="font-size: 8.5pt; color: #666666; font-style: italic; margin-top: 3px;">
                  Sistem Informasi Kurikulum Merdeka - Kec. ${tempatTeks}
                </div>
              </td>
            </tr>
          </table>
          
          <div class="kop-border-line">&nbsp;</div>
 
          <!-- DOCUMENT CONTENT (CONVERTED MARKDOWN) -->
          <div class="document-content">
            ${bodyHtml}
          </div>
 
          <!-- SIGNATURES SECTION -->
          <table style="width: 100%; border-collapse: collapse; border: none; margin-top: 50px; font-family: Arial, sans-serif;">
            <tr>
              <td style="border: none; width: 50%;">&nbsp;</td>
              <td style="border: none; width: 50%; text-align: center; font-size: 11pt; font-weight: bold; color: #333333;">
                ${tempatTeks}, ${tanggalTeks}
              </td>
            </tr>
          </table>
 
          <table class="signature-table">
            <tr>
              <td style="text-align: center; border: none; font-family: Arial, sans-serif;">
                <div style="font-weight: bold; color: #666666; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Mengetahui,</div>
                <div style="font-weight: bold; color: ${activeColor.primary}; font-size: 11pt;">Kepala Sekolah ${namaSekolah}</div>
                <div style="height: 60px;">&nbsp;</div>
                <div style="font-weight: bold; font-size: 11pt; text-decoration: underline; color: #000000;">${namaKepsek}</div>
                <div style="font-size: 10pt; color: #555555; margin-top: 2px;">NIP. ${nipKepsek || "-"}</div>
              </td>
              <td style="text-align: center; border: none; font-family: Arial, sans-serif;">
                <div style="font-weight: bold; color: #666666; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Penyusun,</div>
                <div style="font-weight: bold; color: ${activeColor.primary}; font-size: 11pt;">Guru Mata Pelajaran</div>
                <div style="height: 60px;">&nbsp;</div>
                <div style="font-weight: bold; font-size: 11pt; text-decoration: underline; color: #000000;">${namaGuru}</div>
                <div style="font-size: 10pt; color: #555555; margin-top: 2px;">NIP. ${nipGuru || "-"}</div>
              </td>
            </tr>
          </table>
 
        </div>
      </body>
      </html>
    `;
 
    // Sanitize the filename to completely exclude slashes and illegal path delimiters 
    // which were previously causing browsers to truncate filenames and fallback to .txt formats
    const rawFilename = `${selectedDoc.replace(/\s+/g, "_")}_${selectedSubject.replace(/\s+/g, "_")}_${kelas.replace(/\s+/g, "_")}`;
    const cleanFilename = rawFilename
      .replace(/[^a-zA-Z0-9_]/g, "") // strip all slashes, parentheses, commas, dots
      .replace(/_+/g, "_") + ".doc";
 
    const element = document.createElement("a");
    const file = new Blob(['\ufeff' + fullDocumentHtml], {type: 'application/msword;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = cleanFilename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    triggerNotification("Ekspor Berhasil! Dokumen MS Word (.doc) premium terunduh lengkap dengan Kop Surat, Motif Frame, & TTD.");
  };

  const handlePrint = () => {
    window.print();
  };

  // Dynamic color palette dictionary mapping selectedTheme state to client styling configuration
  const themeColors: Record<DocThemeId, { primary: string; secondary: string; border: string; bg: string }> = {
    emerald: { primary: "#043b32", secondary: "#0e7465", border: "border-[#043b32]", bg: "bg-[#043b32]" },
    sapphire: { primary: "#1e3a8a", secondary: "#2563eb", border: "border-blue-600", bg: "bg-blue-600" },
    crimson: { primary: "#881337", secondary: "#e11d48", border: "border-rose-700", bg: "bg-rose-700" },
    amethyst: { primary: "#581c87", secondary: "#9333ea", border: "border-purple-650", bg: "bg-purple-650" },
    amber: { primary: "#78350f", secondary: "#d97706", border: "border-amber-650", bg: "bg-amber-650" },
    classic: { primary: "#1e293b", secondary: "#475569", border: "border-slate-800", bg: "bg-slate-800" }
  };
  const activeColor = themeColors[selectedTheme] || themeColors.emerald;

  return (
    <div id="siapguru-root" className="min-h-screen bg-[#f0f9f6] text-slate-800 flex flex-col font-sans selection:bg-[#fbbf24] selection:text-slate-900">
      
      {/* Toast Notification HUD */}
      {showNotification && (
        <div id="toast-notify" className="fixed bottom-6 right-6 z-50 bg-teal-950 text-white rounded-lg px-5 py-3 shadow-2xl flex items-center gap-3 border border-teal-800 max-w-sm animate-bounce">
          <CheckCircle2 className="text-emerald-450 h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{showNotification}</span>
        </div>
      )}

      {/* Header bar */}
      <header id="app-header" className="sticky top-0 bg-white border-b border-teal-100 z-40 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group flex items-center gap-3">
              {/* Logo icon container */}
              <div className="relative overflow-hidden bg-[#043b32] text-white p-2 md:p-2.5 rounded-xl shadow-md flex items-center justify-center h-11 w-11 shrink-0">
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo Merdeka Guru" 
                    className="h-full w-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Sparkles className="h-5.5 w-5.5 text-amber-300" />
                )}
                
                {/* Hover overlay upload button */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    title="Ganti Logo"
                    className="p-1 text-white hover:text-amber-300 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                  </button>
                  {logoUrl && (
                    <button 
                      onClick={handleResetLogo}
                      title="Reset Logo"
                      className="p-1 text-white hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleLogoChange}
                accept="image/*"
                className="hidden"
              />

              <div>
                <div className="flex items-center gap-1.5">
                  <span id="logo-title" className="text-lg font-extrabold tracking-tight text-slate-900 font-sans block leading-none">
                    MERDEKA GURU
                  </span>
                  
                  {/* Quick-change link on non-hover / mobile devices */}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] text-teal-700 hover:text-emerald-800 underline flex items-center gap-0.5 md:hidden no-print"
                    title="Ubah Logo"
                  >
                    <Upload className="h-3 w-3" />
                  </button>
                </div>
                <span id="logo-subtitle" className="text-[9px] uppercase font-bold tracking-widest text-[#0e7465] block mt-0.5">
                  UNTUK GURU INDONESIA
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-650">
            <a href="#fitur" className="hover:text-teal-900 transition">Fitur Utama</a>
            <a href="#perbandingan" className="hover:text-teal-900 transition">Perbandingan</a>
            <button onClick={() => faqRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-teal-900 transition">FAQ</button>
          </div>

          <div className="flex items-center gap-4">
            {/* AI Select Toggle */}
            <div className="hidden sm:flex items-center bg-teal-50/70 p-1 rounded-xl border border-teal-100">
              <button 
                onClick={() => {
                  setIsDemoMode(true);
                  triggerNotification("Mode demo aktif. Menggunakan draf kurikulum instan.");
                }} 
                className={`px-3 py-1.5 text-xs rounded-lg transition font-semibold ${isDemoMode ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-900"}`}
              >
                Demo Offline
              </button>
              <button 
                onClick={() => {
                  setIsDemoMode(false);
                  triggerNotification("AI Asli Aktif! Menggunakan model Gemini-3.5-Flash.");
                }} 
                className={`px-3 py-1.5 text-xs rounded-lg transition font-semibold flex items-center gap-1 ${!isDemoMode ? "bg-[#043b32] text-white shadow-xs" : "text-slate-500 hover:text-slate-700"}`}
              >
                <Sparkle className="h-3 w-3 text-amber-300 fill-amber-300" />
                Ditenagai AI
              </button>
            </div>
            
            {isUnlocked ? (
              <div className="flex items-center gap-3.5 no-print">
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] uppercase font-semibold text-emerald-800 block tracking-wider leading-none">LISENSI PREMIUM</span>
                  <span className="text-xs font-black text-slate-800 leading-none block mt-1">{currentUser?.name || "Guru Premium"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-rose-55 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1 cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                  }} 
                  className="text-slate-700 hover:text-teal-900 font-semibold text-sm px-3 py-2 cursor-pointer"
                >
                  Masuk
                </button>
                <button 
                  onClick={() => {
                    setAuthModalTab('register');
                    setIsAuthModalOpen(true);
                  }} 
                  className="bg-[#ebbc26] hover:bg-[#d9a818] text-slate-900 px-4.5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow duration-200 cursor-pointer"
                >
                  Berlangganan
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Body content */}
      <main className="flex-1">

        {/* Hero Banner Section */}
        <section id="hero-banner" className="bg-gradient-to-br from-[#022c22] via-[#043b32] to-[#0a5c4e] py-12 sm:py-20 text-white relative overflow-hidden no-print">
          <div className="absolute inset-0 opacity-8 bg-[radial-gradient(#80f0d0_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-teal-500/30 px-4 py-2 rounded-full text-xs font-semibold text-teal-200 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                Sistem Administrasi Pembelajaran #1 untuk Guru Indonesia
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight">
                Bikin RPP, Modul Ajar & <br className="hidden sm:inline" />
                <span className="text-[#fbbf24]">LKPD dalam Menit</span>
              </h1>
              
              <p className="text-base sm:text-lg text-teal-100/90 max-w-2xl leading-relaxed">
                Buat dokumen administrasi pembelajaran seperti RPP, Modul Ajar, LKPD, Asesmen, dan Jurnal sesuai Kurikulum Merdeka dengan bantuan kecerdasan buatan (AI) tercepat dan terakurat.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button 
                  onClick={() => {
                    generatorCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    triggerNotification("Form formulasi AI siap diisi!");
                  }} 
                  className="bg-[#ebbc26] hover:bg-[#d9a818] text-slate-900 px-8 py-3.5 rounded-xl font-extrabold text-center flex items-center justify-center gap-2 shadow-lg transition-transform duration-250 hover:scale-[1.02]"
                >
                  Mulai Sekarang 
                  <ArrowRight className="h-5 w-5 text-slate-900" />
                </button>
                <button 
                  onClick={() => {
                    const elem = document.getElementById("fitur");
                    elem?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition"
                >
                  <Play className="h-4 w-4 text-white fill-white" />
                  Lihat Cara Kerja
                </button>
              </div>

              {/* Bulleted Benefits */}
              <div className="grid grid-cols-3 gap-2 text-[11px] sm:text-xs text-teal-150 pt-5 border-t border-teal-800/40 max-w-lg">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-extrabold">✓</span> Tanpa kartu kredit
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-extrabold">✓</span> Aktivasi instan
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-extrabold">✓</span> Support WhatsApp
                </div>
              </div>
            </div>
               {/* Hero Right Widget - Interactive AI form */}
            <div ref={generatorCardRef} className="lg:col-span-5">
              <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-100/30 relative">
                
                {/* Visual Status Indicator */}
                <div className="absolute top-4 right-4 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1 flex items-center gap-1 text-[11px] font-bold text-amber-800 z-10">
                  <Award className="h-3.5 w-3.5 text-amber-500 fill-amber-100 animate-pulse" />
                  Kualitas Premium
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-teal-700" />
                    AI Modul Generator
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[11px] text-slate-450 font-semibold uppercase tracking-wider">Step {currentStep} dari 7: {
                      (() => {
                        if (currentStep === 2) {
                          if (selectedDoc === "Asesmen Lengkap") return "Kriteria Asesmen";
                          if (selectedDoc === "Jurnal Harian") return "Detail Jurnal Harian";
                          if (selectedDoc === "Analisis CP") return "Pemetaan CP & ATP";
                          if (selectedDoc === "LKPD Interaktif") return "Model LKPD Aktif";
                          if (selectedDoc === "Artikel Referensi") return "Gaya Penulisan";
                          return "Desain Kurikulum";
                        }
                        return ["Data Umum", "Desain Kurikulum", "Topik & Detail", "Logo & Sekolah", "Tema & Gaya", "Signatures", "Konfirmasi"][currentStep - 1];
                      })()
                    }</span>
                  </div>
                </div>

                {/* Progress Stepper Visual Bar */}
                <div className="flex items-center justify-between gap-1 mb-6 pb-4.5 border-b border-slate-100 overflow-x-auto no-scrollbar">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                    const getStepTitle = (n: number) => {
                      if (n === 2) {
                        if (selectedDoc === "Asesmen Lengkap") return "Asesmen";
                        if (selectedDoc === "Jurnal Harian") return "Jurnal";
                        if (selectedDoc === "Analisis CP") return "Analisis";
                        if (selectedDoc === "LKPD Interaktif") return "LKPD";
                        if (selectedDoc === "Artikel Referensi") return "Artikel";
                        return "Desain";
                      }
                      return ["Umum", "Desain", "Materi", "Sekolah", "Gaya", "TTD", "Bikin"][n - 1];
                    };
                    const title = getStepTitle(num);
                    const isCompleted = currentStep > num;
                    const isActive = currentStep === num;
                    return (
                      <div key={num} className="flex flex-col items-center gap-1 min-w-[46px] shrink-0 flex-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (num < currentStep || isCompleted) {
                              setCurrentStep(num);
                            }
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted 
                              ? 'bg-emerald-600 text-white' 
                              : isActive 
                                ? 'bg-[#043b32] text-white ring-4 ring-emerald-50' 
                                : 'bg-slate-100 text-slate-450 hover:bg-slate-200'
                          }`}
                        >
                          {isCompleted ? <Check className="h-3.5 w-3.5" /> : num}
                        </button>
                        <span className={`text-[9px] font-bold tracking-tight ${isActive ? 'text-[#043b32] font-black' : 'text-slate-400'}`}>
                          {title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={(e) => handleGenerate(e)} className="space-y-4">
                  
                  {/* STEP 1: DATA UMUM KURIKULUM */}
                  {currentStep === 1 && (
                    <div className="space-y-4.5 animate-in fade-in duration-200">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Tipe Dokumen Utama</label>
                        <div className="relative">
                          <select 
                            value={selectedDoc} 
                            onChange={(e) => setSelectedDoc(e.target.value as DocumentType)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer text-slate-800 focus:outline-none"
                          >
                            <option value="RPP Kemendikdasmen">RPP Kemendikdasmen (Modul Ajar)</option>
                            <option value="RPP Cinta Kemenag">RPP Cinta Kemenag (Jenjang Madrasah)</option>
                            <option value="Asesmen Lengkap">Asesmen Lengkap (Kisi &amp; Soal Jelas)</option>
                            <option value="Jurnal Harian">Jurnal Harian &amp; Evaluasi Guru</option>
                            <option value="Analisis CP">Analisis CP &amp; ATP</option>
                            <option value="LKPD Interaktif">LKPD Interaktif Pembelajaran Aktif</option>
                            <option value="Artikel Referensi">Artikel Referensi Guru &amp; Siswa</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-500 pointer-events-none" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Jenjang Pendidikan</label>
                          <div className="relative">
                            <select 
                              value={jenjang} 
                              onChange={(e) => {
                                setJenjang(e.target.value);
                                // Default kelas values based on Jenjang selection
                                let defaultKelas = "Kelas 1";
                                if (e.target.value === "SMP") defaultKelas = "Kelas 7";
                                else if (e.target.value === "SD") defaultKelas = "Kelas 1";
                                else if (e.target.value === "SMA" || e.target.value === "SMK") defaultKelas = "Kelas 10";
                                else if (e.target.value.includes("Madrasah")) defaultKelas = "Kelas 7";
                                handleKelasChange(defaultKelas, e.target.value);
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                            >
                              <option value="SD">SD (Sekolah Dasar)</option>
                              <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                              <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                              <option value="SMK">SMK (Sekolah Menengah Kejuruan)</option>
                              <option value="Madrasah Tsanawiyah (MTs)">MTs (Madrasah Tsanawiyah)</option>
                              <option value="Madrasah Aliyah (MA)">MA (Madrasah Aliyah)</option>
                              <option value="PAUD">PAUD / TK</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Kelas &amp; Fase</label>
                          <div className="relative">
                            <select 
                              value={kelas} 
                              onChange={(e) => handleKelasChange(e.target.value, jenjang)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                            >
                              {jenjang === "SD" && (
                                <>
                                  <option value="Kelas 1">Kelas 1 (Fase A)</option>
                                  <option value="Kelas 2">Kelas 2 (Fase A)</option>
                                  <option value="Kelas 3">Kelas 3 (Fase B)</option>
                                  <option value="Kelas 4">Kelas 4 (Fase B)</option>
                                  <option value="Kelas 5">Kelas 5 (Fase C)</option>
                                  <option value="Kelas 6">Kelas 6 (Fase C)</option>
                                </>
                              )}
                              {(jenjang === "SMP" || jenjang.includes("Ts")) && (
                                <>
                                  <option value="Kelas 7">Kelas 7 (Fase D)</option>
                                  <option value="Kelas 8">Kelas 8 (Fase D)</option>
                                  <option value="Kelas 9">Kelas 9 (Fase D)</option>
                                </>
                              )}
                              {(jenjang === "SMA" || jenjang === "SMK" || jenjang.includes("Aliyah")) && (
                                <>
                                  <option value="Kelas 10">Kelas 10 (Fase E)</option>
                                  <option value="Kelas 11">Kelas 11 (Fase F)</option>
                                  <option value="Kelas 12">Kelas 12 (Fase F)</option>
                                </>
                              )}
                              {jenjang === "PAUD" && (
                                <option value="PAUD Fondasi">PAUD (Fase Fondasi)</option>
                              )}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Mata Pelajaran</label>
                          <div className="relative">
                            <select 
                              value={selectedSubject} 
                              onChange={(e) => {
                                const val = e.target.value;
                                setSelectedSubject(val);
                                if (val.includes("Sasak")) {
                                  setTopic("Basa Alus Singgih & Kesantunan Krama Suku Sasak");
                                }
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer text-slate-800 focus:outline-none"
                            >
                              {SUBJECTS.map((sub, idx) => (
                                <option key={idx} value={sub}>{sub}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Semester</label>
                          <div className="relative">
                            <select 
                              value={semester} 
                              onChange={(e) => setSemester(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                            >
                              <option value="Semester 1 (Ganjil)">Semester 1 (Ganjil)</option>
                              <option value="Semester 2 (Genap)">Semester 2 (Genap)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Alokasi Waktu Mengajar</label>
                        <input 
                          type="text" 
                          value={alokasiWaktu}
                          onChange={(e) => setAlokasiWaktu(e.target.value)}
                          placeholder="e.g. 2 x 40 Menit (1 Pertemuan)"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition text-slate-800 focus:outline-none"
                        />
                        {/* Interactive chip selectors */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {["2 x 35 Menit", "2 x 40 Menit", "3 x 40 Menit", "2 x 45 Menit"].map((chip) => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => setAlokasiWaktu(chip)}
                              className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border transition ${
                                alokasiWaktu === chip 
                                  ? "bg-teal-100 text-teal-950 border-teal-300" 
                                  : "bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200"
                              }`}
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DESAIN PEMBELAJARAN ATAU DETAIL DOKUMEN SPESIFIK */}
                  {currentStep === 2 && (
                    <div className="space-y-4.5 animate-in fade-in duration-200 text-left">
                      
                      {/* SUB-FORM RPP KEMENDIKDASMEN & RPP CINTA KEMENAG */}
                      {(selectedDoc === "RPP Kemendikdasmen" || selectedDoc === "RPP Cinta Kemenag") && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Model Pembelajaran</label>
                            <div className="relative">
                              <select 
                                value={modelPembelajaran} 
                                onChange={(e) => setModelPembelajaran(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                                <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                                <option value="Inquiry / Discovery Learning">Inquiry / Discovery Learning</option>
                                <option value="Cooperative Learning">Cooperative Learning</option>
                                <option value="Ceramah &amp; Diskusi Interaktif">Ceramah &amp; Diskusi Interaktif</option>
                                <option value="Mata Pelajaran Klasik">Klasik &amp; Demonstrasi Kelas</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Tujuan Pembelajaran Khusus (Opsional)</label>
                            <textarea 
                              value={tujuanPembelajaran}
                              onChange={(e) => setTujuanPembelajaran(e.target.value)}
                              placeholder="e.g. Siswa sanggup memecahkan pecahan desimal melalui pembuktian konkrit kelompok..."
                              rows={2}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition resize-none text-slate-800 focus:outline-none"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1.5">
                              <label className="block text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                                Dimensi Profil Pancasila (Pilih min. 4 dari 8)
                              </label>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                selectedProfil.length >= 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-50 text-rose-700 font-black animate-pulse'
                              }`}>
                                {selectedProfil.length} Terpilih
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1 border border-slate-100 rounded-xl p-2 bg-slate-25">
                              {[
                                "Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia",
                                "Bernalar Kritis (Penalaran Kritis)",
                                "Gotong Royong (Kolaborasi)",
                                "Mandiri (Kemandirian)",
                                "Kreatif (Kreativitas)",
                                "Berkebinekaan Global (Kewargaan)",
                                "Kesehatan Fisik & Spiritual (Kesejahteraan)",
                                "Inovasi & Berpikir Kritis Berkemajuan"
                              ].map((dim, idx) => {
                                const isSet = selectedProfil.includes(dim);
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      if (isSet) {
                                        setSelectedProfil(prev => prev.filter(p => p !== dim));
                                      } else {
                                        setSelectedProfil(prev => [...prev, dim]);
                                      }
                                    }}
                                    className={`p-2 rounded-lg border text-left text-[10px] font-bold transition-all ${
                                      isSet 
                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-black' 
                                        : 'border-slate-150 hover:bg-slate-50 text-slate-600 bg-white'
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                                        isSet ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-350'
                                      }`}>
                                        {isSet && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                                      </div>
                                      <span className="leading-tight truncate">{dim}</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}

                      {/* SUB-FORM ASESMEN LENGKAP */}
                      {selectedDoc === "Asesmen Lengkap" && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Tipe Asesmen</label>
                            <div className="relative">
                              <select 
                                value={asesmenTipe} 
                                onChange={(e) => setAsesmenTipe(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Sumatif Akhir Lingkup Materi">Sumatif Akhir Lingkup Materi</option>
                                <option value="Formatif Proses Pembelajaran">Formatif / Tes Harian Kelas</option>
                                <option value="Sumatif Akhir Semester (SAS)">Sumatif Akhir Semester (SAS)</option>
                                <option value="Asesmen Kebajikan & Sikap (Keagamaan)">Asesmen Kebajikan &amp; Karakter (Keagamaan)</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Bentuk / Format Soal Utama</label>
                            <div className="relative">
                              <select 
                                value={asesmenBentukSoal} 
                                onChange={(e) => setAsesmenBentukSoal(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Pilihan Ganda &amp; Esai">Pilihan Ganda (PG) &amp; Esai Uraian (Rekomendasi)</option>
                                <option value="Hanya Pilihan Ganda">Hanya Pilihan Ganda (A-B-C-D)</option>
                                <option value="Hanya Esai Uraian">Hanya Esai / Uraian Studi Kasus</option>
                                <option value="Asesmen Unjuk Kerja &amp; Praktik">Asesmen Unjuk Kerja &amp; Praktik Masalah</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Jumlah Butir Soal Evaluasi</label>
                            <div className="relative">
                              <select 
                                value={asesmenJumlahSoal} 
                                onChange={(e) => setAsesmenJumlahSoal(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="5 Pilihan Ganda &amp; 2 Esai (Standar)">5 Pilihan Ganda &amp; 2 Esai (Standar Cepat)</option>
                                <option value="10 Pilihan Ganda &amp; 3 Esai (Lengkap)">10 Pilihan Ganda &amp; 3 Esai (Lengkap)</option>
                                <option value="15 Pilihan Ganda &amp; 5 Esai (Komprehensif)">15 Pilihan Ganda &amp; 5 Esai (Sangat Ujian)</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Target Level Kognitif Berpikir</label>
                            <div className="relative">
                              <select 
                                value={asesmenLevelKognitif} 
                                onChange={(e) => setAsesmenLevelKognitif(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Campuran (HOTS, MOTS, LOTS)">Campuran Berimbang (LOTS, MOTS, HOTS)</option>
                                <option value="Fokus HOTS (C4-C6 / Berpikir Tingkat Tinggi)">Fokus HOTS (High Order Thinking Skills)</option>
                                <option value="Pemahaman Dasar &amp; Menengah (L1-L2)">Pemahaman Konsep &amp; Aplikasi Dasar (L1-L2)</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* SUB-FORM JURNAL HARIAN */}
                      {selectedDoc === "Jurnal Harian" && (
                        <>
                          <div className="grid grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Tanggal Pembelajaran</label>
                              <input 
                                type="text"
                                value={jurnalTanggal}
                                onChange={(e) => setJurnalTanggal(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white text-slate-800 transition focus:outline-none"
                                placeholder="e.g. Kamis, 04 Juni 2026"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Kehadiran &amp; Ketertiban Kelas</label>
                              <div className="relative">
                                <select 
                                  value={jurnalJumlahSiswa} 
                                  onChange={(e) => setJurnalJumlahSiswa(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                                >
                                  <option value="Lengkap (Semua Siswa Hadir)">Lengkap (Semua Siswa Hadir &amp; Aktif)</option>
                                  <option value="Sangat Kondusif (Hanya 1 S/I/A)">Sangat Kondusif (Hanya 1 Siswa Sakit/Izin)</option>
                                  <option value="Kurang Kondusif (Ada gangguan konsentrasi)">Ada Hambatan Ketertiban / Konsentrasi</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Kejadian Penting / Kendala di Kelas</label>
                            <textarea 
                              value={jurnalKejadianPenting}
                              onChange={(e) => setJurnalKejadianPenting(e.target.value)}
                              placeholder="e.g. Siswa sangat antusias melakukan praktikum kelompok, namun ada beberapa siswa kesulitan mencerna materi desimal..."
                              rows={3}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition text-slate-800 focus:outline-none animate-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Rencana Tindak Lanjut Guru (Solusi Reflektif)</label>
                            <textarea 
                              value={jurnalTindakLanjut}
                              onChange={(e) => setJurnalTindakLanjut(e.target.value)}
                              placeholder="e.g. Memberikan bimbingan scaffolding individu pasca-praktik serta pengayaan tambahan di lembar PR..."
                              rows={3}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition text-slate-800 focus:outline-none animate-none"
                            />
                          </div>
                        </>
                      )}

                      {/* SUB-FORM ANALISIS CP */}
                      {selectedDoc === "Analisis CP" && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Elemen Pembahasan Kurikulum</label>
                            <div className="relative">
                              <select 
                                value={analisisElemen} 
                                onChange={(e) => setAnalisisElemen(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Sesuai Bidang Studi Utama">Otomatis / Sesuai Elemen Bidang Studi Utama</option>
                                <option value="Analisis Elemen Pengetahuan / Kognitif">Analisis Elemen Pengetahuan Konseptual</option>
                                <option value="Elemen Keterampilan Proses Pembelajaran">Analisis Elemen Keterampilan / Praktik Eksploratif</option>
                                <option value="Integrasi Sikap Mandiri Pancasila">Pemetaan Integrasi Sikap Pancasila (P3)</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-bold">Fokus Rencana Pemetaan Alur Pembelajaran (ATP)</label>
                            <textarea 
                              value={analisisAtpSasaran}
                              onChange={(e) => setAnalisisAtpSasaran(e.target.value)}
                              placeholder="e.g. Menyusun ATP berjenjang dari penguasaan konsep konseptual dasar menuju tingkat tinggi secara logis..."
                              rows={3}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition text-slate-800 focus:outline-none animate-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Target Kriteria Ketercapaian Pembelajaran (KKTP)</label>
                            <div className="relative">
                              <select 
                                value={analisisTargetKkm} 
                                onChange={(e) => setAnalisisTargetKkm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="75 - Kategori Baik (Tuntas)">75 - Kategori Baik (Merdeka Tuntas)</option>
                                <option value="80 - Kategori Sangat Baik (Tinggi)">80 - Kategori Sangat Baik (Prestisius)</option>
                                <option value="70 - Kategori Cukup (Standar Minimal)">70 - Kategori Cukup (Minimal Nasional)</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* SUB-FORM LKPD INTERAKTIF */}
                      {selectedDoc === "LKPD Interaktif" && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-bold">Model Game / Pembelajaran Aktif Pilihan</label>
                            <div className="relative">
                              <select 
                                value={lkpdModelGame} 
                                onChange={(e) => setLkpdModelGame(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Detektif Pintar &amp; Simulasi Konkret">Misi Detektif Pintar (Game Sapa Beranting)</option>
                                <option value="Permainan Peran &amp; Diskusi Sosial">Permainan Peran / Roleplay Sosial Kontekstual</option>
                                <option value="Eksperimen Interaktif Penyelidik Cilik">Penyelidik Cilik (Eksperimen Kelomok Terpadu)</option>
                                <option value="Tantangan Teka Teki Kreatif">Teka-Teki Silang &amp; Isian Teka Konsep</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Format Pembagian Kelompok Kerja</label>
                            <div className="relative">
                              <select 
                                value={lkpdKelompok} 
                                onChange={(e) => setLkpdKelompok(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Berpasangan / Teman Sebangku">Berpasangan / Teman Sebangku (Duo Kerja)</option>
                                <option value="Kelompok Kecil (3-4 Anggota)">Kelompok Kecil Aktif (3-4 Anggota)</option>
                                <option value="Kelompok Besar (5-6 Anggota)">Kelompok Besar Bergotong Royong (5-6 Anggota)</option>
                                <option value="Aktivitas Mandiri (Individu)">Aktivitas Mandiri (Tugas Individu Khusus)</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Media &amp; Alat Bantu Tersedia</label>
                            <div className="relative">
                              <select 
                                value={lkpdMedia} 
                                onChange={(e) => setLkpdMedia(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Alat Peraga Konkret, Proyektor LCD &amp; Papan Tulis">Alat Peraga Guru, Slide LCD &amp; Papan Tulis</option>
                                <option value="Eksperimen Bahan Alam Sekitar">Bahan Alam Kreatif Sekitar Sekolah (Daun, Kerikil)</option>
                                <option value="Gambar Bergambar &amp; Kartu Soal">Kartu Bergambar Pembelajaran &amp; Penugas Kertas</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* SUB-FORM ARTIKEL REFERENSI */}
                      {selectedDoc === "Artikel Referensi" && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Gaya Bahasa Penulisan Artikel</label>
                            <div className="relative">
                              <select 
                                value={artikelGaya} 
                                onChange={(e) => setArtikelGaya(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Sains Populer &amp; Edukatif Menyenangkan">Sains Populer &amp; Edukatif Menyenangkan (Indah &amp; Atraktif)</option>
                                <option value="Storytelling / Narasi Kreatif Berkisah">Storytelling / Narasi Kreatif Berkisah (Berkisah Menarik)</option>
                                <option value="Studi Kasus Analitis Mendalam (Akademis)">Studi Kasus Analitis Mendalam (Akademis Formal)</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-bold">Target Pembaca Utama</label>
                            <div className="relative">
                              <select 
                                value={artikelTarget} 
                                onChange={(e) => setArtikelTarget(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Keduanya (Guru &amp; Siswa)">Bahan Bacaan Kolaborasi bagi Keduanya (Guru &amp; Siswa)</option>
                                <option value="Khusus Guru (Bahan Pengayaan Rujukan)">Khusus Guru (Pedoman Pengayaan Metode &amp; Kajian)</option>
                                <option value="Khusus Siswa (Materi Ringkas Mudah Dipahami)">Khusus Siswa (Ringkas, Berilustrasi &amp; Santai)</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Fokus Literasi Pembahasan</label>
                            <div className="relative">
                              <select 
                                value={artikelFokus} 
                                onChange={(e) => setArtikelFokus(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition appearance-none cursor-pointer focus:outline-none"
                              >
                                <option value="Aplikasi Praktis Kehidupan Nyata &amp; Miskonsepsi">Aplikasi Praktis Kehidupan Nyata &amp; Bedah Miskonsepsi (Esensial)</option>
                                <option value="Sejarah &amp; Perkembangan Konsep Ilmu">Sejarah &amp; Tokoh Perkembangan Konsep Keilmuan</option>
                                <option value="Korelasi Antara Kebajikan &amp; Logika Sains">Korelasi Antara Karakter Luhur &amp; Logika Keabsahan Ilmu</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                            </div>
                          </div>
                        </>
                      )}

                    </div>
                  )}

                  {/* STEP 3: TOPIK & SELEKSI MATERI */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Topik / Materi Pokok Pembahasan</label>
                        <input 
                          type="text" 
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="Contoh: Bilangan Bulat &amp; Operasinya"
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition text-slate-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Detail Tambahan / Referensi Buku (Sangat direkomendasikan)</label>
                        <textarea 
                          value={detailMateri}
                          onChange={(e) => setDetailMateri(e.target.value)}
                          placeholder="e.g. Paste atau tulis ringkasan materi, KD dari buku dinas, atau instruksi ice breaking khusus agar dokumen RPP yang dihasilkan AI bernilai tinggi."
                          rows={6}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#043b32] focus:bg-white transition text-slate-850 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 4: BERKAS LOGO & SEKOLAH KOP */}
                  {currentStep === 4 && (
                    <div className="space-y-4.5 animate-in fade-in duration-200 text-left">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Kustomisasi Logo Kop Surat</label>
                        <div className="flex items-center gap-4 bg-slate-25 p-3 rounded-2xl border border-slate-150">
                          <div className="h-16 w-16 border border-slate-200 rounded-2xl bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                            {schoolLogoUrl ? (
                              <img src={schoolLogoUrl} alt="Logo Sekolah" className="h-full w-full object-contain p-1.5" referrerPolicy="no-referrer" />
                            ) : (
                              <span className="text-3xl font-bold">🏫</span>
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <input 
                              type="file" 
                              accept="image/*"
                              id="school-logo-wizard"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 2 * 1024 * 1024) {
                                    triggerNotification("File terlalu besar (batas 2MB)!");
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const result = event.target?.result as string;
                                    if (result) {
                                      setSchoolLogoUrl(result);
                                      localStorage.setItem('merdekaguru_school_logo', result);
                                      triggerNotification("Logo sekolah berhasil dilampirkan!");
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                            <div className="flex gap-2">
                              <label 
                                htmlFor="school-logo-wizard"
                                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[10px] font-bold cursor-pointer transition flex items-center gap-1 shadow-sm"
                              >
                                {schoolLogoUrl ? "Ganti Logo" : "Pilih Logo Sekolah"}
                              </label>
                              {schoolLogoUrl && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSchoolLogoUrl(null);
                                    localStorage.removeItem('merdekaguru_school_logo');
                                    triggerNotification("Logo dikembalikan ke standar.");
                                  }}
                                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-650 rounded-xl text-[10px] font-bold cursor-pointer transition"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                            <p className="text-[9px] text-slate-400 font-semibold leading-none">Format JPEG/PNG, maks. 2MB</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nama Sekolah / Instansi Pemerintah</label>
                        <input 
                          type="text" 
                          value={namaSekolah}
                          onChange={(e) => {
                            setNamaSekolah(e.target.value);
                            localStorage.setItem('merdekaguru_metadata_nama_sekolah', e.target.value);
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#043b32] text-slate-850 text-slate-800 focus:outline-none"
                          placeholder="e.g. UPTD Satuan Pendidikan Merdeka"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 5: TEMA WARNA & GAYA DOKUMEN */}
                  {currentStep === 5 && (
                    <div className="space-y-4 animate-in fade-in duration-200 text-left">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-650 uppercase tracking-wider mb-2">Pilih Warna Kalem Dokumen</label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            { id: "emerald", name: "Hijau Kalem", color: "bg-emerald-600 border-emerald-100" },
                            { id: "sapphire", name: "Biru Kelas", color: "bg-blue-600 border-blue-105" },
                            { id: "crimson", name: "Merah Formal", color: "bg-rose-600 border-rose-105" },
                            { id: "amethyst", name: "Ungu Kreatif", color: "bg-purple-600 border-purple-105" },
                            { id: "amber", name: "Emas Elegan", color: "bg-amber-500 border-amber-105" },
                            { id: "classic", name: "Hitam Klasik", color: "bg-slate-700 border-slate-105" }
                          ].map((theme) => {
                            const isSet = selectedTheme === theme.id;
                            return (
                              <button
                                key={theme.id}
                                type="button"
                                onClick={() => setSelectedTheme(theme.id as DocThemeId)}
                                className={`p-2 rounded-xl border text-center transition-all ${
                                  isSet 
                                    ? 'border-[#0e7465] bg-teal-25 text-[#0e7465] font-black shadow-inner shadow-teal-50' 
                                    : 'border-slate-150 hover:bg-slate-50 text-slate-600 bg-white'
                                }`}
                              >
                                <div className="flex flex-col items-center gap-1">
                                  <span className={`w-4 h-4 rounded-full ${theme.color} border shadow-xs`} />
                                  <span className="text-[9px] leading-tight font-bold">{theme.name}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-650 uppercase tracking-wider mb-2">Orientasi Halaman Ekspor</label>
                        <div className="flex gap-3">
                          {[
                            { val: "Portrait (Tegak)", desc: "Dinas / Standar Rasi" },
                            { val: "Landscape (Mendaftar)", desc: "Rencana Pembelajaran Terbuka" }
                          ].map((item) => {
                            const isSet = orientasiHalaman === item.val;
                            return (
                              <button
                                key={item.val}
                                type="button"
                                onClick={() => setOrientasiHalaman(item.val)}
                                className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                                  isSet 
                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' 
                                    : 'border-slate-200 hover:bg-slate-50 text-slate-600 bg-white'
                                }`}
                              >
                                <span className="text-xs font-bold block">{item.val}</span>
                                <span className="text-[9px] text-slate-450 block mt-0.5 font-medium leading-tight">{item.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-650 uppercase tracking-wider mb-2">Gaya Bahasa AI</label>
                        <div className="flex gap-3">
                          {["Sederhana", "Formal", "Interaktif & Kreatif"].map((gaya) => {
                            const isSet = gayaBahasa === gaya;
                            return (
                              <button
                                key={gaya}
                                type="button"
                                onClick={() => setGayaBahasa(gaya)}
                                className={`flex-1 p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                                  isSet 
                                    ? 'border-[#0e7465] bg-teal-25 text-[#0e7465] font-extrabold' 
                                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                                }`}
                              >
                                {gaya}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: DATA PENGESAHAN & SIGNATURES */}
                  {currentStep === 6 && (
                    <div className="space-y-4 animate-in fade-in duration-200 text-left">
                      <p className="text-[10px] text-slate-450 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-150 leading-relaxed mb-1">
                        Sertakan nama kepala sekolah, guru, tempat, dan tanggal pengesahan agar langsung terlukis rapi di paling bawah dokumen Word!
                      </p>
                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Nama Guru Penyusun</label>
                          <input 
                            type="text" 
                            value={namaGuru}
                            onChange={(e) => {
                              setNamaGuru(e.target.value);
                              localStorage.setItem('merdekaguru_metadata_nama_guru', e.target.value);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                            placeholder="e.g. Suhartati, S.Pd."
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">NIP Guru</label>
                          <input 
                            type="text" 
                            value={nipGuru}
                            onChange={(e) => {
                              setNipGuru(e.target.value);
                              localStorage.setItem('merdekaguru_metadata_nip_guru', e.target.value);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                            placeholder="e.g. 19820715 201001 2 004"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Nama Kepala Sekolah</label>
                          <input 
                            type="text" 
                            value={namaKepsek}
                            onChange={(e) => {
                              setNamaKepsek(e.target.value);
                              localStorage.setItem('merdekaguru_metadata_nama_kepsek', e.target.value);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                            placeholder="e.g. Ahmad Sunaryo, M.Pd."
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">NIP Kepala Sekolah</label>
                          <input 
                            type="text" 
                            value={nipKepsek}
                            onChange={(e) => {
                              setNipKepsek(e.target.value);
                              localStorage.setItem('merdekaguru_metadata_nip_kepsek', e.target.value);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                            placeholder="e.g. 19710322 199903 1 001"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Tempat Penulisan</label>
                          <input 
                            type="text" 
                            value={tempatTeks}
                            onChange={(e) => {
                              setTempatTeks(e.target.value);
                              localStorage.setItem('merdekaguru_metadata_tempat', e.target.value);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                            placeholder="e.g. Sandik"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Tanggal Dokumen</label>
                          <input 
                            type="text" 
                            value={tanggalTeks}
                            onChange={(e) => {
                              setTanggalTeks(e.target.value);
                              localStorage.setItem('merdekaguru_metadata_tanggal', e.target.value);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                            placeholder="e.g. 1 Juni 2026"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 7: REVIEW CONFIGURATION & GENERATE */}
                  {currentStep === 7 && (
                    <div className="space-y-4 animate-in fade-in duration-200 text-left">
                      <div className="bg-slate-25 border border-slate-150 rounded-2xl p-4.5 space-y-3.5 text-xs">
                        <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center justify-between uppercase text-[10px] tracking-wider">
                          <span>Konfirmasi Berkas</span>
                          <span className="text-teal-700 capitalize">Bebas Plagiat</span>
                        </h4>

                        <div className="grid grid-cols-2 gap-3 font-medium text-slate-500 text-[11px] leading-tight">
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-slate-400">Tipe Dokumen</span>
                            <span className="text-slate-800 font-bold">{selectedDoc}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-slate-400">Mata Pelajaran</span>
                            <span className="text-slate-800 font-bold">{selectedSubject}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-slate-400">Kelas / Fase</span>
                            <span className="text-slate-800 font-bold">{selectedGrade}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-slate-400">Topik Pembahasan</span>
                            <span className="text-slate-800 font-bold truncate block">{topic}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-slate-400">Sekolah / Logo</span>
                            <span className="text-slate-800 font-bold leading-none block truncate mt-0.5">{namaSekolah} {schoolLogoUrl ? '(Logo Aktif)' : '(Tanpa Logo)'}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-slate-400">P3 Pancasila</span>
                            <span className="text-slate-800 font-bold text-[10px] block truncate mt-0.5 bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded w-fit">
                              {selectedProfil.length} Dimensi Dipilih
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* API Engine Status Banner */}
                      <div className="bg-[#043b32]/5 border border-[#043b32]/10 rounded-xl p-3.5 flex items-start gap-2 text-xs text-[#043b32]">
                        <AlertCircle className="h-4.5 w-4.5 text-[#043b32] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-[#043b32]">Model: {isDemoMode ? "Demo Draf Instan" : "Gemini Generative AI"}</p>
                          <p className="text-slate-550 font-semibold leading-relaxed text-[10px]">
                            {isDemoMode ? "Bypass model luar. Menggenerasi draf struktur instan kualitas tinggi secara aman." : "Melakukan inferensi kurikulum komprehensif via Google Cloud Run API."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NAVIGATION CONTROL FOOTER FOR WIZARD */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-6 gap-3">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-250 text-slate-800 rounded-xl font-bold text-xs cursor-pointer transition"
                      >
                        Kembali
                      </button>
                    )}
                    
                    {currentStep < 7 ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (currentStep === 1 && !topic.trim()) {
                            triggerNotification("Tolong isi Topik / Materi Pokok terlebih dahulu!");
                            return;
                          }
                          if (currentStep === 2 && selectedProfil.length < 4) {
                            triggerNotification("Kecerdasan Buatan membutuhkan minimal 4 dari 8 dimensi lulusan Pancasila!");
                            return;
                          }
                          setCurrentStep(prev => prev + 1);
                        }}
                        className="px-5 py-2.5 bg-[#043b32] hover:bg-[#0c5c4e] text-white rounded-xl font-bold text-xs ml-auto flex items-center gap-1.5 cursor-pointer transition shadow-xs"
                      >
                        Lanjut
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs ml-auto flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer transition"
                      >
                        {isGenerating ? (
                          <>
                            <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Menyusun...</span>
                          </>
                        ) : (
                          <>
                            <span>Bikin Sekarang ✓</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Real-time Document Creation Progress Bar (Conditional on loading state) */}
        {isGenerating && (
          <section id="generating-overlay" className="bg-white border-b border-gray-150 py-10 transition-all no-print">
            <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
              <div className="inline-flex bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-800 uppercase animate-pulse">
                Proses Pembuatan Dokumen Berjalan
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI Sedang Menyusun Dokumen Administrasi Anda</h3>
              <p className="text-sm text-slate-500 max-w-lg mx-auto">{progressMessage}</p>
              
              {/* Progress Container */}
              <div className="space-y-1.5 max-w-md mx-auto">
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden shadow-inner border border-slate-200">
                  <div 
                    className="bg-gradient-to-r from-teal-600 to-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs font-mono font-bold text-teal-700">{progress}% Selesai</div>
              </div>

              <div className="text-xs text-slate-400">Estimasi waktu tinggal beberapa detik...</div>
            </div>
          </section>
        )}

        {/* Live Workspace / Document Output Viewer Section */}
        {generatedDoc && (
          <section ref={workspaceRef} className="bg-teal-50/20 py-12 scroll-mt-20 border-b border-teal-100" id="workspace">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              
              {/* Document Header HUD Control panel */}
              <div className="bg-white border border-slate-200 rounded-t-2xl px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md no-print">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-none flex items-center gap-2">
                      {selectedDoc}
                      {isRefined && <span className="bg-teal-100 text-[#043b32] text-[10px] px-2.5 py-0.5 rounded-full font-bold">Telah Direvisi</span>}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono mt-0.5 block">{selectedGrade} • {selectedSubject}</span>
                  </div>
                </div>

                {/* Floating operations buttons */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button 
                    onClick={handleCopy}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-705 flex items-center gap-2 transition cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                    Salin Teks
                  </button>
                  <button 
                    onClick={handleDownloadWord}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-705 flex items-center gap-2 transition cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    Ekspor Word
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="bg-[#0e7465] hover:bg-[#075c50] text-white rounded-lg px-3.5 py-2 font-bold flex items-center gap-2 transition shadow-xs cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    Cetak / Simpan PDF
                  </button>
                </div>
              </div>

              {/* Theme Customizer Panel */}
              <div className="bg-slate-50 border-x border-b border-slate-200 px-5 sm:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs no-print shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1.5 shrink-0 select-none">
                    <Palette className="h-4 w-4 text-emerald-800" />
                    Tema Desain Dokumen:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(DOC_THEMES) as DocThemeId[]).map((themeKey) => {
                      const theme = DOC_THEMES[themeKey];
                      const isActive = selectedTheme === themeKey;
                      
                      let dotColor = "bg-teal-600";
                      if (themeKey === 'sapphire') dotColor = "bg-blue-600";
                      if (themeKey === 'crimson') dotColor = "bg-rose-600";
                      if (themeKey === 'amethyst') dotColor = "bg-purple-650";
                      if (themeKey === 'amber') dotColor = "bg-amber-500";
                      if (themeKey === 'classic') dotColor = "bg-slate-700";

                      return (
                        <button
                          key={themeKey}
                          onClick={() => {
                            setSelectedTheme(themeKey);
                            triggerNotification(`Tampilan dokumen diganti ke tema: ${theme.name}`);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg border transition font-bold flex items-center gap-1.5 cursor-pointer text-[10.5px] sm:text-xs ${
                            isActive 
                              ? 'bg-[#043b32] border-[#043b32] text-white shadow-xs' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`h-2.1 w-2.1 rounded-full ${isActive ? 'bg-white' : dotColor}`}></span>
                          {theme.name.split(' (')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Document Sheet layout (A4 simulated paper) */}
              <div 
                id="a4-document-sheet" 
                className="bg-white px-6 py-8 sm:px-12 sm:py-16 shadow-2xl border-4 border-double border-teal-900/60 rounded-b-2xl relative"
                style={{ contentVisibility: 'auto' }}
              >
                {/* Print Banner (shows only during printing) */}
                <div className="hidden print-only mb-6 pb-4 border-b border-slate-400 text-xs text-slate-500 justify-between items-center flex-row">
                  <div className="flex items-center gap-2">
                    {logoUrl && (
                      <img src={logoUrl} alt="Logo" className="h-6 w-auto object-contain inline-block" referrerPolicy="no-referrer" />
                    )}
                    <span className="font-bold">MERDEKA GURU - AI Generator Kurikulum Merdeka</span>
                  </div>
                  <div>Dicetak pada: {new Date().toLocaleDateString('id-ID')}</div>
                </div>
                {/* STUNNING PREVIEW COVER PAGE (KAPER) */}
                <div className="cover-page flex flex-col justify-between min-h-[9.5in] border-4 border-double p-8 md:p-12 mb-12 relative font-sans text-slate-800" style={{ borderColor: activeColor.primary, pageBreakAfter: 'always', breakAfter: 'page' }}>
                  {/* Top line decoration */}
                  <div className="absolute top-4 left-4 right-4 h-1" style={{ backgroundColor: activeColor.primary }} />
                  
                  {/* School Name & Doc Nature */}
                  <div className="text-center mt-2">
                    <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-slate-400 block mb-1">DOKUMEN ADMINISTRASI RESMI</span>
                    <span className="text-xs md:text-sm font-bold uppercase text-slate-600 tracking-wider">SIAPGURU ADMINISTRATOR</span>
                  </div>

                  {/* Centered Logo */}
                  <div className="my-8 flex justify-center">
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-slate-50 border-2 border-slate-200 rounded-3xl flex items-center justify-center p-3 shadow-md">
                      {schoolLogoUrl ? (
                        <img src={schoolLogoUrl} alt="Logo" className="max-h-full max-w-full object-contain rounded-md" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-5xl md:text-6xl">🏫</span>
                      )}
                    </div>
                  </div>

                  {/* Bold Title Section */}
                  <div className="text-center space-y-3.5 my-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-900 leading-none">
                      {selectedDoc.toUpperCase()}
                    </h1>
                    <div className="w-20 h-1.5 mx-auto rounded-full" style={{ backgroundColor: activeColor.primary }} />
                    <h2 className="text-lg md:text-xl font-black text-slate-700 uppercase tracking-wide">
                      Mata Pelajaran: {selectedSubject.toUpperCase()}
                    </h2>
                    <p className="text-xs md:text-sm font-bold bg-slate-100 rounded-full px-5 py-2 inline-block text-slate-600 max-w-md border border-slate-200 leading-normal">
                      Topik Pokok: <strong className="text-slate-800">{topic || "Pembelajaran Inti"}</strong>
                    </p>
                  </div>

                  {/* Metadata Grid Table */}
                  <div className="mx-auto w-full max-w-md bg-slate-50/80 border border-slate-200 rounded-2xl p-4 md:p-5 shadow-xs my-6">
                    <table className="w-full text-xs md:text-sm font-medium text-slate-700 border-collapse table-fixed">
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td className="py-2.5 font-bold text-slate-500 w-[35%] text-left">Kelas / Fase</td>
                          <td className="py-2.5 font-semibold text-slate-900 text-left">: {selectedGrade || kelas}</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="py-2.5 font-bold text-slate-500 text-left">Semester</td>
                          <td className="py-2.5 font-semibold text-slate-900 text-left">: {semester || "1 (Ganjil)"}</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="py-2.5 font-bold text-slate-500 text-left">Alokasi Waktu</td>
                          <td className="py-2.5 font-semibold text-slate-905 text-left">: {alokasiWaktu || "2 x 40 Menit"}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold text-slate-500 text-left">Penyusun</td>
                          <td className="py-2.5 font-bold text-slate-900 text-left">: {namaGuru || "Hasanudin, S.Pd."}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Context */}
                  <div className="text-center mt-4">
                    <p className="text-xs md:text-sm font-black uppercase text-slate-700 tracking-wider">
                      {namaSekolah || "SD Negeri 4 Sandik"}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">
                      TAHUN AJARAN {new Date().getFullYear()}/{new Date().getFullYear() + 1}
                    </p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-4 left-4 right-4 h-1" style={{ backgroundColor: activeColor.primary }} />
                </div>

                {/* Aesthetic page break line on-screen only (hidden on print) */}
                <div className="no-print my-10 flex items-center justify-center gap-4 select-none">
                  <div className="h-[1px] bg-slate-200 flex-1"></div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase bg-slate-100 px-3 py-1 rounded-full border border-slate-250">
                    Batas Halaman Sampul (Page Break)
                  </span>
                  <div className="h-[1px] bg-slate-200 flex-1"></div>
                </div>

                {/* Live Kop Surat (School Header Header) in on-screen A4 Paper */}
                <div className="border-b-4 border-double border-slate-800 pb-4 mb-8 flex items-center justify-between gap-4 select-none">
                  <div className="h-14 w-14 md:h-16 md:w-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-xs">
                    {schoolLogoUrl ? (
                      <img src={schoolLogoUrl} alt="Logo Sekolah" className="max-h-full max-w-full object-contain rounded-sm" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-3xl text-teal-850">🏫</span>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center font-sans">
                    <h5 className="text-[10px] md:text-xs font-bold uppercase text-slate-500 tracking-wider leading-none">
                      PEMERINTAH KABUPATEN / KOTA ADMINISTRASI
                    </h5>
                    <h4 className="text-xs md:text-sm font-black uppercase text-teal-950 mt-1 tracking-tight leading-none">
                      DINAS PENDIDIKAN DAN KEBUDAYAAN
                    </h4>
                    <p className="text-xs md:text-base font-extrabold uppercase tracking-wide text-[#043b32] mt-1.5 leading-none">
                      {namaSekolah || "SD Negeri 4 Sandik"}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-semibold italic mt-1.5">
                      Jl. Pendidikan No. 4, {tempatTeks || "Sandik"}, Kode Pos 83332
                    </p>
                  </div>
                  
                  {/* Invisible balance space cell */}
                  <div className="h-14 w-14 md:h-16 md:w-16 opacity-0 shrink-0 hidden sm:block"></div>
                </div>

                {/* Primary converted document body */}
                <div className="pb-8">
                  <MarkdownRenderer content={cleanDocumentContent(generatedDoc)} themeId={selectedTheme} />
                </div>

                {/* Live bottom authentic signatures in A4 paper */}
                <div className="mt-8 pt-8 border-t border-dashed border-slate-200 font-sans text-xs sm:text-sm text-slate-800">
                  <div className="text-right mb-6 font-semibold md:pr-6">
                    {tempatTeks || "Sandik"}, {tanggalTeks || "1 Juni 2026"}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-center max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                      <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1">Mengetahui,</p>
                      <p className="font-extrabold text-[#043b32] text-xs md:text-sm leading-tight">Kepala Sekolah {namaSekolah || "SD Negeri 4 Sandik"}</p>
                      
                      <div className="h-20 flex items-center justify-center">
                        <span className="text-[9px] px-3 py-1.5 border border-dashed border-slate-200 rounded-lg text-slate-400 bg-slate-50/50 select-none">
                          Tanda Tangan &amp; Stempel Resmi
                        </span>
                      </div>
                      
                      <p className="font-extrabold text-slate-900 underline text-xs md:text-sm leading-tight">{namaKepsek || "Suhartono, M.Pd."}</p>
                      <p className="text-[10px] md:text-xs font-bold text-slate-500 mt-0.5">NIP. {nipKepsek || "19781023 200502 2 001"}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1">Penyusun,</p>
                      <p className="font-extrabold text-[#043b32] text-xs md:text-sm leading-tight">Guru Mata Pelajaran</p>
                      
                      <div className="h-20 flex items-center justify-center">
                        <span className="text-[9px] px-3 py-1.5 border border-dashed border-slate-200 rounded-lg text-slate-400 bg-slate-50/50 select-none">
                          Tanda Tangan Guru
                        </span>
                      </div>
                      
                      <p className="font-extrabold text-slate-900 underline text-xs md:text-sm leading-tight">{namaGuru || "Hasanudin, S.Pd."}</p>
                      <p className="text-[10px] md:text-xs font-bold text-slate-500 mt-0.5">NIP. {nipGuru || "19850412 201103 1 002"}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Chat Refine Section - allows direct editing with AI instruction side-bars */}
              <div className="mt-8 bg-[#022c22] text-white rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 no-print border border-teal-900">
                <div className="flex items-start gap-3">
                  <div className="bg-[#0e7465] p-2.5 rounded-xl text-white mt-1">
                    <Sparkles className="h-5 w-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Revisi dengan Asisten AI</h4>
                    <p className="text-xs text-teal-100/90 max-w-xl">
                      Ada bagian yang kurang cocok? Tulis apa saja yang ingin diperbaiki, asisten AI MERDEKA GURU akan langsung menyesuaikan lembar draf di atas secara instan!
                    </p>
                  </div>
                </div>

                <form onSubmit={handleRefine} className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    value={refineFeedback}
                    onChange={(e) => setRefineFeedback(e.target.value)}
                    placeholder="Contoh: 'tambahkan kegiatan games di bagian pendahuluan untuk meningkatkan motivasi'"
                    className="flex-1 bg-[#043b32] border border-teal-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:text-teal-200/50 text-white font-medium"
                  />
                  <button 
                    type="submit"
                    disabled={isRefining || !refineFeedback.trim()}
                    className="bg-[#ebbc26] hover:bg-[#d9a818] disabled:opacity-50 text-slate-900 rounded-xl px-5 py-3 font-bold transition flex items-center justify-center gap-2 text-sm shrink-0 cursor-pointer"
                  >
                    {isRefining ? "Merevisi..." : "Kirim"}
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-teal-200/80">
                  <span className="font-bold uppercase text-amber-400">Rekomendasi Revisi:</span>
                  <button type="button" onClick={() => setRefineFeedback("Buat kegiatan inti lebih interaktif untuk kelas pasif kelas VII.")} className="hover:text-white underline">"kelas lebih interaktif"</button> •
                  <button type="button" onClick={() => setRefineFeedback("Sederhanakan rubrik penilaian agar mudah diukur.")} className="hover:text-white underline">"menyederhanakan rubrik"</button> •
                  <button type="button" onClick={() => setRefineFeedback("Mohon cantumkan ayat alquran/hadits tentang keadilan.")} className="hover:text-white underline">"tambah muatan religius"</button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* Stats counter sections */}
        <section id="stats-counter" className="bg-white border-y border-teal-50 py-10 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-1 sm:border-r border-teal-50 last:border-0 last:pr-0">
              <div className="flex justify-center text-[#0e7465] mb-1">
                <Users className="h-7 w-7 text-teal-700" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block font-sans">5.000+</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block">Guru Aktif</span>
            </div>
            <div className="text-center space-y-1 md:border-r border-teal-50 last:border-0">
              <div className="flex justify-center text-[#0e7465] mb-1">
                <FileText className="h-7 w-7 text-emerald-600" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block font-sans">50.000+</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block">Dokumen Dibuat</span>
            </div>
            <div className="text-center space-y-1 sm:border-r border-teal-50 last:border-0">
              <div className="flex justify-center text-[#0e7465] mb-1">
                <BookOpen className="h-7 w-7 text-teal-600" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block font-sans">500+</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block">Sekolah Terdaftar</span>
            </div>
            <div className="text-center space-y-1 last:border-0">
              <div className="flex justify-center text-[#0e7465] mb-1">
                <Star className="h-7 w-7 text-amber-500 fill-amber-500" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block font-sans">98%</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block">Kepuasan Guru</span>
            </div>
          </div>
        </section>

        {/* Features list section - Grid */}
        <section id="fitur" className="py-20 bg-teal-50/10 px-4 sm:px-6 lg:px-8 scroll-mt-20 no-print">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="bg-emerald-100 text-[#043b32] border border-emerald-250 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">Fitur Lengkap</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Semua yang Anda butuhkan, dalam satu platform
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
                7 generator dokumen profesional siap pakai, sesuai standar Kurikulum Merdeka dan Kemendikdasmen serta Kementerian Agama terbaru.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {FEATURES.map((feat, idx) => {
                // Custom map icons key manually - using clean white to pop perfectly against the solid dark green context backgrounds
                let icon = <BookOpen className="h-6 w-6 text-white" />;
                if (feat.iconName === "heart") icon = <Heart className="h-6 w-6 text-white fill-white/20" />;
                if (feat.iconName === "check-square") icon = <CheckSquare className="h-6 w-6 text-white" />;
                if (feat.iconName === "calendar") icon = <Calendar className="h-6 w-6 text-white" />;
                if (feat.iconName === "bar-chart") icon = <BarChart3 className="h-6 w-6 text-white" />;
                if (feat.iconName === "users") icon = <Users className="h-6 w-6 text-white" />;
                if (feat.iconName === "book-open") icon = <BookOpen className="h-6 w-6 text-white" />;

                return (
                  <div 
                    key={idx} 
                    onClick={() => handleFeatureClick(feat.type)}
                    className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all cursor-pointer hover:ring-2 hover:ring-teal-150 relative group flex flex-col justify-between h-auto"
                  >
                    <div className="space-y-4">
                      {/* Upper row */}
                      <div className="flex items-center justify-between">
                        <div className="bg-[#043b32] p-2.5 rounded-xl group-hover:bg-[#0c594c] transition shadow-md shadow-emerald-900/10">
                          {icon}
                        </div>

                        {feat.badge && (
                          <span className={`text-[9px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full border ${feat.badgeColor || 'bg-slate-100'}`}>
                            {feat.badge}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-bold text-slate-900 text-base py-0.5 group-hover:text-teal-900 transition flex items-center gap-1.5">
                          {feat.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 text-xs font-bold text-teal-800 inline-flex items-center gap-1.5 group-hover:gap-3 transition mt-6">
                      Coba Generate Instan
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison table section */}
        <section id="perbandingan" className="py-20 bg-white border-t border-teal-50 px-4 sm:px-6 lg:px-8 scroll-mt-20 no-print">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="bg-amber-100 text-amber-900 border border-amber-250 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">Perbandingan</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Kenapa <span className="text-[#0e7465]">MERDEKA GURU</span> beda?</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Bandingkan cara tradisional dengan membuat menggunakan asisten kurikulum MERDEKA GURU. Selisih waktunya bisa Anda manfaatkan untuk hal yang lebih bermakna.
              </p>
            </div>

            {/* Table */}
            <div className="overflow-hidden border border-slate-200 shadow-xl rounded-2xl">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm divide-y divide-slate-200">
                  <thead className="bg-teal-50/20">
                    <tr>
                      <th className="px-6 py-4 font-bold text-slate-900 text-left w-[34%]">Aspek</th>
                      <th className="px-6 py-4 font-bold text-slate-500 text-left w-[33%]">Cara Manual (Konvensional)</th>
                      <th className="px-6 py-4 font-extrabold text-[#043b32] text-left w-[33%] bg-teal-50/30">
                        <span className="inline-flex items-center gap-1.5">
                          <Sparkles className="h-4.5 w-4.5 text-teal-700 fill-teal-150 animate-bounce" />
                          MERDEKA GURU AI
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {COMPARISONS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-teal-50/5">
                        <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{row.aspect}</td>
                        <td className="px-6 py-4 text-slate-500">
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                            <span className="text-rose-500 font-extrabold">✕</span> {row.manual}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-950 font-semibold bg-teal-50/10 border-l border-teal-50">
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-900">
                            <span className="text-emerald-700 font-extrabold">✓</span> {row.siapGuru}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Dirancang untuk guru profesional Section */}
        <section className="py-20 bg-white border-t border-teal-50 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
              <span className="bg-emerald-50 text-teal-900 border border-teal-200 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                Keunggulan Utama
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 leading-tight">
                Dirancang untuk <span className="text-[#0d6e61]">guru profesional</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed md:max-w-md mx-auto">
                Setiap fitur dipikirkan matang untuk meringankan beban administrasi Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs hover:shadow-md transition space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-[#043b32] flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 text-base">AI Cerdas</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Mesin AI terlatih khusus konteks pendidikan Indonesia
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs hover:shadow-md transition space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-[#043b32] flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 text-base">Hemat Waktu</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Dari berjam-jam menjadi hitungan menit
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs hover:shadow-md transition space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-[#043b32] flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 text-base">Aman &amp; Privat</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Data Anda terenkripsi dan tidak dibagikan
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs hover:shadow-md transition space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-[#043b32] flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 text-base">Standar Resmi</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Sesuai Kurikulum Merdeka &amp; Kemendikdasmen terbaru
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dipercaya ribuan guru section */}
        <section className="py-20 bg-teal-50/10 px-4 sm:px-6 lg:px-8 border-t border-teal-50 no-print">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="bg-emerald-50 text-teal-900 border border-teal-200 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                Cerita Guru
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Dipercaya <span className="text-[#0e7465]">ribuan guru</span>
              </h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Dari Sabang sampai Merauke — guru Indonesia bersama MERDEKA GURU.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/75 shadow-xs hover:shadow-md transition flex flex-col justify-between h-auto">
                <div className="space-y-4">
                  {/* Rating Stars & quote icon */}
                  <div className="flex items-center justify-between text-amber-400">
                    <div className="flex gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-teal-200 text-4xl leading-none font-serif">“</span>
                  </div>
                  <p className="text-slate-650 text-sm italic leading-relaxed">
                    "MERDEKA GURU sangat membantu saya dalam membuat modul pembelajaran yang terstruktur. Hemat waktu dan hasilnya profesional!"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#043b32] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    WI
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Wilya Isnaeni, S.Pd</h4>
                    <p className="text-slate-500 text-xs font-medium">Guru Matematika</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/75 shadow-xs hover:shadow-md transition flex flex-col justify-between h-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-amber-400">
                    <div className="flex gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-teal-200 text-4xl leading-none font-serif">“</span>
                  </div>
                  <p className="text-slate-650 text-sm italic leading-relaxed">
                    "Dengan MERDEKA GURU, saya bisa fokus mengajar karena administrasi sudah terbantu dengan baik. Sangat recommended!"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#0e7465] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    NM
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Nina Mariani, S.Pd</h4>
                    <p className="text-slate-500 text-xs font-medium">Guru Bahasa Indonesia</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/75 shadow-xs hover:shadow-md transition flex flex-col justify-between h-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-amber-400">
                    <div className="flex gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-teal-200 text-4xl leading-none font-serif">“</span>
                  </div>
                  <p className="text-slate-650 text-sm italic leading-relaxed">
                    "Fitur LKPD sangat membantu membuat lembar kerja yang menarik untuk siswa. Anak-anak jadi lebih semangat belajar."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    MJ
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Muhammad Juaini, S.Pd</h4>
                    <p className="text-slate-500 text-xs font-medium">Guru IPA</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/75 shadow-xs hover:shadow-md transition flex flex-col justify-between h-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-amber-400">
                    <div className="flex gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-teal-200 text-4xl leading-none font-serif">“</span>
                  </div>
                  <p className="text-slate-650 text-sm italic leading-relaxed">
                    "Interface yang mudah digunakan dan hasil dokumen yang rapi. MERDEKA GURU adalah solusi terbaik untuk guru modern."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#0d5248] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    ZM
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Zahruni Markanah, A.Ma</h4>
                    <p className="text-slate-500 text-xs font-medium">Guru Bahasa Inggris</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/75 shadow-xs hover:shadow-md transition flex flex-col justify-between h-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-amber-400">
                    <div className="flex gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-teal-200 text-4xl leading-none font-serif">“</span>
                  </div>
                  <p className="text-slate-650 text-sm italic leading-relaxed">
                    "Modul ajar yang dihasilkan sesuai dengan kurikulum merdeka. Sangat membantu dalam persiapan mengajar kerja keras terbayar."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#0c5c4e] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    ST
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Satoha, S.Pd</h4>
                    <p className="text-slate-500 text-xs font-medium">Guru Matematika</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/75 shadow-xs hover:shadow-md transition flex flex-col justify-between h-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-amber-400">
                    <div className="flex gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-teal-200 text-4xl leading-none font-serif">“</span>
                  </div>
                  <p className="text-slate-650 text-sm italic leading-relaxed">
                    "Proses pembuatan dokumen jadi lebih cepat dan efisien. Terima kasih banyak MERDEKA GURU!"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#08483d] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    RN
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Rauhanun, S.Pd</h4>
                    <p className="text-slate-500 text-xs font-medium">Guru IPS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ list section */}
        <section id="faq" className="py-20 bg-white px-4 sm:px-6 lg:px-8 no-print border-t border-teal-50">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="bg-emerald-100 text-[#043b32] border border-emerald-250 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">Tanya Jawab</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ketahui Lebih Banyak Tentang MERDEKA GURU</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">Kami mengumpulkan jawaban dari pertanyaan-pertanyaan yang paling sering ditanyakan para guru.</p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4.5 text-left font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition text-sm sm:text-base gap-3 focus:outline-none"
                    >
                      {faq.q}
                      <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1.5 text-slate-650 border-t border-slate-105 text-xs sm:text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action Premium Banner Section */}
        <section className="py-20 bg-gradient-to-r from-[#022c22] to-[#043e35] text-white text-center relative overflow-hidden no-print">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#80f0d0_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-teal-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-teal-200 tracking-wide uppercase">
              SELESAIKAN ADMINISTRASI KILAT
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Hentikan begadang untuk <br className="hidden sm:inline" />
              menyusun RPP
            </h2>
            
            <p className="text-sm sm:text-base text-teal-100/90 max-w-2xl mx-auto leading-relaxed">
              Bergabung dengan ribuan guru Indonesia yang sudah meraih kembali waktu mereka — untuk keluarga, untuk siswa, untuk diri sendiri.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => {
                  setAuthModalTab('register');
                  setIsAuthModalOpen(true);
                }} 
                className="w-full sm:w-auto bg-[#fbbf24] hover:bg-[#e0a800] text-slate-900 font-extrabold px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] text-sm cursor-pointer"
              >
                Daftar &amp; Berlangganan Sekarang →
              </button>
              <button 
                onClick={() => {
                  window.open("https://wa.me/628123456789", "_blank");
                }} 
                className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold px-8 py-4 rounded-xl transition text-sm cursor-pointer"
              >
                Punya pertanyaan?
              </button>
            </div>

            <p className="text-xs text-teal-200/80 pt-2 font-medium">
              Aktivasi instan setelah pembayaran terverifikasi • Support via WhatsApp
            </p>
          </div>
        </section>

        {currentUser?.email?.toLowerCase() === "hasanudin63@admin.sd.belajar.id" && (
          <AdminPanel triggerNotification={triggerNotification} />
        )}
        </main>

      {/* Footer bar */}
      <footer id="app-footer" className="bg-[#011b15] text-slate-400 py-12 border-t border-teal-900/30 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-[#043b32] text-white p-2 rounded-xl h-10 w-10 flex items-center justify-center shrink-0 overflow-hidden">
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo Merdeka Guru" 
                    className="h-full w-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Sparkles className="h-5 w-5 text-amber-300" />
                )}
              </div>
              <span className="text-lg font-extrabold tracking-tight">MERDEKA GURU</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Asisten kecerdasan buatan (AI) terpercaya guru Indonesia untuk merancang administrasi Kurikulum Merdeka yang akurat, efektif, dan praktis secara kilat.
            </p>
            <p className="text-slate-500 text-[11px] font-medium">
              © {new Date().getFullYear()} MERDEKA GURU. Hak Cipta Dilindungi.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">Navigasi</h4>
            <ul className="space-y-2.5 font-medium">
              <li><button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-white transition">Halaman Atas</button></li>
              <li><a href="#fitur" className="hover:text-white transition">Fitur Utama</a></li>
              <li><a href="#perbandingan" className="hover:text-white transition">Perbandingan</a></li>
              <li><button onClick={() => faqRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition">FAQ Pendidikan</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">Hubungi Kami / Masukan</h4>
            <p className="text-teal-100/70 leading-relaxed font-medium">
              Ada pertanyaan atau masukan kurikulum agar RPP kami semakin presisi? Kirim pertanyaan Anda kepada tim support kami.
            </p>
            <div className="pt-1">
              <a 
                href="https://wa.me/628123456789" 
                target="_blank" 
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl px-5 py-3 flex items-center gap-2 w-fit transition shadow-sm text-xs cursor-pointer"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Access Guard Modal Pop-up */}
      <AccessGuard 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
        onUnlock={() => {
          setIsUnlocked(true);
          setIsAuthModalOpen(false);
        }}
        triggerNotification={triggerNotification}
        logoUrl={logoUrl}
      />

    </div>
  );
}
