import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../redux/slices/productSlice.js';
import ProductCard from '../components/product/ProductCard.jsx';
import Loader from '../components/common/Loader.jsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HERO_SLIDES = [
  {
    bg: 'linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 50%, #1a3a2a 100%)',
    title: '🌿 Explore Ethiopian Deals',
    subtitle: 'Discover authentic products from across Ethiopia',
    cta: 'Shop Now',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
  },
  {
    bg: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)',
    title: '👗 Traditional Wear Sale',
    subtitle: 'Habesha Kemis, Gabi, Kaba — up to 30% off',
    cta: 'Shop Traditional Wear',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=1200',
  },
  {
    bg: 'linear-gradient(135deg, #3d1a00 0%, #7c3a00 50%, #3d1a00 100%)',
    title: '☕ Ethiopian Coffee & Spices',
    subtitle: 'Premium Yirgacheffe, Sidama, and Harrar coffee',
    cta: 'Shop Hot Deals',
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200',
  },
];

const DEAL_CARDS = [
  { title: 'Shop Traditional Wear', items: [{ label: 'Habesha Kemis', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=200' }, { label: 'Gabi Shawl', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' }, { label: 'Kaba Dress', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200' }, { label: 'Netela Wrap', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200' }], link: '/?category=Traditional Wear' },
  { title: 'Home & Kitchen Essentials', items: [{ label: 'Jebena Coffee Pot', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200' }, { label: 'Mesob Basket', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200' }, { label: 'Wooden Spoons', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200' }, { label: 'Wicker Basket', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' }], link: '/?category=Home & Kitchen' },
  { title: 'Music & Culture', items: [{ label: 'Krar Instrument', img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200' }, { label: 'Kebero Drum', img: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=200' }, { label: 'Tizita Music', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200' }, { label: 'Cultural Items', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200' }], link: '/?category=Music & Culture' },
  { title: 'Books & Education', items: [{ label: 'Amharic Books', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200' }, { label: 'History Books', img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200' }, { label: 'Religious Books', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }, { label: 'Children Books', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200' }], link: '/?category=Books' },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { products, loading, error, pages } = useSelector((s) => s.products);
  const { categories } = useSelector((s) => s.products);

  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [slide, setSlide] = useState(0);

  const keyword = searchParams.get('keyword') || '';
  const categoryParam = searchParams.get('category') || '';

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  useEffect(() => {
    const cat = categoryParam || filters.category;
    dispatch(fetchProducts({ keyword, page, category: cat, minPrice: filters.minPrice, maxPrice: filters.maxPrice, sort }));
  }, [dispatch, keyword, page, filters, sort, categoryParam]);

  useEffect(() => {
    const timer = setInterval(() => setSlide((p) => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const isFiltered = keyword || categoryParam || filters.category;

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO BANNER */}
      {!isFiltered && (
        <div className="relative overflow-hidden" style={{ height: '350px' }}>
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
              style={{ background: s.bg }}>
              <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="relative z-10 flex items-center h-full px-16 max-w-7xl mx-auto">
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-3">{s.title}</h1>
                  <p className="text-lg text-gray-200 mb-6">{s.subtitle}</p>
                  <button onClick={() => navigate(s.link || '/')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded text-base transition">
                    {s.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setSlide((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-3 rounded-full text-white transition">
            <FiChevronLeft size={24} />
          </button>
          <button onClick={() => setSlide((p) => (p + 1) % HERO_SLIDES.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-3 rounded-full text-white transition">
            <FiChevronRight size={24} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`w-2 h-2 rounded-full transition ${i === slide ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>
      )}

      {/* DEAL CARDS GRID (Amazon-style) */}
      {!isFiltered && (
        <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEAL_CARDS.map((card) => (
              <div key={card.title} className="bg-white rounded shadow-sm p-4 hover:shadow-md transition">
                <h3 className="font-bold text-gray-900 text-base mb-3">{card.title}</h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {card.items.map((item) => (
                    <div key={item.label}>
                      <img src={item.img} alt={item.label} className="w-full h-20 object-cover rounded" />
                      <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
                <Link to={card.link} className="text-blue-600 hover:underline text-sm font-medium">
                  See all deals
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Search/filter heading */}
        {isFiltered && (
          <div className="mb-4 flex items-center gap-3">
            {keyword && <p className="text-gray-700">Results for: <strong>"{keyword}"</strong></p>}
            {(categoryParam || filters.category) && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {categoryParam || filters.category}
              </span>
            )}
            <button onClick={() => { navigate('/'); setFilters({ category: '', minPrice: '', maxPrice: '' }); }}
              className="text-blue-600 hover:underline text-sm">Clear filters</button>
          </div>
        )}

        {/* Category pills */}
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            <button onClick={() => { navigate('/'); setFilters({ category: '', minPrice: '', maxPrice: '' }); }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition ${!categoryParam && !filters.category ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}`}>
              All
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => navigate(`/?category=${encodeURIComponent(cat)}`)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition ${(categoryParam === cat || filters.category === cat) ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}`}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found.</p>
            <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">Back to home</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-3 py-2 rounded border disabled:opacity-40 hover:bg-gray-200 bg-white">
                  <FiChevronLeft />
                </button>
                {[...Array(pages)].map((_, i) => (
                  <button key={i + 1} onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded border font-medium ${page === i + 1 ? 'bg-yellow-400 border-yellow-400 text-gray-900' : 'bg-white hover:bg-gray-100'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}
                  className="px-3 py-2 rounded border disabled:opacity-40 hover:bg-gray-200 bg-white">
                  <FiChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
