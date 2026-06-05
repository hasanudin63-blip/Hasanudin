import React, { useState, useEffect } from "react";
import { 
  Users, 
  Key, 
  Upload, 
  Trash2, 
  Check, 
  UserPlus, 
  Search, 
  Banknote, 
  QrCode, 
  Coins, 
  RefreshCw, 
  Copy,
  PlusCircle,
  X,
  CreditCard,
  Shield,
  Star,
  CheckCircle,
  Sparkles
} from "lucide-react";

interface UserAccount {
  email: string;
  name: string;
  isPremium: boolean;
  licenseKey?: string;
  createdAt: string;
}

interface AdminPanelProps {
  triggerNotification: (msg: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ triggerNotification }) => {
  const [allUsers, setAllUsers] = useState<UserAccount[]>([]);
  const [adminGeneratedKeys, setAdminGeneratedKeys] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Custom user registration input
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserPremium, setNewUserPremium] = useState(false);

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

  const [panelVisible, setPanelVisible] = useState(true);

  // Load and refresh user database
  const refreshAllUsers = () => {
    const usersRaw = localStorage.getItem("merdekaguru_users");
    if (usersRaw) {
      setAllUsers(JSON.parse(usersRaw));
    }
  };

  useEffect(() => {
    refreshAllUsers();
  }, []);

  // Drag and drop QRIS handlers
  const handleQrisUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        triggerNotification("Format berkas salah! Mohon unggah gambar PNG atau JPEG.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setOwnerQrisImage(base64);
          localStorage.setItem("merdekaguru_owner_qris", base64);
          triggerNotification("Gambar barcode QRIS bisnis Anda berhasil dipasang!");
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
        triggerNotification("Format berkas salah! Mohon unggah gambar PNG atau JPEG.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setOwnerQrisImage(base64);
          localStorage.setItem("merdekaguru_owner_qris", base64);
          triggerNotification("Gambar QRIS berhasil dilepas & disimpan!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearQris = () => {
    setOwnerQrisImage("");
    localStorage.removeItem("merdekaguru_owner_qris");
    triggerNotification("QRIS kustom dihapus. Sistem kembali memakai QRIS simulasi default.");
  };

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("merdekaguru_owner_bank_name", ownerBankName);
    localStorage.setItem("merdekaguru_owner_bank_account", ownerBankAccount);
    localStorage.setItem("merdekaguru_owner_bank_user", ownerBankUser);
    triggerNotification("Sukses memperbarui info rekening transfer tujuan.");
  };

  const handleAdminGenerateKey = () => {
    const randHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    const licenseCode = `MG-${randHex()}-${randHex()}-${randHex()}`;
    setAdminGeneratedKeys(prev => [licenseCode, ...prev]);
    triggerNotification("Kunci lisensi baru berhasil diterbitkan!");
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    triggerNotification("Salin Kunci Berhasil!");
  };

  const handleAdminToggleUserPremium = (targetEmail: string, currentPremium: boolean) => {
    const usersRaw = localStorage.getItem("merdekaguru_users");
    const users: UserAccount[] = usersRaw ? JSON.parse(usersRaw) : [];
    
    let updatedKey = undefined;
    if (!currentPremium) {
      const randHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      updatedKey = `MG-${randHex()}-${randHex()}-${randHex()}`;
    }

    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === targetEmail.toLowerCase()) {
        return { 
          ...u, 
          isPremium: !currentPremium, 
          licenseKey: !currentPremium ? updatedKey : undefined 
        };
      }
      return u;
    });

    localStorage.setItem("merdekaguru_users", JSON.stringify(updatedUsers));
    
    // Check if we also need to upgrade CURRENT_USER in session!
    const storedCurUser = localStorage.getItem("merdekaguru_current_user");
    if (storedCurUser) {
      const curUser = JSON.parse(storedCurUser) as UserAccount;
      if (curUser.email.toLowerCase() === targetEmail.toLowerCase()) {
        curUser.isPremium = !currentPremium;
        curUser.licenseKey = !currentPremium ? updatedKey : undefined;
        localStorage.setItem("merdekaguru_current_user", JSON.stringify(curUser));
        window.dispatchEvent(new Event("local-user-update"));
      }
    }

    refreshAllUsers();
    triggerNotification(`Status ${targetEmail} diperbarui menjadi ${!currentPremium ? 'PREMIUM' : 'GRATIS'}`);
  };

  const handleDeleteUser = (targetEmail: string) => {
    if (targetEmail.toLowerCase() === "hasanudin63@admin.sd.belajar.id") {
      triggerNotification("Error: Tidak diperbolehkan menghapus akun Owner!");
      return;
    }

    if (!window.confirm(`Yakin ingin menghapus permanen pengguna ini: ${targetEmail}?`)) {
      return;
    }

    const usersRaw = localStorage.getItem("merdekaguru_users");
    const users: UserAccount[] = usersRaw ? JSON.parse(usersRaw) : [];
    const filtered = users.filter(u => u.email.toLowerCase() !== targetEmail.toLowerCase());
    
    localStorage.setItem("merdekaguru_users", JSON.stringify(filtered));
    refreshAllUsers();
    triggerNotification(`Akun ${targetEmail} telah dihapus dari database.`);
  };

  const handleCreateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail.trim() || !newUserName.trim()) {
      triggerNotification("Mohon lengkapi email dan nama lengkap.");
      return;
    }

    const emailFormatted = newUserEmail.trim().toLowerCase();
    const usersRaw = localStorage.getItem("merdekaguru_users");
    const users: UserAccount[] = usersRaw ? JSON.parse(usersRaw) : [];

    if (users.some(u => u.email.toLowerCase() === emailFormatted)) {
      triggerNotification("Kesalahan: Email sudah terdaftar dalam sistem!");
      return;
    }

    let defaultKey = undefined;
    if (newUserPremium) {
      const randHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      defaultKey = `MG-${randHex()}-${randHex()}-${randHex()}`;
    }

    const newUser: UserAccount = {
      email: emailFormatted,
      name: newUserName.trim(),
      isPremium: newUserPremium,
      licenseKey: defaultKey,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem("merdekaguru_users", JSON.stringify(users));
    
    setNewUserEmail("");
    setNewUserName("");
    setNewUserPremium(false);
    refreshAllUsers();
    triggerNotification(`Berhasil menambahkan guru baru: ${newUser.name}`);
  };

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.licenseKey && user.licenseKey.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalUsers = allUsers.length;
  const premiumCount = allUsers.filter(u => u.isPremium).length;
  const standardCount = totalUsers - premiumCount;

  if (!panelVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50 no-print">
        <button
          onClick={() => setPanelVisible(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-extrabold text-xs rounded-2xl shadow-xl border border-amber-300 transition-all scale-100 hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-amber-500/15"
        >
          <Shield className="h-4.5 w-4.5" />
          <span>Buka Panel Administrasi Merdeka Guru</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border-t-4 border-amber-400 no-print text-white py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 p-2.5 rounded-2xl text-slate-950 font-black flex items-center justify-center">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400 text-slate-950 px-2 py-0.5 rounded">PASAL OWNER SAAS</span>
                <span className="text-xs text-slate-400">Verifikasi Berhasil • Sebagai Hasanudin, S.Pd</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-slate-100 tracking-tight mt-1">
                Dashboard Manajemen Lisensi Merdeka Guru (SaaS)
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={refreshAllUsers}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-xl transition border border-slate-700 cursor-pointer"
              title="Refresh Data Guru"
            >
              <RefreshCw className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => setPanelVisible(false)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-rose-300 hover:text-rose-200 border border-[#f43f5e]/20 rounded-xl transition cursor-pointer text-xs font-bold"
            >
              Sembunyikan Panel Kerja Admin
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Total Guru Terdaftar</span>
              <span className="text-2xl font-black text-white mt-1 block">{totalUsers}</span>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Pelanggan Aktif (Premium)</span>
              <span className="text-2xl font-black text-amber-400 mt- block">{premiumCount}</span>
            </div>
            <div className="p-3 bg-amber-400/10 rounded-xl text-amber-400">
              <Star className="h-6 w-6 fill-amber-400/20" />
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Pengguna Layanan Gratis</span>
              <span className="text-2xl font-black text-teal-400 mt-1 block">{standardCount}</span>
            </div>
            <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Estimasi Omset Bisnis</span>
              <span className="text-2xl font-black text-teal-300 mt-1 block">Rp { (premiumCount * 99000).toLocaleString("id-ID") }</span>
            </div>
            <div className="p-3 bg-teal-500/10 rounded-xl text-teal-300">
              <Coins className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Outer Operations Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main User Operations Area */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-850 p-5 sm:p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <span>👥 Manajemen Akun Guru Terdaftar</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Aktifkan manual, rubah lisensi, atau eliminasi akun yang melanggar.</p>
              </div>

              {/* Live Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari guru, email, atau lisensi..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* List Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-850">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 font-bold">
                    <th className="p-3">Nama Guru &amp; Gelar</th>
                    <th className="p-3">Kontak Email</th>
                    <th className="p-3">Waktu Daftar</th>
                    <th className="p-3">Lisensi &amp; Akses</th>
                    <th className="p-3 text-right">Opsi Operasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.email} className="hover:bg-slate-920/50 transition">
                        <td className="p-3 font-bold text-slate-200">
                          <div className="flex items-center gap-1.5">
                            {user.name}
                            {user.email.toLowerCase() === "hasanudin63@admin.sd.belajar.id" && (
                              <span className="text-[8px] bg-red-400/20 text-red-300 px-1 rounded uppercase font-black">Admin</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 font-mono text-slate-400">{user.email}</td>
                        <td className="p-3 text-slate-400">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString("id-ID", {day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"}) : "-"}
                        </td>
                        <td className="p-3">
                          {user.isPremium ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 font-black text-[9px] uppercase px-1.5 py-0.5 rounded">
                                <Star className="h-2.5 w-2.5 fill-amber-300" /> Premium Aktif
                              </span>
                              <div className="font-mono text-slate-400 text-[10px] select-all tracking-wider font-semibold block">
                                {user.licenseKey || "MG-BYPASS-SESI"}
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-400 font-extrabold text-[9px] uppercase px-1.5 py-0.5 rounded">
                              Gratis (Locked)
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          <button
                            onClick={() => handleAdminToggleUserPremium(user.email, user.isPremium)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition ${
                              user.isPremium 
                                ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' 
                                : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-555/20'
                            }`}
                          >
                            {user.isPremium ? "Downgrade" : "Aktifkan"}
                          </button>
                          
                          <button
                            onClick={() => handleDeleteUser(user.email)}
                            disabled={user.email.toLowerCase() === "hasanudin63@admin.sd.belajar.id"}
                            className="p-1 px-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition cursor-pointer disabled:opacity-20 inline-flex items-center justify-center align-middle"
                            title="Hapus Pengguna"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold italic">
                        Tidak ada data guru yang cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick manual registration by admin */}
            <form onSubmit={handleCreateNewUser} className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3.5">
              <span className="text-[10px] text-amber-200 font-extrabold uppercase tracking-wider block">
                🆕 Daftarkan &amp; Beri Akses Guru Manual (Offline Order Bypass)
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-5">
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Nama Lengkap Guru (Format Bebas)"
                    className="w-full bg-[#011410] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="md:col-span-4">
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="Email (email@sekolah.sch.id)"
                    className="w-full bg-[#011410] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="md:col-span-3 flex items-center gap-2 px-1">
                  <input
                    type="checkbox"
                    id="new-user-premium-chk"
                    checked={newUserPremium}
                    onChange={(e) => setNewUserPremium(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-amber-400 focus:ring-slate-900"
                  />
                  <label htmlFor="new-user-premium-chk" className="text-xs text-slate-300 select-none font-semibold">
                    Set Premium Langsung
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg shadow-sm transition cursor-pointer"
              >
                Tambahkan Guru Ke Database Berlangganan
              </button>
            </form>

          </div>

          {/* Sidebar Admin Operations (QRIS, Banks, Key Generator) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Payment Setup Form */}
            <div className="bg-slate-950 rounded-2xl border border-slate-850 p-5 space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-250 flex items-center gap-1.5 uppercase tracking-wide">
                  <span>🛠️ Konfigurasi Gerbang Pembayaran Anda</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Atur rekening &amp; upload QRIS asli Anda agar checkout otomatis berubah ke milik Anda sendiri!</p>
              </div>

              {/* QRIS Image Drag Drop Box */}
              <div className="space-y-2">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">1. QRIS Barcode Merchant</span>
                
                <div
                  onDragOver={handleQrisDragOver}
                  onDrop={handleQrisDrop}
                  className="border-2 border-dashed border-slate-800 hover:border-amber-400 bg-slate-900/60 p-4 rounded-xl text-center cursor-pointer transition flex flex-col justify-center items-center min-h-[140px]"
                  onClick={() => document.getElementById('admin-qris-file-uploader')?.click()}
                >
                  <input
                    type="file"
                    id="admin-qris-file-uploader"
                    className="hidden"
                    accept="image/*"
                    onChange={handleQrisUpload}
                  />

                  {ownerQrisImage ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-20 w-20 bg-white p-1 rounded border border-slate-700">
                        <img src={ownerQrisImage} alt="QRIS Aktif" className="h-full w-full object-contain" />
                      </div>
                      <span className="text-[9px] text-teal-300 font-extrabold uppercase">QRIS Asli Milik Anda Aktif!</span>
                      <span className="text-[8px] text-slate-400">Pilih file baru untuk mengganti</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-center">
                      <QrCode className="h-8 w-8 text-amber-400 mx-auto opacity-70" />
                      <span className="text-xs font-bold block text-slate-200">Geser atau Unggah QRIS Anda</span>
                      <span className="text-[9px] text-slate-400 block">Konversikan barcode QRIS Dana/OVO menjadi rupiah nyata</span>
                    </div>
                  )}
                </div>

                {ownerQrisImage && (
                  <button
                    onClick={handleClearQris}
                    className="w-full py-1.5 bg-rose-950/40 hover:bg-rose-950/60 text-rose-300 rounded-lg text-[9px] font-bold border border-rose-900/30 transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" /> Hapus QRIS (Pakai Barcode Simulasi)
                  </button>
                )}
              </div>

              {/* Bank accounts setup Form */}
              <form onSubmit={handleSaveBankDetails} className="space-y-3 pt-2 border-t border-slate-900/50">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">2. Tujuan Transfer Bank Manual</span>
                
                <div className="space-y-2.5">
                  <div>
                    <label className="text-[10px] text-slate-400 block font-semibold mb-1">Nama Bank &amp; Cabang:</label>
                    <input 
                      type="text"
                      value={ownerBankName}
                      onChange={(e) => setOwnerBankName(e.target.value)}
                      required
                      placeholder="Contoh: Bank BCA Kantor Wilayah..."
                      className="w-full bg-[#011410] border border-slate-800 rounded-lg p-2 text-xs text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block font-semibold mb-1">Nomor Rekening Va / Rek:</label>
                    <input 
                      type="text"
                      value={ownerBankAccount}
                      onChange={(e) => setOwnerBankAccount(e.target.value)}
                      required
                      placeholder="Contoh: 8802 124 1412"
                      className="w-full bg-[#011410] border border-slate-800 rounded-lg p-2 text-xs text-amber-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block font-semibold mb-1">Atas Nama Rekening:</label>
                    <input 
                      type="text"
                      value={ownerBankUser}
                      onChange={(e) => setOwnerBankUser(e.target.value)}
                      required
                      placeholder="Contoh: Hasanudin (Owner)"
                      className="w-full bg-[#011410] border border-slate-800 rounded-lg p-2 text-xs text-white font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition font-bold rounded-lg text-xs cursor-pointer text-white mt-1 text-center"
                >
                  Simpan Info Bank Pembayaran
                </button>
              </form>
            </div>

            {/* Offline Key Generator */}
            <div className="bg-slate-950 rounded-2xl border border-slate-850 p-5 space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-250 flex items-center gap-1.5 uppercase tracking-wide">
                  <span>🔑 Cetak / Produksi Kunci Baru</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Produksi kode lisensi unik baru untuk diberikan langsung kepada pembeli offline.</p>
              </div>

              <button
                onClick={handleAdminGenerateKey}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-[0.98] text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="h-4 w-4" />
                Cetak Lisensi Premium Baru
              </button>

              {adminGeneratedKeys.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-350 font-extrabold uppercase block mt-3">Hasil Kunci Terbaru:</span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {adminGeneratedKeys.map((k, i) => (
                      <div key={k} className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px]">
                        <span className="font-mono text-amber-200 font-extrabold select-all">{k}</span>
                        <button
                          onClick={() => handleCopyKey(k)}
                          className="text-slate-400 hover:text-white p-1 transition cursor-pointer"
                          title="Copy Key"
                        >
                          <Copy className="h-3.5 w-3.5 animate-pulse" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
