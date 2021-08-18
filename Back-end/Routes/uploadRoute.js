const uploadRouter = require("express").Router();


const multer = require("multer");
const isAdmin = require("../utils");
const jwt = require("jsonwebtoken");


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });


uploadRouter.post("/", isAdmin, upload.single("image"), (req, res, next)=> 
{
     try {
       const authorization = req.headers.authorization.substring(7);

       const decodedToken = jwt.verify(authorization, process.env.SECRET);
       
       if (!decodedToken) {
         return res.send({ message: "token missing or invalid" });
       }

       console.log(req.file);

       res.status(201).send({ image: `/${req.file.path}` });
     } 
     
     catch (err)
    {
       next(err);
    }
});
module.exports = uploadRouter;
