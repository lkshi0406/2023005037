const express = require("express");
const Log = require("../logging_middleware/logger");

const app = express();

app.get("/", async (req, res) => {

  await Log(
    "backend",
    "info",
    "handler",
    "Home route accessed"
  );

  res.send("Server Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});