import NavBar from "../../NavBar/desktop";
import LicencjaCard from "../LicencjaCard";
import LicencjaSkeleton from "../LicencjaSkeleton";

const KupLicencjeDesktop = ({searchTerm, setSearchQuery, filterOkreg, setFilterOkreg, okregi, isLoading, filtered, handleBuy}) => {
    return (
        <>
        <NavBar />
        <main className="flex-grow">
          <section className="bg-surface-container-low dark:bg-slate-900 py-16 px-6">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="text-5xl font-black text-primary uppercase m-0">Kup Licencję</h1>
              <div className="mt-8 flex gap-3">
                <input className="flex-grow p-4 rounded-xl border-none shadow-lg" placeholder="Szukaj..." value={searchTerm} onChange={e => setSearchQuery(e.target.value)} />
                <select className="p-4 rounded-xl border-none shadow-lg" value={filterOkreg} onChange={e => setFilterOkreg(e.target.value)}>
                  <option value="all">Wszystkie Okręgi</option>
                  {okregi.map(o => <option key={o._id} value={o._id}>{o.nazwa}</option>)}
                </select>
              </div>
            </div>
          </section>
          <section className="max-w-screen-2xl mx-auto px-6 py-20">
            <div className="grid grid-cols-3 gap-8">
              {isLoading ? Array.from({ length: 6 }).map((_, i) => <LicencjaSkeleton key={i} />) : filtered.map(lic => <LicencjaCard key={lic._id} lic={lic} okreg={okregi.find(o => o._id === (lic.idOkregu || lic.idOkreguPZW))} onBuy={handleBuy} />)}
            </div>
          </section>
        </main>
        </>
    )
}

export default KupLicencjeDesktop;