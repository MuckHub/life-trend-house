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

router.get('/:id', async function (req, res, next) {
  let houses = await House.findById(req.params.id);
  res.render('detailed', { houses });

});

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/:id/edit', async (req, res) => {
  const house = await House.findById(req.params.id);
  res.render('houseEditForm', { house });
});

router.post('/:id/save', upload.single('image_upload'), async (req, res) => {
  const oldpath = reg.file.path;
  const newpath = oldpath.replace(req.file.filename, req.file.originalname);
  fs.renameSync(oldpath, newpath);
  const house = await House.findById(req.params.id);
  house.images = newpath;
  house.price = req.body.price;
  house.name = req.body.name;
  house.description = req.body.description;
  await house.save();
  res.redirect(`/houses/${house.id}`);
});

router.get('/:id/delete', async (req, res) => {
  await House.deleteOne({ '_id': req.params.id });
  res.redirect('/');
});

// router.post('/:id/request', async (req, res) => {
//   const id = req.params.id;
//   try {
//     let testAccount = await nodemailer.createTestAccount();

//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass,
//       },
//     });

//     let info = await transporter.sendMail({
//       // from: // нужен адрес почты 
//       //   to: // кому отправляем
//       // subject: "Новая заявка",
//       // text: // текст сообщения
//       //   html: // тело сообщения
//     });
//     res.status(200).send('Ok');
//   } catch (error) {
//     res.status(401).send('ой ой что-то пошло не так');
//   }
module.exports = router;
