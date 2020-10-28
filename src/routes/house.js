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

router.get('/new', (req, res) => {
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
  fs.renameSync(req.file.path, path.join(process.env.PWD, `public/img/${req.file.originalname}`));
  const { price, name, description } = req.body;
  const house = new House({ price, name, description });
  await house.save();
});




module.exports = router;