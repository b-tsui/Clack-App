const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const app = express();

const { environment } = require('./config')

app.set('view engine', 'pug');
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

module.exports = app;