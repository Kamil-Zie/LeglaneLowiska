import axios from "../../../../api/axios";
import { Button } from "@mui/material";
import { useAuth } from "../../../../context/AuthContext";
import { useState, useEffect } from "react";

const LowiskoCard = ({ lowisko }) => {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(user?.ulubioneLowiska?.includes(lowisko._id) || false); ;
    const [okregi, setOkregi] = useState(JSON.parse(localStorage.getItem('okregi')));
    const [okreg, setOkreg] = useState();
    const dodajDoUlubionych = async (lowiskoId) => {
        await axios.post(`/users/update/favFishery/${user._id}`, {lowiskoId});
        setIsFavorite(!isFavorite);
    }
    useEffect(()=>{
        okregi.forEach(okreg=>okreg._id === lowisko.idOkregu ? setOkreg(okreg) : null)
    },[])
    return (
        <div key={lowisko._id} className="result-item" style={{minWidth:'10vw'}}>
            <h4>{lowisko.nazwa}</h4>
            <p>{lowisko.opis}</p>
            <p>Srednia Ocen: {lowisko.sredniaOcen}/5</p>
            <p>Ilosc Ocen: {lowisko.iloscOcen}</p>
            <p>Miasto: {lowisko.miasto}</p>
            <p>Okreg: {okreg?.nazwa}</p>
            <div>
                <Button variant="outlined"style={isFavorite ? {backgroundColor:"#3c8cb9" } : {backgroundColor:"#b5dcf5"}}onClick={()=>{
                dodajDoUlubionych(lowisko._id)
                if(!user.ulubioneLowiska.includes(lowisko._id))
                    user.ulubioneLowiska.push(lowisko._id)
                else
                    user.ulubioneLowiska = user.ulubioneLowiska.filter(id => id !== lowisko._id)
                }}>{isFavorite ? "Usuń z " : "Dodaj do "}ulubionych</Button>
            </div>
        </div>
    )
}

export default LowiskoCard;