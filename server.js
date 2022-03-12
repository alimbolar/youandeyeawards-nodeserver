const app = require("./app");
const mongoose = require("mongoose");
// const express = require("express");
// const path = require("path");
mongoose
  .connect(
    "mongodb+srv://alimbolar:alimbolar@youandeyeawards.oqqc8.mongodb.net/youandeyeawards-mongodb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function () {
  console.log(`Server is running at Port ${PORT}`);
});
