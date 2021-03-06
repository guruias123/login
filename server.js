const express = require('express')
const app = express();
const port =process.env.PORT || 8700;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
//mongodb+srv://venky:venky123@cluster0.bxnfz.mongodb.net/amazon?retryWrites=true&w=majority
// mongodb://localhost:27017
const mongourl = "mongodb+srv://venky:venky123@cluster0.bxnfz.mongodb.net/amazon?retryWrites=true&w=majority";
let db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())



app.get('/', (req,res)=>{
    res.send('health ok')
}
)

app.get('/shirts', (req,res)=>{
    db.collection('shirts').find({}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result)
    })
})

app.post('/cart', (req,res)=>{
  db.collection('cart').insert(req.body,(err,result)=>{
          if(err) throw err;
          res.send(result)
  })
})
 

app.get('/cart1',(req,res)=>{
  var condition={};
  if(req.query.GoogleId){
    condition={GoogleId:req.query.login1}
  }
  db.collection('cart').find({condition}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})



app.get('/shirts/:id',(req,res) =>{
  var id = req.params.id
  db.collection('shirts').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})
app.get('/pants/:id',(req,res) =>{
  var id = req.params.id
  db.collection('pants').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

/*app.get('/shirts', (req,res)=>{
  var condition ={};
  if(req.query._id){
    condition={_id:req.query._id}
  }
  db.collection('shirts').find(condition).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  }) 
})*/

app.get('/pants', (req,res)=>{
    db.collection('pants').find({}).toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
    })
})

MongoClient.connect(mongourl,(err,connection) => {
    if(err) console.log(err);
    db = connection.db('amazon');
  
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Server is running on port ${port}`)
    })
  
  })






//   const express=require('express');
// const app=express();
// const port=process.env.PORT||4002;
// const mongo=require('mongodb');
// const mongourl='mongodb://localhost:27017';
// let db;
// const MongoClient=mongo.MongoClient;
// const cors=require('cors');
// const bodyParser=require('body-parser');

// app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

// app.listen(port,(err)=>{
//     if(err) throw err;
//     console.log(`server is running on ${port}`)
// })
// app.get('/',(req,res)=>{
//     res.send('health is ok');
// })

// app.get('/mobiles',(req,res)=>{
//     var condition={}
//     if(req.query.name){
//         condition={Name:req.query.name}
//     }
//     db.collection('mistore').find(condition).toArray((err,result)=>{
//          if(err) throw err;
//          res.send(result)
//     })
// })



// MongoClient.connect(mongourl,(err,connection)=>{
//         if(err) throw err;
//         db=connection.db('mistore');
// })
