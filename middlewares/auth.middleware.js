const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protectToken = catchAsync(async (req, res, next) => {
  // 1.obtener token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  //2.verificar token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  //3. verificar si existe el usuario
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  }

  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError('User recently changed password!, please login again', 401)
      );
    }
  }

  //4. Check if user changed password after tooken mas issued
  req.sessionUser = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom this action!', 403)
      );
    }

    next();
  };
};