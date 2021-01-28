const router = require('express').Router();
const { validatePostArticle, validateIdInParams } = require('../middleware/celeb-validate-req');
// const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

// router.get('/', getAllArticles);
// router.post('/', validatePostArticle, createArticle);
router.delete('/:articleId', validateIdInParams);
module.exports = router;
