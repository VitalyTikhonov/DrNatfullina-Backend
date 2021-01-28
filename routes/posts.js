const router = require('express').Router();
const { validatePost, validateIdInParams } = require('../middleware/celeb-validate-req');
const { findPosts, getPost, createPost } = require('../controllers/posts');

router.get('/', findPosts);
router.get('/:id', validateIdInParams, getPost);
router.post('/', validatePost, createPost);
// router.patch('/:id', validateIdInParams, getAllArticles);
// router.delete('/:id', validateIdInParams, deleteArticle);
module.exports = router;
