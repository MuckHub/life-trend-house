const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('', async function (req, res, next) {
  res.render('login');
});




module.exports = router;
