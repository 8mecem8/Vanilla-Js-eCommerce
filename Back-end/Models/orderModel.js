const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



const orderSchema = new mongoose.Schema(
{
    orderItems:
    [{
        name: {type:String, required:true},
        image: {type:String, required:true},
        price: {type:Number, required:true},
        qty: {type:Number, required:true},
        Product: 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,

        },



    }],

    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'userModel',
        required:true
    },

    shipping:
    {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },

    payment:
    {
        paymentMethod: String,
        paymentResult:{
            orderID: String,
            payerID: String,
            paymentID: String
        }
    },

    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: {type: Boolean,default:false,required:true},
    deliveredAt: Date,
    paidAt: Date,
    isDelivered:{type: Boolean,default:false,required:true},
},

{
    timestamps: true,
}

)


orderSchema.plugin(uniqueValidator)


const Order = mongoose.model('order',orderSchema)

module.exports = Order

