const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

// Buscar usuario por nombre de usuario
User.findByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

// Crear nuevo usuario (con hash interno)
User.create = (username, password, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], callback);
  });
};

module.exports = User;
