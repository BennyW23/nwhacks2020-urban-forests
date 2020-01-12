var exec = require('child_process').exec;
const path = require('path');
var express = require('express');
var router = express.Router();


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
  let { stdout1} = await sh("if [ -f '/home/site/wwwroot/google-cloud-sdk/path.bash.inc' ]; then . '/home/site/wwwroot/google-cloud-sdk/path.bash.inc'; fi");
  let { stdout2} = await sh("if [ -f '/home/site/wwwroot/google-cloud-sdk/completion.bash.inc' ]; then . '/home/site/wwwroot/google-cloud-sdk/completion.bash.inc'; fi");
  let { stdout3} = await sh("source './google-cloud-sdk/path.bash.inc'");
  let { stdout4} = await sh("source './google-cloud-sdk/completion.bash.inc'");
  let { stdout5} = await sh('export PATH="./google-cloud-sdk/bin:$PATH"');
  let { stdout6} = await sh("source './google-cloud-sdk/path.bash.inc'");
  let { stdout7 } = await sh('export GOOGLE_APPLICATION_CREDENTIALS=./urbanforests-key.json');
  let { stdout } = await sh('curl -X POST -H "Content-Type: application/json"   -H "Authorization: Bearer $(gcloud auth application-default print-access-token)"   https://automl.googleapis.com/v1beta1/projects/747099202913/locations/us-central1/models/IOD6694191827760709632:predict   -d @./public/request.json');
  //let { stdout } = await sh('wc ./urbanforests-key.json');
  //let { stdout } = await sh('gcloud --version');
  //for (let line of stdout.split('\n')) {
    //console.log(`${line}`);
  //}
  return stdout;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: "hello!"});
 
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get('/analyze-image', function(req, res, next) {
  main().then(result => {
    console.log(result);
    //res.sendFile(path.join(__dirname + "/test.html"));
    res.send(result);
  })
  .catch(err => console.log(err))
});

router.get('test-ajax', function(req, res, next) {
  res.sendFile(path.join(__dirname + "/nice.html"));
});

module.exports = router;
