const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { validateAuthor }  = require("../middlewear/authorValidation")
const {trimBodyMiddleware }   = require("../middlewear/trimInput")

router.post('/',trimBodyMiddleware,validateAuthor,authorController.createAuthor);
router.get('/',authorController.getAllAuthors);
router.delete('/:id',authorController.deleteAuthor);
router.put('/:id',authorController.editAuthor);
router.get('/blogs', authorController.getAllAuthorsBlog)

module.exports = router;