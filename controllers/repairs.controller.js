const Repair = require('../models/repair.model');

exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending',
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'The repairs were found successfully',
      repairs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.findRepairById = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'The repair was found successfully',
      repair,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.createNewRepair = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }

    const updatedRepair = await repair.update({ status: 'completed' });

    res.json({
      status: 'success',
      message: 'The repair has been updated succesfully',
      updatedRepair,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }

    await repair.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
      message: 'The repair has been deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
