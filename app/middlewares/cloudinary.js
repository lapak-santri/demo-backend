// Require the Cloudinary library
require('dotenv').config();
const { config, uploader } = require('cloudinary').v2;

const cloudinaryConfig = () => config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = { cloudinaryConfig, uploader };
