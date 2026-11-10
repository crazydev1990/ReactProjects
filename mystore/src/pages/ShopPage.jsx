import React, { useState, useEffect } from 'react';
import ProductListCard from '../components/ProductListCard';
import '../assets/styles/ProductListCard.css';
import '../App.css';

// ઑફલાઇન બેકઅપ પ્રોડક્ટ્સ (જો પ્રોડક્શન બિલ્ડમાં લાઈવ API બ્લોક થાય તો આ લોડ થશે)
const backupProducts = [
  { id: 1, title: "Fiona Designer Pink Georgette Saree", price: 15.99, category: "women's clothing", image: "https://fakestoreapi.com" },
  { id: 2, title: "Classic Men's Casual Slim Fit Premium Shirt", price: 22.30, category: "men's clothing", image: "https://fakestoreapi.com" },
  { id: 3, title: "SanDisk SSD PLUS 1TB Internal Solid State Drive", price: 109, category: "electronics", image: "https://fakestoreapi.com" },
  { id: 4, title: "Meenakari Traditional Gold Plated Jewelry Set", price: 64, category: "jewelery", image: "https://fakestoreapi.com" }
];

const ShopPage = (props) => {
  const { onAddToCart } = props; // props નું ડેસ્ટ્રક્ચરિંગ
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortBy, setSortBy] = useState("default"); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; 

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        // ૧. લાઈવ API માંથી પ્રોડક્ટ્સ મેળવવાનો પ્રયત્ન
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(backupProducts); // જો ડેટા ખાલી આવે તો
        }
      } catch (error) {
        console.log("Offline Products Loading..");
        setProducts(backupProducts); // જો નેટવર્ક બ્લોક થાય તો બેકઅપ લોડ કરો
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []); 

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // કેટેગરી લાઈવ કાઉન્ટ લૂપ
  let countAll = products.length;
  let countWomen = 0; let countMen = 0; let countElectronics = 0; let countJewelry = 0;
  for (let i = 0; i < products.length; i = i + 1) {
    const item = products[i];
    if (item.category === "women's clothing") countWomen = countWomen + 1;
    if (item.category === "men's clothing") countMen = countMen + 1;
    if (item.category === "electronics") countElectronics = countElectronics + 1;
    if (item.category === "jewelery") countJewelry = countJewelry + 1;
  }

  // સર્ચ અને ફિલ્ટર સેટઅપ
  let processedProducts = [];
  for (let i = 0; i < products.length; i = i + 1) {
    const item = products[i];
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (matchCategory && matchSearch) {
      processedProducts.push(item);
    }
  }

  if (sortBy === "lowToHigh") processedProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "highToLow") processedProducts.sort((a, b) => b.price - a.price);

  const totalItems = processedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1; 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  let currentDisplayProducts = [];
  for (let i = indexOfFirstItem; i < indexOfLastItem; i = i + 1) {
    if (processedProducts[i]) currentDisplayProducts.push(processedProducts[i]);
  }

  const renderCatalogView = () => {
    if (currentDisplayProducts.length === 0) {
      return (
        <div className="not-available-msg">
          ⚠️ No Product Available.
        </div>
      );
    } else {
      return (
        <div className="product-grid">
          {currentDisplayProducts.map(product => (
            <ProductListCard key={product.id} product={product} onAdd={onAddToCart} />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      {loading ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>Loading....</p>
      ) : (
        <div className="shop-layout">
          <aside className="sidebar-container">
            <h4 className="sidebar-title">Categories</h4>
            <div className="category-list">
              <button onClick={() => setActiveCategory("all")} className={activeCategory === "all" ? "category-btn-active" : "category-btn"}>
                <div className="category-btn-content"><span>All Products</span>&nbsp;&nbsp;<span className="count-badge">({countAll})</span></div>
              </button>
              <button onClick={() => setActiveCategory("women's clothing")} className={activeCategory === "women's clothing" ? "category-btn-active" : "category-btn"}>
                <div className="category-btn-content"><span>Women Wear</span>&nbsp;&nbsp;<span className="count-badge">({countWomen})</span></div>
              </button>
              <button onClick={() => setActiveCategory("men's clothing")} className={activeCategory === "men's clothing" ? "category-btn-active" : "category-btn"}>
                <div className="category-btn-content"><span>Men Clothing</span>&nbsp;&nbsp;<span className="count-badge">({countMen})</span></div>
              </button>
              <button onClick={() => setActiveCategory("electronics")} className={activeCategory === "electronics" ? "category-btn-active" : "category-btn"}>
                <div className="category-btn-content"><span>Electronics</span>&nbsp;&nbsp;<span className="count-badge">({countElectronics})</span></div>
              </button>
              <button onClick={() => setActiveCategory("jewelery")} className={activeCategory === "jewelery" ? "category-btn-active" : "category-btn"}>
                <div className="category-btn-content"><span>Jewelry</span>&nbsp;&nbsp;<span className="count-badge">({countJewelry})</span></div>
              </button>
            </div>
          </aside>

          <section className="catalog-area">
            <div className="controls-bar">
              <input type="text" placeholder="🔍 Find Product..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="default">Sort By: Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
            {renderCatalogView()}
          </section>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
