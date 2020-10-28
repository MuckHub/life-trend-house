const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: '../../public/img' });
const House = require('../models/House');

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
