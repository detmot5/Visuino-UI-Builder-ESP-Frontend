const { json } = require('express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const fs = require('fs');



let rawinit = fs.readFileSync('init.txt');
app.use(cors());
app.use(bodyParser());
app.get('/init', (req, res) => {
  res.send("website");
});

app.get('/input', (req, res) => {
  let rawinput = fs.readFileSync('test_tab.json');
  let input = JSON.parse(rawinput);
  res.json(input)
});



app.get('/image', (req, res) => {
  console.log(req.query.fileName);
  const path = `.${req.query.fileName}`;
  console.log(path);
  res.sendFile(path, {root: __dirname});
});

app.post('/status',  (req, res) => {
  res.status = 200;
  console.log(req.body);
  res.send('');
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});