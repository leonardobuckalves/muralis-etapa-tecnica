const express = require('express');
const mysql = require('../config/db').pool;
const router = express.Router();

router.get('/teste', (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({
                data: error,
                success: false
            });
        }
        connection.query(`
            INSERT INTO gerenciadordespesas.tipos_pagamento (tipo) 
            VALUES ('Dinheiro'), ('Débito'), ('Crédito'), ('Pix')`,
            (error, resultado) => {
                connection.release();
                if (error) {
                    return res.status(500).send({
                        data: error,
                        sucess: false
                    });
                }
                res.status(200).send({
                    data: null,
                    sucess: true
                });
            }
        )
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        data: "id",
        sucess: true
    });
});

module.exports = router;