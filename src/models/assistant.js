'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define schema for users
const playerSchema = new mongoose.Schema({
   name: String,
   age: Number,
   trainings: [Number]
});

const gameSchema = new mongoose.Schema({
   opponent: String,
   date: String,
   venue: String,
   corners: {for:Number,against:Number},
   goals: {for:Number,against:Number},
   shots: {for:Number,against:Number},
   chances: {for:Number,against:Number},
   players: [{id:String,goals:Number,assists:Number,bonus:Number,yellow:Number,red:Number}]
});

const assistantSchema = new mongoose.Schema({
   username: {type: String, lowercase: true, unique: true},
   hash: String,
   salt: String,
   club: String,
   players: [playerSchema],
   games: [gameSchema]
});

// Gets the password when user signs up. Encrypts it.
assistantSchema.methods.setPassword = function(password){
   this.salt = crypto.randomBytes(16).toString('hex');
   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// Checks if password is valid at login.
assistantSchema.methods.validPassword = function(password) {
   const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
   return this.hash === hash;
};

// Generates webtoken. Sets expiration time for 90 days.
assistantSchema.methods.generateJWT = function() {
   const today = new Date();
   const exp = new Date(today);
   exp.setDate(today.getDate() + 90);

   return jwt.sign({
      _id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
   }, 'COACH');
};

const assistantModel = mongoose.model('Assistant', assistantSchema);

module.exports = assistantModel;
