const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { validateAuthor } = require("../middlewear/authorValidation")
const { trimBodyMiddleware } = require("../middlewear/trimInput")

router.post('/', trimBodyMiddleware, validateAuthor, authorController.createAuthor);
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.put('/:id', authorController.editAuthor);
router.delete('/soft/:id', authorController.softDeleteAuthor);
router.delete('/permanent/:id', authorController.permanentDeleteAuthor);
router.get('/search/:key', authorController.searchAuthor)
// router.get('/blogs', authorController.getAllAuthorsBlog)
router.post('/restore/:id', authorController.restoreAuthor)

module.exports = router;