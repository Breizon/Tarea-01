const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  findRepairById,
  createNewRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const { protectToken, restrictTo } = require('../middlewares/auth.middleware');
const { validIfExistRepair } = require('../middlewares/repair.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.use(protectToken);

router.get('', restrictTo('employee'), findAllRepairs);

router.get('/:id', validIfExistRepair, restrictTo('employee'), findRepairById);

router.post(
  '',
  [
    check('date', 'The date must be mandatory').not().isEmpty,
    check('date', 'The date must be mandatory').isDate,
    check('motorsNumber', 'The motorsNumber must be mandatory').not().isEmpty(),
    check('description', 'The description must be mandatory').not().isEmpty(),
    validateFields,
    restrictTo('employee'),
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
    restrictTo('employee'),
  ],
  updateRepair
);

router.delete('/:id', validIfExistRepair, restrictTo('employee'), deleteRepair);

module.exports = {
  repairsRouter: router,
};
