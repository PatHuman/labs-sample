'use strict';

import express from 'express';
var  controller  = require('./auth.controller');
var stormpath = require('express-stormpath');
var cors = require('cors') ;

var router = express.Router();

router.get('/me', stormpath.getUser,  controller.index);
 
//router.get('/me',  stormpath.loginRequired, controller.index);
 

module.exports = router;
