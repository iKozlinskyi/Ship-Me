const express = require('express');
const app = express();
const config = require('config');
const trucksRouter = require('./routes/api/trucks.routes');
const authRouter = require('./routes/api/auth.routes');
const authMiddleware = require('./routes/middleware/auth');
const mongoose = require('mongoose');

const mongoUrl = config.get('mongoUrl');
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', console.log.bind(console, 'MongoDB connected successfully'));

app.use(express.json());
const port = config.get('appPort');

app.get('/', (req, res) => {
  res.json({status: 'ok'});
});

app.use('/api', authRouter);
app.use('/api', authMiddleware, trucksRouter);

app.listen(port, () => {
  console.log('App is listening on port %o', port);
});
