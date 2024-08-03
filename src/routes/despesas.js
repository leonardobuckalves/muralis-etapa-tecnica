const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        data: null,
        sucess: true
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        data: "id",
        sucess: true
    });
});

module.exports = router;