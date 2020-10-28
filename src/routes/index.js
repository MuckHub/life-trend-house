const express = require('express');
const router = express.Router();


router.route('')
  .get((req, res) => {
    res.render('main');
  })

router.get('/contacts', (req, res) => {
  res.render('contacts');
});


module.exports = router;