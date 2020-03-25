const express = require('express');
const app = express();
const config = require('config');

app.use(express.json());
const port = config.get('appPort');

app.get('/', (req, res) => {
  res.json({status: 'ok'});
});

app.listen(port, () => {
  console.log('App is listening on port %o', port);
});
