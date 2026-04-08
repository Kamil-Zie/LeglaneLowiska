import Mapbox from "../MapContainer";
import LowiskoCard from "../../LowiskoCard";
import LowiskoCardSkeleton from "../LowiskoCardSkeleton";
import MapSkeleton from "../MapSkeleton";
import SearchField from "../SearchField";
import NavBar from "../../NavBar/desktop";

const MapyDesktop = ({okregi, lowiska, isLoading, searchLowiska,searchQuery,setSearchQuery}) => {
    return (
        <>
        <NavBar />
        <main className="flex-grow flex h-full overflow-hidden">
          <aside className="w-96 lg:w-[420px] bg-surface-container-low border-0 border-r border-solid border-outline-variant flex flex-col z-20 shadow-xl">
            <div className="p-8 border-0 border-b border-solid border-outline-variant bg-surface dark:bg-slate-900 transition-colors">
              <h1 className="text-3xl font-black text-primary dark:text-sky-400 tracking-tighter mb-6 m-0 uppercase">Mapa Łowisk</h1>
              <div className="space-y-4 text-left">
                <SearchField value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onSearch={searchLowiska} />
                <button onClick={searchLowiska} className="w-full bg-primary text-white py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] border-none cursor-pointer shadow-lg">Szukaj</button>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar text-left">
              {isLoading ? Array.from({ length: 4 }).map((_, i) => <LowiskoCardSkeleton key={i} />) : lowiska.map(lowisko => <LowiskoCard key={lowisko._id} lowisko={lowisko} okregiList={okregi} isMapView={true} />)}
            </div>
          </aside>
          <section className="flex-grow relative overflow-hidden h-full">
            {isLoading ? <MapSkeleton /> : <Mapbox lowiska={lowiska} okregiList={okregi} />}
          </section>
        </main>
        </>
    )
}
export default MapyDesktop;