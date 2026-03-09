const MojeLowiska = () => {
  const ulubione = [
    { id: 1, nazwa: "Zalew Zegrzyński", opis: "Najlepsze leszcze przy molo.", typ: "PZW" },
    { id: 2, nazwa: "Staw u Janusza", opis: "Komercyjne, ale biorą jak szalone.", typ: "Komercja" },
    { id: 3, nazwa: "Wisła - odcinek 402", opis: "Głęboki dół, szukaj sandacza.", typ: "PZW" },
  ];

  return (<>
      <div style={{ padding: '40px' }}>
        <h2>Moje ulubione łowiska</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {ulubione.map(spot => (
            <div key={spot.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>{spot.nazwa}</h3>
              <p>{spot.opis}</p>
              <span style={{ fontSize: '12px', color: '#555' }}>{spot.typ}</span>
            </div>
          ))}
        </div>
      </div>
  </>
  );
};

export default MojeLowiska;