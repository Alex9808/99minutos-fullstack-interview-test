const express = require('express'),
    git = require('nodegit'),
    router = express.Router();
/*
* Call for get all commits of a specific branch
* Query {ref: 'ref of the branch'}
* Response {status_code: 200, body: {name: 'branch shorthand name ex. 'master'', commits: [array of commits]}}
* Commit Body {commit: 'sha reference of the commit', author: {name: 'name of author', email: 'email of author'}, date: 'commit date', message: 'commit message'}
* Error {status_code: 500, body: 'Internal server error'}
*/
router.get('/', (req, res, next) => {
    let ref = req.query.ref;
    let his = [];
    req.app.get('repo').getBranchCommit(ref).then(commit => {
        let history = commit.history(git.Revwalk.SORT.TIME);
        history.on("commit", comm => {
            let tmp = {};
            tmp['commit'] = comm.sha();
            tmp['author'] = {name: comm.author().name(), email: comm.author().email()};
            tmp['date'] = comm.date();
            tmp['message'] = comm.message();
            his.push(tmp);
        });
        history.on('end', async () => {
            let branchDetail = await req.app.get('repo').getBranch(ref);
            res.json({name: branchDetail.shorthand(), commits: his});
        })
        history.start();
    });

});
/*
* Call for get detail of a commit
* Params {commit: 'commit id'}
* Response {status_code: 200, body: {commit: 'sha reference of the commit', author: {name: 'name of author', email: 'email of author'}, date: 'commit date', message: 'commit message', tree: ['array of file names']}}
* Error {status_code: 500, body: 'Internal server error'}
*/
router.get('/:commit', (req, res) => {
    let obj = {};
    req.app.get('repo').getCommit(req.params.commit).then(commit => {
        obj['commit'] = commit.sha();
        obj['author'] = {name: commit.author().name(), email: commit.author().email()};
        obj['date'] = commit.date();
        obj['message'] = commit.message();
        obj['tree'] = [];
        return commit.getDiff();
    }).then(diffs => {

        diffs.forEach(diff => {
            diff.patches().then(patches => {
                patches.forEach(patch => {
                    obj['tree'].push({old: patch.oldFile().path(), new: patch.newFile().path()})
                })
                res.json(obj);
            });
        });
    })
})

module.exports = router;