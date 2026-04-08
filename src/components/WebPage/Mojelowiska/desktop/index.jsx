import NavBar from "../../NavBar/desktop";
import { Link } from 'react-router-dom';
import LowiskoCard from "../../LowiskoCard";

const MojeLowiskaDesktop = ({isLoading, favoriteLowiska, okregi}) => {
    return (
        <>
        <NavBar />
        <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 py-12 text-left">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-primary m-0 uppercase">Ulubione Łowiska</h1>
            <p className="text-on-surface-variant text-lg mt-2">Twoja osobista lista miejsc nad wodą.</p>
          </header>
          {isLoading ? (
            <div className="grid grid-cols-3 gap-8">{[1, 2, 3].map(i => <div key={i} className="h-80 bg-white dark:bg-slate-900 rounded-3xl animate-pulse" />)}</div>
          ) : favoriteLowiska.length === 0 ? (
            <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-outline-variant">
              <span className="material-symbols-outlined text-8xl text-slate-200 mb-6">sailing</span>
              <h2 className="text-2xl font-bold">Brak ulubionych</h2>
              <Link to="/mapy" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl no-underline mt-8">Otwórz Mapę</Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">{favoriteLowiska.map(l => <LowiskoCard key={l._id} lowisko={l} okregiList={okregi} />)}</div>
          )}
        </main>
        </>
    )
}
export default MojeLowiskaDesktop;