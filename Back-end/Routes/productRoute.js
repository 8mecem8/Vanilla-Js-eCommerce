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













productRouter.put("/:id", isAdmin, async (req, res, next) => {


  try 
  
  {



    const authorization = req.headers.authorization.substring(7);

    const decodedToken = jwt.verify(authorization, process.env.SECRET);
    //console.log(decodedToken)
    if (!decodedToken) {
      return res.send({ message: "token missing or invalid" });
    }

    const singleProduct = await Product.findById(req.params.id) 

        if (singleProduct)
        {
            singleProduct.name = req.body.name; 
            singleProduct.description = req.body.description
            singleProduct.category = req.body.category
            singleProduct.brand = req.body.brand
            singleProduct.image = req.body.image
            singleProduct.price = req.body.price
            singleProduct.countInStock = req.body.countInStock
            
        }

      const updatedSingleProduct = await singleProduct.save();
     
        //console.log("updatedSingleProduct is ===>", updatedSingleProduct);
      
      res
        .status(200)
        .send({ responseText: "Product Updated", Product: updatedSingleProduct });
  } 
  
  catch (err)
  
  {
    next(err);
  }
});


















productRouter.delete("/:id", isAdmin, async (req, res, next) => {
   
  try 
  
  {
    const authorization = req.headers.authorization.substring(7);

    const decodedToken = jwt.verify(authorization, process.env.SECRET);
    //console.log(decodedToken)
    if (!decodedToken) {
      return res.send({ message: "token missing or invalid" });
    }

      const product = await Product.findById(req.params.id);

      if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deletedProduct });
    }

    else {
      res.status(404).send({ message: 'Product Not Found' });
    }
   
     
  } 
  
  catch (err)
  
  {
    next(err);
  }
});








module.exports = productRouter;