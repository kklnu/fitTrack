const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Workout = sequelize.define('Workout', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  caloriesBurned: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Workout;
