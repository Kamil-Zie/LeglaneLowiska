import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserRow = ({ person, type, handleAcceptRequest, handleCancelRequest, handleSendRequest })=>{
    const navigate = useNavigate();
    return(
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex items-center gap-4 text-left">
        <Avatar src={person.zdjecie} sx={{ width: 48, height: 48, bgcolor: 'primary.main' }} onClick={() => navigate(`/profil/${person._id}`)} className="cursor-pointer">{person.nazwa[0]}</Avatar>
        <div>
          <h4 className="text-sm font-black m-0 cursor-pointer" onClick={() => navigate(`/profil/${person._id}`)}>{person.nazwa}</h4>
          <p className="text-[10px] text-outline uppercase m-0">{person.miasto || 'Wędkarz'}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {type === 'suggestion' && <button onClick={() => handleSendRequest(person._id)} className="px-4 py-2 bg-primary text-white text-[10px] font-black rounded-lg border-none cursor-pointer uppercase tracking-widest">Dodaj</button>}
        {type === 'request' && <button onClick={() => handleAcceptRequest(person._id)} className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center border-none cursor-pointer"><span className="material-symbols-outlined">check</span></button>}
        {type === 'sent' && <button onClick={() => handleCancelRequest(person._id)} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold rounded-lg border-none cursor-pointer uppercase">Anuluj</button>}
      </div>
    </div>
    )
}
export default UserRow;