const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const ProgressLog = sequelize.define('ProgressLog', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
  },
});

module.exports = ProgressLog;
