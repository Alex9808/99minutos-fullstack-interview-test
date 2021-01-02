const express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path');

const indexRouter = require('./routes/index');
const branchesRouter = require('./routes/branches');
const commitsRouter = require('./routes/commits');
const prsRouter = require('./routes/prs');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/api/repo', indexRouter); // Router for repo endpoints
app.use('/api/branches', branchesRouter); // Router for Branches endpoint
app.use('/api/commits', commitsRouter); // Router for Commits Endpoint
app.use('/api/prs', prsRouter); // Router for PRS endpoint

module.exports = app;
