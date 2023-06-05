import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

import { testDbConnection } from './config/db';
import { Favorite } from './models/favorite';

dotenv.config();

testDbConnection();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(express.json());

app.get('/favorite', async (req: Request, res: Response) => {
  if (req.query.user) {
    const favorite = await Favorite.findAll({
      where: {
        user: req.query.user
      }
    });

    res.send(favorite);
  }

  res.status(401).end();
});

app.post('/favorite', async (req: Request, res: Response) => {
  await Favorite.create({
    ...req.body,
    id: uuid(),
  });

  const favorite = await Favorite.findAll({
    where: {
      user: req.body.user,
    },
  });

  res.status(201).send(favorite);
});

app.delete('/favorite/:id', async (req: Request, res: Response) => {
  const deleted = await Favorite.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.sendStatus(200);
});

app.listen(5100, () => {
  console.log('Application started on port 5100!');
});