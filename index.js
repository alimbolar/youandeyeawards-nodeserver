const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

const cors = require("cors");

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

const apiRouter = require("./routers/apiRouter");
const adminRouter = require("./routers/adminRouter");
const aeApiRouter = require("./routers/ae/apiRouter");
const aeAdminRouter = require("./routers/ae/adminRouter");



// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Data sanitization against XSS
// app.use(xss());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes for India Edition (in)
app.use("/api/v1", apiRouter);
app.use("/", adminRouter);

// Routes for Arabia Edition (ae)
app.use("/api/v1/ae", aeApiRouter);
app.use("/admin/ae", aeAdminRouter);

// app.use("/", function (req, res) {
//   res.send("This is the server for youandeyeawards");
// });

module.exports = app;
