# Urban Forests
Built for nwHacks 2020, a 24-hour hackathon held at UBC, Vancouver, BC, Canada

Node.js and Express backend, originally hosted on a Microsoft Azure server running Node.js v10

Set-up
-----
Requires a Google Vision API model, edit the link on line 9 of [./routes/index.js](https://github.com/BennyW23/nwhacks2020-urban-forests/blob/master/routes/index.js) to fit your model.
As well, include a google API credentials JSON file under the root directory of the folder. It's named `urbanforests-key.json` in the code, and referred to also in the index.js file linked above.

Effects
-----
1) After image is uploaded to the HTML site, calls client-side JavaScript to extract the base64 string of the image and sends it to the backend. The backend server saves the string into the file at `./public/request.json` and then the client displays a preview of the image on the screen when it's done.
2) When submit is pressed, client side JS calls endpoint so that backend can execute code
3) Backend code takes the image string and sends it to Google Vision API through bash commands, takes the terminal output given and sends it back to the client.
4) Client takes the result payload and does calculations based on it to give the result.

Note: Because of step 1), only one file can be processed at a time. Due to syncronity errors, the most recently uploaded file may not necessarily be the one processed if server has not saved to the `./public/request.json` file yet.
