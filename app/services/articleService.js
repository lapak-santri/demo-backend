const articleRepository = require('../repositories/articleRepository');

module.exports = {
  create(requestBody) {
    return articleRepository.create(requestBody);
  },

  update(id, requestBody) {
    return articleRepository.update(id, requestBody);
  },

  async list(args) {
    try {
      const article = await articleRepository.findAll(args);
      const articleCount = await articleRepository.getTotalArticle(args);

      return {
        data: article,
        count: articleCount,
      };
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  },

  getOne(key) {
    return articleRepository.findOne(key);
  },

  delete(id) {
    return articleRepository.delete(id);
  },
};
