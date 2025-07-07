const db = require('../config/db');

const Word = {
  // Obtener todas las palabras
  getAllWords: (cb) => {
    db.query('SELECT * FROM words ORDER BY term', cb);
  },

  // Buscar solo por término
  searchByTerm: (term, cb) => {
    const like = `%${term}%`;
    db.query(
      'SELECT * FROM words WHERE term LIKE ? ORDER BY term',
      [like],
      cb
    );
  },

  // Buscar solo por definición
  searchByMeaning: (meaning, cb) => {
    const like = `%${meaning}%`;
    db.query(
      'SELECT * FROM words WHERE meaning LIKE ? ORDER BY term',
      [like],
      cb
    );
  },

  // Sugerencias de autocompletar términos
  suggestTerms: (term, cb) => {
    const like = `%${term}%`;
    db.query(
      'SELECT DISTINCT term FROM words WHERE term LIKE ? ORDER BY term LIMIT 10',
      [like],
      (err, results) => {
        if (err) return cb(err);
        const terms = results.map(r => r.term);
        cb(null, terms);
      }
    );
  },

  // Crear nuevo término
  create: (term, meaning, cb) => {
    db.query('INSERT INTO words SET term = ?, meaning = ?', [term, meaning], cb);
  },

  // Actualizar término
  update: (id, term, meaning, cb) => {
    db.query('UPDATE words SET term = ?, meaning = ? WHERE id = ?', [term, meaning, id], cb);
  },
  getAllWords: (cb) => {
  db.query('SELECT * FROM words ORDER BY term', cb);
}

};


module.exports = Word;
