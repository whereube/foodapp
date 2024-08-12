import express from 'express';
import { getRecipeRoutes } from './routes/recipeRoutes.js';
import { getCreatorRoutes } from './routes/creatorRoutes.js';


export const createServer = () => {
  const app = express();

  app.use(express.json());
//   app.use(authenticateUser);
  app.use('/recipe',  getRecipeRoutes());
  app.use('/creator',  getCreatorRoutes());

  return app;
};
