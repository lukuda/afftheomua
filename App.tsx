
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  ShoppingBag, 
  Video, 
  BarChart3, 
  Sparkles, 
  ChevronRight,
  Info,
  Play,
  ArrowRight,
  Facebook,
  Youtube,
  Smartphone
} from 'lucide-react';
import { VIETNAM_SEASONAL_MAP } from './constants';
import { SeasonalData } from './types';
import { geminiService } from './services/geminiService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';

const App: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonalData>(VIETNAM_SEASONAL_MAP[0]);
  const [userInput, setUserInput] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(['TikTok', 'Facebook', 'YouTube']);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleConsultAI = async () => {
    if (!userInput) return;
    setIsLoading(true);
    try {
      const data = await geminiService.getPersonalizedStrategy(
        `Tháng: ${selectedSeason.month}, Chủ đề: ${userInput}`,
        platforms
      );
      setRecommendations(data);
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra khi gọi AI. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = useMemo(() => [
    { name: 'T1-T2', demand: 95, color: '#ef4444' },
    { name: 'T3-T4', demand: 75, color: '#f97316' },
    { name: 'T5-T6', demand: 85, color: '#eab308' },
    { name: 'T7-T8', demand: 70, color: '#22c55e' },
    { name: 'T9-T10', demand: 90, color: '#3b82f6' },
    { name: 'T11-T12', demand: 100, color: '#a855f7' },
  ], []);

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-rose-500 to-orange-400 p-2 rounded-xl shadow-lg shadow-rose-200">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Affiliate Strategy Lab VN
          </h1>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-rose-500 transition-colors">Chiến lược nền tảng</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Bản đồ mùa</a>
          <a href="#" className="hover:text-rose-500 transition-colors">AI Tư vấn</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="flex justify-center gap-4 mb-2">
            <Smartphone className="w-8 h-8 text-slate-800" />
            <Facebook className="w-8 h-8 text-blue-600" />
            <Youtube className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Thống Trị <span className="text-rose-600">Mọi Nền Tảng</span> Shorts
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Chiến lược Affiliate tối ưu cho TikTok, Facebook Reels và YouTube Shorts tại thị trường Việt Nam.
          </p>
        </section>

        {/* Platform Strategy Cards */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-rose-200 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-slate-900 rounded-2xl">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold">TikTok Shop</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">{selectedSeason.platformStrategies.tiktok}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">#Trends</span>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">#Livestream</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold">Facebook Reels</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">{selectedSeason.platformStrategies.facebook}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">#Groups</span>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">#PersonalBrand</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-red-200 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-600 rounded-2xl">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold">YouTube Shorts</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">{selectedSeason.platformStrategies.youtube}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-1 rounded">#SEO</span>
              <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-1 rounded">#Evergreen</span>
            </div>
          </div>
        </section>

        {/* Seasonal Insight Map */}
        <section className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-rose-500 w-5 h-5" />
              <h3 className="text-xl font-bold">Lộ Trình Theo Mùa</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {VIETNAM_SEASONAL_MAP.map((item) => (
                <button
                  key={item.month}
                  onClick={() => setSelectedSeason(item)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 border-2 ${
                    selectedSeason.month === item.month 
                    ? 'border-rose-500 bg-white shadow-xl scale-[1.02]' 
                    : 'border-transparent bg-white/50 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <p className="text-xs font-bold text-rose-500 uppercase mb-1">{item.season}</p>
                  <h4 className="font-bold text-slate-800">{item.month}</h4>
                </button>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedSeason.season}</h3>
                  <p className="text-slate-500">{selectedSeason.month}</p>
                </div>
                <div className="flex gap-2">
                  {selectedSeason.majorEvents.map(event => (
                    <span key={event} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold">
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-amber-100 p-1.5 rounded-lg">
                      <ShoppingBag className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Ngành hàng Hot</h5>
                      <ul className="mt-2 space-y-1">
                        {selectedSeason.hotCategories.map(cat => (
                          <li key={cat} className="text-slate-600 text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            {cat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1.5 rounded-lg">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Tâm lý mua hàng</h5>
                      <p className="mt-1 text-slate-600 text-sm leading-relaxed">{selectedSeason.buyingPsychology}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-purple-100 p-1.5 rounded-lg">
                      <Video className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Phong cách Video</h5>
                      <p className="mt-1 text-slate-600 text-sm leading-relaxed">{selectedSeason.videoStyle}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-100 p-1.5 rounded-lg">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Mẹo quay video ngắn</h5>
                      <p className="mt-1 text-slate-600 text-sm italic">{selectedSeason.shortVideoTips}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-rose-400" />
                Sức mua Dự báo
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fb7185' }}
                    />
                    <Bar dataKey="demand" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-rose-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
              <h3 className="text-xl font-bold mb-4 relative z-10">AI Chiến lược đa kênh</h3>
              <p className="text-rose-100 text-sm mb-6 relative z-10">Chọn nền tảng và nhập chủ đề để AI tùy biến kịch bản riêng biệt.</p>
              
              <div className="space-y-4 relative z-10">
                <div className="flex gap-2">
                  {['TikTok', 'Facebook', 'YouTube'].map(p => (
                    <button
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        platforms.includes(p) ? 'bg-white text-rose-600' : 'bg-white/20 text-white border border-white/30'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ví dụ: Đồ gia dụng, Thời trang gen Z..." 
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder:text-rose-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button 
                  onClick={handleConsultAI}
                  disabled={isLoading}
                  className="w-full bg-white text-rose-600 font-bold py-3 rounded-xl hover:bg-rose-50 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? "Đang xử lý..." : "Nhận kịch bản đa kênh"}
                  {!isLoading && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        {recommendations.length > 0 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-500 w-6 h-6" />
                <h3 className="text-2xl font-bold text-slate-900">Gợi ý kịch bản tối ưu</h3>
              </div>
              <button onClick={() => setRecommendations([])} className="text-slate-400 text-sm hover:text-slate-600">Xóa kết quả</button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-2 py-1 rounded">Sản phẩm #{idx + 1}</span>
                    <h4 className="text-xl font-bold text-slate-900 mt-2">{rec.productName}</h4>
                  </div>
                  
                  <div className="flex-grow space-y-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Mở đầu gây bão (Hook)</p>
                      <div className="space-y-2">
                        {rec.videoHooks.slice(0, 2).map((hook: string, hIdx: number) => (
                          <div key={hIdx} className="bg-slate-50 p-2 rounded-lg flex items-start gap-2 border border-slate-100">
                            <Play className="w-3 h-3 text-rose-500 mt-1 flex-shrink-0" />
                            <span className="text-sm text-slate-700 italic">"{hook}"</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Tùy biến nền tảng</p>
                      {platforms.includes('TikTok') && (
                        <div className="flex items-start gap-3">
                          <Smartphone className="w-4 h-4 text-slate-800 mt-1" />
                          <p className="text-xs text-slate-600"><span className="font-bold">TikTok:</span> {rec.platformCustomization?.tiktok}</p>
                        </div>
                      )}
                      {platforms.includes('Facebook') && (
                        <div className="flex items-start gap-3">
                          <Facebook className="w-4 h-4 text-blue-600 mt-1" />
                          <p className="text-xs text-slate-600"><span className="font-bold">Facebook:</span> {rec.platformCustomization?.facebook}</p>
                        </div>
                      )}
                      {platforms.includes('YouTube') && (
                        <div className="flex items-start gap-3">
                          <Youtube className="w-4 h-4 text-red-600 mt-1" />
                          <p className="text-xs text-slate-600"><span className="font-bold">YouTube:</span> {rec.platformCustomization?.youtube}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                      <p className="text-xs font-bold text-amber-700 uppercase mb-2">Cốt truyện chính</p>
                      <p className="text-amber-800 text-sm leading-relaxed">{rec.scriptSummary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Knowledge Base */}
        <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
          <h3 className="text-3xl font-bold mb-8 text-center">Bí Quyết Affiliate Việt Nam</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">TikTok: Livestream & Trend</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Sử dụng âm nhạc đang hot trong 24h đầu. Đăng video vào khung giờ 'vàng' (11h-13h, 19h-21h). Gắn link sản phẩm TikTok Shop trực tiếp.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <Facebook className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">Facebook: Cộng đồng</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Xây dựng thương hiệu cá nhân qua Reels. Chia sẻ kinh nghiệm thật thay vì chỉ bán hàng. Link Affiliate để ở Comment hoặc Bio.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                <Youtube className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">YouTube: Giá trị dài hạn</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Shorts dùng để thu hút đăng ký. Video dài (Review chi tiết, So sánh) dùng để chốt đơn Affiliate với hoa hồng cao hơn.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Sticky Nav for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 glass border-t border-slate-200 py-3 px-6 md:hidden flex justify-around items-center z-50">
        <button className="flex flex-col items-center gap-1 text-rose-600">
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">Lộ trình</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] font-bold">Nền tảng</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold">AI Script</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
