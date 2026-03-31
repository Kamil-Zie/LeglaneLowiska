import React from 'react';
import { Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FriendsPreview = ({ userData, isOwner }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-solid border-outline-variant dark:border-slate-800 p-8 shadow-sm mb-12 transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-primary dark:text-sky-400 tracking-tight m-0 uppercase">Znajomi ({userData?.friends?.length || 0})</h2>
          <p className="text-on-surface-variant dark:text-slate-400 text-sm m-0 font-medium">Twoja wędkarska sieć kontaktów</p>
        </div>
        {isOwner && (
          <button 
            onClick={() => navigate('/znajomi')}
            className="text-primary dark:text-sky-400 font-black text-xs uppercase tracking-widest flex items-center hover:underline bg-transparent border-none cursor-pointer"
          >
            Zarządzaj <span className="material-symbols-outlined text-xs ml-1">arrow_forward</span>
          </button>
        )}
      </div>
      
      {userData?.friends?.length === 0 ? (
        <div className="py-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-2">person_off</span>
          <p className="text-sm font-black text-slate-500 dark:text-slate-400 m-0 uppercase tracking-tighter">Brak znajomych</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
          {userData?.friends?.slice(0, 8).map((friend) => (
            <div 
              key={friend._id} 
              className="flex flex-col items-center gap-3 group cursor-pointer"
              onClick={() => navigate(`/profil/${friend._id}`)}
            >
              <Tooltip title={friend.nazwa || friend.imie}>
                <div className="relative">
                  <Avatar 
                    src={friend.zdjecie}
                    sx={{ 
                      width: 72, 
                      height: 72, 
                      bgcolor: 'primary.light',
                      border: '3px solid',
                      borderColor: 'background.paper',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s',
                      '&:hover': { transform: 'scale(1.1)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }
                    }}
                  >
                    {friend.nazwa ? friend.nazwa.charAt(0) : '?'}
                  </Avatar>
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-solid border-white dark:border-slate-900 rounded-full shadow-sm"></div>
                </div>
              </Tooltip>
              <span className="text-[10px] font-black text-on-surface dark:text-slate-300 truncate w-full text-center group-hover:text-primary dark:group-hover:text-sky-400 transition-colors uppercase tracking-tighter">
                {friend.nazwa || 'Wędkarz'}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FriendsPreview;
