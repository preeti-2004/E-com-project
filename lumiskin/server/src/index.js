
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import products from './routes/products.js';
import orders from './routes/orders.js';
import users from './routes/users.js';
import wishlist from './routes/wishlist.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://lumiskin-jb5y.onrender.com'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Important: Parse JSON request body
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Lumiskin' });
});

app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/wishlist', wishlist);

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Something went wrong' });
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Lumiskin API running on ${port}`);
    });
  })
  .catch(error => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
