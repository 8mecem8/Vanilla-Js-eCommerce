module.exports = isAdmin = (req, res, next) => {
  
  if (req.headers.user && req.headers.isadmin) {
    ;
    next();
  } else {
    res.status(401).send({ message: "Token is not valid for admin user" });
  }
};
