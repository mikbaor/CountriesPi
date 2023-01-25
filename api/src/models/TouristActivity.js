const { DataTypes, UUIDV4  } = require('sequelize');
const { conn } = require('../db');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('tourist_activity', {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true    
        },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5
        }
      },
      duration: {
        type: DataTypes.INTEGER
      },
      season: {
        type: DataTypes.STRING
      }
    }, {
      timestamps: false
    });
  }