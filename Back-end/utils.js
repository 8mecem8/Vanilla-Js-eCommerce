module.exports = isAdmin = (req, res, next) => {
  console.log(req.headers);
  if (req.headers.user && req.headers.isadmin) {
    ;
    next();
  } else {
    res.status(401).send({ message: "Token is not valid for admin user" });
  }
};
