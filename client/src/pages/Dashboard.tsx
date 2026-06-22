import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, RefreshCw, Plus, Database, AlertTriangle, TrendingUp, Archive, BarChart2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Product {
  id: string;
  name: string;
  modal: number;
  stok: number;
  penjualan: number;
}

const DEMO_PRODUCTS: Product[] = [
  { id: "1", name: "Beras Cianjur 5kg", modal: 60000, stok: 15, penjualan: 180 },
  { id: "2", name: "Kaos Polos Cotton 30s", modal: 30000, stok: 20, penjualan: 210 },
  { id: "3", name: "Sirup Premium Cocopandan", modal: 25000, stok: 120, penjualan: 5 },
  { id: "4", name: "Jaket Tebal Hoodie", modal: 120000, stok: 80, penjualan: 3 },
  { id: "5", name: "Minyak Goreng 2L", modal: 32000, stok: 35, penjualan: 95 },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [tokenChecked, setTokenChecked] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    modal: "",
    stok: "",
    penjualan: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLocation("/login?redirectTo=/dashboard");
    } else {
      setTokenChecked(true);
    }
  }, [setLocation]);

  const loadDemoData = () => {
    setProducts(DEMO_PRODUCTS);
    toast.success("Data studi kasus UMKM berhasil dimuat!");
  };

  const resetData = () => {
    setProducts([]);
    toast.info("Data dashboard berhasil dikosongkan.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.modal || !newProduct.stok || !newProduct.penjualan) {
      toast.error("Semua kolom simulasi wajib diisi!");
      return;
    }

    const modalNum = parseInt(newProduct.modal);
    const stokNum = parseInt(newProduct.stok);
    const penjualanNum = parseInt(newProduct.penjualan);

    if (isNaN(modalNum) || isNaN(stokNum) || isNaN(penjualanNum)) {
      toast.error("Nilai modal, stok, dan penjualan harus berupa angka!");
      return;
    }

    const added: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      modal: modalNum,
      stok: stokNum,
      penjualan: penjualanNum,
    };

    setProducts((prev) => [...prev, added]);
    setNewProduct({ name: "", modal: "", stok: "", penjualan: "" });
    toast.success(`Produk "${added.name}" berhasil ditambahkan ke simulasi!`);
  };

  // Helper helper status
  const getProductStatus = (p: Product) => {
    if (p.stok > 2 * p.penjualan && p.stok > 10) {
      return { label: "Dead Stock / Kritis", color: "bg-rose-50 text-rose-600 border-rose-200" };
    }
    if (p.penjualan > 3 * p.stok) {
      return { label: "Laris Manis", color: "bg-emerald-50 text-emerald-600 border-emerald-200" };
    }
    return { label: "Sehat / Normal", color: "bg-cyan-50 text-cyan-600 border-cyan-200" };
  };

  const getProductRecommendation = (p: Product) => {
    if (p.stok > 2 * p.penjualan && p.stok > 10) {
      return "Terapkan promo bundling atau beri diskon cuci gudang sebesar 20-30% untuk mengosongkan gudang.";
    }
    if (p.penjualan > 3 * p.stok) {
      return "Tingkatkan volume restock otomatis. Segera pesan kembali ke supplier untuk menghindari stockout.";
    }
    return "Pertahankan volume pengadaan saat ini. Kondisi persediaan masih seimbang dengan demand.";
  };

  // Hitung stats ringkas
  const totalModalTerkunci = products.reduce((acc, p) => acc + (p.stok * p.modal), 0);
  
  const totalPenjualanUnit = products.reduce((acc, p) => acc + p.penjualan, 0);
  const totalStokUnit = products.reduce((acc, p) => acc + p.stok, 0);
  const efisiensiGudang = totalPenjualanUnit + totalStokUnit > 0
    ? ((totalPenjualanUnit / (totalPenjualanUnit + totalStokUnit)) * 100).toFixed(1)
    : "0.0";

  const urgentActionCount = products.filter(p => p.stok > 2 * p.penjualan && p.stok > 10).length;

  // Format chart data
  const chartData = products.map(p => ({
    name: p.name.length > 15 ? p.name.substring(0, 12) + "..." : p.name,
    Stok: p.stok,
    Penjualan: p.penjualan,
  }));

  // Prevent flashing content if not verified
  if (!tokenChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-[#64748B] font-medium font-body">Memuat dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 max-w-7xl space-y-8">
          
          {/* Top Banner and Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs gap-4">
            <div className="space-y-1">
              <button
                onClick={() => setLocation("/")}
                className="flex items-center gap-1 text-[#64748B] hover:text-[#06B6D4] transition-colors text-xs font-semibold font-body cursor-pointer mb-2"
              >
                <ArrowLeft size={14} /> Kembali
              </button>
              <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight font-display">
                Dashboard Optimasi Inventaris UMKM
              </h1>
              <p className="text-sm text-[#64748B] font-body">
                Kelola stok mati, pantau efisiensi pergudangan, dan dapatkan rekomendasi keputusan berbasis analitika.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                onClick={loadDemoData}
                className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs font-body py-5 px-5 text-sm"
              >
                <Database size={16} /> 🚀 Gunakan Data Studi Kasus UMKM
              </Button>
              <Button
                onClick={resetData}
                variant="outline"
                className="border-slate-200 text-[#64748B] hover:bg-slate-50 font-semibold rounded-xl flex items-center gap-2 cursor-pointer font-body py-5 px-5 text-sm"
              >
                <RefreshCw size={16} /> Reset
              </Button>
            </div>
          </div>

          {/* Middle: 3 Stats Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Total Modal Terkunci */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs flex items-center gap-5 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                <Archive size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider font-body">
                  Total Modal Terkunci (Dead Stock)
                </p>
                <p className="text-2xl font-black text-[#0F172A] font-display">
                  Rp {totalModalTerkunci.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-slate-400 font-body">
                  Estimasi kerugian dari stok berlebih di gudang
                </p>
              </div>
            </div>

            {/* Card 2: Warehouse Efficiency */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs flex items-center gap-5 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 shrink-0">
                <TrendingUp size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider font-body">
                  Efisiensi Gudang
                </p>
                <p className="text-2xl font-black text-[#0F172A] font-display">
                  {efisiensiGudang}%
                </p>
                <p className="text-xs text-slate-400 font-body">
                  Rasio total barang terjual dari stok masuk
                </p>
              </div>
            </div>

            {/* Card 3: Urgent Action Required */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs flex items-center gap-5 relative overflow-hidden group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${urgentActionCount > 0 ? 'bg-amber-50 text-amber-500 animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider font-body">
                  Urgent Action Required
                </p>
                <p className="text-2xl font-black text-[#0F172A] font-display">
                  {urgentActionCount} Produk
                </p>
                <p className="text-xs text-slate-400 font-body">
                  Produk kritis yang butuh tindakan promo segera
                </p>
              </div>
            </div>
          </div>

          {/* Bottom: Charts & Work Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visualisation Chart Card (Left Spans 4 Columns) */}
            <div className="lg:col-span-4 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs flex flex-col justify-between min-h-[400px]">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <BarChart2 className="text-[#06B6D4]" size={20} />
                <h3 className="font-bold text-slate-800 font-display text-sm">Visualisasi Stok vs Penjualan</h3>
              </div>
              
              <div className="flex-grow flex items-center justify-center h-72">
                {products.length === 0 ? (
                  <div className="text-center p-6 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                      <BarChart2 size={24} />
                    </div>
                    <p className="text-xs text-slate-400 font-body max-w-[200px] mx-auto leading-relaxed">
                      Silakan klik tombol di atas untuk memuat data studi kasus demi melihat grafik analisis.
                    </p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #E2E8F0', fontFamily: 'Inter' }}
                        labelStyle={{ fontWeight: 'bold', color: '#0F172A' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'Inter', paddingTop: '10px' }} />
                      <Bar dataKey="Penjualan" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Stok" fill="#0F172A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Inventory Table Card (Right Spans 8 Columns) */}
            <div className="lg:col-span-8 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-800 font-display text-sm">Tabel Pengambilan Keputusan Inventaris</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-body">
                    {products.length} Produk Terdaftar
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs text-[#64748B] uppercase tracking-wider font-semibold font-body">
                        <th className="py-3 px-2">Nama Produk</th>
                        <th className="py-3 px-2 text-right">Modal</th>
                        <th className="py-3 px-2 text-right">Sisa Stok</th>
                        <th className="py-3 px-2 text-right">Terjual</th>
                        <th className="py-3 px-2 text-center">Status</th>
                        <th className="py-3 px-2 pl-4">Rekomendasi Solusi Bisnis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-[#0F172A] font-body">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400 font-body text-xs">
                            Belum ada data inventaris. Klik "Gunakan Data Studi Kasus UMKM" atau isi formulir simulasi di bawah.
                          </td>
                        </tr>
                      ) : (
                        products.map((p) => {
                          const status = getProductStatus(p);
                          return (
                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3.5 px-2 font-semibold text-slate-800">{p.name}</td>
                              <td className="py-3.5 px-2 text-right text-slate-500">Rp {p.modal.toLocaleString("id-ID")}</td>
                              <td className="py-3.5 px-2 text-right font-semibold text-[#0F172A]">{p.stok} unit</td>
                              <td className="py-3.5 px-2 text-right font-semibold text-[#06B6D4]">{p.penjualan} unit</td>
                              <td className="py-3.5 px-2 text-center">
                                <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${status.color}`}>
                                  {status.label}
                                </span>
                              </td>
                              <td className="py-3.5 px-2 pl-4 text-xs text-slate-500 max-w-[280px] leading-relaxed">
                                {getProductRecommendation(p)}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          {/* Form input mini below table */}
          <div className="bg-white border border-[#E2E8F0] p-6 lg:p-8 rounded-2xl shadow-xs">
            <div className="space-y-1 mb-6 border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 font-display flex items-center gap-2">
                <Plus className="text-[#06B6D4]" size={16} /> Tambah Produk Baru (Simulasi Inventaris)
              </h3>
              <p className="text-xs text-[#64748B] font-body">
                Masukkan data produk baru untuk menguji performa grafik, ringkasan efisiensi, dan analisis solusi rekomendasi secara instan.
              </p>
            </div>

            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold text-slate-600 font-body">Nama Produk</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Contoh: Kaos Kaki Premium"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="border-slate-200 focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] rounded-xl font-body text-xs h-10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal" className="text-xs font-semibold text-slate-600 font-body">Modal Satuan (Rp)</Label>
                <Input
                  id="modal"
                  name="modal"
                  type="number"
                  placeholder="Contoh: 15000"
                  value={newProduct.modal}
                  onChange={handleInputChange}
                  className="border-slate-200 focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] rounded-xl font-body text-xs h-10"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stok" className="text-xs font-semibold text-slate-600 font-body">Sisa Stok Sisa (Unit)</Label>
                <Input
                  id="stok"
                  name="stok"
                  type="number"
                  placeholder="Contoh: 90"
                  value={newProduct.stok}
                  onChange={handleInputChange}
                  className="border-slate-200 focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] rounded-xl font-body text-xs h-10"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="penjualan" className="text-xs font-semibold text-slate-600 font-body">Terjual (Unit)</Label>
                <Input
                  id="penjualan"
                  name="penjualan"
                  type="number"
                  placeholder="Contoh: 4"
                  value={newProduct.penjualan}
                  onChange={handleInputChange}
                  className="border-slate-200 focus:border-[#06B6D4] text-[#0F172A] placeholder-slate-400 focus:ring-1 focus:ring-[#06B6D4] rounded-xl font-body text-xs h-10"
                  min="0"
                  required
                />
              </div>

              <div className="md:col-span-4 flex justify-end mt-2">
                <Button
                  type="submit"
                  className="bg-[#0F172A] hover:bg-slate-800 text-white font-semibold rounded-xl shadow-xs py-4 px-6 text-xs flex items-center gap-1.5 cursor-pointer font-body h-10"
                >
                  <Plus size={14} /> Tambah ke Simulasi
                </Button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
