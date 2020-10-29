const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const House = require('../models/House');

const router = express.Router();
const fs = require('fs');
// const path = require('path');

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, './public/img');
  },
  filename(request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

router.route('/').get(async (req, res) => {
  const houses = await House.find().lean();
  res.render('houses', { houses });
});

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/:id', async (req, res, next) => {
  const houses = await House.findById(req.params.id);
  res.render('detailed', { houses });
});

router.get('/:id/edit', async (req, res) => {
  const house = await House.findById(req.params.id);
  res.render('houseEditForm', { house });
});

router.post('/add', upload.single('image_upload'), async (request, res) => {
  const newHouse = await new House({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    images: request.file.filename,
  }).save();

  res.redirect(`/houses/${newHouse.id}`);
});

router.post('/:id/request', async (req, res) => {
  const { phone, email } = req.body;

  const { id } = req.params;

  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'lifetrendhouse@mail.ru',
        pass: 'nodemailer001',
      },
    });

    const info = await transporter.sendMail({
      from: 'Trend Life House <lifetrendhouse@mail.ru>',
      to: 'sinemettu@gmail.com, rudnevaketi@gmail.com, rudnevaketi@mail.ru',
      subject: 'Yo!',
      text: 'Yo!',
      html: `"<b>Hello world?</b>, email: ${req.body.email}, tel: ${req.body.phone}`,
    });
    console.log('Message sent: %s', info.messageId);
    res.status(200).send('Ok');
  } catch (error) {
    res.status(401).send('ой ой что-то пошло не так');
  }
});

router.get('/:id/delete', async (req, res) => {
  await House.deleteOne({ _id: req.params.id });
  res.redirect('/');
});

module.exports = router;
