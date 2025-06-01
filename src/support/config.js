// src/support/config.js
const { setDefaultTimeout } = require('@cucumber/cucumber');
require('dotenv').config(); // ✅ Load .env variables

setDefaultTimeout(40 * 1000); // ✅ Set 30 seconds timeout globally
