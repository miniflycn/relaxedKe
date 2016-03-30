var connect = require('connect'),
    middlePipe = require('middleware-pipe'),
    multipart = require('connect-multiparty'),
    uid = require('uid2'),
    util = require('util'),
    fs = require('fs'),
    app = connect();

app.use('/upload', multipart())
.use('/upload', function (req, res) {
    var files = req.files, ids = [];
    Object.keys(req.files).forEach(function (key) {
        var file = files[key].jpg,
            id = uid(10);
        fs.renameSync(file.path, './files/' + id + '.jpg');
        ids.push({ id: id });
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