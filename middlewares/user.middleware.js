const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});

exports.validIfExistUserEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (user && !user.status) {
    //TODO: lo que se deberia hacer es hacerle un update a true al estado de la cuenta
    return next(
      new AppError(
        'The user has an account, but it is desactivated please talk to the administrator to activate it',
        400
      )
    );
  }

  if (user) {
    return next(new AppError('The email user already exists', 400));
  }

  next();
});
