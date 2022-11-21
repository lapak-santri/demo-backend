const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = {
  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split('Bearer ')[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'rahasia');

      // console.log('tes');
      // res.status(201).json({
      //   status: 'OK',
      //   messasge: 'berhasil',
      // });

      req.user = await userService.get(tokenPayload.id);
      next();
    } catch (err) {
      res.status(401).json({
        error: err.message,
        message: 'Please login first',
      });
    }
  },
};
