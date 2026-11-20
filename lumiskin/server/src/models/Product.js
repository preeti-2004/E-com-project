import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},brand:{type:String,default:'Lumiskin Edit'},category:{type:String,required:true},description:String,price:{type:Number,required:true,min:0},compareAtPrice:Number,image:String,skinTypes:[String],concerns:[String],ingredients:[String],benefits:[String],rating:{type:Number,default:4.6},stock:{type:Number,default:20},featured:{type:Boolean,default:false}},{timestamps:true});
export default mongoose.model('Product',schema);
