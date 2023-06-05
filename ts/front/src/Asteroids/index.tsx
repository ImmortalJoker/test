import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import useAuth from "../hooks/useAuth";
import { Asteroid } from "../types/asteroid";
import { IFavorite } from "../types/favorite";
import { addToFavorite, getFavorite, removeFromFavorite } from "../utils/server";

const sortByName = (a: Asteroid, b: Asteroid): 1 | -1 | 0 => a.name > b.name ? -1 : a.name < b.name ? 1 : 0;

const Asteroids: React.FC<{ list: Asteroid[] }> = ({ list }) => {
  const [favorite, setFavorite] = useState<IFavorite[]>([]);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFavorite = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const favorited = favorite.find(({ neo_reference_id }) => neo_reference_id === id);

    if (!favorited) {
      const asteroid = list.find(({ neo_reference_id }) => id === neo_reference_id);

      if (asteroid && user) {
        addToFavorite({
          user,
          name: asteroid.name,
          neo_reference_id: asteroid.neo_reference_id,
        })
          .then(res => {
            setFavorite(res);
          })
      }
    } else {
      removeFromFavorite(favorited.id)
        .then(_ => {
          setFavorite(prev => prev.filter(item => item.id !== favorited.id))
        })
    }
  }

  const goToDetails = (id: string) => () => {
    navigate(`/asteroid/${id}`);
  }


  useEffect(() => {
    if (user) {
      getFavorite(user)
      .then(res => {
        setFavorite(res);
      });
    } else {
      setFavorite([]);
    }
  }, [user]);

  return (
    <List>
      {list.sort(sortByName).map(({
        name,
        neo_reference_id,
        nasa_jpl_url,
        close_approach_data
      }) => {
        return (
          <ListItem
            onClick={goToDetails(neo_reference_id)}
            key={neo_reference_id}
            disableGutters
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                disabled={!user}
                onClick={handleFavorite(neo_reference_id)}
              >
                {
                  favorite.findIndex(({ neo_reference_id: id }) => neo_reference_id === id) >= 0
                  ? <StarIcon />
                  : <StarOutlineIcon />
                }
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <PublicIcon className='avater-default-image' />
                  
                {
                  nasa_jpl_url && <img
                    height={40}
                    width={40}
                    className='avatar-image'
                    alt={`An asteroid ${name}`}
                    src={nasa_jpl_url} />
                }
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={name}
              secondary={close_approach_data && close_approach_data[0].close_approach_date_full}
            />
          </ListItem>
        )
      })}
    </List>
  );
};

export default Asteroids;
