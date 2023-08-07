const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const {validatePost} = require("../middlewear/postValidation")

router.post('/',validatePost,PostController.createPost);
router.get('/',PostController.getAllPosts);
router.get('/deleted',PostController.getDeletedPost);
router.get('/published',PostController.getPublishedPost);
router.delete('/:id',PostController.deletePost);
router.put('/:id', PostController.updatePost);
router.get('/:key', PostController.searchBlog)


module.exports = router;