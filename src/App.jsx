import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  Home, 
  Search, 
  Plus, 
  User, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  ArrowLeft, 
  Clock, 
  Flame, 
  Users, 
  CheckCircle, 
  Share2, 
  ShoppingBag, 
  Play, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  Award,
  Camera,
  X,
  Trash2,
  BookOpen
} from 'lucide-react';

// --- 1. MOCK DATA ---

const MOCK_RECIPES = [
  {
    id: 1,
    title: "Nasi Goreng Kampung Spesial",
    chef: "Budi Santoso",
    chefLevel: "Ahli Nusantara",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "20 mnt",
    difficulty: "Mudah",
    calories: "350 kkal",
    category: "Nusantara",
    likes: 124,
    comments: 45,
    description: "Resep warisan nenek yang simpel tapi rasanya otentik. Cocok untuk sarapan kilat.",
    ingredients: [
      "2 piring nasi putih dingin",
      "3 siung bawang merah",
      "2 siung bawang putih",
      "5 buah cabai rawit",
      "1 butir telur",
      "Kecap manis secukupnya",
      "Garam dan penyedap"
    ],
    steps: [
      "Haluskan bawang merah, bawang putih, dan cabai.",
      "Panaskan minyak, tumis bumbu halus hingga harum.",
      "Masukkan telur, buat orak-arik.",
      "Masukkan nasi, aduk rata dengan bumbu.",
      "Tambahkan kecap, garam, dan penyedap. Koreksi rasa.",
      "Sajikan dengan kerupuk dan acar."
    ],
    isTrending: true
  },
  {
    id: 2,
    title: "Creamy Mushroom Pasta",
    chef: "Siska Kohl KW",
    chefLevel: "Pemula Manis",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?lib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    time: "30 mnt",
    difficulty: "Sedang",
    calories: "450 kkal",
    category: "Western",
    likes: 89,
    comments: 12,
    description: "Pasta creamy tanpa bikin eneg. Rahasianya ada di penggunaan air rebusan pasta.",
    ingredients: [
      "200g Pasta Fettuccine",
      "100g Jamur Champignon",
      "200ml Cooking Cream",
      "Keju Parmesan",
      "Parsley untuk garnish"
    ],
    steps: [
      "Rebus pasta al dente.",
      "Tumis jamur hingga kecoklatan.",
      "Tuang cooking cream, masak hingga mengental.",
      "Masukkan pasta, aduk rata.",
      "Taburi keju dan parsley."
    ],
    isTrending: false
  },
  {
    id: 3,
    title: "Es Kopi Gula Aren",
    chef: "Barista Rumahan",
    chefLevel: "Menengah",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    time: "10 mnt",
    difficulty: "Mudah",
    calories: "180 kkal",
    category: "Minuman",
    likes: 230,
    comments: 88,
    description: "Seger banget buat siang hari. Lebih hemat daripada beli di cafe!",
    ingredients: ["Kopi Espresso", "Susu UHT", "Gula Aren Cair", "Es Batu"],
    steps: ["Seduh kopi.", "Tuang gula aren di dasar gelas.", "Masukkan es batu.", "Tuang susu.", "Tuang kopi di atasnya."],
    isTrending: false
  }
];

const BADGES = [
  { id: 1, name: "Recipe Newbie", icon: <ChefHat size={16} />, color: "bg-emerald-100 text-emerald-700" },
  { id: 2, name: "Food Critic", icon: <MessageCircle size={16} />, color: "bg-amber-100 text-amber-700" }
];

// --- 2. COMPONENTS UTILS ---

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const baseStyle = "w-full py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-500 bg-transparent",
    ghost: "bg-slate-100 text-slate-600 hover:bg-slate-200",
    text: "bg-transparent text-slate-500 hover:text-emerald-500"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-800 placeholder-slate-400"
    />
  </div>
);

// --- MODIFIED BOTTOM NAV ---
const BottomNav = ({ currentTab, setTab }) => {
  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white/95 backdrop-blur-sm border-t border-slate-100 pb-2 pt-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] rounded-t-3xl">
      <div className="flex justify-between items-end px-6 relative">
        
        {/* Kiri */}
        <button
          onClick={() => setTab('home')}
          className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
            currentTab === 'home' ? 'text-emerald-600 -translate-y-1' : 'text-slate-300 hover:text-slate-500'
          }`}
        >
          <Home size={24} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
          <span className={`text-[10px] font-medium transition-opacity ${currentTab === 'home' ? 'opacity-100' : 'opacity-0 hidden'}`}>Beranda</span>
        </button>

        <button
          onClick={() => setTab('explore')}
          className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
            currentTab === 'explore' ? 'text-emerald-600 -translate-y-1' : 'text-slate-300 hover:text-slate-500'
          }`}
        >
          <Search size={24} strokeWidth={currentTab === 'explore' ? 2.5 : 2} />
          <span className={`text-[10px] font-medium transition-opacity ${currentTab === 'explore' ? 'opacity-100' : 'opacity-0 hidden'}`}>Cari</span>
        </button>

        {/* Tengah - Floating Button */}
        <div className="relative -top-6 group">
          <div className="absolute inset-0 bg-emerald-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
          <button
            onClick={() => setTab('create')}
            className="relative w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-200/50 border-4 border-white transform transition-all duration-300 active:scale-95 hover:-translate-y-1"
          >
            <Plus size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Kanan */}
        <button
          onClick={() => setTab('shopping')}
          className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
            currentTab === 'shopping' ? 'text-emerald-600 -translate-y-1' : 'text-slate-300 hover:text-slate-500'
          }`}
        >
          <ShoppingBag size={24} strokeWidth={currentTab === 'shopping' ? 2.5 : 2} />
          <span className={`text-[10px] font-medium transition-opacity ${currentTab === 'shopping' ? 'opacity-100' : 'opacity-0 hidden'}`}>Belanja</span>
        </button>

        <button
          onClick={() => setTab('profile')}
          className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
            currentTab === 'profile' ? 'text-emerald-600 -translate-y-1' : 'text-slate-300 hover:text-slate-500'
          }`}
        >
          <User size={24} strokeWidth={currentTab === 'profile' ? 2.5 : 2} />
          <span className={`text-[10px] font-medium transition-opacity ${currentTab === 'profile' ? 'opacity-100' : 'opacity-0 hidden'}`}>Profil</span>
        </button>
        
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe, onClick }) => (
  <div onClick={() => onClick(recipe)} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6 cursor-pointer active:scale-[0.99] transition-transform">
    <div className="relative h-48 w-full">
      <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
        <Clock size={12} className="text-emerald-600" /> {recipe.time}
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{recipe.title}</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            oleh <span className="text-emerald-600 font-medium">{recipe.chef}</span>
          </p>
        </div>
        <button className="text-slate-300 hover:text-emerald-500 transition-colors">
          <Bookmark size={20} />
        </button>
      </div>
      
      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{recipe.description}</p>
      
      <div className="flex items-center gap-4 border-t border-slate-50 pt-3">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <Heart size={16} className="text-amber-500" fill="#f59e0b" />
          <span className="font-medium">{recipe.likes}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <MessageCircle size={16} />
          <span className="font-medium">{recipe.comments}</span>
        </div>
      </div>
    </div>
  </div>
);

// --- 3. SCREEN COMPONENTS ---

const Onboarding = ({ onFinish }) => (
  <div className="flex flex-col h-full bg-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />

    <div className="flex-1 flex flex-col justify-center items-center px-8 z-10 text-center pt-10">
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-emerald-200 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <img 
          src="https://plus.unsplash.com/premium_vector-1682298101057-5a52c70a669f?q=80&w=1132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Cooking Illustration" 
          className="w-56 h-56 object-cover rounded-full shadow-2xl shadow-emerald-200 border-4 border-white relative z-10"
        />
        <div className="absolute bottom-4 right-0 bg-white p-3 rounded-2xl shadow-lg animate-bounce z-20">
           <ChefHat className="text-emerald-600" size={24} />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
        Bagikan Resep & <br/><span className="text-emerald-600">Inspirasi Masakanmu</span>
      </h1>
      <p className="text-slate-500 text-base leading-relaxed px-2">
        Bergabunglah dengan CookShare. Temukan ribuan resep, simpan favoritmu, dan tunjukkan hasil masakanmu.
      </p>
    </div>
    
    <div className="p-8 z-10 space-y-3 bg-white/50 backdrop-blur-sm">
      <Button onClick={onFinish}>Mulai Sekarang</Button>
      <Button variant="text">Sudah punya akun? Masuk</Button>
    </div>
  </div>
);

const Preferences = ({ onFinish }) => {
  const [selected, setSelected] = useState([]);
  const interests = ["Nusantara", "Western", "Asia", "Dessert", "Healthy", "Minuman", "Vegan", "Baking"];

  const toggle = (item) => {
    setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex-1 pt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Apa selera kamu?</h2>
        <p className="text-slate-500 mb-8">Pilih minimal 3 kategori agar kami bisa merekomendasikan resep yang pas.</p>
        
        <div className="flex flex-wrap gap-3">
          {interests.map(item => (
            <button
              key={item}
              onClick={() => toggle(item)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                selected.includes(item)
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={onFinish} className="mb-6">Selesai & Lanjut</Button>
    </div>
  );
};

const Feed = ({ onRecipeClick }) => (
  <div className="pb-28 pt-6 px-4">
    {/* Header Clean */}
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Halo, Chef! 👋</h1>
        <p className="text-slate-500 text-sm">Mau masak apa hari ini?</p>
      </div>
      <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-sm">
         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
      </div>
    </div>
    
    <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-2">
       {["Semua", "Sarapan", "Makan Siang", "Makan Malam", "MPASI", "Snack"].map((tag, i) => (
         <button key={i} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${i === 0 ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
           {tag}
         </button>
       ))}
    </div>

    {/* Dish of the Day */}
    <div className="mb-8">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-lg font-bold text-slate-800">Dish of the Day 🔥</h2>
      </div>
      <div 
        onClick={() => onRecipeClick(MOCK_RECIPES[0])}
        className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md cursor-pointer group"
      >
        <img src={MOCK_RECIPES[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
          <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">TRENDING</span>
          <h3 className="text-white font-bold text-xl mb-1">{MOCK_RECIPES[0].title}</h3>
          <p className="text-slate-300 text-xs line-clamp-1">{MOCK_RECIPES[0].description}</p>
        </div>
      </div>
    </div>

    {/* List Resep */}
    <h2 className="text-lg font-bold text-slate-800 mb-4">Rekomendasi untuk Kamu</h2>
    {MOCK_RECIPES.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
    ))}
  </div>
);

const Explore = () => (
  <div className="pb-28 pt-6 px-4">
    <div className="relative mb-6">
      <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
      <input 
        type="text" 
        placeholder="Cari resep, bahan, atau chef..." 
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-sm"
      />
    </div>

    <h3 className="font-bold text-slate-800 mb-4">Kategori Populer</h3>
    <div className="flex flex-wrap gap-2 mb-8">
      {["Nusantara", "Sarapan", "Diet", "Dessert", "Ayam", "Minuman", "Korea", "Snack", "Seafood", "Sayuran", "Baking"].map((cat, idx) => (
        <div key={idx} className="px-4 py-2 bg-white border border-slate-100 rounded-lg text-sm text-slate-600 font-medium shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer">
          {cat}
        </div>
      ))}
    </div>

    <h3 className="font-bold text-slate-800 mb-4">Pencarian Terkini</h3>
    <div className="space-y-3">
       {["Resep Ayam Kecap", "Cara membuat donat", "Soto Betawi"].map((item, idx) => (
         <div key={idx} className="flex items-center justify-between text-slate-600 text-sm">
            <div className="flex items-center gap-3">
               <Clock size={16} className="text-slate-300" />
               <span>{item}</span>
            </div>
            <X size={16} className="text-slate-300 cursor-pointer" />
         </div>
       ))}
    </div>
  </div>
);

const ShoppingList = () => {
  const [items, setItems] = useState([
    { id: 1, name: "200g Pasta Fettuccine", checked: false, recipe: "Creamy Mushroom Pasta" },
    { id: 2, name: "100g Jamur Champignon", checked: false, recipe: "Creamy Mushroom Pasta" },
    { id: 3, name: "200ml Cooking Cream", checked: true, recipe: "Creamy Mushroom Pasta" },
    { id: 4, name: "5 buah Cabai Rawit", checked: false, recipe: "Nasi Goreng Kampung" },
  ]);

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100) || 0;

  return (
    <div className="pb-28 pt-6 px-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Daftar Belanja</h2>
      
      {/* Progress Card */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-5 text-white mb-8 shadow-lg shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-3">
             <div>
               <div className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Progress</div>
               <div className="text-3xl font-bold">{items.filter(i => i.checked).length}<span className="text-lg opacity-60">/{items.length}</span></div>
             </div>
             <div className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-bold">{progress}% Selesai</span>
             </div>
          </div>
          <div className="w-full bg-black/20 rounded-full h-2.5">
             <div className="bg-white rounded-full h-2.5 transition-all duration-500 ease-out shadow-sm" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <ShoppingBag className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 group ${
              item.checked 
                ? 'bg-slate-50 border-slate-100' 
                : 'bg-white border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-emerald-200 hover:shadow-md'
            }`}
          >
            <div 
              onClick={() => toggleItem(item.id)}
              className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
              item.checked 
                ? 'bg-emerald-500 border-emerald-500 text-white scale-95' 
                : 'border-slate-300 hover:border-emerald-400'
            }`}>
              {item.checked && <CheckCircle size={16} strokeWidth={3} />}
            </div>
            
            <div className="flex-1 cursor-pointer" onClick={() => toggleItem(item.id)}>
              <div className={`text-base font-medium transition-all ${item.checked ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-800'}`}>
                {item.name}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${item.checked ? 'bg-slate-300' : 'bg-emerald-400'}`}></div>
                <span className="font-medium">{item.recipe}</span>
              </div>
            </div>

            <button onClick={() => deleteItem(item.id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-16 text-slate-400 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <ShoppingBag size={32} className="opacity-40" />
            </div>
            <p className="text-slate-600 font-medium">Keranjang belanja kosong</p>
            <p className="text-xs mt-1">Tambahkan bahan dari resep favoritmu!</p>
          </div>
        )}
      </div>
      
      {items.length > 0 && (
         <div className="mt-8 text-center">
            <button className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors">Hapus semua item yang dicentang</button>
         </div>
      )}
    </div>
  );
};

const CreateRecipe = () => (
  <div className="pb-28 pt-6 px-4">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">Bagikan Resep</h2>
    
    <div className="w-full h-48 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 mb-6 cursor-pointer hover:bg-slate-100 transition-colors">
      <Camera size={32} className="mb-2" />
      <span className="text-sm font-medium">Unggah Foto Masakan</span>
    </div>

    <form className="space-y-2">
      <Input label="Judul Resep" placeholder="Contoh: Rendang Daging Sapi" />
      <div className="grid grid-cols-2 gap-4">
         <Input label="Waktu (menit)" placeholder="60" type="number" />
         <Input label="Porsi" placeholder="4 porsi" />
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Bahan-bahan</label>
        <div className="space-y-2">
          <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-emerald-100 outline-none" placeholder="Contoh: 500gr Daging Sapi" />
          <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-emerald-100 outline-none" placeholder="Contoh: 1 liter santan" />
          <button type="button" className="text-emerald-600 text-sm font-medium mt-1 flex items-center gap-1 hover:text-emerald-700">
            <Plus size={14} /> Tambah Bahan
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Cara Membuat (Langkah-langkah)</label>
        <div className="space-y-3">
          <div className="flex gap-3">
             <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-2">1</div>
             <textarea className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-emerald-100 outline-none resize-none" rows="2" placeholder="Contoh: Potong daging sapi tipis-tipis..." />
          </div>
          <div className="flex gap-3">
             <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-2">2</div>
             <textarea className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-emerald-100 outline-none resize-none" rows="2" placeholder="Contoh: Tumis bumbu halus hingga harum..." />
          </div>
          <button type="button" className="text-emerald-600 text-sm font-medium mt-1 flex items-center gap-1 hover:text-emerald-700 ml-9">
            <Plus size={14} /> Tambah Langkah
          </button>
        </div>
      </div>

      <div className="pt-6">
        <Button>Publikasikan Resep</Button>
      </div>
    </form>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState('recipes'); // recipes, saved

  return (
    <div className="pb-28 bg-white min-h-screen">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-emerald-400 to-teal-500 relative">
        <div className="absolute top-4 right-4 text-white/80 cursor-pointer hover:text-white">
           <Settings size={20} />
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-6 relative">
        <div className="flex justify-between items-end -mt-10 mb-4">
          <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
            <div className="w-full h-full bg-slate-200 rounded-full overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover"/>
            </div>
          </div>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-full text-xs font-bold shadow-md shadow-emerald-200 active:scale-95 transition-transform mb-2">
            Edit Profil
          </button>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800">Dimas Anggara</h2>
        <p className="text-slate-500 text-sm mb-3 leading-relaxed">Hobi masak di akhir pekan. Pecinta pedas & eksperimen rasa baru. 🌶️✨</p>
        
        <div className="flex gap-2 mb-6 flex-wrap">
          {BADGES.map(badge => (
            <div key={badge.id} className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${badge.color} border border-white shadow-sm`}>
              {badge.icon} {badge.name}
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl mb-8 border border-slate-100">
          <div className="text-center flex-1">
            <div className="font-bold text-slate-800 text-lg">12</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Resep</div>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="text-center flex-1">
            <div className="font-bold text-slate-800 text-lg">2.4k</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Pengikut</div>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="text-center flex-1">
            <div className="font-bold text-slate-800 text-lg">145</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Mengikuti</div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-slate-100 mb-6">
          <button 
            onClick={() => setActiveTab('recipes')} 
            className={`flex-1 pb-3 text-sm font-bold transition-all ${activeTab === 'recipes' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Resep Saya
          </button>
          <button 
            onClick={() => setActiveTab('saved')} 
            className={`flex-1 pb-3 text-sm font-bold transition-all ${activeTab === 'saved' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Disimpan
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-4 pb-6 animate-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'recipes' ? (
            <>
              {/* Existing Card with Aesthetic Touch */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group cursor-pointer relative">
                 <div className="h-40 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="p-3 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-8">
                   <h4 className="font-bold text-sm text-white line-clamp-1">Salad Buah Segar</h4>
                   <span className="text-[10px] text-slate-200">12 menit lalu</span>
                 </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group cursor-pointer relative">
                 <div className="h-40 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="p-3 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-8">
                   <h4 className="font-bold text-sm text-white line-clamp-1">Pizza Homemade</h4>
                   <span className="text-[10px] text-slate-200">2 hari lalu</span>
                 </div>
              </div>

              {/* Add New Button */}
              <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 h-40 cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
                  <Plus size={20} className="text-emerald-500" />
                </div>
                <span className="text-xs font-medium">Buat Resep</span>
              </div>
            </>
          ) : (
             <div className="col-span-2 text-center py-10">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                 <Bookmark size={24} className="text-slate-300" />
               </div>
               <p className="text-slate-500 text-sm">Belum ada resep yang disimpan.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 4. DETAIL & COOKING MODE ---

const RecipeDetail = ({ recipe, onBack }) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [cookingMode, setCookingMode] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // OVERLAY MODE MEMASAK
  if (cookingMode) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-[60] text-white flex flex-col animate-in fade-in duration-300">
        <div className="p-4 flex justify-between items-center">
          <button onClick={() => setCookingMode(false)} className="text-slate-400 hover:text-white p-2">
            <X size={24} />
          </button>
          <span className="font-bold text-emerald-400 uppercase tracking-widest text-xs">Mode Memasak</span>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
            Langkah {currentStep + 1} / {recipe.steps.length}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed transition-all duration-300">
            {recipe.steps[currentStep]}
          </h2>
        </div>

        <div className="p-8 pb-12 flex justify-between items-center">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className={`p-4 rounded-full border border-slate-600 transition-all ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:text-slate-900 active:scale-95'}`}
          >
            <ChevronLeft size={28} />
          </button>
          
          <div className="flex gap-2">
            {recipe.steps.map((_, idx) => (
              <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentStep ? 'bg-emerald-500 scale-125' : 'bg-slate-700'}`} />
            ))}
          </div>

          <button 
            disabled={currentStep === recipe.steps.length - 1}
            onClick={() => setCurrentStep(prev => prev + 1)}
            className={`p-4 rounded-full border border-slate-600 transition-all ${currentStep === recipe.steps.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:text-slate-900 active:scale-95'}`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    );
  }

  // TAMPILAN DETAIL NORMAL
  return (
    <div className="flex flex-col h-full bg-white relative z-50 animate-in slide-in-from-right duration-300">
      {/* Header Image */}
      <div className="relative h-72 md:h-80 shrink-0">
        <img src={recipe.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent opacity-60" />
        
        <button onClick={onBack} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-sm hover:bg-white/40 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-sm hover:bg-white/40 transition-colors">
          <Share2 size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white -mt-6 rounded-t-3xl relative px-6 pt-8 pb-24 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-slate-800 leading-tight w-3/4">{recipe.title}</h1>
          <div className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Flame size={12} /> {recipe.calories}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          </div>
          <span className="text-sm font-medium text-slate-600">{recipe.chef}</span>
          <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">{recipe.chefLevel}</span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
           <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
             <Clock size={20} className="text-emerald-600 mx-auto mb-1.5" />
             <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Waktu</div>
             <div className="font-bold text-slate-700">{recipe.time}</div>
           </div>
           <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
             <Users size={20} className="text-emerald-600 mx-auto mb-1.5" />
             <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Porsi</div>
             <div className="font-bold text-slate-700">2 Org</div>
           </div>
           <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
             <Award size={20} className="text-emerald-600 mx-auto mb-1.5" />
             <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Level</div>
             <div className="font-bold text-slate-700">{recipe.difficulty}</div>
           </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex border-b border-slate-100 mb-6">
          <button 
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${activeTab === 'ingredients' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Bahan
            {activeTab === 'ingredients' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('steps')}
            className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${activeTab === 'steps' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Langkah
            {activeTab === 'steps' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-t-full" />}
          </button>
        </div>

        {/* Content List */}
        <div className="space-y-3">
          {activeTab === 'ingredients' ? (
            <>
              <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-slate-800">Daftar Belanja</h3>
                 <span className="text-xs text-emerald-600 font-bold cursor-pointer hover:underline">Tandai semua</span>
              </div>
              {recipe.ingredients.map((ing, i) => (
                <div 
                  key={i} 
                  onClick={() => toggleCheck(`ing-${i}`)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    checkedItems[`ing-${i}`] 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                    checkedItems[`ing-${i}`] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                  }`}>
                    {checkedItems[`ing-${i}`] && <CheckCircle size={14} />}
                  </div>
                  <span className={`text-sm ${checkedItems[`ing-${i}`] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{ing}</span>
                </div>
              ))}
              <Button variant="ghost" className="mt-6 border-dashed border-2 border-slate-200"><ShoppingBag size={18} /> Simpan ke Daftar Belanja</Button>
            </>
          ) : (
            <>
               <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-slate-800">Cara Membuat</h3>
              </div>
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="shrink-0 w-8 h-8 bg-slate-100 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors rounded-full flex items-center justify-center text-sm font-bold text-slate-500 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pb-6 border-b border-slate-50 last:border-0 group-hover:text-slate-800 transition-colors">{step}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Floating Cooking Mode Button */}
      <div className="fixed bottom-0 w-full max-w-md p-4 bg-white border-t border-slate-100 z-50">
        <Button onClick={() => setCookingMode(true)} className="shadow-lg shadow-emerald-200 ring-2 ring-emerald-100 ring-offset-2">
          <Play fill="white" size={18} /> Mulai Masak Sekarang
        </Button>
      </div>
    </div>
  );
};

// --- 5. MAIN APP CONTROLLER ---

export default function App() {
  const [screen, setScreen] = useState('onboarding'); // onboarding, auth, preferences, main
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Routing sederhana berdasarkan state
  const renderScreen = () => {
    // Jika ada resep dipilih, tampilkan detail overlay
    if (selectedRecipe) {
      return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
    }

    if (screen === 'onboarding') return <Onboarding onFinish={() => setScreen('auth')} />;
    
    if (screen === 'auth') {
      return (
        <div className="p-8 flex flex-col justify-center h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8 text-center">
             <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <ChefHat size={24} />
             </div>
             <h2 className="text-2xl font-bold text-slate-800">Selamat Datang!</h2>
             <p className="text-slate-500 text-sm mt-1">Masuk untuk melanjutkan memasak.</p>
          </div>
          
          <form className="space-y-2">
            <Input label="Email" placeholder="nama@email.com" />
            <Input label="Password" type="password" placeholder="******" />
            <div className="text-right text-xs text-emerald-600 font-bold cursor-pointer mb-4">Lupa Password?</div>
            
            <Button onClick={() => setScreen('preferences')} className="mb-4">Masuk</Button>
            
            <div className="relative my-6 text-center">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
               <span className="relative bg-white px-2 text-xs text-slate-400">Atau masuk dengan</span>
            </div>

            <Button variant="outline" onClick={() => setScreen('preferences')}>Google</Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            Belum punya akun? <span className="text-emerald-600 font-bold cursor-pointer" onClick={() => setScreen('preferences')}>Daftar Sekarang</span>
          </div>
        </div>
      );
    }

    if (screen === 'preferences') return <Preferences onFinish={() => setScreen('main')} />;

    // Main App with Bottom Navigation
    return (
      <>
        <div className="h-full bg-white overflow-y-auto scrollbar-hide">
          {activeTab === 'home' && <Feed onRecipeClick={setSelectedRecipe} />}
          {activeTab === 'explore' && <Explore />}
          {activeTab === 'create' && <CreateRecipe />}
          {activeTab === 'shopping' && <ShoppingList />}
          {activeTab === 'profile' && <Profile />}
        </div>
        <BottomNav currentTab={activeTab} setTab={setActiveTab} />
      </>
    );
  };

  return (
    <div className="flex justify-center bg-gray-100 h-screen w-full font-sans antialiased text-slate-800">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-white h-full relative shadow-2xl overflow-hidden flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
}