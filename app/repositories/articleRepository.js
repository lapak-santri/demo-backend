const { Article } = require('../models');

module.exports = {
  create(createArgs) {
    return Article.create(createArgs);
  },

  update(id, updateArgs) {
    console.log('updateArgs', updateArgs);
    console.log('id', id);
    return Article.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  findOne(key) {
    return Article.findOne(key);
  },

  findAll(args) {
    return Article.findAll(args);
  },

  getTotalArticle(args) {
    return Article.count(args);
  },

  delete(id) {
    return Article.destroy({
      where: {
        id,
      },
    });
  },
};
