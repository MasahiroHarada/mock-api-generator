const express = require('express');
const router = express.Router();

const indexAction = require('../actions/index');
const createAction = require('../actions/create');
const callAction = require('../actions/call');

/* GET home page. */
router.get('/', indexAction);

/* POST new mock */
router.post('/create', createAction);

/* GET call mock api */
router.get('/call/:mockId', callAction);

module.exports = router;
