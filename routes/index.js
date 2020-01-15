var exec = require('child_process').exec;
const path = require('path');
var express = require('express');
var router = express.Router();
const fs = require('fs');
var long_string = "if [ -f './google-cloud-sdk/path.bash.inc' ]; then . './google-cloud-sdk/path.bash.inc'; fi;\n"
+ "source './google-cloud-sdk/path.bash.inc'\n"
+ "export GOOGLE_APPLICATION_CREDENTIALS=./urbanforests-key.json\n"
+ 'curl -X POST -H "Content-Type: application/json"   -H "Authorization: Bearer $(gcloud auth application-default print-access-token)"   https://automl.googleapis.com/v1beta1/projects/747099202913/locations/us-central1/models/IOD6694191827760709632:predict   -d @./public/request.json';



async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  //await sh("if [ -f './google-cloud-sdk/path.bash.inc' ]; then . './google-cloud-sdk/path.bash.inc'; fi");
  //await sh("if [ -f './google-cloud-sdk/completion.bash.inc' ]; then . './google-cloud-sdk/completion.bash.inc'; fi");
  //await sh("source './google-cloud-sdk/path.bash.inc'");
  //await sh("source './google-cloud-sdk/completion.bash.inc'");
  //await sh('export PATH="./google-cloud-sdk/bin:$PATH"');
  //await sh("source './google-cloud-sdk/path.bash.inc'");
  //let { stdout } = await sh('export GOOGLE_APPLICATION_CREDENTIALS=./urbanforests-key.json\ncurl -X POST -H "Content-Type: application/json"   -H "Authorization: Bearer $(gcloud auth application-default print-access-token)"   https://automl.googleapis.com/v1beta1/projects/747099202913/locations/us-central1/models/IOD6694191827760709632:predict   -d @./public/request.json');
  let { stdout } = await sh(long_string);
  /*
  for (let line of stdout.split('\n')) {
    console.log(`${line}`);
  }
  */
  return stdout;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('/index');
  //res.render('index', { title: "hello!"});
 
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get('/analyze-image', function(req, res, next) {
  console.log('/analyze-image');
  main().then(result => {
    console.log(result);
    //res.sendFile(path.join(__dirname + "/test.html"));
    res.send(result);
  })
  .catch(err => console.log(err))
});

router.post('/set-data', function(req, res) {
  console.log('/set-data');
  let imgObject = {"payload": { "image" : { "imageBytes" : req.body } } };
  fs.writeFileSync('./public/request.json', JSON.stringify(imgObject), 'utf-8'); 
  res.send("hi!");
});

module.exports = router;
