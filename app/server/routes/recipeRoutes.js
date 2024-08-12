import { Router } from 'express';
import * as object from '../models/objectIndex.js';
import { v4 as uuidv4 } from 'uuid';
import { validateInput, validateString, validateInteger } from '../middleware/routeFunctions.js';


export const getRecipeRoutes = () => {
  const router = Router();

  router.get('/getAll', async (req, res, next) => {
    const have = await object.recipe.findAll({
    });
    res.status(200).send(have);
  });

  router.get('/getByCreatorId', async (req, res, next) => {
    const { creator_id } = req.body; 

    const validate = validateInput({ creator_id });
    if (validate.valid) {
      const result = await object.recipe.findAll({ where: {creator_id: creator_id}});
      res.status(200).send(result);

    } else {
      res.status(400).json({ message: validate.message });
    }
  });

  router.get('/getByRecipeId', async (req, res, next) => {
    const { id } = req.body; 

    const validate = validateInput({ id });
    if (validate.valid) {
      try {
        const result = await object.recipe.findOne({ where: {id: id} });

        if (!result) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).send(result);
      } catch (error) {
        console.error('Error finding recipe', error);
        res.status(500).json('Internal Server Error');
      }

    } else {
      res.status(400).json({ message: validate.message });
    }
  });

  router.delete('/deleteRecipe', async (req, res, next) => {
    const { id } = req.body;
    
    const validate = validateInput({ id });

    if (validate.valid) {
      try {
        const result = await object.recipe.destroy({ where: {id: id}});
  
        if (!result) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
        res.sendStatus(204);
      } catch (error) {
        console.error('Error deleting recipe', error);
        res.status(500).json('Internal Server Error');
      }
    } else {
      res.status(400).json({ message: validate.message });
    }
  });

  router.post('/createRecipe', async (req, res, next) => {
    const {
      creator_id,
      title,
      description,
      video_link,
      nr_of_people
    } = req.body;

    const id = uuidv4();
    const validate = validateInput({ creator_id });
    const validateStr = validateString({ title, description, video_link });
    const validateInt = validateInteger({ nr_of_people });

    if (validate.valid && validateStr.valid && validateInt.valid) {
      try {
        const result = await object.recipe.create({
          id,
          creator_id,
          title,
          description,
          video_link,
          nr_of_people
        }); 

        if (result === null) {
          return res.status(404).json('No recipe created');
        }
      
          res.status(201).json({ message: 'Recipe created'});
        } catch (error) {
          console.error('Error creating recipe', error);
          res.status(500).json('Internal Server Error');
        }
      } else {
        res.status(400).json({ uuidMessage: validate.message, strMessage: validateStr.message, intMessage: validateInt.message });
      }
    });
  
  return router;
};