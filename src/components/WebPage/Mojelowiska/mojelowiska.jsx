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
    <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Moje Łowiska - w budowie...</h1>
  );
};

export default MojeLowiska;