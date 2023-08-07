const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const {validatePost} = require("../middlewear/postValidation")

router.post('/',validatePost,PostController.createPost);
router.get('/',PostController.getAllPosts);
router.get('/:id',PostController.getPostById);
router.put('/:id', PostController.updatePost);
router.get('/deleted',PostController.getDeletedPost);
router.get('/published',PostController.getPublishedPost);
router.delete('/soft/:id',PostController.SoftDeletePost);
router.delete('/permanent/:id',PostController.permanentdeletePost);
router.post('/restore/:id', PostController.restoreBlog)
router.get('/search/:key', PostController.searchBlog)


module.exports = router;