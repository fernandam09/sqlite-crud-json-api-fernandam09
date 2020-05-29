var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var carrerasRouter = require('./routes/carreras');
var cancionesRouter = require('./routes/canciones');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', carrerasRouter);
app.use('/hw', cancionesRouter);
module.exports = app;
