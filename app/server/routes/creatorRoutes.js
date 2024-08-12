import { Router } from 'express';
import * as object from '../models/objectIndex.js';
import { v4 as uuidv4 } from 'uuid';


export const getCreatorRoutes = () => {
  const router = Router();

    router.get('/getCreator', async (req, res, next) => {
        const { creator_id } = req.body;
        const creator = await object.creator.findByPk(creator_id);
        res.status(200).send(creator);
    });

    router.get('/getAll', async (req, res, next) => {
        const allCreators = await object.creator.findAll({
        });
        res.append('Access-Control-Allow-Origin', ['*']);
        res.status(200).send(allCreators);
    });

    //Function for updating have based on singular article_id
    router.post('/add', async (req, res, next) => {
        const {
            username,
            email,
            password
        } = req.body;
        
        const id = uuidv4();


        try {
            const result = await object.creator.create({
                id,
                username,
                password,
                email
            });
            
            if (result === null) {
                return res.status(404).json('No have created');
            } else{
                res.status(201).json({ message: 'Have created'});
            }

        } catch (error) {
            console.error('Error creating have', error);
            res.status(500).json('Internal Server Error');
        }
    });

    router.put('/update', async (req, res, next) => {
        const {
            creator_id,
            username,
            email,
            password
        } = req.body;

        try{
            const creatorToUpdate = await object.creator.findByPk(creator_id);

            creatorToUpdate.set({
                username: username,
                email: email,
                password: password
            })

            await creatorToUpdate.save();
            res.status(200).json(creatorToUpdate);
        } catch (error) {
            console.error('Error updating have', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }  

    });

    router.delete('/delete', async (req, res, next) => {
        const { creator_id } = req.body;
        try {
            const result = await object.creator.destroy({
            where: {
                id: creator_id,
            }
            });
    
            if (result === 0) {
            return res.status(404).json({ message: 'Have not found' });
            } 
            res.sendStatus(204);
        } catch (error) {
        console.error('Error deleting have', error);
        res.status(500).json('Internal Server Error');
        }
    });



  
  return router;
};