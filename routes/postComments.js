const router = require('express').Router();
const { validateIdInParams } = require('../middleware/celeb-validation-general');
// const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

// router.get('/', getAllArticles);
// router.post('/', validatePostArticle, createArticle);
router.delete('/:articleId', validateIdInParams);
module.exports = router;
