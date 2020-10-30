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

router.delete('/:id', async (req, res) => {
  const house = await House.findById(req.params.id);

  const path = `/img/${house.images}`;
  await House.deleteOne({ _id: req.params.id });

  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.status(200).send();
});

router.get('/:id/edit', async (req, res) => {
  const house = await House.findById(req.params.id);
  res.render('edit', { house });
});

router.post('/:id/edit', upload.single('image_upload'), async (req, res) => {
  const house = await House.findById(req.params.id);

  house.name = req.body.name;
  house.description = req.body.description;
  house.price = req.body.price;

  if (req.file) {
    house.images = req.file.filename;
  }

  await house.save();

  res.redirect(`/houses/${house.id}`);
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
      subject: 'Новый контакт Life Trend House',
      html: `
      <h3>На сайте новый подписчик: <h3>
      <ul> 
      <li> Email: ${req.body.email} </li> 
      <li> Tel: ${req.body.phone} </li>
      <li> Комментарий к заказу: ${req.body.phone} </li>
      </ul>
      `,
    });
    console.log('Message sent: %s', info.messageId);
    res.status(200).send('Ok');
  } catch (error) {
    res.status(401).send('ой ой что-то пошло не так');
  }
});

module.exports = router;
