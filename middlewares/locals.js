function setLocals(req, res, next) {
  res.locals.currentUser = req.session.user || null;
  res.locals.isAuthenticated = Boolean(req.session.userId);
  res.locals.isAdmin = Boolean(req.session.isAdmin);
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;

  delete req.session.success;
  delete req.session.error;
  next();
}

module.exports = setLocals;
