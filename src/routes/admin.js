const express = require('express');

const router = express.Router();
const Admin = require('../models/Admin');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const admin = await Admin.findOne({ email }).lean();
      if (admin) {
        const validPass = admin.password === password;

        if (validPass) {
          req.session.user = admin;
          res.redirect('/houses');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw new Error(err);
    res.clearCookie(req.app.get('session cookie name'));
    return res.redirect('/');
  });
});
module.exports = router;
