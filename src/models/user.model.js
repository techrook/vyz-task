const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    password:{
     type:String,
     required:true,
     minlength:6
    },
    email:{
        type:String,
        required:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique:true 
        },
    status :{
        type: String,
        default: "not-paid"
    }
    })

    //encrypting password 
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
   
   })

   //creating  a jwt token for the user 
UserSchema.methods.createjwt = function(){
    // @ts-ignore
    return jwt.sign({userId:this._id, firstName:this.firstname},process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_LIFESPAN})
}

///checking if the user password is correct for the login 
UserSchema.methods.checkpassword = async function(userpassword){
    const passwordmatch = await bcrypt.compare(userpassword, this.password)
    return passwordmatch
}


module.exports = mongoose.model('Users',UserSchema)