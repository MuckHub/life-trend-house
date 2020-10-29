require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const app = express();
const indexRouter = require('./src/routes/index');
const houseRouter = require('./src/routes/house');
const loginRouter = require('./src/routes/login');
const portfolioRouter = require('./src/routes/portfolio');
const adminRouter = require('./src/routes/admin');

const methodOverride = require('method-override')
const dbConnect = require('./src/config/dbConnect');

dbConnect();
const PORT = process.env.PORT || 3000;

// Allows you to use PUT, DELETE with forms.!!!!!
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.set('session cookie name', 'sid');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const FileStore = sessionFileStore(session);
app.use(session({
  name: app.get('session cookie name'),
  secret: process.env.SESSION_SECRET,
  store: new FileStore({
    // Шифрование сессии
    secret: process.env.SESSION_SECRET,
  }),
  // Если true, сохраняет сессию, даже если она не поменялась
  resave: false,
  // Если false, куки появляются только при установке req.session
  saveUninitialized: false,
  cookie: {
    // В продакшне нужно "secure: true" для HTTPS
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 1
  }
}));

app.use('/', indexRouter);
app.use('/houses', houseRouter);
app.use('/login', loginRouter);
app.use('/portfolio', portfolioRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log('server started on PORT: ', PORT);
});
