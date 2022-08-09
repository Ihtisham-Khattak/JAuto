//initialize the Express
const express = require("express");
//Mongo
const mongoose = require("mongoose");
const connectionDB = require("./Config/dbConn");
//Accessing the files
const { logger, logEvent } = require("./Middlewares/logger");
//AllowedOrigin
const crossOrigin = require("./Config/crosOrigin");
//ErrorHandler
const errorHandler = require("./Middlewares/errorHandler");
//Database Environment
require("dotenv").config();
//Parser the cookie attached with client requests
const cookieParser = require("cookie-parser");
//Cross Origin Platform
const cors = require("cors");
//Initialize the path (node)
const path = require("path");
//Initialize the app
const app = express();

//Logger MIDDLEWARE
app.use(logger);

//Fetch data on JSON form
app.use(express.json());
app.use(cookieParser());
app.use(cors(crossOrigin));

//Mongo importing
connectionDB();

//Express static is use to get static CSS file from the specified path
app.use("/", express.static(path.join(__dirname, "/Public")));
//HTML file from specified path
app.use("/", require("./Routes/routes"));

//For Unkown Router
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "View", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//Port number
const PORT = process.env.PORT || 8000;
//ErrorHandler
app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log('Mongoo is Connected')
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
});

mongoose.connection.on( 'error', (err) => {
    console.error(err)
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrorlog.log')
})
