import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Review from '../models/Review.js';

// @desc    Get all products with search, filter, pagination
// @route   GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const minPrice = req.query.minPrice ? { price: { $gte: Number(req.query.minPrice) } } : {};
  const maxPrice = req.query.maxPrice ? { price: { $lte: Number(req.query.maxPrice) } } : {};

  const filter = { ...keyword, ...category, ...minPrice, ...maxPrice };
  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Get single product
// @route   GET /api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'reviews',
    populate: { path: 'user', select: 'name avatar' },
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create product
// @route   POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, category, brand, stock } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    image,
    category,
    brand,
    stock,
    user: req.user._id,
  });
  res.status(201).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create product review
// @route   POST /api/products/:id/reviews
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  const alreadyReviewed = await Review.findOne({ user: req.user._id, product: product._id });
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }
  const review = await Review.create({
    user: req.user._id,
    product: product._id,
    rating: Number(rating),
    comment,
    name: req.user.name,
  });
  product.reviews.push(review._id);
  product.numReviews = product.reviews.length;
  const allReviews = await Review.find({ product: product._id });
  product.rating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

// @desc    Get product categories
// @route   GET /api/products/categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
});
