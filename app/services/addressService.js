const addressRepository = require('../repositories/addressRepository');

module.exports = {
  create(requestBody) {
    return addressRepository.create(requestBody);
  },

  update(id, requestBody) {
    return addressRepository.update(id, requestBody);
  },

  async list(args) {
    try {
      const address = await addressRepository.findAll(args);
      const addressCount = await addressRepository.getTotalAddress(args);

      return {
        data: address,
        count: addressCount,
      };
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  },

  getOne(key) {
    return addressRepository.findOne(key);
  },

  delete(id) {
    return addressRepository.delete(id);
  },
};
