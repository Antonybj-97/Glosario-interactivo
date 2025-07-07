const Word = require('../models/wordModel');

// Mostrar listado de palabras (con filtros)
exports.listWords = (req, res) => {
  const { searchTerm, searchMeaning } = req.query;

  const cb = (err, rows) => {
    if (err) {
      console.error('Error al obtener palabras:', err);
      return res.status(500).send('Error al obtener palabras');
    }
    res.render('index', {
      words: rows,
      user: req.session.user,
      searchTerm: searchTerm || '',
      searchMeaning: searchMeaning || ''
    });
  };

  if (searchMeaning) {
    return Word.searchByMeaning(searchMeaning, cb);
  }
  if (searchTerm) {
    return Word.searchByTerm(searchTerm, cb);
  }
  Word.getAllWords(cb);
};

// Mostrar formulario de creación
exports.showCreateForm = (req, res) => {
  res.render('create');
};

// Procesar creación de palabra
exports.addWord = (req, res) => {
  const { term, meaning } = req.body;
  Word.create(term, meaning, (err) => {
    if (err) {
      console.error('Error al crear palabra:', err);
      return res.status(500).send('Error al crear palabra');
    }
    res.redirect('/');
  });
};

// Procesar actualización de palabra
exports.updateWord = (req, res) => {
  const id = req.params.id;
  const { term, meaning } = req.body;
  Word.update(id, term, meaning, (err) => {
    if (err) {
      console.error('Error al actualizar palabra:', err);
      return res.status(500).send('Error al actualizar palabra');
    }
    res.redirect('/');
  });
};

// Devuelve JSON con sugerencias de término para autocompletar
exports.suggestTerms = (req, res) => {
  const q = req.query.q || '';
  Word.suggestTerms(q, (err, terms) => {
    if (err) {
      console.error('Error al obtener sugerencias:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(terms);
  });
};
// Devuelve todos los términos con su definición en JSON
exports.getAllAsJson = (req, res) => {
  const db = require('../models/wordModel');
  db.getAllWords((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener palabras' });
    res.json(rows); // [{ id, term, meaning }, ...]
  });
};
exports.getAllAsJson = (req, res) => {
  const Word = require('../models/wordModel');
  Word.getAllWords((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener palabras' });
    res.json(rows); // [{ id, term, meaning }, ...]
  });
};