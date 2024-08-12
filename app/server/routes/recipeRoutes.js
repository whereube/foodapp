import { Router } from 'express';
import * as object from '../models/objectIndex.js';
// import { v4 as uuidv4 } from 'uuid';


export const getRecipeRoutes = () => {
  const router = Router();

  router.get('/', async (req, res, next) => {
    const have = await object.creator.findAll({
    });
    res.status(200).send(have);
  });

  //Function for updating have based on singular article_id
  router.post('/updateHave', async (req, res, next) => {
    

  });

  
  return router;
};