const express = require('express');
const app = express();
const config = require('config');
const trucksRouter = require('./routes/api/trucks.routes');
const authRouter = require('./routes/api/auth.routes');
const loadsRouter = require('./routes/api/load.routes');
const meRouter = require('./routes/api/me.routes');
const usersRouter = require('./routes/api/users.routes');
const authMiddleware = require('./routes/middleware/auth');
const requireRole = require('./routes/middleware/requireUserRole');
const mongoose = require('mongoose');
const {DRIVER, SHIPPER} = require('./constants/userRoles');

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

app.use(authMiddleware);
app.use('/api/users', usersRouter);
app.use('/api/me', meRouter);
app.use('/api/trucks', requireRole(DRIVER), trucksRouter);
app.use('/api/loads', requireRole(SHIPPER), loadsRouter);

app.listen(port, () => {
  console.log('App is listening on port %o', port);
});
