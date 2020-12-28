const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI; 
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const passport = require("passport");


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully!!"))
  .catch((err) => console.log(err))
;

app.use(bodyParser.urlencoded({ extended: false })); // ORDER OF THIS MATTERS
app.use(bodyParser.json()); // ORDER OF THIS MATTERS
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("Hello"));
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));