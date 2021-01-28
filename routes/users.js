/* ИМПОРТ */
const router = require('express').Router();
const { validateProvidedUserData } = require('../middleware/celeb-validation-user');
const { validateIdInParams } = require('../middleware/celeb-validation-general');

const {
  findUsers,
  getCurrentUser,
  updateCurrentUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteCurrentUser,
} = require('../controllers/users');

/* РУТЕРЫ */
router.get('/', validateProvidedUserData, findUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateIdInParams, getUserById);
router.patch('/me', validateProvidedUserData, updateCurrentUser);
router.patch('/:id', validateIdInParams, validateProvidedUserData, updateUser);
router.delete('/me', deleteCurrentUser);
router.delete('/:id', validateIdInParams, deleteUser);

/* ЭКСПОРТ */
module.exports = router;
