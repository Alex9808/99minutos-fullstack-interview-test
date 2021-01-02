const express = require('express'),
    git = require('nodegit'),
    {PrismaClient} = require('../prisma/prisma-client'),
    router = express.Router(),
    prisma = new PrismaClient(); // I use Prisma for DB operations
/*
* Get list of prs in db
* Response {status_code: 200, body: [array of prs]}
* PR Body {description: 'pr description', name: 'pr name', compare_branch: 'pr compare branch name', base_branch: 'pr base branch name', status: 'status of pr', id: 'id of pr', mergedAt: 'pr merged date', createdAt: 'pr created date', authorEmail: 'pr author email', authorName: 'pr author name'}
* Error: {status_code: 500, body: 'Internal Server error'}
*/
router.get('/', async (req, res) => {
    try {
        let prs = await prisma.prs.findMany();
        res.json(prs);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});
/*
* Get a specific pr in db
* Params {pr_id: 'the id of pr'}
* Response {status_code: 200, body: {description: 'pr description', name: 'pr name', compare_branch: 'pr compare branch name', base_branch: 'pr base branch name', status: 'status of pr', id: 'id of pr', mergedAt: 'pr merged date', createdAt: 'pr created date', authorEmail: 'pr author email', authorName: 'pr author name'}}
* Error: {status_code: 500, body: 'Internal Server error'}
*/
router.get('/:pr_id', async (req, res) => {
    try {
        let pr = await prisma.prs.findFirst({where: {id: req.params.pr_id}});
        res.json(pr);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});
/*
* Call to create new PR
* Body {name: string, base_branch: string, compare_branch: string, author: objectOf({authorName: string, authorEmail: string}), status: int}
* Response {status_code: 201, body: {id: 'id of pr'}}
* Error {status_code: 500, body: 'Internal server error'}
* status = {0: 'Open', 1: 'Closed', 2: 'Merged'}
*/
router.post('/', async (req, res) => {
    let {name, description, base_branch, compare_branch, author, status = 0} = req.body;
    let {authorName, authorEmail} = author || {};
    if (!name || !description || !base_branch || !compare_branch)
        return res.status(400).send('Bad Request');
    try {
        let id = Date.now().toString();
        let signature = authorName && authorEmail ? git.Signature.now(authorName, authorEmail) : await git.Signature.default(req.app.get('repo'));
        let mergedAt = null;
        if (status === 2) {
            id = await merge(req.app.get('repo'), base_branch, compare_branch, signature);
            mergedAt = new Date(Date.now());
        }
        await prisma.prs.create({
            data: {
                description: description,
                name: name,
                compare_branch: compare_branch,
                base_branch: base_branch,
                status: status,
                id: id,
                mergedAt: mergedAt || null,
                authorEmail: signature.email(),
                authorName: signature.name(),
            }
        });
        res.status(201).json({id});
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});
/*
* Call to update the status of a pr
* Params {pr_id: 'pr id'}
* Body {status: int <the new status>}
* Response {status_code: 204, body: 'No content'}
* Error: {status_code: 500, body: 'internal server error'}
*/
router.put('/:pr_id/status', async (req, res) => {
    if (req.body.status)
        if (req.body.status > 1)
            return res.status(500).json({msg: 'Invalid status'})
    let pr = await prisma.prs.findFirst({where: {id: req.params.pr_id}});
    if (pr.status === 2)
        return res.status(500).json({msg: 'Pull request is already merged'});
    // let newStatus = req.body.status ? req.body.status : pr.status === 0 ? 1 : 0; // called by client
    await prisma.prs.update({where: {id: req.params.pr_id}, data: {status: req.body.status}});
    res.status(204).send();
});
/*
* Call to merge an pr in db
* Params {pr_id: 'the id of pr'}
* Response {status_code: 204, body: {msg: 'the msg'}}
* Error {status_code: 500, body: 'Internal server error'}
*/
router.put('/:pr_id/merge', async (req, res) => {
    let pr = await prisma.prs.findFirst({where: {id: req.params.pr_id}});
    if (pr.status === 2)
        return res.status(500).json({msg: 'Pull request is already merged'});
    let signature = git.Signature.now(pr.authorName, pr.authorEmail);
    let newId = await merge(req.app.get('repo'), pr.base_branch, pr.compare_branch, signature);
    let mergedAt = new Date(Date.now());
    await prisma.prs.update({where: {id: pr.id}, data: {status: 2, mergedAt: mergedAt, id: newId}});
    res.status(204).json({msg: 'Merged'});
});
// Merge helper function
async function merge(repo, base_branch, compare_branch, signature) {
    return repo.mergeBranches(base_branch, compare_branch, signature, 0, null, null);
}


module.exports = router;