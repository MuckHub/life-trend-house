const express = require('express');

const router = express.Router();
const multer = require('multer');
const loggedIn = require('../middleware/admin');
const Portfolio = require('../models/Portfolio');

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, './public/img');
  },
  filename(request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

router.get('', async (req, res) => {
  const portfolios = await Portfolio.find().lean();
  res.render('portfolio', { portfolios });
});

router.get('/add', loggedIn, async (req, res) => {
  res.render('portfolioadd');
});

router.post(
  '/add',
  loggedIn,
  upload.single('portfolio_image_upload'),
  async (request, res) => {
    const newHouse = await new Portfolio({
      image: request.file.filename,
    }).save();

    res.redirect(`/portfolio`);
  }
);

module.exports = router;
