const router = require('express').Router();

const authRt = require('./auth');
const authMw = require('../middleware/auth');
const users = require('./users');
const posts = require('./posts');
const records = require('./records');
const comments = require('./comments');
const { BASE_PATH } = require('../configs/config');
const NotFoundError = require('../errors/NotFoundError');

router.use(`${BASE_PATH}auth`, authRt);
router.use(authMw);
router.use(`${BASE_PATH}users`, users);
router.use(`${BASE_PATH}posts`, posts);
router.use(`${BASE_PATH}records`, records);
router.use(`${BASE_PATH}comments`, comments);
router.use((req, res, next) => next(new NotFoundError()));

module.exports = router;
