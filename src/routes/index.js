const express = require('express');
const router = express.Router();
const House = require('../models/House');
const Contacts = require('../models/Contacts');

router.route('').get(async (req, res) => {
  const houses = await House.find().limit(3).lean();
  res.render('main', { houses });
});

router.get('/contacts', async (req, res) => {
  const contact = await Contacts.findOne().limit(1).lean();
  res.render('contacts', { contact });
});

router.get('/contacts/edit', async (req, res) => {
  const contact = await Contacts.findOne().lean();
  console.log(contact);
  res.render('contactsEdit', { contact });
});
router.post('/contacts/edit', async (req, res) => {
  console.log(req.body);
  const { name, tel, email, address } = req.body;
  await Contacts.updateOne({}, { name, tel, email, address });
  res.redirect('/contacts');
});

router.get('/team', (req, res) => {
  res.render('team');
});

module.exports = router;
