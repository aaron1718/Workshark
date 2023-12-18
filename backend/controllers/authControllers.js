// controllers/authController.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, urlfoto } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      urlfoto,
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during registration');
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting user by ID' });
  }
});

router.get('/find-by-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    console.log('Solicitud para buscar el perfil de:', email);
    
    if (!user) {

      return res.status(404).json({ message: 'User not found with the provided email' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al buscar el perfil:', error);
    res.status(500).json({ message: 'Error getting user by email' });
  }
});




module.exports = router;
