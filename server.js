'use strict';
const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const router = require('./src/api/search');
const login = require('./src/api/users');
const games = require('./src/api/games');
const players = require('./src/api/players');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');

require('./src/database');
require('./src/models/assistant');
require('./src/passport/passport');

// Initialize passport, set routes for handling of searches and authentication
app.use(express.static(path.join(__dirname, 'www')));
app.use(parser.json());

// Sets up routes
app.use('/api/authenticate', login);
app.use('/api', router);
app.use('/api/games', games);
app.use('/api/players', players);
//Path to root index-file.
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
