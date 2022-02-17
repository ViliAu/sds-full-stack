require("dotenv").config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Connect to db
mongoose.connect("mongodb://localhost:27017/sdsDB");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// Init middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
});

const port = process.env.PORT | 8080;
app.listen(port, console.log("Listening on port " + port));