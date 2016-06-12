'use strict';
const express = require('express');
const router = express.Router();
const Assistant = require('../models/assistant');
const moment = require('moment');
const mongoose = require('mongoose');




router.get('/gameStats/:gameID',(req,res,next)=>{
   Assistant.aggregate(
         {$unwind:"$games"},
         {$match:{
            'games._id': mongoose.Types.ObjectId(req.params.gameID)
         }},
         {$project:{
            game:"$games"
         }},
      (err,game)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({game:game[0].game});
      }
   });
});

router.put('/gameStats',(req,res,next)=>{
   console.log(req.body);
   let find = {'games._id':mongoose.Types.ObjectId(req.body._id)};
   let update = {$set:{'games.$':req.body}};
   Assistant.findOneAndUpdate(find,update,(err,game)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({game:game});
      }
   });
});

router.get('/playerStats/:playerID',(req,res,next)=>{
   Assistant.aggregate([
         {$unwind:"$games"},
         {$match:{'games.players._id':mongoose.Types.ObjectId(req.params.playerID)}},
         {$project:{'player':'$games.players'}},
         {$unwind:"$player"},
         {$match:{'player._id':mongoose.Types.ObjectId(req.params.playerID)}},
         {$group:{_id:'stats',games:{$sum:{$cond:[{$gt:['$player.minutes.total',0]},1,0]}},gamesStarted:{$sum:{$cond:[{$and:[{$gt:['$player.minutes.total',0]},{$eq:['$player.minutes.in',0]}]},1,0]}},gamesAsSub:{$sum:{$cond:[{$and:[{$gt:['$player.minutes.total',0]},{$ne:['$player.minutes.in',0]}]},1,0]}},goals:{$sum:'$player.goals'},shots:{$sum:'$player.shots'},assists:{$sum:'$player.assists'},yellow:{$sum:'$player.yellow'},red:{$sum:'$player.red'},name:{$first:'$player.name'},totalMinutes:{$sum:'$player.minutes.total'}}},
         {$project:{stats:1,name:1,games:1,gamesStarted:1,gamesAsSub:1,goals:1,shots:1,assists:1,yellow:1,red:1,totalMinutes:1,goalsAvg:{$cond:[{$eq:[ "$games", 0 ]},0,{$divide:["$goals", "$games"]}]},shotsAvg:{$cond:[{$eq:[ "$games", 0 ]},0,{$divide:["$shots", "$games"]}]},minutesPerGame:{$cond:[{$eq:[ "$games", 0 ]},0,{$divide:["$totalMinutes", "$games"]}]},minutesPerGoal:{$cond:[{$eq:[ "$goals", 0 ]},0,{$divide:["$totalMinutes", "$goals"]}]},goalOnShotsAvg:{$cond:[{$eq:[ "$goals", 0 ]},"N/A",{$divide:["$goals", "$shots"]}]}}}
      ],
      (err,thePlayer)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         // console.log(thePlayer);
         res.json({player:thePlayer});
      }
   });
});

router.get('/trainerStats/:playerID',(req,res,next)=>{
   Assistant.aggregate([
         {$project:{players:1}},
         {$unwind:'$players'},
         {$match:{'players._id':mongoose.Types.ObjectId(req.params.playerID)}},
         {$project:{name:'$players.name',age:'$players.age',lastFive:{$slice:['$players.trainings',-5]},trainingPercentage:{$divide:[{$sum:'$players.trainings'},{$size:'$players.trainings'}]}}}
      ],
      (err,trainer)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         console.log(trainer);
         res.json({trainer:trainer});
      }
   });
});

router.get('/teamStats/:userID',(req,res,next)=>{
   Assistant.aggregate([
         {$match:{'username':req.params.userID}},
         {$unwind:'$games'},
         {$project:{club:1,games:1}},
         {$match:{'games.ended':true}},
         {$project:{club:1,'games.goals':1,'games.shots':1,'games.corners':1,'games.yellow':1,'games.red':1}},
         {$group:{_id:'statsForTeam',count:{$sum:1},club:{$first:'$club'},totalGoalsFor:{$sum:'$games.goals.for'},totalGoalsAgainst:{$sum:'$games.goals.against'},totalShotsFor:{$sum:'$games.shots.for'},totalShotsAgainst:{$sum:'$games.shots.against'},avgGoalsFor:{$avg:'$games.goals.for'},avgGoalsAgainst:{$avg:'$games.goals.against'},avgShotsFor:{$avg:'$games.shots.for'},avgShotsAgainst:{$avg:'$games.shots.against'},avgCornerFor:{$avg:'$games.corners.for'},avgCornerAgainst:{$avg:'$games.corners.against'},avgYellowFor:{$avg:'$games.yellow.for'},avgRedFor:{$avg:'$games.red.for'}}},
         {$project:{club:1,count:1,totalGoalsFor:1,totalGoalsAgainst:1,avgGoalsFor:1,avgGoalsAgainst:1,avgShotsFor:1,avgShotsAgainst:1,avgCornerFor:1,avgCornerAgainst:1,avgYellowFor:1,avgRedFor:1,shotConversionFor:{$cond:[{$eq:[ "$totalShotsFor", 0 ]},0,{$divide:["$totalGoalsFor", "$totalShotsFor"]}]},shotConversionAgainst:{$cond:[{$eq:[ "$totalShotsAgainst", 0 ]},0,{$divide:["$totalGoalsAgainst", "$totalShotsAgainst"]}]}}}
      ],
      (err,team)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         console.log(team);
         res.json({team:team});
      }
   });
});



router.put('/training',(req,res,next)=>{
   let players = req.body.players;
   let username = req.body.username;
   let update = {players:players};
   let option = {new:true};
   Assistant.findOneAndUpdate({username:username},update,option,(err,players)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({message:"Träningen har sparats"});
      }
   });
});

module.exports = router;
