import { Container } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import Asteroids from '../Asteroids';
import { Asteroid } from '../types/asteroid';
import { getAsteroids } from '../utils/api';
import './AsteroidsList.css';

interface AsteroidListProps {
  startDate: Dayjs;
  endDate: Dayjs;
}

const AsteroidsList: React.FC<AsteroidListProps> = ({ startDate, endDate }) => {
  const [list, setList] = useState<Asteroid[]>([]);

  useEffect(() => {
    getAsteroids(startDate, endDate)
      .then((res) => {
        if (!res) return;

        const asteroidsByDays = Object.values(res.near_earth_objects);

        setList(asteroidsByDays.flat() as Asteroid[]);
      })
  }, [startDate, endDate]);

  return (
    <Container maxWidth="sm">
      <Asteroids list={list} />
    </Container>
  );
};

export default AsteroidsList;