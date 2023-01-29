const { Router } = require('express');
const {
  findAllRepairs,
  findRepairById,
  createNewRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = Router();

router.get('', findAllRepairs);

router.get('/:id', findRepairById);

router.post('', createNewRepair);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair);

module.exports = {
  repairsRouter: router,
};
