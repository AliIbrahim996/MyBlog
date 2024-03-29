var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

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
db.once("open", () => {
  console.log("Connected to DB successfully!");
});

const API_VERSION = process.env.API_VERSION || "v1";
const API_URI = process.env.API_URI || `/api/${API_VERSION}`;

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
app.use(cors());

// Register routers.
app.use("/", indexRouter);
app.use(`${API_URI}/users`, usersRouter);
app.use(`${API_URI}/posts`, postRouter);

app.use((err, req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "x-access-token, Origin, Content-Type, Accept"
  );
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("/posts*", (_, res) => {
  res.sendFile(path.join(__dirname, "public") + "/index.html");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
