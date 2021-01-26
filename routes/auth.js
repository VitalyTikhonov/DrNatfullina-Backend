const router = require('express').Router();
const { validateSignup, validateSignin } = require('../middleware/celeb-validate-req');
const { createUser, login, logout } = require('../controllers/users');

router.post('/signin', validateSignin, login);
router.post('/signout', logout);
router.post('/signup', validateSignup, createUser);

module.exports = router;
