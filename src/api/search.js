'use strict';
const express = require('express');
const router = express.Router();
const Assistant = require('../models/assistant');
const moment = require('moment');


router.post('/players',(req,res,next)=>{
   Assistant.findOne({username:req.body.username},(err,user)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({players:user.players});
      }
   });
});

router.put('/players',(req,res,next)=>{
   // console.log(req.body);
   let player = {name:req.body.name,age:req.body.age};
   let update = {$push:{players:player}};
   let option = {new:true};
   Assistant.findOneAndUpdate({username:req.body.username},update,option,(err,player)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({player:player,message:"Updated players"});
      }
   });
});

router.delete('/players/:id',(req,res,next)=>{
   let id = req.params.id;
   let deleteItem = {$pull:{players:{_id: id}}};
   Assistant.update({},deleteItem,(err,player)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({message:"Deleted player"});
      }
   });
});

router.post('/games',(req,res,next)=>{
   Assistant.findOne({username:req.body.username},(err,user)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({games:user.games});
      }
   });
});

router.put('/games',(req,res,next)=>{
   // console.log(req.body);
   let newDate = moment(req.body.date).format('YYYY-MM-DD');
   let game = {opponent:req.body.opponent,venue:req.body.venue,date:newDate};
   let update = {$push:{games:game}};
   let option = {new:true};
   Assistant.findOneAndUpdate({username:req.body.username},update,option,(err,game)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({game:game,message:"Updated games"});
      }
   });
});

router.delete('/games/:id',(req,res,next)=>{
   let id = req.params.id;
   let deleteItem = {$pull:{games:{_id: id}}};
   Assistant.update({},deleteItem,(err,game)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({message:"Deleted game"});
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

// Gets user for userpages. Gets info on tags of the user.
// router.get('/users/:username',(req,res,next)=>{
//    let username =req.params.username;
//    User.findOne({username:username},(err,user)=>{
//       if (err) {
//          return res.status(500).json({noUser:"Användaren finns inte",message: err.message});
//       }
//       else{
//          let tags = user.infoAboutTags(sendJson);
//       }
//       function sendJson(tags){
//          res.json({user:user,tags:tags,message:"Found user with username"});
//       }
//    });
// });
//
// // Updates the user.
// router.put('/users',(req,res,next)=>{
//    let user = req.body;
//    let option = {new:true};
//    User.findOneAndUpdate({username:req.body.username},user,option,(err,user)=>{
//       if(err){
//          return res.status(500).json({message: err.message});
//       }
//       else{
//          console.log(user);
//          res.json({user:user, message:"Dina uppgifter har uppdaterats"});
//       }
//    });
// });
//
// // Deletes a user
// router.delete('/users/:username',(req,res,next)=>{
//    let username =req.params.username;
//    User.findOneAndRemove({username:username},(err,user)=>{
//       if (err) {
//          return res.status(500).json({noUser:"Användaren finns inte",message: err.message});
//       }
//       else{
//          res.json({user:user, message:"Removed user with username"});
//       }
//    });
// });
//
// // Gets info for landingpage.
// router.get('/home',(req,res,next)=>{
//    User.aggregate(
//          {$project:{
//             'student':{$cond:[{$eq:['$usertype','student']},1,0]},
//             'company':{$cond:[{$eq:['$usertype','company']},1,0]},
//             'studentSpecs':{$cond:[{$eq:['$usertype','student']},{$size:'$specialties'},0]},
//             'companySpecs':{$cond:[{$eq:['$usertype','company']},{$size:'$specialties'},0]},
//          }},
//          {$group:{_id:'stuff',numberOfStud:{$sum:'$student'},numberOfCom:{$sum:'$company'},numberOfStudSpecs:{$sum:'$studentSpecs'},numberOfComSpecs:{$sum:'$companySpecs'}}},(err,object)=>{
//       if (err) {
//          return res.status(500).json({noUser:"Something went wrong",message: err.message});
//       }
//       else{
//          res.json({object:object, message:"Found info for homepage"});
//       }
//    });
// });
//
// // Updates the users list of interests. Depending on request-body performs a pull or a push.
// router.put('/interesting',(req,res,next)=>{
//    let condition = {username:req.body.user};
//    let update;
//    let option = {new:true};
//    if(req.body.change === 'Add'){
//       update = {$push:{interesting:req.body.interesting}};
//    }
//    else if(req.body.change === 'Remove'){
//       update = {$pull:{interesting:req.body.interesting}};
//    }
//    User.findOneAndUpdate(condition,update,option,(err,user)=>{
//       if(err){
//          return res.status(500).json({message: err.message});
//       }
//       else{
//          res.json({user:user,message:"Din lista med intressanta användare uppdaterades."});
//       }
//    });
// });
//
// // Gets info for my page. Finds the user and then gets the users he/she finds interesting.
// router.post('/mypage',(req,res,next)=>{
//    User.findOne({username:req.body.username},(err,user)=>{
//       if(err){
//          return res.status(500).json({message: err.message});
//       }
//       else{
//          user.findInteresting().then((result)=>{
//             res.json({theUser:user,interests:result,message:"User for my page."});
//          });
//       }
//    });
// });

module.exports = router;
