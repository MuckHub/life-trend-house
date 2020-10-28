const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: '../../public/img' });
const House = require('../models/House');

router.get('/', (req, res) => {
  // otobrazhajutsja vse doma
});

router.route('/new')
  , get((req, res) => {
    // otobrazhetsja vse formy dlja wablona dom
  })
    .post((upload.single('image_uploads'), async (req, res) => {
      fs.renameSync(req.file.path, path.join(process.env.PWD, `public/img/${req.file.originalname}`));
      const { price, name, description } = req.body;
      const house = new House({ price, name, description });
      await house.save();
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