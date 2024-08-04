const express = require('express');
const app = express();
require('dotenv').config();

const rotaDespesas = require('./routes/despesas');
const dbInitializer = require('../scripts/dbInitializer');

dbInitializer();

app.use('/api/despesas', rotaDespesas);

module.exports = app;