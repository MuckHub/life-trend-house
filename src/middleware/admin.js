const isAdmin = (req, res, next) => {
  if (req.session && req.session.user) {
    req.app.locals.isAdmin = true;
  }
  next();
};


module.exports = {
  isAdmin,
};
