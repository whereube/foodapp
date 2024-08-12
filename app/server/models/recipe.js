import { DataTypes } from 'sequelize';
import { db } from '../database/databaseConnection.js';


export const recipe = db.define(
    'recipe',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      creator_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      video_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nr_of_people: {
        type: DataTypes.INTEGER,
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