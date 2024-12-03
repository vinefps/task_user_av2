// // src/models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const bcrypt = require('bcrypt');


// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Hook para hash da senha antes de criar o usuário
// User.beforeCreate(async (user, options) => {
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//   user.password = hashedPassword;
// });

// // Método para verificar a senha
// User.prototype.validPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };



module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
