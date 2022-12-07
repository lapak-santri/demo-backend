const { Transaction } = require('../models');

module.exports = {
  create(createArgs) {
    return Transaction.create(createArgs);
  },

  update(id, updateArgs) {
    return Transaction.update(updateArgs, {
      where: {
        id,
      },
      returning: true,
    });
  },

  findOne(key) {
    return Transaction.findOne(key);
  },

  findAll(args) {
    return Transaction.findAll(args);
  },

  getTotalTransaction(args) {
    return Transaction.count(args);
  },

  delete(id) {
    return Transaction.destroy({
      where: {
        id_user: id,
      },
    });
  },
};
