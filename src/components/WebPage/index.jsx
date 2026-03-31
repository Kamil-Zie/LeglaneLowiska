import Navbar from './NavBar';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect, useMemo } from 'react';
import LowiskoCard from './LowiskoCard';
import { Link, useNavigate } from 'react-router-dom';
import SearchField from './Mapy/SearchField';

const WebPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [suggestedLowiska, setSuggestedLowiska] = useState([]);
  const [okregi, setOkregi] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    localStorage.setItem('searchQuery', searchQuery);
    navigate('/mapy');
  };

  useEffect(() => {
    const allLowiska = JSON.parse(localStorage.getItem('lowiska')) || [];
    const allOkregi = JSON.parse(localStorage.getItem('okregi')) || [];
    setOkregi(allOkregi);

    if (allLowiska.length > 0) {
      // Filter out favorites
      const nonFavorites = allLowiska.filter(l => !user?.ulubioneLowiska?.includes(l._id));
      
      // Shuffle and pick 3-4 for sidebar (to match sample layout)
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

  const latestCatches = useMemo(() => [
    { user: 'Marek W.', fish: 'Szczupak', title: 'Życiowy rekord na Zalewie', desc: 'Waga: 8.5kg • Przynęta: Spinner', likes: 124, comments: 12, time: '2h temu', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIRBmaF1KM6MjBbYYbCEASS9UDb8m1OSpWOuwMt-fm3DgV2VZH_xN6ZfFCvCj-jXz-ELpQJu_NVUK6_XwHRX2NAJT4ffdTwi6ebZzgFeIxxOYWzUZ26kZmnrvd-gT96KBe44-3dUg0MP9hnb_mwKbDY2moJCdpgsH7jzmFGsUyF0HS9_bdEPfDF8CXaGzyTpMa-XrJuHXi2Poffzth5O71NkXAhI-q-oaXCeaJiS--Lx0V2EdS5-2FXfGBRZ8ogrr8Ep2E86GnDoDb' },
    { user: 'Anna Ryba', fish: 'Karp', title: 'Nocne zasiadki dają efekty', desc: 'Waga: 12.2kg • Przynęta: Kulki proteinowe', likes: 89, comments: 5, time: '5h temu', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClnndrtvFOexvioaAvKsN8YilmwhV6bgyQbgk-cTUOjphdbyG_vf7Y3Ow4tS0FK30w5wpW9y2J-GrUc6riwqPjm-b-dThfr9zdzxIYebqIB7v9lR6GLt8BjHj6uHqLn8M-DdIpY3_bwLshvy-WyDSRqc-QOV7f1fQo0oepwDf4eBfoVXVnK91mtycfC3YG84QKE-8tUsFtdgyKU5IgJZkJimgcHMeV-kCq8dfEckgRLVZsdfS5pYk9kpjecYjT3MBu6aeETnx0JTos' },
  ], []);

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <header className="relative mb-12 rounded-[2rem] overflow-hidden h-64 md:h-96 flex items-center bg-gradient-to-r from-primary to-tertiary-container shadow-2xl">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img 
              alt="Mist over a calm lake at sunrise" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO25H3bajRv_yM8H_8vA0WctgcYbR95cuQ7t2RiVtyzWQ0_dZCPXxGGT7PJ5_LVfQCHnI8sH1gPJ31qbrfkjSod601DaLxxLcNb-cfE5vfAjg-4NNJSMXNlo84zIRtzEP2XlGP1ObNoZA8R_3zx40f2To_uiSE5IxvPdGpd7oRmp_HtP0UwcXoHr8kwQJaOYZa7fl7cqQbM_alDFTTBR3LXNVqsDOOlyhcZcxdMuYJuE-qB5GexkR5jlbGaU-B7PKESzFPgLB3dXVr"
            />
          </div>
          <div className="relative z-10 px-12 max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
              Witaj nad wodą, <span className="text-secondary-container underline decoration-sky-400/30">{user?.imie || 'wędkarzu'}</span>!
            </h1>
            <p className="text-primary-fixed text-xl mb-8 font-medium max-w-xl opacity-90">
              Sprawdź najnowsze brania, odnów licencję i odkryj najlepsze łowiska w Twojej okolicy.
            </p>
            <div className="mb-8 max-w-md">
              <SearchField 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                onSearch={handleSearch} 
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/kup-licencje" className="no-underline">
                <button className="bg-secondary text-on-secondary px-8 py-4 rounded-2xl font-black shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 border-none cursor-pointer uppercase tracking-widest text-xs">
                  <span className="material-symbols-outlined">payments</span>
                  Kup Licencję
                </button>
              </Link>
              <Link to="/mapy" className="no-underline">
                <button className="bg-white/10 backdrop-blur-xl text-white border border-solid border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all cursor-pointer uppercase tracking-widest text-xs">
                  Mapa Łowisk
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Quick Action Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.link} className="no-underline group">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 rounded-[1.25rem] ${action.color} flex items-center justify-center shadow-inner transform group-hover:rotate-6 transition-transform`}>
                  <span className="material-symbols-outlined text-4xl">{action.icon}</span>
                </div>
                <span className="font-black text-on-surface dark:text-slate-200 tracking-tight">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Central Feed (8/12) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Ostatnie Połowy */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-black text-primary dark:text-sky-400 tracking-tight m-0">Ostatnie połowy</h2>
                  <p className="text-on-surface-variant dark:text-slate-400 text-sm m-0 mt-1">Złapane przez naszą społeczność w ostatnich 24h</p>
                </div>
                <Link to="/portal" className="text-primary dark:text-sky-400 font-black text-xs uppercase tracking-widest flex items-center hover:underline no-underline gap-1">
                  Zobacz wszystkie <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="flex overflow-x-auto pb-6 gap-8 no-scrollbar -mx-2 px-2">
                {latestCatches.map((catchItem, i) => (
                  <div key={i} className="min-w-[320px] bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-solid border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all group">
                    <div className="h-56 relative overflow-hidden">
                      <img alt={catchItem.fish} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={catchItem.img} />
                      <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg">{catchItem.fish}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-solid border-white dark:border-slate-700 shadow-md flex items-center justify-center text-primary font-black">
                          {catchItem.user[0]}
                        </div>
                        <span className="text-sm font-black text-on-surface dark:text-slate-200 uppercase tracking-tighter">{catchItem.user}</span>
                      </div>
                      <h3 className="text-lg font-black text-on-surface dark:text-slate-100 line-clamp-1 m-0 mb-1 leading-tight">{catchItem.title}</h3>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400 m-0 mb-6 font-medium">{catchItem.desc}</p>
                      <div className="flex items-center justify-between border-0 border-t border-solid border-slate-100 dark:border-slate-800 pt-4">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1.5 text-xs font-black text-on-surface-variant dark:text-slate-400 hover:text-error transition-colors bg-transparent border-none cursor-pointer">
                            <span className="material-symbols-outlined text-lg">favorite</span> {catchItem.likes}
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-black text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
                            <span className="material-symbols-outlined text-lg">chat_bubble</span> {catchItem.comments}
                          </button>
                        </div>
                        <span className="text-[10px] text-outline dark:text-slate-500 font-bold uppercase">{catchItem.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Rekomendacje */}
            <section>
              <h2 className="text-3xl font-black text-primary dark:text-sky-400 tracking-tight mb-8 m-0">Rekomendacje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-primary-container/10 dark:bg-primary-container/5 p-8 rounded-[2rem] border border-solid border-primary-container/20 dark:border-primary-container/10 flex gap-6">
                  <div className="w-20 h-20 shrink-0 bg-primary rounded-2xl flex flex-col items-center justify-center text-white font-black shadow-lg">
                    <span className="text-[10px] uppercase opacity-80 leading-none mb-1">Maj</span>
                    <span className="text-3xl leading-none">24</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-primary dark:text-sky-400 uppercase tracking-[0.2em] block mb-2">Wydarzenie</span>
                    <h4 className="text-xl font-black text-on-surface dark:text-slate-100 mb-2 m-0 leading-tight">Zawody spinningowe "Złoty Okoń"</h4>
                    <p className="text-sm text-on-surface-variant dark:text-slate-400 mb-6 line-clamp-2 m-0 leading-relaxed font-medium">Dołącz do corocznych zawodów nad Jeziorem Czarnym. Atrakcyjne nagrody i integracja.</p>
                    <button className="text-primary dark:text-sky-400 font-black text-xs uppercase tracking-widest border-0 border-b-2 border-solid border-primary/20 hover:border-primary transition-all bg-transparent cursor-pointer pb-1">Zapisz się</button>
                  </div>
                </div>
                <div className="bg-secondary-container/10 dark:bg-secondary-container/5 p-8 rounded-[2rem] border border-solid border-secondary-container/20 dark:border-secondary-container/10 flex gap-6">
                  <div className="w-20 h-20 shrink-0 bg-secondary rounded-2xl flex items-center justify-center text-white font-black shadow-lg">
                    <span className="material-symbols-outlined text-4xl">lightbulb</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-secondary dark:text-teal-400 uppercase tracking-[0.2em] block mb-2">Porada</span>
                    <h4 className="text-xl font-black text-on-surface dark:text-slate-100 mb-2 m-0 leading-tight">Jak łowić w majowe deszcze?</h4>
                    <p className="text-sm text-on-surface-variant dark:text-slate-400 mb-6 line-clamp-2 m-0 leading-relaxed font-medium">Dowiedz się, jakie przynęty najlepiej sprawdzają się przy gwałtownej zmianie ciśnienia.</p>
                    <button className="text-secondary dark:text-teal-400 font-black text-xs uppercase tracking-widest border-0 border-b-2 border-solid border-secondary/20 hover:border-secondary transition-all bg-transparent cursor-pointer pb-1">Czytaj więcej</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Ostatnie Wydarzenia */}
            <section>
              <h2 className="text-3xl font-black text-primary dark:text-sky-400 tracking-tight mb-8 m-0">Ostatnie wydarzenia</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[480px]">
                <div className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
                  <img alt="Fishermen gathering" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLHtujdT2l5AI_hc-GG3trIcYenElJoo3U4I12JhEuXIgoDcd3MAEHIw8b1a_kSOTGMZkYIYKqq4JH0BggaUm8cAShGhbahBxACZs0FiMfA89lH9k2sjWKFv-gya2P9b-Bfbl73MQhXEtmDQyHAYJMGhJW0ENlTITiJhYyhb3TrOnZd9YKDOrLkbqTaJyXwVBjh7W3Nh8Qn0RkvG0NOycK5FhSehmRJyuSOYb7JVy8mqzVV7T14jW25HJlwIh-1d7PU5RHkXRIkN9D" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                    <span className="text-sky-300 font-black text-[10px] uppercase tracking-[0.3em] mb-3">Relacja Społeczności</span>
                    <h3 className="text-white text-3xl md:text-4xl font-black mb-4 m-0 leading-tight tracking-tighter">Relacja z otwarcia sezonu na Odrze</h3>
                    <p className="text-white/70 text-base line-clamp-2 m-0 leading-relaxed max-w-xl font-medium">Setki wędkarzy pojawiły się na brzegu Odry, by wspólnie świętować rozpoczęcie nowego sezonu. Zobacz fotorelację!</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
                  <div>
                    <span className="material-symbols-outlined text-primary dark:text-sky-400 text-3xl mb-4">new_releases</span>
                    <h4 className="text-lg font-black text-on-surface dark:text-slate-100 m-0 leading-tight">Nowe przepisy 2026</h4>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2 m-0 leading-relaxed font-medium">Sprawdź zmiany w wymiarach ochronnych ryb na ten sezon.</p>
                  </div>
                  <button className="text-primary dark:text-sky-400 text-[10px] font-black uppercase tracking-widest flex items-center mt-6 bg-transparent border-none cursor-pointer hover:underline">Sprawdź <span className="material-symbols-outlined text-sm ml-1">open_in_new</span></button>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-solid border-outline-variant dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
                  <div>
                    <span className="material-symbols-outlined text-secondary dark:text-teal-400 text-3xl mb-4">science</span>
                    <h4 className="text-lg font-black text-on-surface dark:text-slate-100 m-0 leading-tight">Zarybianie jezior</h4>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2 m-0 leading-relaxed font-medium">Ponad 50 tysięcy sztuk narybku trafiło do lokalnych wód.</p>
                  </div>
                  <button className="text-secondary dark:text-teal-400 text-[10px] font-black uppercase tracking-widest flex items-center mt-6 bg-transparent border-none cursor-pointer hover:underline">Szczegóły <span className="material-symbols-outlined text-sm ml-1">open_in_new</span></button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar (4/12) */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Sugestie Łowisk */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-solid border-outline-variant dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-xl font-black text-primary dark:text-sky-400 mb-8 flex items-center gap-3 m-0 uppercase tracking-tighter">
                <span className="material-symbols-outlined">explore</span>
                Sugestie łowisk
              </h3>
              <div className="space-y-6">
                {suggestedLowiska.length > 0 ? (
                  suggestedLowiska.map((lowisko) => (
                    <div key={lowisko._id} className="group cursor-pointer">
                        <LowiskoCard lowisko={lowisko} okregiList={okregi} />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-on-surface-variant dark:text-slate-500 italic m-0">Brak nowych sugestii w tej chwili.</p>
                )}
              </div>
              <Link to="/mapy" className="no-underline">
                <button className="w-full mt-10 py-4 bg-surface-container dark:bg-slate-800 text-primary dark:text-sky-400 font-black rounded-2xl hover:bg-primary hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950 transition-all text-xs uppercase tracking-[0.2em] border-none cursor-pointer">
                  Otwórz mapę łowisk
                </button>
              </Link>
            </section>

            {/* Weather Card */}
            <section className="bg-gradient-to-br from-sky-500 to-sky-800 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-6 m-0">Pogoda wędkarska</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-5xl font-black tracking-tighter">18°C</span>
                    <p className="text-sm font-bold m-0 opacity-90 mt-1 uppercase tracking-widest">Lekkie zachmurzenie</p>
                  </div>
                  <span className="material-symbols-outlined text-7xl opacity-30">cloud</span>
                </div>
                <div className="mt-8 pt-8 border-0 border-t border-solid border-white/10 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 m-0 mb-1">Wiatr</p>
                    <p className="font-black text-sm m-0">8 km/h NW</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 m-0 mb-1">Ciśnienie</p>
                    <p className="font-black text-sm m-0">1012 hPa</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center gap-4 border border-solid border-white/10">
                  <span className="material-symbols-outlined text-yellow-300 text-3xl">tsunami</span>
                  <span className="text-xs font-black leading-tight uppercase tracking-tighter">Świetne warunki na brania drapieżnika!</span>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </section>

            {/* Ranking */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-solid border-outline-variant dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-xl font-black text-primary dark:text-sky-400 mb-8 flex items-center gap-3 m-0 uppercase tracking-tighter">
                <span className="material-symbols-outlined">military_tech</span>
                Ranking Maja
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Janusz K.', pts: '2.450 pkt', pos: 1 },
                  { name: 'Robert S.', pts: '2.120 pkt', pos: 2 },
                  { name: 'Tomasz P.', pts: '1.980 pkt', pos: 3 }
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <span className="font-black text-slate-300 dark:text-slate-700 w-4 text-xl group-hover:text-primary transition-colors">{user.pos}</span>
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border-2 border-solid border-white dark:border-slate-700 shadow-sm">
                        <span className="material-symbols-outlined text-slate-400">account_circle</span>
                      </div>
                      <span className="text-sm font-black text-on-surface dark:text-slate-200 tracking-tight">{user.name}</span>
                    </div>
                    <span className="text-xs font-black text-primary dark:text-sky-400 uppercase tracking-widest">{user.pts}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900/50 text-sm font-medium w-full mt-auto border-0 border-t border-solid border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full gap-8 max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="text-2xl font-black text-sky-800 dark:text-sky-400 tracking-tighter">Legalne Łowiska</div>
            <div className="text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 Wędkarz Portal. Wszystkie prawa zastrzeżone.</div>
          </div>
          <div className="flex gap-10">
            <Link to="#" className="text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all no-underline text-xs font-black uppercase tracking-widest">Regulamin</Link>
            <Link to="#" className="text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all no-underline text-xs font-black uppercase tracking-widest">Polityka</Link>
            <Link to="#" className="text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all no-underline text-xs font-black uppercase tracking-widest">Kontakt</Link>
            <Link to="#" className="text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all no-underline text-xs font-black uppercase tracking-widest">Pomoc</Link>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-slate-700 transition-all border-none cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
            <button className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-slate-700 transition-all border-none cursor-pointer shadow-sm">
              <span className="material-symbols-outlined text-xl">rss_feed</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebPage;
