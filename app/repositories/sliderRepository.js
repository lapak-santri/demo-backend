const { Slider } = require('../models');

module.exports = {
  create(createArgs) {
    return Slider.create(createArgs);
  },

  update(id, updateArgs) {
    console.log('updateArgs', updateArgs);
    console.log('id', id);
    return Slider.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  findOne(key) {
    return Slider.findOne(key);
  },

  findAll(args) {
    return Slider.findAll(args);
  },

  getTotalSlider(args) {
    return Slider.count(args);
  },

  delete(id) {
    return Slider.destroy({
      where: {
        id,
      },
    });
  },
};
