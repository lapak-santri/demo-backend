const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const controllers = require('../app/controllers');
const middlewares = require('../app/middlewares');
const uploadOnMemory = require('../app/middlewares/uploadOnMemory.');
const { multerUploads } = require('../app/middlewares/multerUpload');

const swaggerDocument = require('../docs/swagger.json');

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get('/', controllers.main.index);

// USER ROUTE
appRouter.post(
  '/api/v1/register',
  middlewares.checkCondition.checkCondition,
  controllers.api.v1.userController.register
);

appRouter.post(
  '/api/v1/login',
  middlewares.checkValidation.checkData,
  controllers.api.v1.userController.login
);

appRouter.get(
  '/api/v1/user',
  middlewares.authorization.authorize,
  controllers.api.v1.userController.getData
);

appRouter.post(
  '/api/v1/product',
  middlewares.authorization.authorize,
  multerUploads,
  controllers.api.v1.imageController.multerUploads,
  controllers.api.v1.productController.create
);

appRouter.get('/api/v1/product/:id', controllers.api.v1.productController.show);

appRouter.get('/api/v1/product', controllers.api.v1.productController.list);

appRouter.post(
  '/api/v1/slider',
  middlewares.authorization.authorize,
  multerUploads,
  controllers.api.v1.imageController.multerUploads,
  controllers.api.v1.sliderController.create
);

appRouter.get('/api/v1/slider', controllers.api.v1.sliderController.list);

appRouter.get('/api/v1/slider/:id', controllers.api.v1.sliderController.show);

appRouter.put(
  '/api/v1/slider/:id',
  middlewares.authorization.authorize,
  multerUploads,
  controllers.api.v1.imageController.multerUploads,
  controllers.api.v1.sliderController.update
);

appRouter.delete(
  '/api/v1/slider/:id',
  middlewares.authorization.authorize,
  controllers.api.v1.sliderController.delete
);

appRouter.post(
  '/api/v1/article',
  middlewares.authorization.authorize,
  multerUploads,
  controllers.api.v1.imageController.multerUploads,
  controllers.api.v1.articleController.create
);

appRouter.get('/api/v1/article', controllers.api.v1.articleController.list);

appRouter.get('/api/v1/article/:id', controllers.api.v1.articleController.show);

appRouter.put(
  '/api/v1/article/:id',
  middlewares.authorization.authorize,
  multerUploads,
  controllers.api.v1.imageController.multerUploads,
  controllers.api.v1.articleController.update
);

appRouter.delete(
  '/api/v1/article/:id',
  middlewares.authorization.authorize,
  controllers.api.v1.articleController.delete
);

appRouter.post(
  '/api/v1/cart',
  middlewares.authorization.authorize,
  controllers.api.v1.cartController.create
);

appRouter.get(
  '/api/v1/cart',
  middlewares.authorization.authorize,
  controllers.api.v1.cartController.list
);

appRouter.put(
  '/api/v1/cart',
  middlewares.authorization.authorize,
  controllers.api.v1.cartController.update
);

appRouter.delete(
  '/api/v1/cart',
  middlewares.authorization.authorize,
  controllers.api.v1.cartController.delete
);

appRouter.post(
  '/api/v1/address',
  middlewares.authorization.authorize,
  controllers.api.v1.addressController.create
);

appRouter.get(
  '/api/v1/address',
  middlewares.authorization.authorize,
  controllers.api.v1.addressController.list
);

appRouter.put(
  '/api/v1/address/:id',
  middlewares.authorization.authorize,
  controllers.api.v1.addressController.update
);

appRouter.delete(
  '/api/v1/address/:id',
  middlewares.authorization.authorize,
  controllers.api.v1.addressController.delete
);

appRouter.post(
  '/api/v1/transaction',
  middlewares.authorization.authorize,
  controllers.api.v1.transactionController.createTransactionToken
);

appRouter.get(
  '/api/v1/transaction',
  middlewares.authorization.authorize,
  controllers.api.v1.transactionController.list
);

// Open API Document
apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get('/api/v1/errors', () => {
  throw new Error(
    'The Industrial Revolution and its consequences have been a disaster for the human race.'
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get('/errors', () => {
  throw new Error(
    'The Industrial Revolution and its consequences have been a disaster for the human race.'
  );
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;
