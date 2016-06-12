'use strict';
const express = require('express');
const router = express.Router();
const Assistant = require('../models/assistant');
const moment = require('moment');
const mongoose = require('mongoose');

// Gets all the games for specific user.
router.get('/:id',(req,res,next)=>{
   let id = req.params.id;
   Assistant.findOne({username:id},(err,user)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({games:user.games});
      }
   });
});

// Adds subdocument with new game to user. First finds all the players and adds them to an array in the games subdocument.
router.put('/',(req,res,next)=>{
   Assistant.findOne({username:req.body.username},{'players.name':1,'players._id':1})
   .then((response)=>{
      let newDate = moment(req.body.date).format('YYYY-MM-DD');
      let game = {opponent:req.body.opponent,venue:req.body.venue,date:newDate,players:response.players};
      let update = {$push:{games:game}};
      let option = {new:true};
      Assistant.findOneAndUpdate({username:req.body.username},update,option,(err,user)=>{
         if(err){
            return res.status(500).json({message: err.message});
         }
         else{
            res.json({user:user,message:"Updated games"});
         }
      });
   });
});

// Deletes a subdocument with game for specific user.
router.delete('/:id/:user',(req,res,next)=>{
   let id = req.params.id;
   let user = req.params.user;
   let deleteItem = {$pull:{games:{_id: id}}};
   Assistant.update({username:user},deleteItem,(err,game)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({message:"Deleted game"});
      }
   });
});


module.exports = router;
