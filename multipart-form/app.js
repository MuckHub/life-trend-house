const express = require('express');
const { fstat } = require('fs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'public/img' });

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.route('/')
  .get((req, res) => {
    res.render('index');
  })
  .post(upload.single('image_uploads'), (req, res) => {
    console.log(req.file);
    fs.renameSync(req.file.path, `public/img/${req.file.originalname}`);
    res.render('index');
  })

app.listen(3000);
