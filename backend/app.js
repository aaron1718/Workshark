const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const cors = require('cors');
const User = require('./models/Users');
const Comentario = require('./models/Comentario');

const authController = require('./controllers/authControllers');
const empleosController = require('./controllers/empleosController'); // Agregado
const comentarioController = require('./controllers/comentarioController'); // Agregado

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/empleos', empleosController); // Agregado
app.use('/comentarios', comentarioController); // Agregado

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
