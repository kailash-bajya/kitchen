var express = require('express');
var router = express.Router();
var path =require('path');
var db = require('../controller/dbController');
/* GET home page. */
router.get('/placeOrder', function(req, res, next) {
  res.sendFile('placeorder.html',{root:path.join(__dirname,'../webapplication')});
  
});
router.get('/myKitchenDisplay',function(req,res){
  res.sendFile('mykitchendisplay.html',{root:path.join(__dirname,'../webapplication')});
})
router.get('/predictedValue',function(req,res){
  res.sendFile('predicted.html',{root:path.join(__dirname,'../webapplication')});
});
router.get('/kitchendisplayreport',function(req,res){
   
  db.getkitchenPdata(req,res);
})
module.exports = router;
