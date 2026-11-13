
import React, { useState, useEffect } from 'react';

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(
          'https://fakestoreapi.com/products'
        );

        if (!res.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid product data received.');
        }

        setProducts(data);

      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Unable to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categories
  const categories = [
    'all',
    "men's clothing",
    "women's clothing",
    'electronics',
    'jewelery'
  ];

  // Search and Category Filter
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory;

    const matchesSearch =
      item.title?.toLowerCase().includes(
        searchQuery.toLowerCase()
      );

    return matchesCategory && matchesSearch;
  });

  // Add to Cart
  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div
      style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '25px',
        backgroundColor: '#0f172a',
        borderRadius: '24px',
        border: '2px solid #38bdf8',
        color: '#fff',
        fontFamily: 'Arial, sans-serif'
      }}
    >

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ color: '#38bdf8', margin: 0 }}>
            Product Catalog Store 🛍️
          </h3>

          <span
            style={{
              fontSize: '11px',
              color: '#64748b',
              fontWeight: 'bold'
            }}
          >
            LIVE API • SEARCH & CATEGORY FILTER
          </span>
        </div>

        <div
          style={{
            backgroundColor: '#22c55e',
            color: '#000',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          🛒 Cart Items: {cartCount}
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="🔍 Search products by name..."
        style={{
          width: '100%',
          padding: '12px 15px',
          borderRadius: '10px',
          border: '1px solid #334155',
          backgroundColor: '#020617',
          color: '#fff',
          fontSize: '14px',
          marginBottom: '15px',
          boxSizing: 'border-box',
          outline: 'none'
        }}
      />

      {/* Category Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '7px 14px',
              borderRadius: '20px',
              border: '1px solid #334155',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textTransform: 'capitalize',
              backgroundColor:
                selectedCategory === cat
                  ? '#38bdf8'
                  : '#020617',
              color:
                selectedCategory === cat
                  ? '#000'
                  : '#94a3b8'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Catalog */}
      {loading ? (
        <div
          style={{
            padding: '40px',
            color: '#94a3b8',
            textAlign: 'center'
          }}
        >
          ⏳ Loading Product Catalog...
        </div>
      ) : error ? (
        <div
          style={{
            padding: '30px',
            color: '#f87171',
            textAlign: 'center'
          }}
        >
          ⚠️ {error}

          <br />

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div
          style={{
            padding: '40px',
            color: '#94a3b8',
            textAlign: 'center'
          }}
        >
          No products found! 🔍
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: '#020617',
                padding: '15px',
                borderRadius: '16px',
                border: '1px solid #1e293b',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >

              {/* Product Image */}
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  padding: '10px',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  style={{
                    maxHeight: '120px',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Product Details */}
              <div>
                <span
                  style={{
                    fontSize: '10px',
                    color: '#38bdf8',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}
                >
                  {product.category}
                </span>

                <h4
                  style={{
                    margin: '4px 0 8px 0',
                    fontSize: '13.5px',
                    color: '#fff',
                    lineHeight: '1.4'
                  }}
                >
                  {product.title.length > 45
                    ? product.title.slice(0, 45) + '...'
                    : product.title}
                </h4>

                <div
                  style={{
                    fontSize: '12px',
                    color: '#facc15',
                    marginBottom: '8px'
                  }}
                >
                  ⭐ {product.rating?.rate ?? 'N/A'}
                  {' '}({product.rating?.count ?? 0} reviews)
                </div>
              </div>

              {/* Price and Cart */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                  borderTop: '1px solid #1e293b',
                  paddingTop: '10px'
                }}
              >
                <strong
                  style={{
                    color: '#4ade80',
                    fontSize: '16px'
                  }}
                >
                  ₹ {Math.round(product.price * 80)}
                </strong>

                <button
                  onClick={addToCart}
                  style={{
                    padding: '7px 12px',
                    backgroundColor: '#38bdf8',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  + Add
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {!loading && !error && (
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '12px'
          }}
        >
          Showing {filteredProducts.length} of {products.length} products
        </div>
      )}

    </div>
  );
}

export default ProductCatalog;
