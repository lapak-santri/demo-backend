const Sequelize = require('sequelize');
const articleService = require('../../../services/articleService');

module.exports = {
  create(req, res) {
    articleService
      .create(req.body)
      .then((article) => {
        res.status(201).json({
          status: 'OK',
          data: article,
        });
      })
      .catch((err) => {
        res.status(401).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  list(req, res) {
    articleService
      .list({
        order: [['id', 'DESC']],
      })
      .then((data, count) => {
        res.status(200).json({
          status: 'OK',
          total: count,
          data,
        });
      });
  },

  show(req, res) {
    articleService
      .getOne({
        where: { id: req.params.id },
      })
      .then((data) => {
        res.status(200).json({
          status: 'OK',
          data,
        });
      })
      .catch((err) => {
        res.status(401).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  update(req, res) {
    articleService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Article updated successfully',
        });
      })
      .catch((err) => {
        res.status(401).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  delete(req, res) {
    articleService.delete(req.params.id).then(() => {
      res.status(200).json({
        status: 'OK',
        message: 'Article deleted successfully',
      });
    });
  },
};
