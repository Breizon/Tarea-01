const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: User,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'The repairs were found successfully',
    repairs,
  });
});

exports.findRepairById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    status: 'success',
    message: 'The repair was found successfully',
    repair,
  });
});

exports.createNewRepair = catchAsync(async (req, res, next) => {
  const { date, userId } = req.body;

  const createRepair = await Repair.create({
    date,
    userId,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user was created successfully',
    createRepair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  const { status } = req.body;

  await repair.update({ status: 'completed' });

  res.json({
    status: 'success',
    message: 'The repair has been updated succesfully',
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'The repair has been deleted successfully',
  });
});
