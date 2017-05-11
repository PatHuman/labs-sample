/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import path from 'path';
import stormpath from 'express-stormpath';
var datasource = require('./components/db/db.service.js');
var register = require('./components/user/registration.js');
var cors = require('cors');

config.port = 9090;

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);

/*
   Platform-db  initialization

*/
datasource.devSync(app,"boffice");
datasource.devSync(app,"core");


var corsOptions = {
  origin: 'http://localhost:8000',
 // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials:true,
  //preflightContinue: false,
  optionsSuccessStatus: 204
}




// app.use(cors(corsOptions));

 //app.options('*', cors());
/*
 var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' === req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

*/

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200,http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.use(stormpath.init(app, {
  apiKey: {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET
},
application: {
  href: process.env.OFFICE_APP
},
  debug:"info",
  website:true,
  web: {

    me: {
      expand: {
        customData: true ,
          groups: true,
          groupMemberships: true

      }
    },
    register: {
       enabled: true,
      uri:"/api/relay/signup",

    },
    oauth2: {
      uri: "/api/relay/token",
      password: {
        validationStrategy: 'stormpath'
      }
    },
    logout: {
       enabled: true,
      uri:"/api/relay/logout",

    },
  /*  spa: {
      enabled: true,
      view: path.join(__dirname, '../client', 'index.html')
    },*/
    produces: ['application/json']
  },
  preRegistrationHandler:register.process

}));



require('./config/express').default(app);
require('./routes').default(app);




// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

app.on('stormpath.error', function(err){

  console.log('stormpath::',err)
});

// wait for Stormpath to start the server.
app.on('stormpath.ready', function () {
  console.log('Stormpath Ready!');
  setImmediate(startServer);
});



// Expose app
exports = module.exports = app;
