const express = require('express');
const config = require('./config/config');
const initRoutes = require('./routes');

const app = express();

app.use(express.json({limit: "2mb"}));
app.use(express.urlencoded({extended: true, limit: "2mb"}))

initRoutes(app);

module.exports = app