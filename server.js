'use strict';
const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const router = require('./src/api/search');
const login = require('./src/api/users');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');

require('./src/database');
require('./src/models/assistant');
require('./src/passport/passport');

// Initialize passport, set routes for handling of searches and authentication
app.use(express.static(path.join(__dirname, 'www')));
app.use(parser.json());

app.use(function(req, res, next) {
   // Website you wish to allow to connect
   res.set('Access-Control-Allow-Origin', '*');
   // Request methods you wish to allow
   res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
   // Request headers you wish to allow
   res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');

   // Pass to next layer of middleware
   next();
});


app.use(passport.initialize());

app.use('/api', router);
app.use('/api/authenticate', login);

app.get('/*', (req, res,next)=>{
   res.sendFile(path.join(__dirname, 'www/index.html'));
});

app.listen(PORT,(err)=>{
   if(err){
      console.log('Failed to connect');
   }
   else{
      console.log('Connected to server '+PORT);
   }
});
