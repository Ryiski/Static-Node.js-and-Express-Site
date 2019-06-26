const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const { data } = require('./data/data.json');
const routes = require('./routes/paths');
const projectRoutes = require('./routes/project');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());
// Middleware
app.set('view engine', 'pug');
// Routes
app.use(routes);
// Projects routes
app.use('/project', projectRoutes);
// Set static folder
app.use('/static', express.static('public'));

// Middleware which will throw a error if no routes were a match
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// Error handler middleware
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.locals.url = `${req.protocol}://${req.get('host') + req.originalUrl}`;
    console.error(`nice try but ${res.locals.url} does not exist`);
    res.status(err.status).render('error');
});

const PORT = process.env.PORT || 3000;
// start web server
app.listen(PORT, () => console.log(`Web server listening on port ${PORT}`));
