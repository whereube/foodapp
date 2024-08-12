import { DataTypes } from 'sequelize';
import { db } from '../database/databaseConnection.js';


export const ingredient = db.define(
    'ingredient',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      recipe_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      // Other model are go here
      freezeTableName: true,
      updatedAt: false,
      createdAt: false,
    },
  );