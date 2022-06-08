const express = require("express");
const { handler } = require(".");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

var jsonParser = bodyParser.json();

app.all("/", jsonParser, async (req, res) => {
  console.log("req.body", req.body);
  const asLambdaRequest = { body: JSON.stringify(req.body) };
  const result = await handler(asLambdaRequest);
  console.log("Result", result);
  res.set(result);
  res.send(result.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
