import 'dotenv/config';import express from 'express';import cors from 'cors';import connectDB from './config/db.js';import auth from './routes/auth.js';import products from './routes/products.js';import orders from './routes/orders.js';import users from './routes/users.js';import wishlist from './routes/wishlist.js';
const app=express();app.use(cors({origin:process.env.CLIENT_URL?.split(',')||'http://localhost:5173'}));app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://lumiskin-jb5y.onrender.com'
  ]
}));app.get('/api/health',(req,res)=>res.json({status:'ok',app:'Lumiskin'}));app.use('/api/auth',auth);app.use('/api/products',products);app.use('/api/orders',orders);app.use('/api/users',users);app.use('/api/wishlist',wishlist);app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:'Something went wrong'});});const port=process.env.PORT||5000;connectDB().then(()=>app.listen(port,()=>console.log(`Lumiskin API running on ${port}`))).catch(e=>{console.error(e);process.exit(1)});
