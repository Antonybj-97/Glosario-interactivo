const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');
const ensureAuthenticated = require('../middleware/auth');

// 🔍 Autocompletado (AJAX)
router.get('/suggest', ensureAuthenticated, wordController.suggestTerms);

// 📃 Vista principal del glosario
router.get('/', ensureAuthenticated, wordController.listWords);

// ➕ Formulario y acción para crear palabra
router.get('/create', ensureAuthenticated, wordController.showCreateForm);
router.post('/add', ensureAuthenticated, wordController.addWord);

// ✏️ Actualizar palabra
router.post('/update/:id', ensureAuthenticated, wordController.updateWord);

// 🧠 API para el juego (términos y significados en JSON)
router.get('/api/words', ensureAuthenticated, wordController.getAllAsJson);

// 🧩 Vista del juego de memoria
router.get('/memoria', ensureAuthenticated, (req, res) => {
  res.render('memoria', { user: req.session.user });
});

module.exports = router;
