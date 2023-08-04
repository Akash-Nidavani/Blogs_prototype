const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {trimBodyMiddleware }   = require("../middlewear/trimInput");
const categorySchema = require('../models/categorySchema');

router.post('/',trimBodyMiddleware,categoryController.createCategory);
router.get('/',categoryController.getAllCategories);
router.delete('/:id',categoryController.deleteCategories)
router.put('/:id',categoryController.editCategory)

module.exports = router;