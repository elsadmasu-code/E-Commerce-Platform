# BuySphere Product Images

Place your product images in the appropriate category folder.

## Folder Structure

```
images/
├── traditional-wear/    → Habesha Kemis, Gabi, Kaba, Netela, Oromo dress
├── home-kitchen/        → Jebena, Mesob, wooden spoons, baskets
├── music-culture/       → Krar, Kebero, music collections
├── books/               → Amharic books, history, religious, children
├── hot-deals/           → Sale items, coffee, spices
└── hero/                → Hero banner images (1200x400px recommended)
```

## How to Use in Seeder

After placing images here, reference them in `backend/seeds/productSeeder.js` like:

```js
image: '/images/traditional-wear/habesha-kemis.jpg'
```

## Image Guidelines
- Format: JPG or PNG
- Product images: 500x500px minimum
- Hero images: 1200x400px minimum
- Keep file names lowercase with hyphens (e.g. `habesha-kemis.jpg`)
