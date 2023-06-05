import { Container } from "@mui/material";
import { useEffect, useState } from "react";

import Asteroids from "../Asteroids";
import useAuth from "../hooks/useAuth";
import { IFavorite } from "../types/favorite";
import { getFavorite } from "../utils/server";

const Favorite: React.FC = () => {
  const [favorite, setFavorite] = useState<IFavorite[]>();

  const { user } = useAuth();

  useEffect(() => {
    if (user){
      getFavorite(user)
        .then(res => setFavorite(res));
    }
   }, [user]);
  
  return (
    <Container maxWidth="sm">
      {/* @ts-ignore */}
      { favorite && <Asteroids list={favorite} />}
    </Container>
  );
};

export default Favorite;
