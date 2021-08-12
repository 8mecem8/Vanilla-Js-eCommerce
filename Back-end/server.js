const express = require('express');
const app = express();
const cors = require('cors')

const mongoose = require('mongoose');
const data = require('./Sup-files/data.js')

const userRouter = require('./Routes/userRoute.js');
const orderRouter  = require('./Routes/orderRoute.js');

require('dotenv').config({path:__dirname+'/.env'})










// Middlewares-------------------------------------------------------------------------


app.use(cors())
app.use(express.json({ strict: false }))


app.use('/api/users', userRouter)
app.use('/api/order', orderRouter)

//Database------------------------------------------------------------------------------

mongoose.connect(process.env.DB_C,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => console.log('Database is being connected'))




// Routes--------------------------------------------------------------------------------
app.get("/api/products", (req, res)=>
{
    //res.send(data.products)
    res.json(data.products)
})


app.get("/api/products/:id", (req, res)=>
{
   const product = data.products.find(at => at._id === req.params.id)

   if(product){res.send(product)}
   else{res.status(404).send({error_message:'Product That You are Looking For Not Found'})}
})




app.get("/api/paypal/clientId", (req, res)=>
{
     res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})





// Error Handler Middlewares-------------------------------------------------------------


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({message:'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.json({message: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({message:'invalid token'})
  }



  console.error(error.message)

  next(error)
}

app.use(errorHandler)



//Server settings and Start server---------------------------------------------------------------


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{console.log(`Server is running at http://localhost:${PORT}`)})