import NavBar from "../../NavBar/desktop";
import { FormControl, InputLabel, Select, MenuItem, TableCell, Avatar, TableRow, TableBody, TableHead, Paper, Table, TableContainer } from "@mui/material";
import { Link } from "react-router-dom";

const RakingDesktop = ({setSelectedFish, selectedFish, fishList, ranking, isLoading}) => {
    return (
        <>
            <NavBar />
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-12">
            <header className="mb-12 flex justify-between items-end">
                <div><h1 className="text-4xl font-black text-primary m-0 uppercase">Ranking</h1><p className="text-on-surface-variant mt-2 font-medium">Największe okazy z ostatniego roku.</p></div>
                <FormControl variant="filled" sx={{ minWidth: 200 }}><InputLabel>Gatunek</InputLabel><Select value={selectedFish} onChange={(e) => setSelectedFish(e.target.value)} className="bg-white dark:bg-slate-900 rounded-xl">{fishList.map(fish => <MenuItem key={fish} value={fish}>{fish}</MenuItem>)}</Select></FormControl>
            </header>
            {isLoading ? <div className="py-20 text-center">Wczytywanie...</div> : ranking.length === 0 ? <Paper className="p-20 text-center rounded-[2.5rem] border-2 border-dashed bg-white dark:bg-slate-900"><span className="material-symbols-outlined text-8xl text-slate-200 mb-6">military_tech</span><h2 className="text-2xl font-bold">Brak wyników</h2></Paper> : (
                <TableContainer component={Paper} className="rounded-[2.5rem] shadow-xl overflow-hidden bg-white dark:bg-slate-900"><Table><TableHead className="bg-primary/5 dark:bg-sky-900/20"><TableRow><TableCell className="font-black uppercase tracking-widest text-[10px]">Msc</TableCell><TableCell className="font-black uppercase tracking-widest text-[10px]">Wędkarz</TableCell><TableCell className="font-black uppercase tracking-widest text-[10px]">Rozmiar</TableCell><TableCell className="font-black uppercase tracking-widest text-[10px]">Miejsce</TableCell><TableCell className="font-black uppercase tracking-widest text-[10px]">Data</TableCell></TableRow></TableHead><TableBody>{ranking.map((row, index) => <TableRow key={row.user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><TableCell><div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${index === 0 ? 'bg-yellow-400 shadow-lg' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-orange-400' : 'bg-slate-100 dark:bg-slate-800'}`}>{index + 1}</div></TableCell><TableCell><Link to={`/profil/${row.user._id}`} className="flex items-center gap-4 no-underline text-inherit group"><Avatar src={row.user.zdjecie}>{row.user.nazwa[0]}</Avatar><span className="font-bold group-hover:text-primary transition-colors">{row.user.nazwa}</span></Link></TableCell><TableCell className="font-black text-xl text-primary">{row.rozmiar} cm</TableCell><TableCell className="font-medium">{row.miejsce}</TableCell><TableCell className="text-outline text-xs font-bold">{new Date(row.data).toLocaleDateString()}</TableCell></TableRow>)}</TableBody></Table></TableContainer>
            )}
            </main>
        </>
    );
}

export default RakingDesktop;