const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersService = require('../../../services/userService');

module.exports = {
  async register(req, res) {
    const { name, email, password, phone, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    usersService
      .create({
        name,
        phone,
        address,
        email: email.toLowerCase(),
        password: hashedPassword,
      })
      .then((createdUser) => {
        res.status(201).json({
          status: 'Success',
          message: 'User Successfully Registered!',
          data: {
            name,
            id: createdUser.id,
            email,
            phone,
            address,
          },
        });
      });
  },

  async login(req, res) {
    const { user } = req;

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      process.env.JWT_PRIVATE_KEY || 'rahasia',
      {
        expiresIn: '24h',
      }
    );

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },

  async getData(req, res) {
    usersService.get(req.user.id).then((user) => {
      res.status(200).json({
        status: 'OK',
        data: user,
      });
    });
  },

  update(req, res) {
    usersService.update(req.user.id, req.body).then(() => {
      res.status(200).json({
        status: 'OK',
        message: 'Data success updated!!',
      });
    });
  },

  addWishlist(req, res) {
    const { wishlist } = req.user;
    const addData = [req.body.id_product, ...wishlist];

    usersService
      .update(req.user.id, { wishlist: addData })
      .then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Data success updated!!',
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: 'FAIL',
          message: err.message,
        });
      });
  },

  deleteWishlist(req, res) {
    const { wishlist } = req.user;
    const deleteData = wishlist.filter((element) => element !== req.body.id_product);

    usersService.update(req.user.id, { wishlist: deleteData }).then(() => {
      res.status(200).json({
        status: 'OK',
        message: 'Data success updated!!',
      });
    });
  },
};
