const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: '../../public/img' });
const House = require('../models/House');

router
  .route('/') // otobrazhem vse doma v resulatate nazhatija na spisok iz treh domikov
  .get(async (req, res) => {
    const houses = await House.find().lean();
    res.render('houses', { houses });
  }) // v post priletaet zapolnenaja adminom formo4ka novyj dom s hbs-ski houses/show, kotoray renderit'sja po ru4ke /houses/new
  .post((upload.single('image_uploads'), async (req, res) => {
    fs.renameSync(req.file.path, path.join(process.env.PWD, `public/img/${req.file.originalname}`));
    const { price, name, description } = req.body;
    const house = new House({ price, name, description });
    await house.save();// vozmozhno ne nuzhno?
    res.redirect(`/houses/${house.id}`);
  }));

router.put('/:id', async function (req, res, next) { //sohranjaem v bazu dannyh
  const house = await House.findById(req.params.id);
  await house.save();
  res.redirect(`/houses/${house.id}`);
});

router.get('/:id', async function (req, res, next) { //pokazayvaem kak budet vygladet' novyj domik, opcii EDIT i DELETE
  const house = await House.findById(req.params.id);
  res.render('houses/show', { house });
});

router.route('/new') //sozdaem formo4ki dlja zapolnenija adminom
  .get((req, res) => {
    res.render('houses/new');
  })


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
  fs.renameSync(req.file.path, path.join(process.env.PWD, `public/img/${req.file.originalname}`));//put' skoree vsego nevernyj
  const { price, name, description } = req.body;
  await house.updateOne(req.params.id, { price, name, description });
});




module.exports = router;
