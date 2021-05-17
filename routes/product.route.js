const {Product} = require('../models/product.model')
const express = require('express')
const router = express.Router()
router.route('/')
    .get(async (req , res) => {
        try {
            const products = await Product.find({})
            res.status(200).json({success : true , products})
        } catch (error) {
            res.json({success : false , message : 'cannot fetch products! please try again later'})
        }
    })
router.param('productId' , async (req , res , next , productId) => {
    const product = await Product.findById(productId)
    if(!product) {
        return res.status(400).json({success : false , message : 'product not found'})
    }
    req.product = product
    next()
})
router.route('/:productId') 
    .get((req , res) => {
        const {product} = req
        res.status(200).json({success : true , product})
    })

module.exports = router