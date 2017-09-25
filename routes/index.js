var express = require('express');
var router = express.Router();
var fs = require('fs');
var exec = require('child_process').exec;

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
  console.log(req.body.program);
  writeToFile(req.body.program);
  var url = "python one.py";
  exec(url,{maxBuffer: 1024 * 500}, function(error, stdout, stderr) {
    res.json({ 'res': String(stdout) });
    //console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
  });
  //res.json({"res": true});
});

module.exports = router;
