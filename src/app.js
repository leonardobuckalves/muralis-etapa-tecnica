const express = require('express');
const app = express();
require('dotenv').config();

const rotaDespesas = require('./routes/despesas');

app.use('/api/despesas', rotaDespesas);

module.exports = app;