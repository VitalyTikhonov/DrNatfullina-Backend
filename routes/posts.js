const router = require('express').Router();
const { validatePost, validateProvidedPostData } = require('../middleware/celeb-validation-post');
const { validateIdInParams } = require('../middleware/celeb-validation-general');
const {
  findPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/posts');

router.get('/', findPosts);
router.get('/:id', validateIdInParams, getPost);
router.post('/', validatePost, createPost);
router.patch('/:id', validateIdInParams, validateProvidedPostData, updatePost);
router.delete('/:id', validateIdInParams, deletePost);
module.exports = router;
