const {initalizeConnection} = require('./Db/db.connect')
const products = require('./routes/product.route.js')
const cart = require('./routes/cart.route')
const user = require('./routes/auth.route')
const wishlist = require('./routes/wishlist.route')
const {addProductToDb} = require('./models/product.model')
const {addUserToDb} = require('./models/user.model')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const PORT = 3000

initalizeConnection()
//addProductToDb()  to be added only once
//addUserToDb();
app.use('/products' , products)
app.use('/cart' , cart)
app.use('/wishlist',wishlist)
app.use('/user',user)
app.get('/' , (req , res) => {
    res.send('hello express')
})


app.use((req , res) => {
    res.status(404).json({success : false  , message : 'page ont found'})
})

app.use((err , req ,res , next) => {
    console.error(err.stack)
    res.status(500).json({success : false , message : 'something went wrong' , error : err.message})
})
app.listen(PORT , () => console.log('server started at port' , PORT))