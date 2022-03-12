const path = require("path");
const url = require("url");
const fs = require("fs");

const messageController = {};

messageController.saveMessage = function (req, res) {
  const queryStringObject = url.parse(req.url, true).query;

  const data = JSON.stringify(queryStringObject);

  console.log(queryStringObject);
  console.log(`${__dirname}`);

  fs.writeFile(`./public/${queryStringObject.name}.json`, data, function (err) {
    if (!err) {
      //   res.send(`File ${queryStringObject.name} saved `);
      res.redirect("/home?testing");
    } else {
      res.send(`Could not write to file due to ${err}`);
    }
  });
};

module.exports = messageController;
