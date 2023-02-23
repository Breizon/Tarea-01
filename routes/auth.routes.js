const { Router } = require('express');
const { check } = require('express-validator');
const {
  createNewUser,
  login,
  renewToken,
} = require('../controllers/auth.controller');
const { protectToken } = require('../middlewares/auth.middleware');
const { validIfExistUserEmail } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'User name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty,
    validateFields,
    validIfExistUserEmail,
  ],
  createNewUser
);

router.post(
  '/login',
  [
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
  ],
  login
);

router.use(protectToken);

router.get('/renew', renewToken);

module.exports = {
  authRouter: router,
};
