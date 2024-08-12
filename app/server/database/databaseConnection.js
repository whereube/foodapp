import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const environment = process.env.DEV_ENVIRONMENT;


const getDBName = process.env.DB_NAME;
const getDBUser = process.env.DB_USER;
const getDBPassword = process.env.DB_PASSWORD;
const getDBHost = process.env.DB_HOST;
const getDBPort = process.env.DB_PORT;

const connectToDatabase = async () => {
  const db = new Sequelize(getDBName, getDBUser, getDBPassword, {
    host: getDBHost,
    dialect: 'postgres',
    port: getDBPort,
    pool: {
      max: 90,
      min: 0,
    },
  });

  return db;
};

export const getTransaction = async () => {
  const transaction = await db.transaction();

  return transaction;
};

export const db = await connectToDatabase();
