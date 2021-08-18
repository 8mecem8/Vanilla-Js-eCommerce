const Order = require('../Models/orderModel')


const orderRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const isAdmin = require("../utils")
const userModel = require('../Models/userModel')
const Product = require("../Models/productModel");









orderRouter.get('/summary',isAdmin,async (req, res, next)=> 
{
          console.log(req)
    try
    {
            const authorization = req.headers.authorization.substring(7)
                            
                            const decodedToken = jwt.verify(authorization, process.env.SECRET)
                            

        if (!decodedToken) {return res.send({message:'token missing or invalid' })}





    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);





      const users = await userModel.find().count()
    /* const users = await userModel.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]); */


    

    const dailyOrders = await Order.aggregate(
      
    [
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      {$sort:{_id: +1}}
    ]
    
    
    );


    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);




    res.send({
      users,
      orders: orders.length === 0 ? [{ numOrders: 0, totalSales: 0 }] : orders,
      dailyOrders,
      productCategories,
    });

  }

 catch(err) 
    {
        next(err)
    }

})














orderRouter.put('/:id/deliver', async(req,res, next) =>
{
    

     try
    {
            const authorization = req.headers.authorization.substring(7)
                            
                            const decodedToken = jwt.verify(authorization, process.env.SECRET)
                            

        if (!decodedToken) {return res.send({message:'token missing or invalid' })}


             const order = await Order.findById(req.params.id)
                
        if(order)
        {
            order.isDelivered = true
            order.deliveredAt = new Date().toString()
            
                console.log(order.deliveredAt)
                

                const updatedOrder = await order.save()

                

                res.send({message:"Order Delivered", order: updatedOrder})
        }

            
        
        else {res.send({message:'Order not Found or invalid Order İd' })}

    }

    catch(err) 
    {
        next(err)
    }

}
)




















orderRouter.get("/", isAdmin ,async(req, res, next)=> 
{


     try
    {
    const authorization = req.headers.authorization.substring(7);

    const decodedToken = jwt.verify(authorization, process.env.SECRET);
    //console.log(decodedToken)
    if (!decodedToken) {
      return res.send({ message: "token missing or invalid" });
    }



        const Orders = await Order.find({}).populate('userModel')
        
        console.log(Orders)

        res.send(Orders);
    }
     
     catch (err) 
     {
       next(err);
     }

})
;










orderRouter.get('/mine', async(req,res, next)=>
{



    try
    {
        


        const authorization = req.headers.authorization.substring(7)
                            
                            const decodedToken = jwt.verify(authorization, process.env.SECRET)
                            //console.log(decodedToken)

        if (!decodedToken) {return res.send({message:'token missing or invalid' })}



        const orders = await Order.find({user: req.headers.userid})
        
        res.send(orders)
 

    }


    catch(err) 
    {
        next(err)
    }
})



















orderRouter.post('/', async(req,res, next)=>
{

    try
    {



                            const authorization = req.headers.authorization.substring(7)
                            
                            const decodedToken = jwt.verify(authorization, process.env.SECRET)
                            //console.log(decodedToken)

        if (!decodedToken) {return res.send({message:'token missing or invalid' })}


        //console.log('req.body is ====> -----',req.body)


        const order = new Order({
                                    orderItems: req.body.orderItems,
                                    user: req.headers.userid,
                                    shipping: req.body.shipping,
                                    payment: req.body.payment,
                                    itemsPrice: req.body.itemsPrice,
                                    taxPrice: req.body.taxPrice,
                                    shippingPrice: req.body.shippingPrice,
                                    totalPrice: req.body.totalPrice,
                                })




                                const savedOrder = await order.save()


                                //console.log('savedOrder is ====> ------',savedOrder)

                                res.status(201).send({ responseText: 'New Order Created', order: savedOrder})

    }

    catch(err)  {
                    next(err)
                }

})







orderRouter.get('/:id', async(req,res, next)=>
{
    try
    {

        const authorization = req.headers.authorization.substring(7)
                            
                            const decodedToken = jwt.verify(authorization, process.env.SECRET)
                            //console.log(decodedToken)

        if (!decodedToken) {return res.send({message:'token missing or invalid' })}





        const order = await Order.findById(req.params.id)

        //console.log('order is =====>>> ---',order)

        if(order) {res.send(order)}
        else {res.send({message:'Order not Found or invalid Order İd' })}

    }


    catch(err) 
    {
        next(err)
    }
})





































orderRouter.put('/:id/pay', async(req,res, next) =>
{
     try
    {
            const authorization = req.headers.authorization.substring(7)
                            
                            const decodedToken = jwt.verify(authorization, process.env.SECRET)
                            //console.log(decodedToken)

        if (!decodedToken) {return res.send({message:'token missing or invalid' })}


             const order = await Order.findById(req.params.id)

        if(order)
        {
            order.isPaid = true
            order.paidAt = new Date().toString()
            order.payment.paymentResult =
                {
                    payerID: req.body.payerID,
                    paymentID: req.body.paymentID,
                    orderID: req.body.orderID,
                }


                

                const updatedOrder = await order.save()

                res.send({message:"Order Paid", order: updatedOrder})
        }

            
        
        else {res.send({message:'Order not Found or invalid Order İd' })}

    }

    catch(err) 
    {
        next(err)
    }

}
)










orderRouter.delete("/:id", isAdmin, async (req, res, next) => {
   
  try 
  
  {
    const authorization = req.headers.authorization.substring(7);

    const decodedToken = jwt.verify(authorization, process.env.SECRET);
    //console.log(decodedToken)
    if (!decodedToken) {
      return res.send({ message: "token missing or invalid" });
    }

      const order = await Order.findById(req.params.id);

      if (order) {
      const deletedOrder = await order.remove();
      res.send({ message: 'Order Deleted', product: deletedOrder });
    }

    else {
      res.status(404).send({ message: 'Order Not Found' });
    }
   
     
  } 
  
  catch (err)
  
  {
    next(err);
  }
});






















module.exports = orderRouter