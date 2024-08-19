import { Router } from 'express';
import * as object from '../models/objectIndex.js';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, checkPassword } from '../middleware/encrypt.js';

export const getCreatorRoutes = () => {
  const router = Router();

    router.get('/getCreator', async (req, res, next) => {
        const { creator_id } = req.body;
        const creator = await object.creator.findByPk(creator_id);
        res.status(200).send(creator);
    });

    router.get('/getCreatorByUsername/:username', async (req, res, next) => {
        const username  = req.params.username; 
        const creator = await object.creator.findOne({
            where:{
                username: username
            }
        });
        res.status(200).send(creator);
    });

    router.post('/login', async (req, res, next) => {
        const { email, password } = req.body;

        const creator = await object.creator.findOne({
            where: {
                email: email
            }
        });

        const checkedPassword = await checkPassword(password, creator['dataValues']['password']);

        if (!checkedPassword) {
            res.status(401).json('Login failed');
        } else if (creator.length !== 0) {
            res.status(200).send(creator);
        }
    });

    router.get('/getAll', async (req, res, next) => {
        const allCreators = await object.creator.findAll({
        });
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
        const hashedPassword = await hashPassword(password);

        const checkUsername = await object.creator.findAll({
            where: {
                username: username
            }
        });

        if (checkUsername.length === 0){
            try {
                const result = await object.creator.create({
                    id,
                    username,
                    password:hashedPassword,
                    email
                });
                
                if (result === null) {
                    return res.status(404).json('No new creator created');
                } else{
                    res.status(201).json({ message: 'New creator created'});
                }

            } catch (error) {
                console.error('Error creating creator', error);
                res.status(500).json('Internal Server Error');
            }
        } else{
            return res.status(401).json('Username already taken');
        }
    });

    router.put('/update', async (req, res, next) => {
        const {
            creator_id,
            username,
            email,
            password
        } = req.body;

        const hashedPassword = await hashPassword(password);

        try{
            const creatorToUpdate = await object.creator.findByPk(creator_id);

            creatorToUpdate.set({
                username: username,
                email: email,
                password: hashedPassword
            })

            await creatorToUpdate.save();
            res.status(200).json(creatorToUpdate);
        } catch (error) {
            console.error('Error updating creator', error);
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
        console.error('Error deleting creator', error);
        res.status(500).json('Internal Server Error');
        }
    });

  return router;
};