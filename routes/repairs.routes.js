const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  findRepairById,
  createNewRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const { validIfExistRepair } = require('../middlewares/repair.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('', findAllRepairs);

router.get('/:id', validIfExistRepair, findRepairById);

router.post(
  '',
  [
    check('date', 'The date must be mandatory').not().isEmpty,
    check('date', 'The date must be mandatory').isDate,
    check('motorsNumber', 'The motorsNumber must be mandatory').not().isEmpty(),
    check('description', 'The description must be mandatory').not().isEmpty(),
    validateFields,
  ],
  createNewRepair
);

router.patch(
  '/:id',
  [
    check('date', 'The date must be mandatory').not().isEmpty,
    check('date', 'The date must be mandatory').isDate,
    check('motorsNumber', 'The motorsNumber must be mandatory').not().isEmpty(),
    check('description', 'The description must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistRepair,
  ],
  updateRepair
);

router.delete('/:id', validIfExistRepair, deleteRepair);

module.exports = {
  repairsRouter: router,
};
