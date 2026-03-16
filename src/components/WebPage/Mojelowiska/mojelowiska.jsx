import React from 'react';
import Navbar from '../NavBar/navbar';
import './mojelowiska.css';

<<<<<<< HEAD
=======
import '../WebPage.css';

>>>>>>> 2891ec758177058383369d94f415fe3147647a9b
const MojeLowiska = () => {
  const lowiska = [
  { id: 1, nazwa: "Zalew Zegrzyński", woj: "Mazowieckie", opis: "Królestwo sandacza i leszcza. Najlepiej brać łódkę przy porcie w Nieporęcie.", ocena: "⭐⭐⭐⭐⭐" },
  { id: 2, nazwa: "Jezioro Solińskie", woj: "Podkarpackie", opis: "Piękne widoki i wielkie szczupaki. Uważaj na nagłe zmiany pogody!", ocena: "⭐⭐⭐⭐" },
  { id: 3, nazwa: "Wisła - Odcinek 402", woj: "Mazowieckie", opis: "Dzika rzeka. Szukaj głębokich rynien pod Warszawą, tam czają się sumy.", ocena: "⭐⭐⭐⭐" },
  { id: 4, nazwa: "Jezioro Śniardwy", woj: "Warmińsko-Mazurskie", opis: "Mazurskie morze. Ogromna przestrzeń, wymagająca, ale darzy pięknym okoniem.", ocena: "⭐⭐⭐⭐⭐" },
  { id: 5, nazwa: "Rzeka San", woj: "Podkarpackie", opis: "Raj dla muszkarzy. Lipienie i pstrągi w krystalicznej wodzie Bieszczad.", ocena: "⭐⭐⭐⭐⭐" },
  { id: 6, nazwa: "Jezioro Rożnowskie", woj: "Małopolskie", opis: "Strome brzegi i mętna woda, ale sandacze biorą tu jak nigdzie indziej.", ocena: "⭐⭐⭐" },
  { id: 7, nazwa: "Kanał Bydgoski", woj: "Kujawsko-Pomorskie", opis: "Spokojna woda, idealna na bata lub tyczkę. Dużo płoci i krąpi.", ocena: "⭐⭐⭐⭐" },
  { id: 8, nazwa: "Jezioro Turawskie", woj: "Opolskie", opis: "Legendarne miejsce na sandacza. Warto sprawdzić stare koryto rzeki.", ocena: "⭐⭐⭐⭐" },
  { id: 9, nazwa: "Zatoka Pucka", woj: "Pomorskie", opis: "Belona w maju to tutaj obowiązek każdego spinningisty.", ocena: "⭐⭐⭐⭐⭐" },
  { id: 10, nazwa: "Rzeka Odra (Szczecin)", woj: "Zachodniopomorskie", opis: "Miejskie łowienie w porcie. Wielkie sandacze i okonie prosto z nabrzeża.", ocena: "⭐⭐⭐⭐" }
];

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