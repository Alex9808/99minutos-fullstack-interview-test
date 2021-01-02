const express = require('express'),
    git = require('nodegit'),
    path = require("path"),
    fs = require('fs'),
    {PrismaClient} = require('../prisma/prisma-client'),
    prisma = new PrismaClient(),
    router = express.Router();

/*
* Call for open repo from tmp directory
* Response {status_code: 200, body: {name: 'Repository name', url: 'Repository url'}}
* Error: {status_code: 500, body: 'Internal server error'}
*/
router.get('/', async (req, res) => {
    try {
        const repoPath = path.resolve(__dirname, '../tmp');
        const repo = await git.Repository.open(repoPath);
        const details = await getRepoDetail(repo);
        req.app.set('repo', repo);
        res.json(details);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});
/*
* Call for clone a repo to tmp directory
* Body {repo_url: string, required: true}
* Response {status_code: 201, body: {name: 'Repository name', url: 'Repository url'}}
* Error: {status_code: 500, body: 'Internal server error'}
*/
router.post('/clone', async (req, res) => {
    try {
        await prisma.prs.deleteMany();
    }catch (e) {
        // No entries in  pull requests
        console.log(e);
    }
    try {
        const {repo_url} = req.body;
        const repoPath = path.resolve(__dirname, '../tmp');
        const repo = await clone(repoPath, repo_url);
        const details = await getRepoDetail(repo);
        req.app.set('repo', repo);
        res.status(201).json(details);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

const clone = async (repoPath, repoUrl) => await git.Clone.clone(repoUrl, repoPath, {local: 2})

async function getRepoDetail(repo) {
    const config = await repo.config();
    const buf = await config.getStringBuf("remote.origin.url");
    let url = buf.toString();
    let tmp = url.split('/');
    let name = tmp[tmp.length - 1].replace('.git', '');
    return {name, url};
}

/*
* Call for delete tmp folder and remove all entries of prs in db
* Response {status_code: 200, body: {msg: 'Deleted'}}
Not supported
router.delete('/', async (req, res) => {
    const repoPath = path.resolve(path.join(__dirname, '../tmp'));
    await prisma.prs.deleteMany();
    req.app.set('repo', undefined);
    deleteFolderRecursive(repoPath);
    rimraf(repoPath, {}, (err) => {
        if(err) console.log(err);
    })
    *//*res.status(200).end();

});

const deleteFolderRecursive = (path) => {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            const curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};*/

module.exports = router;
