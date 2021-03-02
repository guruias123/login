/*const express = require('express');
const app = express();
const request = require('request');
const superagent= require('superagent');
const port = 6700;
const cors = require('cors');

app.use(cors());

app.get('/',(req,res) => {
    res.send(
        "<a href='https://github.com/login/oauth/authorize?client_id=10f25cf6b11a008eb433'>Login With Github</a>"
        )
});


app.post('/users',(req,res) => {
    const code = req.body.code;
    if(!code){
        res.send({
            success:false,
            message:'Error on Code'
        })
    }
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_secret:'a02f98864d61f2d3d722d447de833f108daa51d4',
            client_id:'10f25cf6b11a008eb433',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            var acctoken = result.body.access_token
            const option={
                url:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':'token '+acctoken,
                    'User-Agent':'mycone'
                }
            }
            var output;
            request(option,(err,response,body) => {
                output = body;
                return res.send(output)
            })
        })
})



app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})*/


const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 6700;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors())
app.get('/',(req,res) => {
    res.send(
        "<a href='https://github.com/login/oauth/authorize?client_id=10f25cf6b11a008eb433'>Login With Github</a>"
        )
});
app.post('/users',(req,res) => {
    console.log("<<<<",req.body)
    superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
        client_secret:'a02f98864d61f2d3d722d447de833f108daa51d4',
        client_id:'10f25cf6b11a008eb433',
        code:req.body.code
    })
    .set('Accept','application/json')
    .end((err,result) => {
        if(err) throw err;
        var accesstoken = result.body.access_token
        const option = {
            url:'https://api.github.com/user',
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':'token '+accesstoken,
                'User-Agent':'sep-node'
            }
        }
        var output;
        request(option,(err,response,body) => {
            output = body;
            console.log(output)
            return res.send(output)
        })
    })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})