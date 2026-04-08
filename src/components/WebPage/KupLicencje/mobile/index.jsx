import MobileHeader from "../../Header/mobile";
import MobileNav from "../../NavBar/mobile";
import LicencjaCard from "../LicencjaCard";
import LicencjaSkeleton from "../LicencjaSkeleton";

const KupLicencjeMobile = ({searchTerm, setSearchQuery, okregi, isLoading, filtered, handleBuy, setFilterType, filterType}) => {
    return (
        <>
        <MobileHeader />
        <main className="flex-grow pt-20 px-4 space-y-8 max-w-2xl mx-auto w-full">
          <div className="flex flex-row">
            <span className="material-symbols-outlined  py-4 text-outline">search</span>
            <input className="w-full bg-white dark:bg-slate-800 py-4 border-2 border-outline-variant rounded-xl   pr-4" placeholder="Wyszukaj..." type="text" value={searchTerm} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <button onClick={() => setFilterType('all')} className={`px-4 py-2 rounded-full font-bold border-none transition-all duration-200 ${filterType === 'all' ? 'bg-primary text-white' : 'bg-slate-100'}`}>Wszystkie</button>
            <button onClick={() => setFilterType('pzw')} className={`px-4 py-2 rounded-full font-bold border-none transition-all duration-200 ${filterType === 'pzw' ? 'bg-primary text-white' : 'bg-slate-100'}`}>PZW</button>
          </div>
          <div className="space-y-6">
            {isLoading ? Array.from({ length: 3 }).map((_, i) => <LicencjaSkeleton key={i} />) : filtered.map(lic => <LicencjaCard key={lic._id} lic={lic} okreg={okregi.find(o => o._id === (lic.idOkregu || lic.idOkreguPZW))} onBuy={handleBuy} />)}
          </div>
        </main>
        <MobileNav />
        </>
    )
}
export default KupLicencjeMobile;