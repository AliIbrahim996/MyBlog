var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors')

// Setup mongo db
var mongoose = require("mongoose");
var username = process.env.USERNAME;
var password = process.env.PASSWORD;
var CONNECTION_STRING = `mongodb+srv://${username}:${password}@blogappcluster0.qrykbwc.mongodb.net/`;

// Setup connection
mongoose.connect(CONNECTION_STRING);
var db = mongoose.connection;

// Recover from errors
db.on("error", console.error.bind(console, "Connection error:"));
db.once('open', () =>{
  console.log("Connected to DB successfully!")
})
var indexRouter = require("./routes/index");
var postRouter = require("./routes/posts");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/posts", postRouter);

app.get("/posts*", (_, res) => {
  res.sendFile(path.join(__dirname, "public") + "/index.html");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  res.header('Access-Control-Allow-Origin', `http://blogAppClient:${process.env.REACT_APP_CLIENT_PORT}`)
});

module.exports = app;
