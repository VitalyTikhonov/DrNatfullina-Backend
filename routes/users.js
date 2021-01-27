/* ИМПОРТ */
const router = require('express').Router();
const { validateNonstrictUserDataSet, validateIdInParams } = require('../middleware/celeb-validate-req');

const {
  findUsers,
  getCurrentUser,
  updateCurrentUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users');

/* РУТЕРЫ */
router.get('/', validateNonstrictUserDataSet, findUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateNonstrictUserDataSet, updateCurrentUser);
router.get('/:id', validateIdInParams, getUserById);
router.patch('/:id', validateIdInParams, validateNonstrictUserDataSet, updateUser);
router.delete('/:id', deleteUser);

/* ЭКСПОРТ */
module.exports = router;
