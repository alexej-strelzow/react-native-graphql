export const loadConfig = () => {
  const config = require('dotenv').config;
  config();
};
