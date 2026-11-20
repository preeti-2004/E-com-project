import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true},password:{type:String,required:true},role:{type:String,enum:['customer','admin'],default:'customer'},skinType:{type:String,default:''},concerns:[String],addresses:[{label:String,line1:String,city:String,state:String,pincode:String,phone:String}],wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}],resetToken:String,resetExpires:Date},{timestamps:true});
export default mongoose.model('User',userSchema);
