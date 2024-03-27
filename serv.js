const express = require("express");
const { engine } = require("express-handlebars");
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("static"));
app.get("/home", function (req, res) {
  res.render("home");
});
app.get("/porg", function (req, res) {
  res.render("porg", {
    porgs: [1, 2, 3],
  });
});
app.get("/", function (req, res) {
  res.render("house");
});
app.get("/dbzsa", function (req, res) {
  res.render("dbzsa");
});
app.get("/flappybird", function (req, res) {
  res.render("flappybird");
});
app.listen(3001);
