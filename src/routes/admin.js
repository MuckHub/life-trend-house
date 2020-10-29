const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  req.session.user = 'admin';
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) throw new Error(err);
    res.clearCookie(req.app.get('session cookie name'));
    return res.redirect('/');
  });
});
module.exports = router;
