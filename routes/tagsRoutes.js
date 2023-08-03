const express = require('express');
const router = express.Router();
const TagController = require('../controllers/tagsController');

router.post('/',TagController.createtag);

module.exports = router;