const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // ✅ Ensure username is unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // ✅ Ensure email is unique
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      }
    },
    sequelize,
    modelName: 'user',
    timestamps: false,
    freezeTableName: true,
    underscored: true
  }
);

module.exports = User;
