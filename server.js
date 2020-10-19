
const express = require('express');
const path = require('path');
const app = express();

console.log(__dirname);
app.use(express.static(__dirname + '/dist/APP'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/APP/index.html'));
});
app.listen(process.env.PORT || 8080);