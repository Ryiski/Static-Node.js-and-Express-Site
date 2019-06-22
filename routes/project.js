/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

router.get('/', (req, res) => {
    res.redirect('/project/1');
});

router.get('/:reqId', (req, res) => {
    const { reqId } = req.params;
    const isId = projects.filter((num) => num.id === parseInt(reqId));
    console.log(reqId);
    console.log(isId);
    if (isId.length !== 0) {
        req.query = 'test';
        const display = projects[reqId - 1];
        return res.render('project', { display });
    } else {
        res.locals.error = { message: 'test', status: 404, stack: 'go back' };
        res.locals.url = `${req.protocol}://${req.get('host') + req.originalUrl}`;
        return res.render('error');
    }
});

module.exports = router;
