import { Dayjs } from "dayjs";
import { logger } from "./logger";
import { IAsteroid } from "../types/asteroid";

const DATE_FORMAT = 'YYYY-MM-DD';

export const getAsteroids = (
  startDate: Dayjs,
  endDate: Dayjs,
): Promise<{ near_earth_objects: object }> =>
  fetch(
    `${process.env.REACT_APP_NASA_URL}/v1/feed?start_date=${startDate.format(
      DATE_FORMAT,
    )}&end_date=${endDate.format(DATE_FORMAT)}&api_key=${
      process.env.REACT_APP_NASA_SECRECT_KEY
    }`,
  )
    .then((res) => res.json())
    .then((res) => {
      logger('log', res);

      return res;
    })
    .catch((error) => {
      logger('error', error);
    });

export const getAsteroid = (id: string): Promise<IAsteroid> =>
  fetch(
    `${process.env.REACT_APP_NASA_URL}/v1/neo/${id}?api_key=${process.env.REACT_APP_NASA_SECRECT_KEY}`,
  )
    .then((res) => res.json())
    .then((res) => {
      logger('log', res);

      return res;
    })
    .catch((error) => {
      logger('error', error);
    });