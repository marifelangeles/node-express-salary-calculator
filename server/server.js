console.log('server.js');


let express = require('express');
let app = express();

app.use(express.static('server/public') );

app.get('/', function (req, res) {
    res.send('hello')
});

app.listen(5000, function() {
    console.log('Running on port 5000');
    
});