const mongoose=require('mongoose')

const userschema=new mongoose.Schema(
    {
        Username:String,
        Email:String,
        Password:String
    }
)
const usermodel=mongoose.model('user',userschema)

module.exports=usermodel