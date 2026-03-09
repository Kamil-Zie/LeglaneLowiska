import React from 'react';
import { Link } from 'react-router-dom';

const MojeLowiska = () => {
  // Przykładowe dane (później pobierzemy je z bazy MongoDB)
  const ulubione = [
    { id: 1, nazwa: "Zalew Zegrzyński", opis: "Najlepsze leszcze przy molo.", typ: "PZW" },
    { id: 2, nazwa: "Staw u Janusza", opis: "Komercyjne, ale biorą jak szalone.", typ: "Komercja" },
    { id: 3, nazwa: "Wisła - odcinek 402", opis: "Głęboki dół, szukaj sandacza.", typ: "PZW" },
  ];

  return (
    <nav className="navbar">
        <img src="logo.svg" alt="Logo" style={{ width: '60px', height: '60px', marginLeft: '20px',marginBottom:'20px'}} />
        <ul className="nav-links">
          
            <li>
                                  <Link to="/mapy" style={{ color: 'inherit', textDecoration: 'none' }}>
                                   Mapa
                                  </Link>
                                  </li>
                      
                                  <li>
                                  <Link to="/mojelowiska" style={{ color: 'inherit', textDecoration: 'none' }}>
                                   Moje łowiska
                                  </Link>
                                  </li>
                      
                                  <li>
                                  <Link to="/profil" style={{ color: 'inherit', textDecoration: 'none' }}>
                                   Profil
                                  </Link>
                                  </li>
            
                                  <li>
                                  <Link to="/Webpage" style={{ color: 'inherit', textDecoration: 'none' }}>
                                   Strona Główna
                                  </Link>
                                  </li>
        </ul>
      </nav>
  );
};

export default MojeLowiska;