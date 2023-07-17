const app = require("./index");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/.env` });

const DB = process.env.AE_DATABASE.replace(
  `{%PASSWORD%}`,
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function () {
  console.log(`Server is running at Port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥 :", err.name, err.message);
  console.log("STACK :", err.stack);
  console.log("Shutting down server...");
  server.close(() => process.exit(1));
});
