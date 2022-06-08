const express = require("express");
const { handler } = require(".");
var bodyParser = require("body-parser");
const app = express();
const port = 3057;

var jsonParser = bodyParser.json();

app.all("/", jsonParser, async (req, res) => {
  console.log("req.body", req.body);
  const asLambdaRequest = { body: JSON.stringify(req.body) };
  const result = await handler(asLambdaRequest);
  console.log("Result", result);
  res.set(result);

  // we can allow all because this is only run on localhost
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // send the actual body
  res.send(result.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
