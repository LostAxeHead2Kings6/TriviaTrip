const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app= express();

app.use(express.static(__dirname + '/../client/dist'))
app.use(bodyParser.json())


app.listen(3000, function() {
  console.log('listening on port 3000!')
})


app.get('/questions', function(req, res) {
  request({url: `https://opentdb.com/api.php?amount=5&category=${req.query.categoryNum}&difficulty=medium&type=multiple`},
    function (error, response, body) {
      res.status(200).send(body);
  });
})
//`https://opentdb.com/api.php?amount=5&category=${categoryNum}&difficulty=medium&type=multiple`)
