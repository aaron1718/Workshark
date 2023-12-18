// routes/index.js
const express = require('express');
const Comentario = require('../models/Comentario');

const router = express.Router();


// Ruta para crear un comentario
router.post('/', async (req, res) => {
  try {
    const { comentario, userEmail, empleoId } = req.body;

    const comentarioNuevo = await Comentario.create({
      comentario,
      userEmail,
      empleoId,
    });

    return res.status(201).json({ comentario });
  } catch (error) {
    console.error('Error al crear el comentario:', error);

    // Sugerencia 2: Manejo Específico de Errores
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ error: 'La clave externa no existe en la tabla relacionada.' });
    }

    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/:empleoId', async (req, res) => {
  try {
    const { empleoId } = req.params;

    // Verificar si el empleoId es un número válido
    if (isNaN(empleoId)) {
      return res.status(400).json({ error: 'El empleoId debe ser un número válido.' });
    }

    // Buscar todos los comentarios asociados al empleo específico
    const comentarios = await Comentario.findAll({
      where: { empleoId: parseInt(empleoId) },
    });

    return res.status(200).json({ comentarios });
  } catch (error) {
    console.error('Error al obtener comentarios por empleoId:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
