const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {trimBodyMiddleware }   = require("../middlewear/trimInput")

router.post('/',trimBodyMiddleware,categoryController.createCategory);
router.get('/',categoryController.getAllCategories);

module.exports = router;