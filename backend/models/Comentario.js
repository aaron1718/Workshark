// models/Comentario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');
const Empleo = require('./Empleos');

const Comentario = sequelize.define('Comentario', {
  comentarioId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empleoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Comentario;
