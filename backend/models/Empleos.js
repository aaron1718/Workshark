// models/Empleo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empleo = sequelize.define('Empleo', {
  empleoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  urlfoto: {
    type: DataTypes.STRING,
        allowNull: false,

  },
  userEmailCreator: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Empleo;
