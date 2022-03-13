const express = require("express");
const path = require("path");
const cors = require("cors");
// const viewRouter = require("./routers/viewRouter");
const apiRouter = require("./routers/apiRouter");

const app = express();

// Implement CORS
// app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

// app.options("*", cors());
// app.options('/api/v1/tours/:id', cors());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
