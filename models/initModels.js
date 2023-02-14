const Repair = require('./repair.model');
const User = require('./user.model');

const initModel = () => {
  /* 1User <------> Nrepair */
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
