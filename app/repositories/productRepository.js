const { Product } = require('../models');

module.exports = {
  create(createArgs) {
    return Product.create(createArgs);
  },

  update(id, updateArgs) {
    return Product.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  findOne(key) {
    return Product.findOne(key);
  },

  findAll(args) {
    return Product.findAll(args);
  },

  getTotalProduct(args) {
    return Product.count(args);
  },

  delete(id) {
    return Product.destroy({
      where: {
        id,
      },
    });
  },
};
