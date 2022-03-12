const express = require("express");
const path = require("path");
const app = express();
// const viewRouter = require("./routers/viewRouter");
const apiRouter = require("./routers/apiRouter");

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   //   res.send("Hello World");
//   res.render("index");
// });

// app.use("/", viewRouter);
app.use("/api/v1", apiRouter);

module.exports = app;
