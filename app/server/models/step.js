import { DataTypes } from 'sequelize';
import { db } from '../database/databaseConnection.js';
import { recipe } from './recipe.js';


export const step = db.define(
    'step',
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
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      index: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      // Other model are go here
      freezeTableName: true,
      updatedAt: false,
      createdAt: false,
    },
  );