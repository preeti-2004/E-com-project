import {Router} from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import {protect} from '../middleware/auth.js';
const r=Router();
r.get('/',protect,async(req,res)=>{const u=await User.findById(req.user._id).populate('wishlist');res.json(u.wishlist||[])});
r.post('/',protect,async(req,res)=>{const id=req.body.product;if(!await Product.findById(id))return res.status(404).json({message:'Product not found'});const u=await User.findById(req.user._id);u.wishlist=u.wishlist||[];const exists=u.wishlist.some(x=>String(x)===String(id));u.wishlist=exists?u.wishlist.filter(x=>String(x)!==String(id)):[...u.wishlist,id];await u.save();res.json({wishlist:u.wishlist,added:!exists})});
r.delete('/:id',protect,async(req,res)=>{const u=await User.findById(req.user._id);u.wishlist=(u.wishlist||[]).filter(x=>String(x)!==req.params.id);await u.save();res.json({message:'Removed from wishlist'})});
export default r;
