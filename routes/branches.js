const express = require('express'),
    git = require('nodegit'),
    router = express.Router();
/*
* Call for get all repository branches
* Response {status_code: 200, body: [array of branches]}
* Error: {status_code: 500, body: 'Internal server error'}
*/
router.get('/', async (req, res, next) => {
    try {

        let refNames = await req.app.get('repo').getReferenceNames(git.Reference.TYPE.ALL);
        let branches = [];
        for (const _refName of refNames) {
            let ref = await req.app.get('repo').getReference(_refName);
            if (ref.isConcrete())
                branches.push({name: ref.shorthand(), ref_name: ref.name()});
        }
        res.json(branches);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

module.exports = router;
