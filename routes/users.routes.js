const { Router } = require('express');
const {
  findAllUsers,
  findUserById,
  createNewUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const router = Router();

router.get('', findAllUsers);

router.get('/:id', findUserById);

router.post('', createNewUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = {
  usersRouter: router,
};
