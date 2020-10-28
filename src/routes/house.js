const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: '../../public/img' });
const House = require('../models/House');
const nodemailer = require('nodemailer');

router
  .route('/')
  .get(async (req, res) => {
    const houses = await House.find().lean();
    res.render('houses', { houses });
  })
  .post(
    (upload.single('image_uploads'),
      async (req, res) => {
        fs.renameSync(
          req.file.path,
          path.join(process.env.PWD, `public/img/${req.file.originalname}`)
        );
        const { price, name, description } = req.body;
        const house = new House({ price, name, description });
        await house.save();
        res.redirect(`/houses/${house.id}`);
      })
  );

router.put('/:id', async function (req, res, next) {
  const house = await House.findById(req.params.id);

  house.name = req.body.name;
  house.description = req.body.description;
  house.price = req.body.price;

  await house.save();

  res.redirect(`/houses/${house.id}`);
});

router.post('/:id/request', async (req, res) => {
  const { phone, email } = req.body;

  const id = req.params.id;

  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: 'sinemettu@gmail.com',
      subject: "Новая заявка",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
    console.log("Message sent: %s", info.messageId);
    res.status(200).send('Ok');
  } catch (error) {
    res.status(401).send('ой ой что-то пошло не так');
  }
});

router.get('/:id', async function (req, res, next) {
  let houses = await House.findById(req.params.id);
  res.render('detailed', { houses });
});

router.route('/new').get((req, res) => {
  // otobrazhetsja vse formy dlja wablona dom
});

router.get('/:id', (req, res) => {
  // vse texsty zamenjajutsja na formochki/ vozmozhno 4erez fetch zaprosy)
});

router.get('/:id/edit', (req, res) => {
  // vse texsty zamenjajutsja na formochki/ vozmozhno 4erez fetch zaprosy)
});

router.get('/:id/delete', (req, res) => {
  //chistim bazu dannyh?
});

router.post('/:id/save', upload.single('image_uploads'), async (req, res) => {
  fs.renameSync(
    req.file.path,
    path.join(process.env.PWD, `public/img/${req.file.originalname}`)
  ); //put' skoree vsego nevernyj
  const { price, name, description } = req.body;
  await house.updateOne(req.params.id, { price, name, description });
});

module.exports = router;
