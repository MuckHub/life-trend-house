const dbConnect = require('./src/config/dbConnect');
const mongoose = require('mongoose');
const User = require('./src/models/User');
const House = require('./src/models/House');
const Contacts = require('./src/models/Contacts');
const faker = require('faker');

dbConnect();

