const express = require('express');
const router = express.Router();
const { Order } = require('../models/dbWrapper');
const authMiddleware = require('../middleware/auth');

// Static product catalog to match exact requested DB collections (where Orders is the collection)
const PRODUCTS = [
  {
    id: 'item_1',
    title: 'GameZone Neon Hoodie',
    price: 59.99,
    category: 'Merch',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400',
    description: 'Premium dark void hoodie with glowing fluorescent pink and cyan screenprint designs.',
    stock: 50
  },
  {
    id: 'item_2',
    title: 'RGB Gaming Mouse',
    price: 79.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=400',
    description: 'Ultralight wireless gaming mouse featuring 26k DPI, optical switches, and neon RGB base.',
    stock: 35
  },
  {
    id: 'item_3',
    title: 'Mechanical Keyboard (Blue Switch)',
    price: 129.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400',
    description: 'Hot-swappable mechanical gaming keyboard with aluminum frame and custom per-key backlighting.',
    stock: 20
  },
  {
    id: 'item_4',
    title: 'GameZone Neon Cap',
    price: 24.99,
    category: 'Merch',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400',
    description: 'Structured high-profile snapback featuring 3D embroidered retro gaming patch.',
    stock: 100
  }
];

// @route   GET api/store/products
// @desc    Get all store products
// @access  Public
router.get('/products', (req, res) => {
  res.json(PRODUCTS);
});

// @route   POST api/store/checkout
// @desc    Place an order
// @access  Private
router.post('/checkout', authMiddleware, async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  try {
    let totalAmount = 0;
    const items = cartItems.map(cartItem => {
      const product = PRODUCTS.find(p => p.id === cartItem.id);
      if (!product) {
        throw new Error(`Product with ID ${cartItem.id} not found`);
      }
      const itemTotal = product.price * cartItem.quantity;
      totalAmount += itemTotal;

      return {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: cartItem.quantity
      };
    });

    totalAmount = Number(totalAmount.toFixed(2));

    const newOrder = await Order.create({
      userId: req.user.userId,
      username: req.user.username,
      items,
      totalAmount,
      status: 'completed'
    });

    res.json({
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error placing order' });
  }
});

module.exports = router;
