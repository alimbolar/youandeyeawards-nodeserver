const express = require("express");
const app = require("./app");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function () {
  console.log(`Server is running at Port ${PORT}`);
});
