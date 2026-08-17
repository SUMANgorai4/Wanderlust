const { required } = require("joi");
const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const passportLocalMongoose=require("passport-local-mongoose").default;

const userSchema=new Schema({   
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);   // user name and password salt and hasging  is auotmatically add by passport-local-mongoose

module.exports=mongoose.model("User",userSchema);
