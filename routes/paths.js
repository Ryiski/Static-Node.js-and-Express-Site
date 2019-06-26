const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const projects = require('../data/data.json');
const fs = require('fs');
const path = require('path');

// Homepage path
router.get('/', (req, res) => {
    res.render('index', projects);
});

// About path
router.get('/about', (req, res) => {
    res.render('about');
});

// Report path
router.get('/report', (req, res) => {
    res.render('report');
});

// get submitted data and save it to reports.txt in data folder
router.post('/report', (req, res) => {
    if (req.body.username === '') req.body.username = 'anonymous';
    if (req.body.usermail === '') req.body.usermail = 'anonymous';
    if (req.body.message === '') req.body.message = 'no report';
    fs.appendFile(
        path.join(__dirname, '../data', 'reports.txt'),
        `{
    Name :- ${req.body.username},
    Email :- ${req.body.usermail},
    Report :- ${req.body.message}
    }
    `, // error handler if nothing was writen to txt file
        (err) => {
            if (err) throw err;
        }
    );
    res.status(200).end();
});

module.exports = router;
