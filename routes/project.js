/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

// Project path
router.get('/', (req, res) => {
    res.redirect('/project/1');
});

// Project path with an id param
router.get('/:reqId', (req, res) => {
    // reqId value
    const { reqId } = req.params;
    // filters out projects
    const isId = projects.filter((num) => num.id === parseInt(reqId));
    // if isId array length is empty, render error.pug and show custome message
    if (isId.length === 0) {
        res.locals.error = {
            message: 'Project Not Found',
            status: 404,
            stack: 'You do not belong here, Go back where you came from!!',
        };
        res.locals.url = `${req.protocol}://${req.get('host') + req.originalUrl}`;
        return res.render('error');
    }
    // if reqId id is a match, render project.pug and show requested project
    req.query = 'test';
    const display = projects[reqId - 1];
    res.render('project', { display });
});

module.exports = router;
