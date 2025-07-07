const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Mostrar formulario de registro
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Procesar registro
router.post('/register', (req, res) => {
  const { username, password, password2 } = req.body;

  if (!username || !password || !password2) {
    return res.render('register', { error: 'Todos los campos son obligatorios' });
  }
  if (password !== password2) {
    return res.render('register', { error: 'Las contraseñas no coinciden' });
  }

  User.findByUsername(username, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.render('register', { error: 'El nombre de usuario ya está en uso' });
    }

    bcrypt.hash(password, 10, (errHash, hashedPassword) => {
      if (errHash) throw errHash;

      User.create(username, hashedPassword, (err2) => {
        if (err2) throw err2;
        res.redirect('/login');
      });
    });
  });
});

// Mostrar formulario login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Procesar login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', { error: 'Todos los campos son obligatorios' });
  }

  User.findByUsername(username, (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.render('login', { error: 'Usuario no encontrado' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (errCompare, isMatch) => {
      if (errCompare) throw errCompare;

      if (!isMatch) {
        return res.render('login', { error: 'Contraseña incorrecta' });
      }

      req.session.user = { id: user.id, username: user.username };
      res.redirect('/');
    });
  });
});

// Cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
