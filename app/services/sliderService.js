const sliderRepository = require('../repositories/sliderRepository');

module.exports = {
  create(requestBody) {
    return sliderRepository.create(requestBody);
  },

  update(id, requestBody) {
    return sliderRepository.update(id, requestBody);
  },

  async list(args) {
    try {
      const slider = await sliderRepository.findAll(args);
      const sliderCount = await sliderRepository.getTotalSlider(args);

      return {
        data: slider,
        count: sliderCount,
      };
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  },

  getOne(key) {
    return sliderRepository.findOne(key);
  },

  delete(id) {
    return sliderRepository.delete(id);
  },
};
