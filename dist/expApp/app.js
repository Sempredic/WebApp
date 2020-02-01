const express = require('express');
const http = require('http');
var mongoose = require('mongoose');
var Bear = require('../models/bear');
var bodyParser = require('body-parser');

const router = express.Router();
const app = express();
const port = 3000;
const appRoot = 'dist/expApp';
var db = mongoose.connection;
const serverless = require('serverless-http');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connector = mongoose.connect('mongodb+srv://311015:a8JlnPsDhZj15Nmi@cluster0-qvscx.mongodb.net/WebApp?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true });

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");

});

/* GET api listing. */

router.post('/bears',function(req, res) {

  var bear = new Bear();
    bear.name = req.body.name;

    // save model to database
    bear.save(function (err, bear) {
      if (err) res.send(err);

      res.json({ bear});

    });


});

router.get('/bears',function(req, res) {

  Bear.find(function(err, bears) {
    if (err)
        res.send(err);

    res.json(bears);
  });

});

router.get('/', (req, res) => {

  res.send({
    cats: [{ name: 'lilly' }, { name: 'lucy' }],
  })
});


app.use(express.static(appRoot));
app.use('/api',router);

//const server = http.createServer(app);

//server.listen(port,()=>{
    //console.log('Serverrunningon3000')
//});

module.exports.handler = serverless(app);
