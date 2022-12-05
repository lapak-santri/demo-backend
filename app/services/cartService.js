const cartRepository = require('../repositories/cartRepository');

module.exports = {
  create(requestBody) {
    return cartRepository.create(requestBody);
  },

  update(id, requestBody) {
    return cartRepository.update(id, requestBody);
  },

  async list(args) {
    try {
      const cart = await cartRepository.findAll(args);
      const cartCount = await cartRepository.getTotalCart(args);

      return {
        data: cart,
        count: cartCount,
      };
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  },

  getOne(key) {
    return cartRepository.findOne(key);
  },

  delete(id) {
    return cartRepository.delete(id);
  },
};
