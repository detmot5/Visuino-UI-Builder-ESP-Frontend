const { json } = require('express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const fs = require('fs');

let rawinput = fs.readFileSync('test.json');
let input = JSON.parse(rawinput);

let rawinit = fs.readFileSync('init.txt');
console.log(input);

app.use(cors());
app.use(bodyParser());
app.get('/init', (req, res) => {
  res.send("website");
});

app.get('/input', (req, res) => {
  res.json(input)
});

app.post('/status',  (req, res) => {
  res.status = 200;
  console.log(req.body);
  res.send('');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});