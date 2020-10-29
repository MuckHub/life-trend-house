const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.get('/login', (req, res) => {
  req.session.user = 'admin';
  res.redirect('/');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;


  if (email && password) {
    try {
      const admin = await Admin.findOne({ email }).lean();
      if (admin) {
        const validPassword = admin.password;
        if (validPassword === password) {
          req.session.user = admin;
          res.redirect('/houses');
        } else {
          res.redirect(401, '/');
        }
      } else {
        res.redirect(401, '/');
      }
    } catch (e) {
      res.redirect('/');
    }
  } else {
    res.render('main', { error: 'Всё не так' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) throw new Error(err);
    res.clearCookie(req.app.get('session cookie name'));
    return res.redirect('/');
  });
});
module.exports = router;
