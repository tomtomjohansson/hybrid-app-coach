'use strict';
const express = require('express');
const router = express.Router();
const Assistant = require('../models/assistant');
const moment = require('moment');
const mongoose = require('mongoose');

// Finds all players of specific user.
router.post('/',(req,res,next)=>{
   Assistant.findOne({username:req.body.username},(err,user)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({players:user.players});
      }
   });
});

// Adds subdocument with new player.
router.put('/',(req,res,next)=>{
   let player = {name:req.body.name,age:req.body.age};
   let update = {$push:{players:player}};
   let option = {new:true};
   Assistant.findOneAndUpdate({username:req.body.username},update,option,(err,player)=>{
      if(err){
         console.log(err.message);
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({player:player,message:"Updated players"});
      }
   });
});

// Deletes subdocument of player.
router.delete('/:id/:user',(req,res,next)=>{
   let id = req.params.id;
   let user = req.params.user;
   let deleteItem = {$pull:{players:{_id: id}}};
   Assistant.findOneAndUpdate({username:user},deleteItem,(err,player)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({message:"Deleted player"});
      }
   });
});

module.exports = router;
