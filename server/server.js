// const express = require('express');
// require('dotenv').config();
// const bodyParser = require('body-parser');
// const cors = require('cors')
// const path = require('path');
// const api = require('./routes/api');
// const port = 3000;
// const app = express();
// app.use(cors())
// app.use(bodyParser.json()); 
// app.use('/api', api);
// app.use(express.static(path.join(__dirname, '../dist/eventshub')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/eventshub/index.html'));
// });
// app.listen(port, function(){
//     console.log("Events Back-End : Server running on localhost:" + port);
// });
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const api = require('./routes/api');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
// list of possible dist locations (add any other name you used)
const candidates = [
  path.join(__dirname, '../dist/event-hub'),
  path.join(__dirname, '../dist/eventhub'),
  path.join(__dirname, '../dist/event-hub/browser'),
  path.join(__dirname, '../dist/event-hub/browser'), // duplicate intentionally harmless
  path.join(__dirname, '../dist') // fallback if ng build output placed differently
];

let publicPath = null;
for (const c of candidates) {
  try {
    const indexPath = path.join(c, 'index.html');
    if (fs.existsSync(indexPath)) {
      publicPath = c;
      console.log('Serving Angular from:', indexPath);
      break;
    }
  } catch (e) { /* ignore */ }
}

if (!publicPath) {
  // helpful log so you see what's missing in Render logs
  console.error('No Angular build found in any candidate paths. Searched:', candidates);
} else {
  app.use(express.static(publicPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log('Events Back-End : Server running on port ' + port);
});
