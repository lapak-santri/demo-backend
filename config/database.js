require('dotenv').config();
/** Destruct environment variable to get database configuration */
const {
  DB_USER = '',
  DB_PASSWORD = '',
  DB_HOST = '127.0.0.1',
  DB_NAME = 'final_project',
  DB_PORT = '5432',
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: 'xsjwrtoz',
    password: 'g3G3a4livZTFFJnsKTC6omlrWavVW6l5',
    database: `xsjwrtoz`,
    host: 'john.db.elephantsql.com',
    port: '5432',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
