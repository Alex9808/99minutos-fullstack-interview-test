const express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    git = require('nodegit');

const indexRouter = require('./routes/index');
const branchesRouter = require('./routes/branches');
const commitsRouter = require('./routes/commits');
const prsRouter = require('./routes/prs');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/repo', indexRouter); // Router for repo endpoints
// Middleware helper for open repo on each request
app.use((req, res, next) => {
    if(req.url === '/api/repo/clone' || req.url === '/api/repo/')
        return next();
    git.Repository.open("tmp").then(repo => {
        req.repo = repo;
        next();
    }).catch(e => {
        console.error(e);
        res.status(500).send('Call "/api/repo/clone" first');
    });
});
app.use('/api/branches', branchesRouter); // Router for Branches endpoint
app.use('/api/commits', commitsRouter); // Router for Commits Endpoint
app.use('/api/prs', prsRouter); // Router for PRS endpoint


module.exports = app;
