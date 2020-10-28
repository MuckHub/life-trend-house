require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const filestore = require('session-file-store');
const bcrypt = require('bcrypt');
const dbConnect = require('./src/config/dbConnect');


const app = express();

const PORT = process.env.PORT || 3000;
dbConnect();

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})
