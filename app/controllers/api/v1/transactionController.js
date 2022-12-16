const Sequelize = require('sequelize');
const transactionService = require('../../../services/transactionService');
const productService = require('../../../services/productService');
const cartService = require('../../../services/cartService');
const { User, Product } = require('../../../models');
const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.YOUR_SERVER_KEY,
  clientKey: process.env.YOUR_CLIENT_KEY,
});

module.exports = {
  createTransactionToken: async (req, res) => {
    const parameter = {
      transaction_details: {
        order_id: req.body.invoice,
        gross_amount: req.body.gross_amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.body.name,
        last_name: '',
        email: req.body.email,
        phone: req.body.phone,
        billing_address: {
          first_name: req.body.name,
          last_name: '',
          phone: req.body.phone,
          address: req.body.address,
          city: req.body.district,
          postal_code: '61252',
          country_code: 'IDN',
        },
        shipping_address: {
          first_name: req.body.name,
          last_name: '',
          phone: req.body.phone,
          address: req.body.address,
          city: req.body.district,
          postal_code: '61252',
          country_code: 'IDN',
        },
      },
    };
    try {
      const transactionMidtrans = await snap.createTransaction(parameter);
      const transaction = await transactionService.create({
        ...req.body,
        id_user: req.user.id,
        token: transactionMidtrans.token,
        redirect_url: transactionMidtrans.redirect_url,
      });

      const detailProducts = req.body.detail;

      detailProducts.forEach(async (detail) => {
        const product = await productService.getOne({
          where: { id: detail.id_product },
        });

        const newQuantity = product.quantity - detail.quantity;

        await productService.update(product.id, { quantity: newQuantity, ...product });
        await cartService.delete(detail.id_cart);
      });

      await res.status(201).json({
        status: 'Successfully created transaction',
        transactionMidtrans,
        transaction,
      });
    } catch (error) {
      res.status(500).json({
        status: 'Fail',
        message: error.message,
      });
    }
  },

  list(req, res) {
    transactionService
      .list({
        where: {
          id_user: req.user.id,
        },
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
    transactionService
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

    const cartUser = await transactionService.getOne({
      where: { id_user: req.user.id, id_product },
    });

    if (!cartUser) {
      res.status(404).json({
        status: 'FAIL',
        message: 'Cart Not Found',
      });
    } else if (type === 'min' && cartUser.quantity - quantity <= 0) {
      await transactionService.delete(cartUser.id);
      res.status(200).json({
        status: 'OK',
        message: 'Data Deleted Successfully',
      });
    } else {
      const cart = await transactionService.update(cartUser.id, {
        quantity: type === 'plus' ? cartUser.quantity + quantity : cartUser.quantity - quantity,
      });
      res.status(200).json({
        status: 'OK',
        data: cart[1],
      });
    }
  },

  delete(req, res) {
    transactionService
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
