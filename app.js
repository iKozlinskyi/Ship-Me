const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({status: 'ok'})
});

app.listen(8081, () => {
  console.log('App is listening on port 8081');
});
