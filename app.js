const express = require('express');
// eslint-disable-next-line no-unused-vars
const { data } = require('./data/data.json');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes');
const projectRoutes = require('./routes/project');

const app = express();

app.set('view engine', 'pug');

app.use(mainRoutes);
app.use('/project', projectRoutes);
app.use('/static', express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.locals.url = `${req.protocol}://${req.get('host') + req.originalUrl}`;
    res.status(err.status);
    res.render('error');
});

const PORT = process.env.PORT || 3000;
// start web server
app.listen(PORT, () => console.log(`Web server lissstening on port ${PORT}`));
