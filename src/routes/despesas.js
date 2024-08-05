const express = require('express');
const mysql = require('../config/db').pool;
const router = express.Router();
const { format, parse } = require('date-fns');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    const date = new Date();
    const primeiroDiaMes = new Date(date.getFullYear(), date.getMonth(), 1);
    const ultimoDiaMes = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const formatadoPrimeiroDiaMes= primeiroDiaMes.toISOString().replace('T', ' ');
    const formatadoUltimoDiaMes = ultimoDiaMes.toISOString().replace('T', ' ');

    mysql.getConnection((error, connection) => {
        if (error) { return res.status(500).send({ data: error, success: false }) }
        connection.query(
            `SELECT * FROM despesas WHERE data_compra >= '${formatadoPrimeiroDiaMes}' AND data_compra <= '${formatadoUltimoDiaMes}';`,
            (error, resultado) => {
                if (error) {
                    return res.status(400).send({
                        data: error,
                        success: false
                    });
                }

                if (resultado.length === 0) {
                    return res.status(200).send({
                        data: null,
                        success: true
                    });
                }

                const dadosFormatados = resultado.map(row => {
                    row.data_compra = format(row.data_compra, 'dd-MM-yyyy HH:mm:ss');
                    return row;
                });

                return res.status(200).send({
                    data: dadosFormatados,
                    success: true
                });
            }
        )
    });
});

router.post(
    '/',
    [
        body('valor')
            .isFloat({ min: 0 }).withMessage('Valor deve ser um número real maior ou igual a 0'),
        body('data_compra')
            .matches(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/)
            .withMessage('Data de compra deve estar no formato dd-MM-yyyy HH:mm:ss'),
        body('descricao')
            .isString().withMessage('Descrição deve ser um texto')
            .isLength({ max: 50 }).withMessage('Descrição deve ter no máximo 50 caracteres'),
        body('categorias_id')
            .isInt({ min: 1, max: 10 }).withMessage('Categoria deve estar entre 1 e 10'),
        body('tipos_pagamento_id')
            .isInt({ min: 1, max: 4 }).withMessage('Tipo de pagamento deve estar entre 1 e 4')
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                data: errors.array(),
                success: false
            });
        }

        const dataParsed = parse(req.body.data_compra, 'dd-MM-yyyy HH:mm:ss', new Date());

        const dataFormatada = format(dataParsed, 'yyyy-MM-dd HH:mm:ss');

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