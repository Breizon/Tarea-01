const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findUserById,
  createNewUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const {
  protectToken,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validExistUser } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('', findAllUsers);

router.get('/:id', validExistUser, findUserById);

router.use(protectToken);

router.patch(
  '/:id',
  [
    check('name', 'User name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty,
    validateFields,
    validExistUser,
    protectAccountOwner,
  ],
  updateUser
);

router.delete('/:id', validExistUser, protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
