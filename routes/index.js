var express = require('express');
var router = express.Router();
var fs = require('fs');
var exec = require('child_process').exec;
var app = express();

function writeToFile(message){
  fs.writeFile('one.py', message, function(err) {
    if(err) {
      console.log(err);
    }
    else{
      console.log("Finished");
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    if(req.body.pass=="we are secure"){
    console.log(req.body.program);
    writeToFile(req.body.program);
    var url = "python one.py";
    exec(url,{maxBuffer: 1024 * 500}, function(error, stdout, stderr) {
      if (error !== null) {
        res.json({'res': String(error)});
      }
      res.json({ 'res': String(stdout) });
      //console.log('stderr: ' + stderr);
      
    });
  }
  //res.json({"res": true});
});

module.exports = router;
