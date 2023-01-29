const User = require('../models/user.model');

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'The users were found successfully',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.findUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'The user found was successfully',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.createNewUser = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { username, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }

    const updatedUser = await user.update({ username, email });

    res.json({
      status: 'success',
      message: 'The user has been updated succesfully',
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }

    await user.update({ status: 'disabled' });

    res.status(200).json({
      status: 'success',
      message: 'The user has been deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
