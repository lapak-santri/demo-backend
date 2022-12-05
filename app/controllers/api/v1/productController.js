const Sequelize = require('sequelize');
const productService = require('../../../services/productService');
const { User } = require('../../../models');
const { Op } = Sequelize;

module.exports = {
  create(req, res) {
    req.body.id_user = req.user.id;

    productService
      .create(req.body)
      .then((product) => {
        res.status(201).json({
          status: 'OK',
          data: product,
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
    productService
      .list({
        include: [
          {
            model: User,
          },
        ],
        order: [['id', 'DESC']],
      })
      .then((data, count) => {
        let result;
        res.status(200).json({
          status: 'OK',
          total: count,
          data,
        });
      });
  },

  show(req, res) {
    productService
      .getOne({
        where: { id: req.params.id },
        include: [
          {
            model: User,
            include: { all: true },
          },
        ],
      })
      .then((product) => {
        res.status(200).json({
          status: 'OK',
          data: product,
        });
      });
  },

  update(req, res) {
    req.body.id_user = req.user.id;
    productService.update(req.params.id, req.body).then(() => {
      res.status(200).json({
        status: 'OK',
        message: 'Data Updated Successfully',
      });
    });
  },

  delete(req, res) {
    productService.delete(req.params.id).then(() => {
      res.status(200).json({
        status: 'OK',
        message: 'Data Deleted Successfully',
      });
    });
  },
};
