const express = require('express');
const app = express();
const config = require('config');
const trucksRouter = require('./routes/api/trucks.routes');

app.use(express.json());
const port = config.get('appPort');

app.use('/api', trucksRouter);

app.get('/', (req, res) => {
  res.json({status: 'ok'});
});

app.listen(port, () => {
  console.log('App is listening on port %o', port);
});
