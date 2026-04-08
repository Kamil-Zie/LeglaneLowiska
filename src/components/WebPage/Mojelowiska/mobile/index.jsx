import MobileHeader from "../../Header/mobile";
import MobileNav from "../../NavBar/mobile";
import LowiskoCard from "../../LowiskoCard";

const MojeLowiskaMobile = ({isLoading, favoriteLowiska, okregi}) => {
    return (
        <>
        <MobileHeader />
        <main className="flex-grow pt-20 px-4 space-y-6 max-w-2xl mx-auto w-full">
          {isLoading ? (
            <div className="space-y-4">{[1, 2].map(i => <div key={i} className="h-40 bg-white dark:bg-slate-900 rounded-2xl animate-pulse" />)}</div>
          ) : favoriteLowiska.length === 0 ? (
            <div className="py-20 text-center opacity-40"><span className="material-symbols-outlined text-6xl mb-4">sailing</span><p className="font-bold">Brak ulubionych łowisk.</p></div>
          ) : (
            <div className="space-y-4">{favoriteLowiska.map(l => <LowiskoCard key={l._id} lowisko={l} okregiList={okregi} />)}</div>
          )}
        </main>
        <MobileNav />
        </>
    )
}

export default MojeLowiskaMobile;