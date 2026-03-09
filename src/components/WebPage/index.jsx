import './WebPage.css'; 
import Navbar from './NavBar/navbar';

const WebPage = () => {
  return (
    <div className="web-page-container">
      <Navbar />
      {/* Sekcja główna (Hero) */}
      <header className="hero-section">
        <h2>Znajdź legalne miejsce na ryby w Twojej okolicy</h2>
        <p>Ogarnij sobie szybko zgode aby łowic bez konca</p>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Wpisz miasto" 
            className="search-input"
          />
          <button style={{ padding: '10px 20px', borderRadius: '0 5px 5px 0', border: 'none', background: '#1a5275', color: 'white', cursor: 'pointer' }}>
            Szukaj
          </button>
        </div>
      </header>

      {/* Lista łowisk (Placeholdery) */}
      <main style={{ padding: '40px' }}>
        <h3>Gdzie łowić:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>Jezioro Bydgoskie</div>
          <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>Stawy Milickie</div>
          <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>Rzeka Wisła (odcinek Mazowiecki)</div>
        </div>
      </main>
    </div>
  );
};

export default WebPage;