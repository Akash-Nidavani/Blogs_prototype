const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const {validatePost} = require("../middlewear/postValidation")

router.post('/',validatePost,PostController.createPost);
router.get('/',PostController.getAllPosts);
router.delete('/:id',PostController.deletePost);

module.exports = router;