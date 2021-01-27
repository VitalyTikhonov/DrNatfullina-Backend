const router = require('express').Router();
const { validateSignup, validateSignin } = require('../middleware/celeb-validate-req');
const { createUser, login, logout } = require('../controllers/auth');

router.post('/signin', validateSignin, login);
router.post('/signout', logout);
router.post('/signup', validateSignup, createUser);
router.post('/signup-admin', validateSignup, createUser);

module.exports = router;
