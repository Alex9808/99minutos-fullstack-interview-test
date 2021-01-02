const express = require('express'),
    git = require('nodegit'),
    path = require("path"),
    fs = require("fs"),
    rimraf = require("rimraf"),
    {PrismaClient} = require('../prisma/prisma-client'),
    prisma = new PrismaClient(),
    router = express.Router();

/*
* Call for open repo from tmp directory
* Response {status_code: 201, body: {name: 'Repository name', url: 'Repository url'}}
* Error: {status_code: 500, body: 'Internal server error'}
*/
router.get('/', (req, res) => {
    let repoPath = path.resolve(__dirname, '../tmp');
    if (!fs.existsSync(repoPath)) {
        return res.status(500).json({msg: 'Call "/api/repo/clone" first'});
    }
    git.Repository.open(repoPath).then(repo => {
        req.repo = repo;
        repo.config().then(config => {
            config.getStringBuf("remote.origin.url").then(buf => {
                let url = buf.toString();
                let tmp = url.split('/');
                let name = tmp[tmp.length - 1].replace('.git', '');
                res.status(201).json({name, url});
            })
        })
    }).catch(e => {
        console.error(e);
        res.status(500).end();
    });
});
/*
* Call for clone a repo to tmp directory
* Body {url: string, required: true}
* Response {status_code: 201, body: {name: 'Repository name', url: 'Repository url'}}
* Error: {status_code: 500, body: 'Internal server error'}
*/
router.post('/clone', (req, res) => {
    let {repo_url} = req.body;
    let repoPath = path.resolve(__dirname, '../tmp');
    if (fs.existsSync(repoPath)) {
        return res.json({msg: 'Another repository exists'})
    }
    git.Clone(repo_url, repoPath).then(repo => {
        req.repo = repo;
        repo.config().then(config => {
            config.getStringBuf("remote.origin.url").then(buf => {
                let url = buf.toString();
                let tmp = url.split('/');
                let name = tmp[tmp.length - 1].replace('.git', '');
                res.status(201).json({name, url});
            })
        })
    });

});
/*
* Call for delete tmp folder and remove all entries of prs in db
* Response {status_code: 200, body: {msg: 'Deleted'}}
*/
router.delete('/', async (req, res) => {
    req.repo = undefined;
    let repoPath = path.resolve(__dirname, '../tmp');
    await prisma.prs.deleteMany();
    rimraf(repoPath, {}, () => {
        res.json({msg: 'Deleted'});
    });
});

module.exports = router;
