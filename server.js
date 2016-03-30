var connect = require('connect'),
    middlePipe = require('middleware-pipe'),
    multipart = require('connect-multiparty'),
    uid = require('uid2'),
    util = require('util'),
    fs = require('fs'),
    app = connect(),
    db = require('./lib/db'),
    // hard code
    roomid = 123;

app
// TODO: There have a bug about communication.
.use('/sub', function (req, res) {
    db.subscribe(roomid, function (data) {
        res.end(JSON.stringify(data));
    });
}).use('/init', function (req, res) {
    if (db.has(roomid)) {
        res.end(db.get(roomid).stringify());
    } else {
        res.end('{}');
    }
}).use('/upload', multipart())
.use('/upload', function (req, res) {
    var files = req.files, ids = [];
    Object.keys(req.files).forEach(function (key) {
        var file = files[key].jpg,
            id = uid(10);
        fs.renameSync(file.path, './files/' + id + '.jpg');
        ids.push({ id: id });
        // get Room & add a image
        db.get(roomid).add(id);
    });
    res.end(JSON.stringify(ids));
}).use(
    '/files', 
    middlePipe('./files')
).use(
    middlePipe('./app')
).listen(80, function () {
    console.log('demo start up');
});