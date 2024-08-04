const express = require('express');
const mysql = require('../config/db').pool;
const router = express.Router();
const { format } = require('date-fns');

router.get('/', (req, res) => {
    mysql.getConnection((error, connection) => {
        if (error) { return res.status(500).send({ data: error, success: false }) }
        connection.query(
            `SELECT * FROM despesas;`,
            (error, resultado) => {
                if (error) {
                    return res.status(400).send({
                        data: error,
                        success: false
                    });
                }
                return res.status(200).send({
                    data: resultado,
                    success: true
                });
            }
        )
    });
});

router.post('/', (req, res) => {
    const dataFormatada = format(req.body.data_compra, 'yyyy-MM-dd HH:mm:ss');

    mysql.getConnection((error, connection) => {
        if (error) { return res.status(500).send({ data: error, success: false }) }
        connection.query(
            'INSERT INTO despesas (valor, data_compra, descricao, categorias_id, tipos_pagamento_id) VALUES (?, ?, ?, ?, ?)',
            [req.body.valor, dataFormatada, req.body.descricao, req.body.categorias_id, req.body.tipos_pagamento_id],
            (error, resultado) => {
                connection.release();
                if (error) {
                    return res.status(400).send({
                        data: error,
                        sucess: false
                    });
                }
                res.status(201).send({
                    data: resultado.insertId,
                    success: true
                })
            }
        )
    });
});

module.exports = router;