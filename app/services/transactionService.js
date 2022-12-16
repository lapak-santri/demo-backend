const transactionRepository = require('../repositories/transactionRepository');

module.exports = {
  create(requestBody) {
    return transactionRepository.create(requestBody);
  },

  update(id, requestBody) {
    return transactionRepository.update(id, requestBody);
  },

  async list(args) {
    try {
      const transaction = await transactionRepository.findAll(args);
      const transactionCount = await transactionRepository.getTotalTransaction(args);

      return {
        data: transaction,
        count: transactionCount,
      };
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  },

  getOne(key) {
    return transactionRepository.findOne(key);
  },

  delete(id) {
    return transactionRepository.delete(id);
  },
};
