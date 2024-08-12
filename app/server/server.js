import express from 'express';
import { getRoutes } from './routes/routes.js';


export const createServer = () => {
  const app = express();

  app.use(express.json());
//   app.use(authenticateUser);
  app.use('/',  getRoutes());

  return app;
};
