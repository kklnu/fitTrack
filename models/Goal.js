const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Goal = sequelize.define('Goal', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isAchieved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = Goal;
