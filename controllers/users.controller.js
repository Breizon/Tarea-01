const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'status'],
    where: {
      status: 'available',
    },
    include: [
      {
        model: Repair,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'The users were found successfully',
    users,
  });
});

exports.findUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: 'The user found was successfully',
    user,
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const newUser = await User.create({
    username: username,
    email: email,
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user was created successfully',
    newUser,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { username, email } = req.body;

  await user.update({ username, email });

  res.json({
    status: 'success',
    message: 'The user has been updated succesfully',
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted successfully',
  });
});
