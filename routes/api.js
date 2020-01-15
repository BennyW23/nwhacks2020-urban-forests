//USELESS IGNNORE THIS 
// TRYING TO USE GOOGLE VISION NODE JS 

/*
const {Storage} = require('@google-cloud/storage');
const automl = require('@google-cloud/automl');
const fs = require('fs');
const projectId = 'hip-apricot-264821'
const keyFilename = './urbanforests-key.json'
const storage = new Storage({projectId, keyFilename});
console.log(`1`);


// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// Makes an authenticated API request.
console.log("0");
try {
const [buckets] = await storage.getBuckets();

console.log('Buckets:');
buckets.forEach(bucket => {
    console.log(bucket.name);
});
} catch (err) {
console.error('ERROR:', err);
}
console.log(`2`);

// Create client for prediction service.
const client = new automl.PredictionServiceClient();


// TODO(developer): Uncomment the following line before running the sample.

// const projectId = `hip-apricot-264821`;
// const computeRegion = `region-name, e.g. "us-central1"`;
const modelId = `IOD6694191827760709632`;
const filePath = `../public/request.json"`;
// const scoreThreshold = `value between 0.0 and 1.0, e.g. "0.5"`;

// Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);

// Read the file content for prediction.
const content = fs.readFileSync(filePath, 'base64');

const params = {};
console.log(`3`);
if (scoreThreshold) {
params.score_threshold = scoreThreshold;
}

// Set the payload by giving the content and type of the file.
const payload = {};
payload.image = {imageBytes: content};
console.log(`4`);
// params is additional domain-specific parameters.
// currently there is no additional parameters supported.
const [response] = await client.predict({
name: modelFullId,
payload: payload,
params: params,
});
console.log(`Prediction results:`);
response.payload.forEach(result => {
console.log(`Predicted class name: ${result.displayName}`);
console.log(`Predicted class score: ${result.classification.score}`);
});

*/