import Navbar from '../NavBar/navbar'; 
import { useEffect, useState} from 'react';
import axios from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';
import '../WebPage.css';
import { Button } from '@mui/material';
import './mapy.css';
import Mapbox from './MapContainer/MapContainer';
import SearchField from './SearchField';
import LowiskoCard from './LowiskoCard';

const Mapa = () => {
  const [lowiska, setLowiska] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {user} = useAuth();

  

  const searchLowiska = () => {
    const query = localStorage.getItem("searchQuery") || '';
    const filteredLowiska = JSON.parse(localStorage.getItem('lowiska')).filter(lowisko => lowisko.miasto.toLowerCase().includes(query.toLowerCase()));
    setLowiska(filteredLowiska);
  }

  useEffect(()=>{
    setLowiska(JSON.parse(localStorage.getItem('lowiska')));
  },[])
  
  return (
    <div className="web-page-container">
      <Navbar />
      <div className="map-layout">
        <aside className="map-sidebar">
          <div className="search-group">
            <div className='search'>
            <h3 >Znajdź łowisko</h3>
            </div>
            <div style={{ width: '1920px', height: '5px' }}></div>
              <SearchField />
               <div className="search-box-button">
               <Button variant="outlined" allaign="center" onClick={()=>{searchLowiska()}} >Szukaj</Button>
            </div>
            <div style={{ width: '1920px', height: '20px' }}></div>
          </div>
          <div className="results-list" style={{overflowY: 'auto', maxHeight: '400px', display: 'flex', flexDirection: 'row', gap: '10px'}}>
            {
                lowiska?.map(lowisko => (
                  <LowiskoCard key={lowisko._id} lowisko={lowisko}/>
                ))
            }
          </div>
        </aside>
          <Mapbox lowiska={lowiska}/>
      </div>
      </div>
    
  );
};

export default Mapa;