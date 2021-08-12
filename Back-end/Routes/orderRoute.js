const Order = require('../Models/orderModel')


const orderRouter = require('express').Router()
const jwt = require('jsonwebtoken')










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




module.exports = orderRouter