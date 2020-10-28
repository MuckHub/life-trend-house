const express = require('express');
const router = express.Router();
const House = require('../models/House');


router.route('')
  .get(async (req, res) => {
    const houses = await House.find().limit(3).lean();
    res.render('main', { houses });
  });

router.get('/contacts', (req, res) => {
  res.render('contacts');
});


module.exports = router;
