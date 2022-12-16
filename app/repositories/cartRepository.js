const { Cart } = require('../models');

module.exports = {
  create(createArgs) {
    return Cart.bulkCreate(createArgs);
  },

  update(id, updateArgs) {
    return Cart.update(updateArgs, {
      where: {
        id,
      },
      returning: true,
    });
  },

  findOne(key) {
    return Cart.findOne(key);
  },

  findAll(args) {
    return Cart.findAll(args);
  },

  getTotalCart(args) {
    return Cart.count(args);
  },

  delete(id) {
    return Cart.destroy({
      where: {
        id,
      },
    });
  },
};
