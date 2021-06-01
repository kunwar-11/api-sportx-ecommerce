const mongoose = require('mongoose')
const {Schema} = mongoose
const {products} = require('../dataset/data')

const ProductSchema = new Schema({
    productName :{ 
        type : String ,
        required : [true , 'Product Name is Required']
    },
    image : {
        type :String , 
        required : [true , 'image Url is Required']
    },
    price : {
        type : Number,
        required : [true , 'price is required']
    },
    ratings : Number,
    description : String,
    fastDelivery : Boolean,
    inStock : Boolean,
    gender : {
        type :String,
        required : [true , 'for whome this product is suitable for']
    },
    offers : Array
})


const Product = mongoose.model('Product' , ProductSchema);

const addProductToDb =  () => {
    products.forEach(async (product) => {
        const NewProduct = new Product(product)
        try {
            await NewProduct.save()
        }
        catch(error) {
            console.error('error adding products' , error)
        }        
    })
}

module.exports = {Product , addProductToDb}