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
  deleteCurrentUser,
} = require('../controllers/users');

/* РУТЕРЫ */
router.get('/', validateNonstrictUserDataSet, findUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateIdInParams, getUserById);
router.patch('/me', validateNonstrictUserDataSet, updateCurrentUser);
router.patch('/:id', validateIdInParams, validateNonstrictUserDataSet, updateUser);
router.delete('/me', deleteCurrentUser);
router.delete('/:id', validateIdInParams, deleteUser);

/* ЭКСПОРТ */
module.exports = router;
