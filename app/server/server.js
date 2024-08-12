import express from 'express';
import { getRecipeRoutes } from './routes/recipeRoutes.js';


export const createServer = () => {
  const app = express();

  app.use(express.json());
//   app.use(authenticateUser);
  app.use('/recipe',  getRecipeRoutes());

  return app;
};
