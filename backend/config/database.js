// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Puedes cambiar el nombre del archivo según tus preferencias
});

module.exports = sequelize;
