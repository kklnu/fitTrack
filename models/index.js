const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');
const Workout = require('./Workout');
const Goal = require('./Goal');
const ProgressLog = require('./ProgressLog');

// Relationships
User.hasMany(Workout, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Workout.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Goal, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Goal.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(ProgressLog, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
ProgressLog.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Workout,
  Goal,
  ProgressLog
};
