var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist',(req,res)=>{
  var MongoClient = mongodb.MongoClient;
  
  var url = "mongodb://localhost:27017/mongo";
  
  MongoClient.connect(url,(err,db)=>{
    if(err){
      console.log(`Unable to connect to the server`,err);
    }
    else{
      console.log("Connection established");
      
      var collection = db.collection('students');
      
      collection.find({}).toArray((err,result)=>{
        if(err){
          res.send(err);
        }
        else if(result.length){
          res.render('studentslist',{"studentlist":result});
        }else{
          res.send('No documents found');
        }
        
        db.close();
      });
    }
  });
})

router.get('/newstudent',(req,res)=>{
  res.render('newstudent',{title:'Add Student'})
});

router.post('/addstudent',(req,res)=>{
  var MongoClient = mongodb.MongoClient;
  var url = "mongodb://localhost:27017/mongo";
  
  MongoClient.connect(url,(err,db)=>{
    if(err){
      console.log(`Unable to connect to the server`,err);
    }
    else{
      console.log("Connection established");
      
      var collection = db.collection('students');
      
      var {student,street,city,sex,gpa} = req.body;
      var student1 = {student,street,city,sex,gpa};
      console.log(student1);
      
      collection.insert([student1],(err,result)=>{
        if(err){
          console.log(`Unable to connect to the server`,err);
        }
        else{
          res.redirect('thelist');
        }
        
        db.close();
      });
    }
  });
});
module.exports = router;
