const express = require("express");
const { handler } = require(".");
const app = express();
const port = 3000;
app.use(express.json());

app.all("/", async (req, res) => {
  console.log("req");
  const result = await handler(req);
  console.log("Result", result);
  res.send("result");
  //res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
