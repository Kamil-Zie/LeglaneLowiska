import Navbar from './NavBar';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect, useMemo } from 'react';
import LowiskoCard from './LowiskoCard';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchField from './Mapy/SearchField';
import axios from '../../api/axios';
import MobileNav from './MobileNav';

const WebPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [suggestedLowiska, setSuggestedLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [latestCatches, setLatestCatches] = useState([]);

  const handleSearch = () => {
    localStorage.setItem('searchQuery', searchQuery);
    navigate('/mapy');
  };

  useEffect(() => {
    const allLowiska = JSON.parse(localStorage.getItem('lowiska')) || [];
    const allOkregi = JSON.parse(localStorage.getItem('okregi')) || [];
    setOkregi(allOkregi);

    if (allLowiska.length > 0) {
      const nonFavorites = allLowiska.filter(l => !user?.ulubioneLowiska?.includes(l._id));
      const shuffled = [...nonFavorites].sort(() => 0.5 - Math.random());
      setSuggestedLowiska(shuffled.slice(0, 4));
    }
  }, [user]);

  const quickActions = useMemo(() => [
    { label: 'Moje Licencje', icon: 'license', color: 'bg-primary-fixed text-on-primary-fixed', link: '/mojelowiska' },
    { label: 'Dodaj Połów', icon: 'add_circle', color: 'bg-secondary-container text-on-secondary-container', link: '/portal' },
    { label: 'Mapa Łowisk', icon: 'map', color: 'bg-tertiary-fixed text-on-tertiary-fixed', link: '/mapy' },
    { label: 'Regulaminy', icon: 'gavel', color: 'bg-surface-container-highest text-on-surface-variant', link: '/webpage' }
  ], []);

  const getPosts = async () =>{
    var result = await axios.get(`/portal/posts`);
    var data = result.data;
    data = data["posts"].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5);
    if(data.length > 0) setLatestCatches(data);
  };
  useEffect(()=>{ getPosts(); }, []);

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen transition-colors duration-300">
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 py-8">
          <header className="relative mb-12 rounded-[2rem] overflow-hidden h-96 flex items-center bg-gradient-to-r from-primary to-tertiary-container shadow-2xl">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay"><img alt="Mist" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO25H3bajRv_yM8H_8vA0WctgcYbR95cuQ7t2RiVtyzWQ0_dZCPXxGGT7PJ5_LVfQCHnI8sH1gPJ31qbrfkjSod601DaLxxLcNb-cfE5vfAjg-4NNJSMXNlo84zIRtzEP2XlGP1ObNoZA8R_3zx40f2To_uiSE5IxvPdGpd7oRmp_HtP0UwcXoHr8kwQJaOYZa7fl7cqQbM_alDFTTBR3LXNVqsDOOlyhcZcxdMuYJuE-qB5GexkR5jlbGaU-B7PKESzFPgLB3dXVr" /></div>
            <div className="relative z-10 px-12 max-w-3xl text-white">
              <h1 className="text-6xl font-black tracking-tighter mb-4 leading-none">Witaj nad wodą, <span className="text-secondary-container">{user?.imie || 'wędkarzu'}</span>!</h1>
              <p className="text-primary-fixed text-xl mb-8 font-medium max-w-xl opacity-90">Sprawdź najnowsze brania i odkryj najlepsze łowiska.</p>
              <div className="mb-8 max-w-md"><SearchField value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onSearch={handleSearch} /></div>
              <div className="flex gap-4">
                <Link to="/kup-licencje"><button className="bg-secondary text-on-secondary px-8 py-4 rounded-2xl font-black shadow-xl border-none cursor-pointer uppercase tracking-widest text-xs">Kup Licencję</button></Link>
                <Link to="/mapy"><button className="bg-white/10 backdrop-blur-xl text-white border border-solid border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all cursor-pointer uppercase tracking-widest text-xs">Mapa Łowisk</button></Link>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-4 gap-6 mb-16">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.link} className="no-underline group">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-solid border-outline-variant shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-[1.25rem] ${action.color} flex items-center justify-center`}><span className="material-symbols-outlined text-4xl">{action.icon}</span></div>
                  <span className="font-black text-on-surface dark:text-slate-200">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-8 space-y-16 text-left">
              <section>
                <div className="flex justify-between items-end mb-8">
                  <div><h2 className="text-3xl font-black text-primary dark:text-sky-400 m-0">Ostatnie połowy</h2><p className="text-on-surface-variant dark:text-slate-400 text-sm m-0 mt-1">Najnowsze wpisy społeczności</p></div>
                  <Link to="/portal" className="text-primary dark:text-sky-400 font-black text-xs uppercase tracking-widest flex items-center gap-1">Zobacz wszystkie <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                </div>
                <div className="flex overflow-x-auto pb-6 gap-8 no-scrollbar -mx-2 px-2">
                  {latestCatches.map((catchItem, i) => (
                    <div key={i} className="min-w-[320px] bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-solid border-outline-variant shadow-sm hover:shadow-2xl transition-all group">
                      <div className="h-56 relative overflow-hidden">
                        {catchItem?.zdjecie ? <img alt={catchItem.ryba} className="w-full h-full object-cover transition-transform group-hover:scale-110" src={catchItem?.zdjecie} /> : <div className="w-full h-full bg-slate-100 flex items-center justify-center"><span className="material-symbols-outlined text-7xl text-slate-300">image</span></div>}
                        <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg">{catchItem?.ryba}</div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-black border-2 border-solid border-white">{catchItem.uzytkownik.nazwa[0]}</div>
                          <span className="text-sm font-black text-on-surface dark:text-slate-200 uppercase tracking-tighter">{catchItem.uzytkownik.nazwa}</span>
                        </div>
                        <h3 className="text-lg font-black text-on-surface dark:text-slate-100 m-0 leading-tight">{catchItem?.title}</h3>
                        <p className="text-xs text-on-surface-variant dark:text-slate-400 m-0 mb-6 font-medium line-clamp-2">{catchItem?.opis}</p>
                        <div className="flex items-center justify-between border-0 border-t border-solid border-slate-100 pt-4">
                          <div className="flex items-center gap-4"><button className="flex items-center gap-1.5 text-xs font-black text-slate-400 bg-transparent border-none cursor-pointer"><span className="material-symbols-outlined text-lg">favorite</span> {catchItem?.polubienia.length || 0}</button><button className="flex items-center gap-1.5 text-xs font-black text-slate-400 bg-transparent border-none cursor-pointer"><span className="material-symbols-outlined text-lg">chat_bubble</span> {catchItem?.komentarze.length || 0}</button></div>
                          <span className="text-[10px] text-outline font-bold uppercase">{new Date(catchItem?.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <aside className="col-span-4 space-y-12">
              <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-solid border-outline-variant p-8 shadow-sm">
                <h3 className="text-xl font-black text-primary dark:text-sky-400 mb-8 uppercase tracking-tighter m-0">Sugestie łowisk</h3>
                <div className="space-y-6">
                  {suggestedLowiska.length > 0 ? suggestedLowiska.map((lowisko) => <LowiskoCard key={lowisko._id} lowisko={lowisko} okregiList={okregi} />) : <p className="text-sm italic">Brak nowych sugestii.</p>}
                </div>
                <Link to="/mapy"><button className="w-full mt-10 py-4 bg-surface-container dark:bg-slate-800 text-primary dark:text-sky-400 font-black rounded-2xl border-none cursor-pointer uppercase text-xs tracking-widest">Otwórz mapę</button></Link>
              </section>
            </aside>
          </div>
        </main>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24 text-left">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center px-4 h-16 max-w-2xl mx-auto">
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sky-700">anchor</span><h1 className="text-xl font-black text-sky-800 dark:text-sky-300 m-0">Wędkarz Portal</h1></div>
            <Link to="/profil"><div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>person</span></div></Link>
          </div>
        </header>
        <main className="flex-grow pt-20 px-4 space-y-8 max-w-2xl mx-auto w-full">
          <section>
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-sky-700 m-0">Ostatnie połowy</h2><Link to="/portal" className="text-sm font-semibold text-primary underline">Wszystkie</Link></div>
            <div className="flex overflow-x-auto gap-4 hide-scrollbar snap-x snap-mandatory -mx-4 px-4">
              {latestCatches.map((catchItem, i) => (
                <div key={i} className="flex-none w-72 snap-center">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md bg-slate-100 dark:bg-slate-800">
                    {catchItem.zdjecie ? <img alt={catchItem.ryba} className="w-full h-full object-cover" src={catchItem.zdjecie} /> : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-slate-400 text-6xl">image</span></div>}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"><p className="text-white font-bold text-lg m-0">{catchItem.ryba}</p><p className="text-white/80 text-xs m-0">{catchItem.uzytkownik.nazwa} • {new Date(catchItem.createdAt).toLocaleDateString()}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section><div className="grid grid-cols-2 gap-4"><Link to="/kup-licencje" className="no-underline"><button className="w-full flex flex-col items-center justify-center bg-primary-container text-white p-6 rounded-2xl shadow-lg border-none cursor-pointer"><span className="material-symbols-outlined text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>description</span><span className="text-sm font-bold text-center leading-tight">Kup licencję</span></button></Link><Link to="/portal" className="no-underline"><button className="w-full flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-sky-700 p-6 rounded-2xl shadow-sm border border-solid border-slate-100 active:scale-95 transition-transform cursor-pointer"><span className="material-symbols-outlined text-4xl mb-2 text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span><span className="text-sm font-bold text-center leading-tight">Dodaj okaz</span></button></Link></div></section>
          <section><div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-sky-700 m-0">Sugestie łowisk</h2><div className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-xs font-bold">Blisko Ciebie</div></div><div className="grid gap-4">{suggestedLowiska.map((lowisko) => <Link key={lowisko._id} to="/mapy" className="no-underline"><div className="bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-solid border-slate-50 flex gap-4"><div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><span className="material-symbols-outlined text-slate-400 text-3xl">water</span></div><div className="flex flex-col justify-center flex-grow"><h3 className="font-bold text-sky-800 dark:text-sky-300 m-0">{lowisko.nazwa}</h3><p className="text-xs text-slate-500 m-0">{lowisko.miasto}</p></div><div className="flex items-center"><span className="material-symbols-outlined text-slate-300">chevron_right</span></div></div></Link>)}</div></section>
        </main>
        <MobileNav />
      </div>
    </div>
  );
};

export default WebPage;
