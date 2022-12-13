const { Address } = require('../models');

module.exports = {
  create(createArgs) {
    console.log(createArgs);
    return Address.create(createArgs);
  },

  update(id, updateArgs) {
    return Address.update(updateArgs, {
      where: {
        id,
      },
      returning: true,
    });
  },

  findOne(key) {
    return Address.findOne(key);
  },

  findAll(args) {
    return Address.findAll(args);
  },

  getTotalAddress(args) {
    return Address.count(args);
  },

  delete(id) {
    return Address.destroy({
      where: {
        id,
      },
    });
  },
};
