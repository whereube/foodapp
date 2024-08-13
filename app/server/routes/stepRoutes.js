import { Router } from 'express';
import * as object from '../models/objectIndex.js';
import { validateInput, validateString, validateInteger } from '../middleware/routeFunctions.js';
import { v4 as uuidv4 } from 'uuid';


export const getStepRoutes = () => {
    const router = Router(); 

    router.get('/getByRecipeId/:id', async (req, res, next) => {
    const id  = req.params.id; 
    const validate = validateInput({ id });
    if (validate.valid) {
        try {
        const result = await object.step.findAll({
            where: {recipe_id: id}, 
            order: ['index']
        });

        if (!result) {
            return res.status(404).json({ message: 'Steps not found' });
        }
        res.status(200).send(result);
        } catch (error) {
        console.error('Error finding steps', error);
        res.status(500).json('Internal Server Error');
        }

    } else {
        res.status(400).json({ message: validate.message });
    }
    });

    return router;
};