const mongoose = require('mongoose')
const {Schema} = mongoose
const {user} = require('../dataset/data')
const Cart = require('./cart.model')
const Wishlist = require('./wishlist.model')
const UserSchema = new Schema({
    firstName : {
        type : String,
        required : [true , 'First Name Required']
    },
    lastName : {
        type : String,
        required : [true , 'Last Name Required']
    },
    email : {
        type : String,
        required : [true , 'email is required'],
        unique : [true , 'email alredy exists'],
        validate : {
            validator : (v) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            },
            message : props => `${props.value} is not a valid Email Id`
        }
    },
    password : {
        type : String,
        required : [true , 'password is required'],
        validate : {
            validator : (v) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)
            },
            message : () => `Password should have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`
        }
    }
})


const User = mongoose.model('User' , UserSchema);

const addUserToDb =  () => {
    user.forEach(async (user) =>{
        const NewUser = new User(user);
        try {
            await NewUser.save()
            const NewCart = new Cart({uid : NewUser._id , items : []})
            await NewCart.save()
            const NewWishList = new Wishlist({uid : NewUser._id , items : []})
            await NewWishList.save()
        }
        catch(error) {
            console.error('cannot add to Databse' , error)
        }
    })
}

module.exports = {User , addUserToDb }