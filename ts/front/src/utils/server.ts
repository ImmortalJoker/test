import { IFavorite } from '../types/favorite';
import { logger } from './logger';

export const getFavorite = (user: string): Promise<IFavorite[]> =>
  fetch(`${process.env.REACT_APP_BACK_END_URL}/favorite?user=${user}`)
    .then((res) => res.json())
    .then((res) => {
      logger('info', res);

      return res;
    })
    .catch((error) => {
      logger('error', error);
    });

export const addToFavorite = (data: {
  user: string;
  name: string;
  neo_reference_id: string;
}): Promise<IFavorite[]> =>
  fetch(`${process.env.REACT_APP_BACK_END_URL}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      logger('info', res);

      return res;
    })
    .catch((error) => {
      logger('error', error);
    });

export const removeFromFavorite = (id: string): Promise<void> =>
  fetch(`${process.env.REACT_APP_BACK_END_URL}/favorite/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      logger('info', res);
    })
    .catch((error) => {
      logger('error', error);
    });