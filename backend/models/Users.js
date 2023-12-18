// models/User.js
const Empleo = require('./Empleos');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comentario = require('./Comentario');  // Agregado


const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlfoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Empleo);
Empleo.belongsTo(User);
User.hasMany(Comentario);  // Agregado
Empleo.hasMany(Comentario);  // Agregado
Comentario.belongsTo(User);
Comentario.belongsTo(Empleo);



module.exports = User;
