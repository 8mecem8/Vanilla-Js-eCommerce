const productRouter = require("express").Router();

const Product = require("../Models/productModel");
const isAdmin = require("../utils")
const jwt = require("jsonwebtoken");






productRouter.get("/",async(req, res, next)=> 
{


     try
    {
        const products = await Product.find({});
        res.send(products);
    }
     
     catch (err) 
     {
       next(err);
     }

})
;







productRouter.get("/:id",async(req, res, next)=> 
{

    try {
      const product = await Product.findById(req.params.id);
      res.send(product);
    } 

    catch (err) 
    {
      next(err);
    }

})
;









productRouter.post("/",isAdmin, async(req,res,next)=>
{
     try

     {
        const authorization = req.headers.authorization.substring(7);

        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        //console.log(decodedToken)
        if (!decodedToken) {return res.send({ message: "token missing or invalid" })}


        const product = new Product({
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          brand: req.body.brand,
          image: req.body.image,
          price: req.body.price,
          countInStock: req.body.countInStock,
          rating: req.body.rating,
        });


        savedProduct = await product.save()

        res
          .status(201)
          .send({ responseText: "New Product Created", Product: savedProduct });



     } 
     
     catch (err) 
     
     {
       next(err);
     }


}
)



























module.exports = productRouter;