// controllers/empleosController.js
const express = require('express');
const Empleo = require('../models/empleos'); // Asegúrate de importar tu modelo correctamente

const router = express.Router();

// Otras rutas GET y posiblemente otras operaciones CRUD pueden estar aquí...

// Crear un nuevo empleo

router.post('/', async (req, res) => {
  try {
    const nuevoEmpleo = await Empleo.create(req.body);
    res.status(201).json(nuevoEmpleo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el empleo' });
  }
});

router.get('/', async (req, res) => {
  try {
    const empleos = await Empleo.findAll();
    res.status(200).json(empleos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los empleos' });
  }
});

router.get('/find-by-email/:userEmailCreator', async (req, res) => {
  try {
    const { userEmailCreator } = req.params;

    const empleosPorUsuario = await Empleo.findAll({
      where: {
        userEmailCreator: userEmailCreator,
      },
    });

    res.status(200).json(empleosPorUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los empleos por userEmailCreator' });
  }
});

router.get('/:empleoId', async (req, res) => {
  try {
    const { empleoId } = req.params;

    const empleo = await Empleo.findByPk(empleoId);

    if (!empleo) {
      return res.status(404).json({ message: 'Empleo no encontrado' });
    }

    res.status(200).json(empleo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el empleo por ID' });
  }
});


router.put('/:empleoId', async (req, res) => {
  try {
    const { empleoId } = req.params;
    const { titulo, descripcion, salario, urlfoto } = req.body;

    const empleo = await Empleo.findByPk(empleoId);

    if (!empleo) {
      return res.status(404).json({ message: 'Empleo no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    if (titulo) {
      empleo.titulo = titulo;
    }

    if (descripcion) {
      empleo.descripcion = descripcion;
    }

    if (salario) {
      empleo.salario = salario;
    }

    if (urlfoto) {
      empleo.urlfoto = urlfoto;
    }

    await empleo.save();

    res.json({ empleo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando el empleo' });
  }
});

router.delete('/:empleoId', async (req, res) => {
  try {
    const { empleoId } = req.params;

    // Busca el empleo por ID
    const empleo = await Empleo.findByPk(empleoId, {
      include: [{ model: Comentario, as: 'comentarios' }],
    });

    if (!empleo) {
      return res.status(404).json({ message: 'Empleo no encontrado' });
    }

    // Verifica si el usuario que solicita la eliminación es el creador del empleo
    if (empleo.userEmailCreator !== req.user.email) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este empleo' });
    }

    // Elimina los comentarios asociados al empleo
    await empleo.comentarios.forEach(async (comentario) => {
      await comentario.destroy();
    });

    // Elimina el empleo
    await empleo.destroy();

    res.status(200).json({ message: 'Empleo y comentarios eliminados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el empleo y comentarios' });
  }
});


module.exports = router;
