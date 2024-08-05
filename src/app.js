const express = require('express');
const app = express();
const rotaDespesas = require('./routes/despesas');
const dbInitializer = require('../scripts/dbInitializer');

require('dotenv').config();

dbInitializer();

app.use('/api/despesas', rotaDespesas);

app.use((req, res, next) => {
    const erro = new Error("Rota não encontrada");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        data: error.message,
        success: false
    });
});

module.exports = app;