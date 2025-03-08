const express = require('express');
const router = express.Router();
const contactController = require('../controllers/Controllers.js');

router.get('/', contactController.getAllContacts);
router.get('/add', contactController.addForm);
router.get('/edit/:id', contactController.editForm);
router.post('/add', contactController.addContact);
router.post('/edit/:id', contactController.editContact);
router.post('/delete/:id', contactController.deleteContact);

module.exports = router;