import Navbar from '../NavBar/navbar';
import './mojelowiska.css';
import { useAuth } from '../../../context/AuthContext';
const MojeLowiska = () => {
  const { user } = useAuth();
   const lowiska = JSON.parse(localStorage.getItem('lowiska')).filter(lowisko => user.ulubioneLowiska.includes(lowisko._id));
  return (
    <>
  
    <Navbar />
      <div className="lowiska-container">
        <h2 className="section-title">Moje ulubione łowiska</h2>
        <div className="lowiska-grid">
          {lowiska.map((item) => (
            <div key={item.id} className="lowisko-card">
              <h3>{item.nazwa}</h3>
              <p className="wojewodztwo">{item.woj}</p>
              <p className="opis">{item.opis}</p>
              <div className="card-footer">
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  
 
  );
};

// 2. Export zawsze NA DOLE
export default MojeLowiska;