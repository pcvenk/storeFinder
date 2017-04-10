'use strict';

const express        = require('express'),
      app            = express(),
      expressHbs     = require('express-handlebars'),
      bodyParser     = require('body-parser'),
      redis          = require('redis'),
      geoCoder       = require('node-geocoder'),
      methodOverride = require('method-override'),
      path           = require('path');


const port = 3000;

//set view engine
app.engine('handlebars', expressHbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//server listening
app.listen(port, () => console.log('Server started on port: ' +port));
