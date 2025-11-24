const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const api = require('./routes/api');
const port = 3000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, '../dist/event-hub/browser')));

app.use(bodyParser.json()); 

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/event-hub/browser/index.html'));
});

app.listen(port, function(){
    console.log("Events Back-End : Server running on localhost:" + port);
});