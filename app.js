'use strict';

const express        = require('express'),
      app            = express(),
      expressHbs     = require('express-handlebars'),
      bodyParser     = require('body-parser'),
      redis          = require('redis'),
      geoCoder       = require('node-geocoder'),
      methodOverride = require('method-override'),
      path           = require('path');

const index = require('./routes/index');


const port = 3000;

//set view engine
app.engine('handlebars', expressHbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//methodOverride
app.use(methodOverride('_method'));

//routes
app.use('/', index);

//server listening
app.listen(port, () => console.log('Server started on port: ' +port));
