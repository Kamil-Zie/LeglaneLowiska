import { MenuItem, Avatar, Select, InputLabel, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import MobileNav from "../../NavBar/mobile";
import MobileHeader from "../../Header/mobile";

const RankingMobile = ({toggleColorMode, logout,ranking ,isLoading, selectedFish, setSelectedFish, fishList, mode}) => {
    return (
        <>
        <MobileHeader />
        <main className="flex-grow pt-20 px-4 space-y-6 max-w-2xl mx-auto w-full">
          <FormControl fullWidth variant="outlined" size="small"><InputLabel>Wybierz gatunek</InputLabel><Select value={selectedFish} onChange={(e) => setSelectedFish(e.target.value)} label="Wybierz gatunek" className="bg-white dark:bg-slate-900 rounded-xl">{fishList.map(fish => <MenuItem key={fish} value={fish}>{fish}</MenuItem>)}</Select></FormControl>
          <div className="space-y-4">
            {isLoading ? <p>Wczytywanie...</p> : ranking.length === 0 ? <div className="text-center py-10 opacity-40"><span className="material-symbols-outlined text-6xl">military_tech</span><p className="font-bold">Brak wyników</p></div> : ranking.map((row, index) => (
              <div key={row.user._id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-solid border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-orange-400' : 'bg-slate-100 dark:bg-slate-800'}`}>{index + 1}</div>
                  <Link to={`/profil/${row.user._id}`} className="flex items-center gap-3 no-underline text-inherit"><Avatar src={row.user.zdjecie} sx={{ width: 32, height: 32 }}>{row.user.nazwa[0]}</Avatar><div><p className="text-sm font-bold m-0">{row.user.nazwa}</p><p className="text-[10px] text-slate-400 m-0">{row.miejsce}</p></div></Link>
                </div>
                <div className="text-right"><p className="text-lg font-black text-primary m-0">{row.rozmiar} cm</p><p className="text-[10px] text-slate-400 m-0">{new Date(row.data).toLocaleDateString()}</p></div>
              </div>
            ))}
          </div>
        </main>
        <MobileNav />
        </>
    );
}
export default RankingMobile;