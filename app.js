const express = require("express");
const path = require("path");
const cors = require("cors");
const apiRouter = require("./routers/apiRouter");

const app = express();

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

// app.options("*", cors());
// app.options('/api/v1/tours/:id', cors());

// // // Add Access Control Allow Origin headers (https://www.freecodecamp.org/news/access-control-allow-origin-header-explained/)
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", apiRouter);

app.use("/", function (req, res) {
  res.send("This is the server for youandeyeawards");
});

module.exports = app;
