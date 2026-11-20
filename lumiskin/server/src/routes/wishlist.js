
import { Router } from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const r = Router();

// Get wishlist
r.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist');

    res.json(user?.wishlist || []);
  } catch (error) {
    console.error('Get Wishlist Error:', error);
    res.status(500).json({ message: 'Could not load wishlist' });
  }
});

// Add or remove product from wishlist
r.post('/', protect, async (req, res) => {
  try {
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Try removing the product if it already exists
    const removed = await User.findOneAndUpdate(
      { _id: req.user._id, wishlist: product },
      { $pull: { wishlist: product } },
      { new: true }
    );

    if (removed) {
      return res.json({ wishlist: removed.wishlist, added: false });
    }

    // Otherwise add it
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishlist: product } },
      { new: true }
    );

    res.json({ wishlist: updated.wishlist, added: true });

  } catch (error) {
    console.error('Update Wishlist Error:', error);
    res.status(500).json({ message: 'Could not update wishlist' });
  }
});

// Remove product from wishlist
r.delete('/:id', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: req.params.id } },
      { new: true }
    );

    res.json({ message: 'Removed from wishlist' });

  } catch (error) {
    console.error('Remove Wishlist Error:', error);
    res.status(500).json({ message: 'Could not remove product' });
  }
});

export default r;
