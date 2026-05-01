import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
  { name: 'Ethiopian Coffee Beans - Premium Yirgacheffe', description: 'World-famous Ethiopian Yirgacheffe coffee beans. Rich aroma, fruity and floral notes. 500g pack.', price: 12.99, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500', category: 'Hot Deals', brand: 'Yirgacheffe Farms', stock: 100, rating: 4.8, numReviews: 45 },
  { name: 'Injera Making Pan - Traditional Mitad', description: 'Electric injera pan (Mitad) for making perfect Ethiopian injera at home. Non-stick surface.', price: 35.00, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', category: 'Hot Deals', brand: 'EthioKitchen', stock: 50, rating: 4.5, numReviews: 28 },
  { name: 'Berbere Spice Mix - Authentic Ethiopian', description: 'Traditional Ethiopian berbere spice blend. Perfect for doro wat, tibs, and stews. 200g.', price: 8.50, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500', category: 'Hot Deals', brand: 'Addis Spices', stock: 200, rating: 4.9, numReviews: 67 },
  { name: 'Ethiopian Habesha Kemis - White Cotton', description: 'Traditional Ethiopian Habesha Kemis dress with beautiful Tibeb border embroidery. Pure white cotton.', price: 45.00, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500', category: 'Traditional Wear', brand: 'Habesha Fashion', stock: 30, rating: 4.7, numReviews: 22 },
  { name: 'Ethiopian Gabi - Traditional Shawl', description: 'Handwoven Ethiopian Gabi (ጋቢ) - thick cotton shawl used for warmth and ceremonies.', price: 28.00, image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500', category: 'Traditional Wear', brand: 'Addis Weave', stock: 45, rating: 4.6, numReviews: 18 },
  { name: 'Ethiopian Kaba Dress - Colorful Tibeb', description: 'Elegant Ethiopian Kaba dress with colorful Tibeb woven patterns. Perfect for holidays and ceremonies.', price: 65.00, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500', category: 'Traditional Wear', brand: 'Ethio Style', stock: 20, rating: 4.8, numReviews: 31 },
  { name: 'Ethiopian Netela - Lightweight Cotton Wrap', description: 'Traditional Ethiopian Netela (ነጠላ) - lightweight white cotton wrap with colorful border.', price: 18.00, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500', category: 'Traditional Wear', brand: 'Addis Weave', stock: 60, rating: 4.5, numReviews: 14 },
  { name: 'Oromo Traditional Dress - Bale Style', description: 'Beautiful Oromo traditional dress from Bale region. Colorful woven patterns with beaded accessories. Handmade by local artisans.', price: 55.00, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500', category: 'Traditional Wear', brand: 'Oromo Crafts', stock: 15, rating: 4.8, numReviews: 20 },
  { name: 'Tigray Traditional Cloth - Woven Cotton', description: 'Traditional Tigray woven cotton cloth with distinctive geometric patterns. Used for ceremonies and cultural events.', price: 38.00, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500', category: 'Traditional Wear', brand: 'Tigray Weavers', stock: 25, rating: 4.6, numReviews: 13 },
  { name: 'Ethiopian Wedding Dress - Habesha Bridal', description: 'Elegant Ethiopian bridal Habesha dress with gold Tibeb embroidery. Perfect for traditional weddings and ceremonies.', price: 120.00, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=500', category: 'Traditional Wear', brand: 'Bridal Ethio', stock: 8, rating: 4.9, numReviews: 35 },
  { name: 'Somali Traditional Dirac Dress', description: 'Colorful Somali Dirac dress worn in Ethiopian Somali region. Lightweight fabric with beautiful embroidery.', price: 42.00, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500', category: 'Traditional Wear', brand: 'Somali Fashion ET', stock: 18, rating: 4.5, numReviews: 11 },
  { name: 'Ethiopian Mesob - Traditional Basket Table', description: 'Handwoven Ethiopian Mesob (ሞሰብ) basket table. Used for serving injera and traditional meals.', price: 32.00, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', category: 'Home & Kitchen', brand: 'Ethio Crafts', stock: 25, rating: 4.7, numReviews: 19 },
  { name: 'Ethiopian Clay Coffee Pot - Jebena', description: 'Traditional Ethiopian clay coffee pot (Jebena/ጀበና) for the Ethiopian coffee ceremony. Handmade.', price: 22.00, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500', category: 'Home & Kitchen', brand: 'Ethio Pottery', stock: 40, rating: 4.9, numReviews: 52 },
  { name: 'Ethiopian Wooden Serving Spoon Set', description: 'Handcarved Ethiopian wooden spoon set. Perfect for serving injera, stews, and traditional dishes. Set of 4.', price: 15.00, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', category: 'Home & Kitchen', brand: 'Ethio Wood', stock: 80, rating: 4.4, numReviews: 23 },
  { name: 'Ethiopian Wicker Storage Basket', description: 'Handwoven Ethiopian wicker basket for storage. Durable, eco-friendly, and beautifully decorated.', price: 19.00, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', category: 'Home & Kitchen', brand: 'Ethio Crafts', stock: 35, rating: 4.6, numReviews: 16 },
  { name: 'Ethiopian Krar - Traditional String Instrument', description: 'Traditional Ethiopian Krar (ክራር) - 5-string lyre instrument. Handcrafted with wood and animal skin.', price: 85.00, image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500', category: 'Music & Culture', brand: 'Ethio Music', stock: 10, rating: 4.8, numReviews: 12 },
  { name: 'Ethiopian Kebero - Traditional Drum', description: 'Traditional Ethiopian Kebero (ከበሮ) drum used in Orthodox church ceremonies and cultural events.', price: 55.00, image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500', category: 'Music & Culture', brand: 'Ethio Music', stock: 15, rating: 4.7, numReviews: 9 },
  { name: 'Ethiopian Music Collection - Best of Tizita', description: 'Collection of classic Ethiopian Tizita music. Digital download includes 20 songs from legendary artists.', price: 9.99, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500', category: 'Music & Culture', brand: 'Ethio Records', stock: 999, rating: 4.9, numReviews: 78 },
  { name: 'Amharic Language Learning Book - Beginner', description: 'Complete guide to learning Amharic (አማርኛ) for beginners. Includes alphabet, grammar, and vocabulary.', price: 18.00, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', category: 'Books', brand: 'Addis Publishers', stock: 75, rating: 4.6, numReviews: 34 },
  { name: 'Ethiopian History - Ancient Civilizations', description: 'Comprehensive book on Ethiopian history from ancient Axum to modern times. 450 pages, illustrated.', price: 24.00, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500', category: 'Books', brand: 'Ethio Press', stock: 50, rating: 4.8, numReviews: 41 },
  { name: 'Ethiopian Orthodox Bible - Amharic', description: 'Complete Ethiopian Orthodox Bible in Amharic language. Hardcover, gold-embossed cover.', price: 35.00, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', category: 'Books', brand: 'Holy Books ET', stock: 40, rating: 4.9, numReviews: 56 },
  { name: 'Ethiopian Children Storybook - Amharic Tales', description: 'Collection of traditional Ethiopian folktales for children in Amharic. Colorful illustrations.', price: 12.00, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500', category: 'Books', brand: 'Kids Ethio', stock: 90, rating: 4.7, numReviews: 27 },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    let adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      adminUser = await User.create({ name: 'Admin', email: 'admin@buysphere.et', password: 'admin123456', isAdmin: true });
      console.log('Admin user created: admin@buysphere.et / admin123456');
    }

    await Product.deleteMany({});
    console.log('Existing products cleared');

    const productsWithUser = products.map((p) => ({ ...p, user: adminUser._id }));
    await Product.insertMany(productsWithUser);

    console.log(`✅ ${products.length} products seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Seeder error:', error.message);
    process.exit(1);
  }
};

seedProducts();
