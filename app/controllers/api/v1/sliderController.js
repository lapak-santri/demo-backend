const Sequelize = require('sequelize');
const sliderService = require('../../../services/sliderService');
const { User } = require('../../../models');
const { Op } = Sequelize;

module.exports = {
  create(req, res) {
    sliderService
      .create(req.body)
      .then((slider) => {
        res.status(201).json({
          status: 'OK',
          data: slider,
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
    sliderService
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
    sliderService
      .getOne({
        where: { id: req.params.id },
      })
      .then((data) => {
        res.status(200).json({
          status: 'OK',
          data,
        });
      });
  },

  update(req, res) {
    sliderService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Data Updated Successfully',
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
    sliderService.delete(req.params.id).then(() => {
      res.status(200).json({
        status: 'OK',
        message: 'Slider deleted Successfully',
      });
    });
  },
};
