const Sequelize = require('sequelize');
const cartService = require('../../../services/cartService');
const { User, Product } = require('../../../models');
const { Op } = Sequelize;

module.exports = {
  async create(req, res) {
    const payload = req.body.map((item) => {
      return {
        ...item,
        id_user: req.user.id,
      };
    });

    try {
      const cart = await cartService.create(payload);
      res.status(201).json({
        status: 'OK',
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  },

  list(req, res) {
    cartService
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
    cartService
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

  async update(req, res) {
    const { type, quantity, id_product } = req.body;
    console.log('req.body', req.body);

    const cartUser = await cartService.getOne({
      where: { id_user: req.user.id, id_product },
    });

    if (!cartUser) {
      res.status(404).json({
        status: 'FAIL',
        message: 'Cart Not Found',
      });
    } else if (type === 'min' && cartUser.quantity - quantity <= 0) {
      await cartService.delete(cartUser.id);
      res.status(200).json({
        status: 'OK',
        message: 'Data Deleted Successfully',
      });
    } else {
      const cart = await cartService.update(cartUser.id, {
        quantity: type === 'plus' ? cartUser.quantity + quantity : cartUser.quantity - quantity,
      });
      res.status(200).json({
        status: 'OK',
        data: cart[1],
      });
    }
  },

  delete(req, res) {
    cartService
      .delete(req.user.id)
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Data Deleted Successfully',
        });
      })
      .catch((err) => {
        res.status(401).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },
};
