const express = require('express');
const app = express()
const PORT = 4000
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()
const passport = require("passport");
const users = require("./routes/api/users");
const articles = require("./routes/api/articles");
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = process.env.MONGODB_URI;


mongoose
  .connect(db)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);
// Routes

app.use("/api/users", users);
app.use('/api/users', articles);

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})