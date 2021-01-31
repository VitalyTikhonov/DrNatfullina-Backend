const router = require('express').Router();
const { validateRecord, validateProvidedRecordData } = require('../middleware/celeb-validation-record');
const { validateIdInParams } = require('../middleware/celeb-validation-general');
const {
  findRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
} = require('../controllers/records');

router.get('/', findRecords);
router.get('/:id', validateIdInParams, getRecord);
router.post('/', validateRecord, createRecord);
router.patch('/:id', validateIdInParams, validateProvidedRecordData, updateRecord);
router.delete('/:id', validateIdInParams, deleteRecord);
module.exports = router;
