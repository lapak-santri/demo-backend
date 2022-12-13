const Sequelize = require('sequelize');
const addressService = require('../../../services/addressService');
const { User } = require('../../../models');

module.exports = {
  create(req, res) {
    req.body.id_user = req.user.id;
    console.log(req.body);

    addressService
      .create(req.body)
      .then((address) => {
        res.status(201).json({
          status: 'Address Added Successfully',
          data: address,
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
    addressService
      .list({
        where: {
          id_user: req.user.id,
        },
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
    addressService
      .getOne({
        where: { id: req.params.id },
        include: [
          {
            model: User,
            include: { all: true },
          },
        ],
      })
      .then((address) => {
        res.status(200).json({
          status: 'OK',
          data: address,
        });
      });
  },

  update(req, res) {
    req.body.id_user = req.user.id;
    addressService.update(req.params.id, req.body).then((address) => {
      res.status(200).json({
        status: 'OK',
        message: 'Address Updated Successfully',
        data: address[1],
      });
    });
  },

  delete(req, res) {
    addressService.delete(req.params.id).then(() => {
      res.status(200).json({
        status: 'OK',
        message: 'Address Deleted Successfully',
      });
    });
  },
};
