import axios from "../../../../api/axios";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAuth } from "../../../../context/AuthContext";
import { useState, useEffect } from "react";

const LowiskoCard = ({ lowisko, okregiList }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(
    user?.ulubioneLowiska?.includes(lowisko._id) || false
  );
  const [okreg, setOkreg] = useState();

  const dodajDoUlubionych = async (lowiskoId) => {
    await axios.post(`/users/update/favFishery/${user._id}`, { lowiskoId });
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (okregiList && lowisko.idOkregu) {
      const foundOkreg = okregiList.find((o) => o._id === lowisko.idOkregu);
      setOkreg(foundOkreg);
    }
  }, [okregiList, lowisko.idOkregu]);

  return (
    <Card
      sx={{
        minWidth: 200,
        borderRadius: 3,
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        transition: "box-shadow 0.2s ease",
        "&:hover": { boxShadow: 6 },
        height: "100%",
        width: "100%",
      }}
    >
      <CardContent sx={{ flexGrow: 1, minHeight: 150 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
          {lowisko.nazwa}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5, minHeight: 40 }}
        >
          {lowisko.opis}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          <StarIcon sx={{ fontSize: 16, color: "#f0a500" }} />
          <Typography variant="body2">
            <strong>{lowisko.sredniaOcen}/5</strong> ({lowisko.iloscOcen} ocen)
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <LocationOnIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {lowisko.miasto}
          </Typography>
        </Box>

        {okreg && (
          <Chip
            label={okreg.nazwa}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mt: 0.5 }}
          />
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          sx={{
            backgroundColor: isFavorite ? "#e53935" : "#2e7d32",
            "&:hover": {
              backgroundColor: isFavorite ? "#b71c1c" : "#1b5e20",
            },
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={() => {
            dodajDoUlubionych(lowisko._id);
            if (!user.ulubioneLowiska.includes(lowisko._id))
              user.ulubioneLowiska.push(lowisko._id);
            else
              user.ulubioneLowiska = user.ulubioneLowiska.filter(
                (id) => id !== lowisko._id
              );
          }}
        >
          {isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default LowiskoCard;
