const Wishlist = require('../models/wishlist.model')
const express = require('express')
const router = express.Router()
router.route('/')
    .get( async (req , res) => {
        try {
            const wishlists = await Wishlist.find({})
            res.status(200).json({success : true , wishlists})
        } catch (error) {
            res.status(404).json({success : false , message : "Unabale to fetch Wishlists"})
        }
    })

router.param('userId' , async (req , res , next , userId) => {
    try {
        const wishlist = await Wishlist.findOne({uid : userId})
        if(!wishlist) {
            res.status(400).json({success : false , message : 'Wishlist not found please signUp'})
        } 
        req.wishlist = wishlist
        next()
    } catch (error) {
       res.status(404).json({success : false , message : 'user Not found please sign Up'})
    }
})
router.route('/:userId')
    .get(async (req , res) => {
        let {wishlist} = req
        try {
            wishlist = await wishlist.populate('items._id').execPopulate()
                const NormalizedWishlist = wishlist.items.map((item) => item._id._doc)
                res.status(200).json({success : true , wishlist : NormalizedWishlist})
            }
        catch (error) {
            res.status(404).json({success : false , message : error.message})
        }
    })
    .post(async (req , res) => {
        try {
            let {wishlist} = req;
        const {productId} = req.body
        if(wishlist.items.some(each => each._id == productId)) {
           return res.json({success : false , message : 'already present in Wishlist'})
        }
        wishlist.items.push({_id : productId})
        wishlist = await wishlist.save()
        wishlist = await wishlist.populate('items._id').execPopulate()
        const NormalizedWishlist = wishlist.items.map(item => item._id._doc)
        let product = NormalizedWishlist.find(each => each._id == productId)
        if(product)
            res.status(201).json({success : true , product})
        } catch (error) {
            res.status(400).json({success : false , message : error.message})
        }
    })
router.route('/:userId/:productId')
    .delete(async (req , res) => {
        try {
            let {wishlist} = req;
            const {productId} = req.params
            const product = wishlist.items.find(each => each._id == productId)
            if(product){
                wishlist.items.pull({_id : productId})
                await wishlist.save()
                return res.status(200).json({success : true , product})
            }
            res.status(400).json({success : false , message : 'product not found'})
        } catch (error) {
            res.status(400).json({success : false , message : error.message })
        }
    })


module.exports = router