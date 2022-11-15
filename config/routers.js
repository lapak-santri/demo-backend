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
