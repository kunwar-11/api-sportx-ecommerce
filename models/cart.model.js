const { unique } = require('faker')
const mongoose = require('mongoose')
const {Schema} = mongoose

const CartSchema = new Schema({
    uid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    items : [
        {
            _id : {
                type : mongoose.Schema.Types.ObjectId , 
                ref : 'Product',
            } ,
            quantity : Number
        }
    ]
})


const Cart = mongoose.model('Carts' , CartSchema)

module.exports = Cart