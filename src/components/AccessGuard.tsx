import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  Key, 
  Mail, 
  User, 
  QrCode, 
  CreditCard, 
  Sparkles, 
  Check, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  Phone,
  ShieldAlert,
  Coins,
  Upload,
  Image as ImageIcon,
  Trash2,
  X
} from "lucide-react";

interface UserAccount {
  email: string;
  name: string;
  isPremium: boolean;
  licenseKey?: string;
  createdAt: string;
  password?: string;
}

interface AccessGuardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
  onUnlock: () => void;
  triggerNotification: (msg: string) => void;
  logoUrl: string | null;
}

export const AccessGuard: React.FC<AccessGuardProps> = ({ 
  isOpen,
  onClose,
  initialTab = 'login',
  onUnlock, 
  triggerNotification,
  logoUrl
}) => {
  // Navigation Tabs: 'login' | 'register' | 'payment-info'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);
  
  // Form input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Loading & Flow state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Current user state (parsed from localStorage if logged in)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  
  // Payment Simulator View
  const [showPaymentSimulator, setShowPaymentSimulator] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank_transfer'>('qris');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState("");
  
  // License activation field
  const [licenseInput, setLicenseInput] = useState("");

  // Custom QRIS & Bank states configurable by Owner
  const [ownerQrisImage, setOwnerQrisImage] = useState<string>(() => {
    return localStorage.getItem("merdekaguru_owner_qris") || "";
  });
  const [ownerBankName, setOwnerBankName] = useState<string>(() => {
    return localStorage.getItem("merdekaguru_owner_bank_name") || "Bank Mandiri Virtual Account";
  });
  const [ownerBankAccount, setOwnerBankAccount] = useState<string>(() => {
    return localStorage.getItem("merdekaguru_owner_bank_account") || "8809 1827 3482 1192";
  });
  const [ownerBankUser, setOwnerBankUser] = useState<string>(() => {
    return localStorage.getItem("merdekaguru_owner_bank_user") || "CV MERDEKA GURU PREMIUM";
  });

  // Load current user from session on mount
  useEffect(() => {
    const stored = localStorage.getItem("merdekaguru_current_user");
    if (stored) {
      const user = JSON.parse(stored) as UserAccount;
      setCurrentUser(user);
      if (user.isPremium) {
        onUnlock(); // Auto-unlock if user is already logged in & premium
      }
    }

    // Always seed base users & Hasanudin Admin in database
    const usersRaw = localStorage.getItem("merdekaguru_users");
    let usersList: UserAccount[] = [];
    if (usersRaw) {
      usersList = JSON.parse(usersRaw);
    } else {
      usersList = [
        { email: "wilya@smp.sch.id", name: "Wilya Isnaeni, S.Pd", isPremium: false, createdAt: new Date(Date.now() - 36000000).toISOString() },
        { email: "satoha@sd.sch.id", name: "Satoha, S.Pd", isPremium: true, licenseKey: "MG-K9L2-M4P6-R1T3", createdAt: new Date(Date.now() - 72000000).toISOString() },
      ];
    }

    const adminEmail = "hasanudin63@admin.sd.belajar.id";
    const foundAdminIndex = usersList.findIndex(u => u.email.toLowerCase() === adminEmail);
    if (foundAdminIndex === -1) {
      usersList.push({
        email: adminEmail,
        name: "Hasanudin, S.Pd (Owner Admin)",
        isPremium: true,
        licenseKey: "MG-OWNER-SUPER-BYPASS",
        password: "Sdn4s@ndik",
        createdAt: new Date().toISOString()
      });
    } else {
      // Force correct password and active Premium status for Hasanudin S.Pd
      usersList[foundAdminIndex] = {
        ...usersList[foundAdminIndex],
        isPremium: true,
        licenseKey: "MG-OWNER-SUPER-BYPASS",
        password: "Sdn4s@ndik"
      };
    }
    localStorage.setItem("merdekaguru_users", JSON.stringify(usersList));
  }, [onUnlock]);

  // Handle registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailTrimmed = email.trim().toLowerCase();
    const passTrimmed = password.trim();
    const nameTrimmed = name.trim();

    if (!emailTrimmed || !passTrimmed || !nameTrimmed) {
      setErrorMessage("Mohon lengkapi seluruh kolom pendaftaran.");
      return;
    }

    if (emailTrimmed === "hasanudin63@admin.sd.belajar.id") {
      setErrorMessage("Email ini dilindungi untuk administrator utama. Silakan masuk melalui tab login.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Fetch existing total users
      const usersRaw = localStorage.getItem("merdekaguru_users");
      const users: UserAccount[] = usersRaw ? JSON.parse(usersRaw) : [];

      // Check if email already registered
      if (users.some(u => u.email.toLowerCase() === emailTrimmed)) {
        setErrorMessage("Email ini telah terdaftar. Silakan masuk.");
        setIsLoading(false);
        return;
      }

      const newUser: UserAccount = {
        email: emailTrimmed,
        name: nameTrimmed,
        isPremium: false,
        password: passTrimmed,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem("merdekaguru_users", JSON.stringify(users));
      
      // Automatic login after register
      localStorage.setItem("merdekaguru_current_user", JSON.stringify(newUser));
      setCurrentUser(newUser);
      
      triggerNotification("Akun gratis berhasil dibuat! Selesaikan aktivasi premium untuk menggunakan AI.");
      setIsLoading(false);
    }, 850);
  };

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailTrimmed = email.trim().toLowerCase();
    const passTrimmed = password.trim();

    if (!emailTrimmed || !passTrimmed) {
      setErrorMessage("Silakan isi Email dan Kata Sandi.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const usersRaw = localStorage.getItem("merdekaguru_users");
      const users: UserAccount[] = usersRaw ? JSON.parse(usersRaw) : [];

      if (emailTrimmed === "hasanudin63@admin.sd.belajar.id") {
        if (passTrimmed !== "Sdn4s@ndik") {
          setErrorMessage("Kata sandi salah untuk akun Administrator Pemilik!");
          setIsLoading(false);
          return;
        }

        let adminAcc = users.find(u => u.email.toLowerCase() === "hasanudin63@admin.sd.belajar.id");
        if (!adminAcc) {
          adminAcc = {
            email: "hasanudin63@admin.sd.belajar.id",
            name: "Hasanudin, S.Pd (Owner Admin)",
            isPremium: true,
            licenseKey: "MG-OWNER-SUPER-BYPASS",
            password: "Sdn4s@ndik",
            createdAt: new Date().toISOString()
          };
          users.push(adminAcc);
          localStorage.setItem("merdekaguru_users", JSON.stringify(users));
        } else {
          adminAcc.isPremium = true;
          adminAcc.licenseKey = "MG-OWNER-SUPER-BYPASS";
          adminAcc.password = "Sdn4s@ndik";
          localStorage.setItem("merdekaguru_users", JSON.stringify(users));
        }

        localStorage.setItem("merdekaguru_current_user", JSON.stringify(adminAcc));
        setCurrentUser(adminAcc);
        setIsLoading(false);
        onUnlock();
        triggerNotification("Selamat datang kembali Bapak Hasanudin, S.Pd! Login Admin Utama Berhasil.");
        return;
      }

      const found = users.find(u => u.email.toLowerCase() === emailTrimmed);

      if (!found) {
        setErrorMessage("Akun tidak ditemukan. Silakan mendaftar terlebih dahulu.");
        setIsLoading(false);
        return;
      }

      if (found.password && found.password !== passTrimmed) {
        setErrorMessage("Sandi salah. Coba lagi.");
        setIsLoading(false);
        return;
      }

      // Storing session
      localStorage.setItem("merdekaguru_current_user", JSON.stringify(found));
      setCurrentUser(found);

      if (found.isPremium) {
        onUnlock();
        triggerNotification(`Selamat datang kembali, ${found.name}!`);
      } else {
        triggerNotification(`Berhasil masuk! Akun Anda membutuhkan Kunci Lisensi Aktif.`);
      }
      setIsLoading(false);
    }, 700);
  };

  // Handle Log Out
  const handleLogout = () => {
    localStorage.removeItem("merdekaguru_current_user");
    setCurrentUser(null);
    setLicenseInput("");
    setShowPaymentSimulator(false);
    setPaymentSuccess(false);
    triggerNotification("Berhasil keluar dari sesi akun.");
  };

  // Simulate Payments & Generate real key
  const triggerPaymentSimulation = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      // Generate standard format license code
      const randHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const licenseCode = `MG-${randHex()}-${randHex()}-${randHex()}`;
      setGeneratedLicense(licenseCode);
      
      triggerNotification("Pembayaran Berhasil! Lisensi premium Anda telah terbit.");
    }, 2500);
  };

  // Activate license code manually
  const handleActivateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const key = licenseInput.trim().toUpperCase();

    if (!key) {
      triggerNotification("Silakan ketik atau tempel kunci lisensi terlebih dahulu.");
      return;
    }

    if (!currentUser) {
      triggerNotification("Silakan buat akun atau masuk terlebih dahulu.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Validation (Accept any valid license formatting or our simulated ones)
      const isValidFormat = /^MG-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key);

      if (!isValidFormat && key !== "GURUMERDEKA2026") {
        setErrorMessage("Kunci Lisensi tidak valid atau telah kedaluwarsa. Silakan bayar untuk kunci resmi.");
        setIsLoading(false);
        return;
      }

      // Update current user
      const updatedUser = { 
        ...currentUser, 
        isPremium: true,
        licenseKey: key 
      };

      // Save to active users database
      const usersRaw = localStorage.getItem("merdekaguru_users");
      const users: UserAccount[] = usersRaw ? JSON.parse(usersRaw) : [];
      const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);

      localStorage.setItem("merdekaguru_users", JSON.stringify(updatedUsers));
      localStorage.setItem("merdekaguru_current_user", JSON.stringify(updatedUser));
      
      setCurrentUser(updatedUser);
      setIsLoading(false);
      onUnlock();
      triggerNotification("Selamat! Akun Anda aktif penuh. Selamat mengajar!");
    }, 900);
  };

  // Auto-Unlock and Activate immediately after simulated payment success
  const handleAutoUnlockAndActivate = () => {
    if (!currentUser) {
      triggerNotification("Silakan buat akun atau masuk terlebih dulu.");
      return;
    }

    const keyToUse = generatedLicense || `MG-AUTO-${Math.random().toString(36).substring(2,6).toUpperCase()}`;
    const updatedUser = { 
      ...currentUser, 
      isPremium: true,
      licenseKey: keyToUse 
    };

    // Save to active users database
    const usersRaw = localStorage.getItem("merdekaguru_users");
    const users: UserAccount[] = usersRaw ? JSON.parse(usersRaw) : [];
    const updatedUsers = users.map(u => u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u);
    
    // If target isn't found in users, insert them
    if (!users.some(u => u.email.toLowerCase() === currentUser.email.toLowerCase())) {
      updatedUsers.push(updatedUser);
    }

    localStorage.setItem("merdekaguru_users", JSON.stringify(updatedUsers));
    localStorage.setItem("merdekaguru_current_user", JSON.stringify(updatedUser));
    
    setCurrentUser(updatedUser);
    setShowPaymentSimulator(false);
    setPaymentSuccess(false);
    onUnlock();
    triggerNotification("Pembayaran Berhasil! Akun Premium Anda otomatis aktif. Selamat mengajar!");
  };

  // Drag and drop QRIS handlers
  const handleQrisUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        triggerNotification("Format file SALAH! Mohon unggah gamabr format PNG atau JPEG.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setOwnerQrisImage(base64);
          localStorage.setItem("merdekaguru_owner_qris", base64);
          triggerNotification("Gambar QRIS asli Anda berhasil dipasang!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrisDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleQrisDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        triggerNotification("Format file SALAH! Mohon unggah gambar format PNG atau JPEG.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setOwnerQrisImage(base64);
          localStorage.setItem("merdekaguru_owner_qris", base64);
          triggerNotification("Gambar QRIS asli dilepas & berhasil disimpan!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearQris = () => {
    setOwnerQrisImage("");
    localStorage.removeItem("merdekaguru_owner_qris");
    triggerNotification("QRIS berhasil dihapus. Sistem kembali memakai QRIS simulasi default.");
  };

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("merdekaguru_owner_bank_name", ownerBankName);
    localStorage.setItem("merdekaguru_owner_bank_account", ownerBankAccount);
    localStorage.setItem("merdekaguru_owner_bank_user", ownerBankUser);
    triggerNotification("Sukses memperbarui info rek transfer bank.");
  };

  if (!isOpen) return null;

  return (
    <div id="auth-modal" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-150 overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10 max-h-[90vh] md:max-h-[85vh] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 bg-slate-100 hover:bg-slate-200 p-2.1 rounded-full transition-all cursor-pointer z-50 border border-slate-200 shadow-xs flex items-center justify-center"
          title="Tutup"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Left Side: Educational Promotion & Business Info */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#043b32] to-[#0e7465] text-teal-50 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Logo inside Column */}
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl border border-white/10 flex items-center justify-center h-10 w-10 shrink-0">
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo Merdeka Guru" 
                    className="h-full w-full object-contain rounded"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Sparkles className="h-5.5 w-5.5 text-amber-300" />
                )}
              </div>
              <div>
                <span className="text-xs font-black tracking-tight text-white block leading-none">MERDEKA GURU</span>
                <span className="text-[8px] tracking-widest text-[#a7f3d0] font-bold block mt-0.5 uppercase">Akses Lisensi Premium</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-teal-900/60 border border-teal-700 rounded-full px-3 py-1 text-xs font-semibold text-amber-300 mb-6 font-semibold">
              <Coins className="h-3.5 w-3.5 animate-bounce" />
              SaaS Monetisasi Edukasi
            </div>
            
            <h3 className="text-xl font-bold font-sans text-white leading-snug mb-3">
              Solusi Super Cepat Pembuatan RPP &amp; Administrasi Guru
            </h3>
            
            <p className="text-xs text-teal-150 leading-relaxed mb-6">
              Platform bertenaga AI kami dirancang khusus membantu guru-guru di Indonesia memangkas waktu kerja administrasi hingga 90%. Berlangganan sekali untuk akses penuh tanpa batas.
            </p>

            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Check className="h-4.5 w-4.5 text-amber-300 shrink-0 mt-0.5" />
                <span>Format Modul Ajar terbaru sesuai standar <strong>Kementerian Pendidikan Dasar &amp; Menengah</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4.5 w-4.5 text-amber-300 shrink-0 mt-0.5" />
                <span>Teknologi Gemini Generative AI anti-plagiat secara otomatis</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4.5 w-4.5 text-amber-300 shrink-0 mt-0.5" />
                <span>Jurnal Harian, LKPD Interaktif, dan Kisi Asesmen Lengkap</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-teal-800 text-[11px] text-teal-200">
            <p className="font-semibold text-white mb-1">Butuh bantuan administrator?</p>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" />
              <a 
                href="https://wa.me/6287840663144" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline transition text-amber-200 hover:text-amber-100 font-bold"
              >
                WhatsApp CS: 0878-4066-3144
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication and Upgrading flow */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          
          {/* USER NOT LOGGED IN AT ALL */}
          {!currentUser ? (
            <div>
              {/* Tab Selector */}
              <div className="flex border-b border-slate-100 mb-6 font-semibold text-sm">
                <button
                  onClick={() => { setActiveTab('login'); setErrorMessage(null); }}
                  className={`flex-1 pb-3 text-center transition-colors ${
                    activeTab === 'login' 
                      ? 'border-b-2 border-[#043b32] text-slate-900 font-bold' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Masuk Akun
                </button>
                <button
                  onClick={() => { setActiveTab('register'); setErrorMessage(null); }}
                  className={`flex-1 pb-3 text-center transition-colors ${
                    activeTab === 'register' 
                      ? 'border-b-2 border-[#043b32] text-slate-900 font-bold' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Daftar Akun Baru
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 bg-rose-50 border border-rose-150 rounded-xl p-3 flex gap-2.5 text-xs text-rose-800">
                  <AlertCircle className="h-4 md:h-5 w-4 md:w-5 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <p className="text-xs text-slate-500 mb-4">
                    Masukkan email Anda untuk memuat akun administrasi dan memeriksa status langganan.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Alamat Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="guru@sekolah.sch.id"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#043b32] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Kata Sandi (Password)</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#043b32] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#043b32] hover:bg-[#0c5c4e] disabled:bg-slate-350 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all mt-6"
                  >
                    {isLoading ? "Memeriksa..." : "Masuk ke Portal"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <p className="text-xs text-slate-500 mb-4">
                    Belum punya akun? Buat akun guru gratis dalam beberapa detik.
                  </p>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nama Lengkap &amp; Gelar</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Wilya Isnaeni, S.Pd"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#043b32] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Alamat Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="guru@sekolah.sch.id"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#043b32] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Kata Sandi (Pasword)</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Buat sandi aman"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#043b32] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#0e7465] hover:bg-[#08483d] disabled:bg-slate-350 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all mt-6"
                  >
                    {isLoading ? "Membuat Akun..." : "Daftar & Buat Akun"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
              
              {/* Quick test code notice */}
              <div className="mt-8 p-3 bg-teal-50 border border-teal-100 rounded-xl text-[11px] text-teal-800">
                💡 <strong>Lisensi Demo Instan:</strong> Lewati pembayaran menggunakan kode lisensi gratis <strong>GURUMERDEKA2026</strong> setelah Anda mendaftar/masuk akun.
              </div>
            </div>
          ) : (
            
            /* LOGGED IN BUT ACCUSED OF GRATIS (PENDING PAYMENT OR UPGRADE) */
            <div className="space-y-6">
              <div className="bg-[#f0faf7] border border-teal-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider block">Akun Anda Aktif</span>
                  <p className="text-sm font-extrabold text-slate-800">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-bold text-center">
                    Aktivasi Tertunda
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="text-[11px] text-rose-600 hover:text-rose-800 font-bold underline text-center"
                  >
                    Keluar Sesi
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-150 rounded-xl p-3 flex gap-2.5 text-xs text-rose-800">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Enter License Section */}
              {!showPaymentSimulator ? (
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Key className="h-4 w-4 text-[#043b32]" />
                    Masukkan Kunci Lisensi Premium
                  </h4>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Jika Anda telah menerima kunci lisensi dari administrator, silakan ketik atau pasang di bawah untuk membuka aplikasi secara permanen.
                  </p>

                  <form onSubmit={handleActivateLicense} className="flex gap-2.5">
                    <input 
                      type="text"
                      value={licenseInput}
                      onChange={(e) => setLicenseInput(e.target.value)}
                      placeholder="MG-XXXX-XXXX-XXXX"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono tracking-widest flex-1 uppercase focus:ring-2 focus:ring-[#043b32] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#043b32] hover:bg-[#0c5c4e] text-white font-bold rounded-xl px-5 text-xs sm:text-sm shadow-md flex items-center gap-1 cursor-pointer"
                    >
                      Aktivasi
                    </button>
                  </form>

                  <div className="my-6 border-t border-slate-100 flex items-center justify-center relative">
                    <span className="bg-white px-3 text-slate-450 text-xs font-semibold absolute leading-none">Atau lakukan pembayaran online</span>
                  </div>

                  {/* Payment Button Gateway Showcase */}
                  <div className="bg-slate-25/50 border border-dashed border-slate-200 rounded-2xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-3.5">
                      Belum punya Kunci Lisensi? Beli sekarang secara langsung melaui simulator sistem QRIS / Transfer Bank instan gratis.
                    </p>
                    <button 
                      onClick={() => setShowPaymentSimulator(true)}
                      className="bg-emerald-600 hover:bg-[#0e7465] text-white font-bold text-xs sm:text-sm rounded-xl px-6 py-2.5 inline-flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                    >
                      <CreditCard className="h-4 w-4 text-emerald-100" />
                      Bayar Sekarang &amp; Terbitkan Kunci
                    </button>
                  </div>
                </div>
              ) : (
                
                /* PAYMENT GATEWAY INTERFACE SIMULASI */
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-25">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-150">
                    <span className="font-bold text-xs text-slate-800 uppercase tracking-wide">SISTEM INTEGRASI PEMBAYARAN</span>
                    <button 
                      onClick={() => { setShowPaymentSimulator(false); setPaymentStatusDefaults(); }}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold flex items-center gap-0.5"
                    >
                      Batal
                    </button>
                  </div>

                  {!paymentSuccess ? (
                    <div>
                      {/* Price info tag */}
                      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-xl border border-slate-150">
                        <div>
                          <span className="text-[10px] text-slate-450 font-bold uppercase">Biaya Registrasi Lisensi</span>
                          <p className="text-lg font-black text-rose-600 leading-tight">Rp 99.000 <span className="text-xs text-slate-400 font-normal">/ Selamanya</span></p>
                        </div>
                        <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md text-[10px] font-bold">Diskon Promo 75%</span>
                      </div>

                      {/* Payment Mode Selector */}
                      <div className="flex gap-2.5 mb-4 font-semibold text-xs text-slate-700">
                        <button
                          onClick={() => setPaymentMethod('qris')}
                          className={`flex-1 p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${
                            paymentMethod === 'qris' 
                              ? 'border-[#0e7465] bg-teal-25 text-[#0e7465] font-bold shadow-xs' 
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          <QrCode className="h-4 w-4" />
                          QRIS Instan
                        </button>
                        <button
                          onClick={() => setPaymentMethod('bank_transfer')}
                          className={`flex-1 p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${
                            paymentMethod === 'bank_transfer' 
                              ? 'border-[#0e7465] bg-teal-25 text-[#0e7465] font-bold shadow-xs' 
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          <CreditCard className="h-4 w-4" />
                          Virtual Account
                        </button>
                      </div>

                      {/* QRIS Graphic Simulation */}
                      {paymentMethod === 'qris' ? (
                        <div className="flex flex-col items-center bg-white p-4 rounded-xl border border-slate-150 my-4 text-center">
                          {ownerQrisImage ? (
                            <div className="bg-white p-2 border-2 border-emerald-500 rounded-lg shadow-sm flex flex-col items-center justify-center mb-2.5 max-w-[200px]">
                              <img 
                                src={ownerQrisImage} 
                                alt="QRIS Merchant Resmi" 
                                className="w-full h-auto object-contain max-h-[180px] rounded"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-[8px] font-black tracking-widest text-[#043b32] mt-1.5 uppercase">QRIS PREMIUM AKTIF</span>
                            </div>
                          ) : (
                            <div className="bg-slate-50 p-2.5 border-2 border-slate-200 rounded-lg shadow-inner flex flex-col items-center justify-center mb-2.5" style={{width: 140, height: 140}}>
                              <QrCode className="h-24 w-24 text-slate-900 stroke-1" />
                              <span className="text-[7px] font-black tracking-widest text-[#043b32] mt-1.5">GURU-QRIS GATEWAY</span>
                            </div>
                          )}
                          <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                            Pindai QRIS di atas menggunakan dompet digital Anda (Gopay, OVO, Dana, LinkAja, BCA dll).
                          </p>
                          {!ownerQrisImage && (
                            <span className="text-[9px] text-amber-600 font-bold block mt-1 text-center">
                              ⚠️ QRIS Simulasi. Konfigurasi QRIS asli Anda di Panel Admin bawah!
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="bg-white p-4 rounded-xl border border-slate-150 my-4 text-xs font-semibold space-y-3">
                          <div className="flex justify-between pb-2 border-b border-slate-100">
                            <span className="text-slate-450 font-normal">Nama Bank</span>
                            <span className="text-[#043b32]">{ownerBankName}</span>
                          </div>
                          
                          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <span className="text-slate-450 font-normal">Nomor Rekening VA / Rek</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[#0e7465] font-extrabold tracking-wider">{ownerBankAccount}</span>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-450 font-normal">Atas Nama</span>
                            <span>{ownerBankUser}</span>
                          </div>
                        </div>
                      )}

                      {/* Execute actions */}
                      <button
                        onClick={triggerPaymentSimulation}
                        disabled={isPaying}
                        className="w-full py-2.5 rounded-xl bg-teal-850 hover:bg-teal-950 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md cursor-pointer disabled:bg-slate-350"
                      >
                        {isPaying ? (
                          <>
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Menghubungi Bank Pembayaran...</span>
                          </>
                        ) : (
                          "KONFIRMASI BAYAR (SIMULASI)"
                        )}
                      </button>
                    </div>
                  ) : (
                    
                    /* PAYMENT SUCCESS VIEW (SHOWS NEWLY GENERATED CODE) */
                    <div className="text-center py-4 text-xs">
                      <div className="bg-emerald-50 h-11 w-11 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-3.5 border border-emerald-250">
                        <Check className="h-6 w-6 stroke-[3]" />
                      </div>
                      
                      <h4 className="text-sm font-black text-slate-800 mb-1">Transaksi Berhasil Diverifikasi!</h4>
                      <p className="text-slate-500 mb-4 font-semibold leading-relaxed">
                        Pembayaran Rp 99.000 Anda telah diverifikasi otomatis oleh sistem. Berikut adalah Kunci Lisensi Premium Anda:
                      </p>

                      <div className="bg-emerald-50 text-emerald-800 font-mono tracking-widest text-sm font-black py-3 px-4 rounded-xl border border-emerald-100 uppercase select-all shadow-inner my-3">
                        {generatedLicense}
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal mt-2.5 mb-5 font-semibold">
                        Sistem telah mempersiapkan akun Anda. Klik tombol hijau raksasa di bawah untuk **mengaktifkan secara instan** dan langsung masuk ke layar utama generator.
                      </p>

                      <button
                        onClick={handleAutoUnlockAndActivate}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl px-6 py-3.5 inline-flex items-center gap-1.5 text-xs cursor-pointer shadow-lg hover:shadow-xl transition-all scale-100 hover:scale-[1.02]"
                      >
                        <Check className="h-4 w-4" />
                        Aktifkan Premium &amp; Mulai Mengajar (Layar Utama)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 text-center text-[10px] font-bold text-slate-450 tracking-wider">
            SISTEM VALIDASI LISENSI MERDEKA GURU VERSI 2026.06.01
          </div>
        </div>
      </div>
    </div>
  );

  function setPaymentStatusDefaults() {
    setPaymentSuccess(false);
    setIsPaying(false);
  }
};
