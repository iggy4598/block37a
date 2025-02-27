const express = require('express');
const morgan = require('morgan');
const { router: authRoutes } = require('./auth');
const itemRoutes = require('./items');
const reviewRoutes = require('./reviews');
const commentRoutes = require('./comments');
const { errorHandler } = require('./common');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments', commentRoutes);
app.use(errorHandler);

module.exports = app;
