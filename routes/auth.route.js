const {User} = require('../models/user.model')
const express = require('express')
const Cart = require('../models/cart.model')
const Wishlist = require('../models/wishlist.model')
const { json } = require('body-parser')
const router = express.Router()
router.route('/')
    .get(async (req , res) => {
        try {
            const user = await User.find({})
            res.status(200).json({success : true , user})
        } catch (error) {
            res.status(404).json({success : false , message : error.message})
        }
    })
router.route('/signup')
    .post(async (req , res) => {
        try {
            const {userData} = req.body
        const user = await User.findOne({email : userData.email})
        if(user) {
            return res.status(409).json({success : false , message : 'User already exist please log in to continue'})
        }
        const NewUser = new User(userData)
        await NewUser.save()
        const NewUserCart = new Cart({uid : NewUser._id , items : []})
        await NewUserCart.save()
        const NewUserWishlist = new Wishlist({uid : NewUser._id , items : []})
        await NewUserWishlist.save()
        res.status(200).json({success : true , user : NewUser})
        } catch (error) {
            res.status(400).json({success : false , message : error.message})
        }
        
    })

router.route('/login')
    .post(async (req  , res) => {
        try {
            const {userEmail , password} = req.body
            const user = await User.findOne({email : userEmail})
            if(user) {
                if(user.password === password) {
                    return res.status(200).json({success : true , userName : user.firstName , userId : user._id})
                }
                    res.status(401).json({success : false , message : 'Incorrect Password'})
            }
            res.status(401).json({success : false , message : 'email not found please Sign Up'})
        } catch (error) {
            res.status(400).json({success : false , message : 'Something went wrong please try again!!'})
        }
       
    })


module.exports = router